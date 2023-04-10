package pws.quo.web.rest;

import java.io.File;
import java.io.FileInputStream;
import java.util.*;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import org.apache.commons.lang3.StringUtils;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pws.quo.domain.Category;
import pws.quo.domain.Quote;
import pws.quo.domain.User;
import pws.quo.domain.UserAdditionalFields;
import pws.quo.repository.UserRepository;
import pws.quo.security.SecurityUtils;
import pws.quo.service.MailService;
import pws.quo.service.UserAdditionalFieldsService;
import pws.quo.service.UserQuoteService;
import pws.quo.service.UserService;
import pws.quo.service.dto.AdminUserDTO;
import pws.quo.service.dto.PasswordChangeDTO;
import pws.quo.web.rest.errors.*;
import pws.quo.web.rest.vm.KeyAndPasswordVM;
import pws.quo.web.rest.vm.ManagedUserVM;

/**
 * REST controller for managing the current user's account.
 */
@RestController
@RequestMapping("/api")
public class AccountResource {

    private static class AccountResourceException extends RuntimeException {

        private AccountResourceException(String message) {
            super(message);
        }
    }

    private final Logger log = LoggerFactory.getLogger(AccountResource.class);

    private final UserRepository userRepository;

    private final UserService userService;

    private final MailService mailService;

    private final UserAdditionalFieldsService userAdditionalFieldsService;

    private final UserQuoteService userQuoteService;

    public AccountResource(
        UserRepository userRepository,
        UserService userService,
        MailService mailService,
        UserAdditionalFieldsService userAdditionalFieldsService,
        UserQuoteService userQuoteService
    ) {
        this.userRepository = userRepository;
        this.userService = userService;
        this.mailService = mailService;
        this.userAdditionalFieldsService = userAdditionalFieldsService;
        this.userQuoteService = userQuoteService;
    }

    /**
     * {@code POST  /register} : register the user.
     *
     * @param managedUserVM the managed user View Model.
     * @throws InvalidPasswordException {@code 400 (Bad Request)} if the password is incorrect.
     * @throws EmailAlreadyUsedException {@code 400 (Bad Request)} if the email is already used.
     * @throws LoginAlreadyUsedException {@code 400 (Bad Request)} if the login is already used.
     */
    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public void registerAccount(@Valid @RequestBody ManagedUserVM managedUserVM) {
        if (isPasswordLengthInvalid(managedUserVM.getPassword())) {
            throw new InvalidPasswordException();
        }
        User user = userService.registerUser(managedUserVM, managedUserVM.getPassword());
        //mailService.sendActivationEmail(user);
    }

    /**
     * {@code GET  /activate} : activate the registered user.
     *
     * @param key the activation key.
     * @throws RuntimeException {@code 500 (Internal Server Error)} if the user couldn't be activated.
     */
    @GetMapping("/activate")
    public void activateAccount(@RequestParam(value = "key") String key) {
        Optional<User> user = userService.activateRegistration(key);
        if (!user.isPresent()) {
            throw new AccountResourceException("No user was found for this activation key");
        }
    }

    /**
     * {@code GET  /authenticate} : check if the user is authenticated, and return its login.
     *
     * @param request the HTTP request.
     * @return the login if the user is authenticated.
     */
    @GetMapping("/authenticate")
    public String isAuthenticated(HttpServletRequest request) {
        log.debug("REST request to check if the current user is authenticated");
        return request.getRemoteUser();
    }

    /**
     * {@code GET  /account} : get the current user.
     *
     * @return the current user.
     * @throws RuntimeException {@code 500 (Internal Server Error)} if the user couldn't be returned.
     */
    @GetMapping("/account")
    public AdminUserDTO getAccount() {
        Optional<User> user = userService.getUserWithAuthorities();
        if (user.isPresent()) {
            AdminUserDTO adminUserDTO = new AdminUserDTO(user.get());
            UserAdditionalFields userAdditionalFields = userAdditionalFieldsService.findByUser(user.get());
            adminUserDTO.setUserAdditionalFields(userAdditionalFields);

            if (userAdditionalFields != null) {
                List<Category> kate = getCategoriesForUser();

                adminUserDTO.setCategoryList(kate);
            }

            return adminUserDTO;
        } else {
            throw new AccountResourceException("User could not be found");
        }
    }

    @PostMapping("/set/category")
    public List<Category> setCatgories(@RequestBody List<Category> kategorije) {
        Optional<User> user = userService.getUserWithAuthorities();
        if (user.isPresent()) {
            List<Category> categoryList = userAdditionalFieldsService.saveCategoriesForUser(kategorije, user.get());
            return categoryList;
        } else {
            throw new AccountResourceException("User could not be found");
        }
    }

    @GetMapping("/get/category")
    public List<Category> getCategoriesForUser() {
        Optional<User> user = userService.getUserWithAuthorities();
        if (user.isPresent()) {
            List<Category> categoryList = userAdditionalFieldsService.getCategoriesForUser(user.get());
            return categoryList;
        } else {
            throw new AccountResourceException("User could not be found");
        }
    }

    @PatchMapping("/set/theme/{id}")
    public AdminUserDTO setTheme(@PathVariable("id") int id) {
        Optional<User> user = userService.getUserWithAuthorities();
        if (user.isPresent()) {
            UserAdditionalFields uaf = userAdditionalFieldsService.saveNewTheme(user.get(), id);

            AdminUserDTO adminUserDTO = new AdminUserDTO(user.get());
            adminUserDTO.setUserAdditionalFields(uaf);

            if (uaf != null) {
                List<Category> kate = getCategoriesForUser();
                adminUserDTO.setCategoryList(kate);
            }
            return adminUserDTO;
        } else {
            throw new AccountResourceException("User could not be found");
        }
    }

    @GetMapping("/current/quote")
    public Quote getCurrentQuote() {
        Optional<User> user = userService.getUserWithAuthorities();
        if (user.isPresent()) {
            Quote quote = userQuoteService.findLastQuote(user.get());
            return quote;
        } else {
            throw new AccountResourceException("User could not be found");
        }
    }

    @GetMapping("/quote/history")
    public List<Quote> getQuoteHistory() {
        Optional<User> user = userService.getUserWithAuthorities();
        if (user.isPresent()) {
            List<Quote> quotes = userQuoteService.findQuotesForUser(user.get());
            return quotes;
        } else {
            throw new AccountResourceException("User could not be found");
        }
    }

    /**
     * {@code POST  /account} : update the current user information.
     *
     * @param userDTO the current user information.
     * @throws EmailAlreadyUsedException {@code 400 (Bad Request)} if the email is already used.
     * @throws RuntimeException {@code 500 (Internal Server Error)} if the user login wasn't found.
     */
    @PostMapping("/account")
    public void saveAccount(@Valid @RequestBody AdminUserDTO userDTO) {
        String userLogin = SecurityUtils
            .getCurrentUserLogin()
            .orElseThrow(() -> new AccountResourceException("Current user login not found"));
        Optional<User> existingUser = userRepository.findOneByEmailIgnoreCase(userDTO.getEmail());
        if (existingUser.isPresent() && (!existingUser.get().getLogin().equalsIgnoreCase(userLogin))) {
            throw new EmailAlreadyUsedException();
        }
        Optional<User> user = userRepository.findOneByLogin(userLogin);
        if (!user.isPresent()) {
            throw new AccountResourceException("User could not be found");
        }
        userService.updateUser(
            userDTO.getFirstName(),
            userDTO.getLastName(),
            userDTO.getEmail(),
            userDTO.getLangKey(),
            userDTO.getImageUrl()
        );
    }

    /**
     * {@code POST  /account/change-password} : changes the current user's password.
     *
     * @param passwordChangeDto current and new password.
     * @throws InvalidPasswordException {@code 400 (Bad Request)} if the new password is incorrect.
     */
    @PostMapping(path = "/account/change-password")
    public void changePassword(@RequestBody PasswordChangeDTO passwordChangeDto) {
        if (isPasswordLengthInvalid(passwordChangeDto.getNewPassword())) {
            throw new InvalidPasswordException();
        }
        userService.changePassword(passwordChangeDto.getCurrentPassword(), passwordChangeDto.getNewPassword());
    }

    @GetMapping(path = "/app-reset")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public void appReset() throws Exception {
        String excelFilePath = "quotes.xlsx";
        File folder = new File(".");
        File[] files = folder.listFiles();
        for (File file : files) {
            if (file.isFile()) {
                System.out.println(file.getName());
            }
        }
        // create a file input stream to read the Excel file
        FileInputStream inputStream = new FileInputStream(new File(excelFilePath));

        // create a workbook object from the input stream
        Workbook workbook = WorkbookFactory.create(inputStream);

        // get the first sheet of the workbook
        Sheet sheet = workbook.getSheetAt(0);

        // loop through each row of the sheet
        for (Row row : sheet) {
            if (row.getRowNum() == 0) continue;
            // loop through each cell of the row
            for (Cell cell : row) {
                // print the value of the cell
                System.out.print(cell.toString() + "aaa");
            }
            System.out.println();
        }

        // close the workbook and input stream
        workbook.close();
        inputStream.close();
    }

    /**
     * {@code POST   /account/reset-password/init} : Send an email to reset the password of the user.
     *
     * @param mail the mail of the user.
     */
    @PostMapping(path = "/account/reset-password/init")
    public void requestPasswordReset(@RequestBody String mail) {
        Optional<User> user = userService.requestPasswordReset(mail);
        if (user.isPresent()) {
            mailService.sendPasswordResetMail(user.get());
        } else {
            // Pretend the request has been successful to prevent checking which emails really exist
            // but log that an invalid attempt has been made
            log.warn("Password reset requested for non existing mail");
        }
    }

    /**
     * {@code POST   /account/reset-password/finish} : Finish to reset the password of the user.
     *
     * @param keyAndPassword the generated key and the new password.
     * @throws InvalidPasswordException {@code 400 (Bad Request)} if the password is incorrect.
     * @throws RuntimeException {@code 500 (Internal Server Error)} if the password could not be reset.
     */
    @PostMapping(path = "/account/reset-password/finish")
    public void finishPasswordReset(@RequestBody KeyAndPasswordVM keyAndPassword) {
        if (isPasswordLengthInvalid(keyAndPassword.getNewPassword())) {
            throw new InvalidPasswordException();
        }
        Optional<User> user = userService.completePasswordReset(keyAndPassword.getNewPassword(), keyAndPassword.getKey());

        if (!user.isPresent()) {
            throw new AccountResourceException("No user was found for this reset key");
        }
    }

    private static boolean isPasswordLengthInvalid(String password) {
        return (
            StringUtils.isEmpty(password) ||
            password.length() < ManagedUserVM.PASSWORD_MIN_LENGTH ||
            password.length() > ManagedUserVM.PASSWORD_MAX_LENGTH
        );
    }
}

package pws.quo.web.rest;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.lang3.StringUtils;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import pws.quo.domain.*;
import pws.quo.domain.dto.EmailDTO;
import pws.quo.domain.dto.QAC;
import pws.quo.repository.*;
import pws.quo.security.SecurityUtils;
import pws.quo.service.MailService;
import pws.quo.service.UserAdditionalFieldsService;
import pws.quo.service.UserQuoteService;
import pws.quo.service.UserService;
import pws.quo.service.dto.AdminUserDTO;
import pws.quo.service.dto.PasswordChangeDTO;
import pws.quo.service.dto.PaymentTransaction;
import pws.quo.web.rest.errors.EmailAlreadyUsedException;
import pws.quo.web.rest.errors.InvalidPasswordException;
import pws.quo.web.rest.errors.LoginAlreadyUsedException;
import pws.quo.web.rest.vm.KeyAndPasswordVM;
import pws.quo.web.rest.vm.ManagedUserVM;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.text.SimpleDateFormat;
import java.time.Duration;
import java.time.Instant;
import java.util.*;

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

    private final CategoryRepository categoryRepository;

    private final AuthorRepository authorRepository;

    private final QuoteRepository quoteRepository;

    private final UserQuoteRepository userQuoteRepository;

    private final UserAdditionalFieldsRepository userAdditionalFieldsRepository;

    private final PaymentRepository paymentRepository;

    public AccountResource(UserRepository userRepository, UserService userService, MailService mailService, UserAdditionalFieldsService userAdditionalFieldsService, UserQuoteService userQuoteService, CategoryRepository categoryRepository, AuthorRepository authorRepository, QuoteRepository quoteRepository, UserQuoteRepository userQuoteRepository, UserAdditionalFieldsRepository userAdditionalFieldsRepository, PaymentRepository paymentRepository) {
        this.userRepository = userRepository;
        this.userService = userService;
        this.mailService = mailService;
        this.userAdditionalFieldsService = userAdditionalFieldsService;
        this.userQuoteService = userQuoteService;
        this.categoryRepository = categoryRepository;
        this.authorRepository = authorRepository;
        this.quoteRepository = quoteRepository;
        this.userQuoteRepository = userQuoteRepository;
        this.userAdditionalFieldsRepository = userAdditionalFieldsRepository;
        this.paymentRepository = paymentRepository;
    }

    /**
     * {@code POST  /register} : register the user.
     *
     * @param managedUserVM the managed user View Model.
     * @throws InvalidPasswordException  {@code 400 (Bad Request)} if the password is incorrect.
     * @throws EmailAlreadyUsedException {@code 400 (Bad Request)} if the email is already used.
     * @throws LoginAlreadyUsedException {@code 400 (Bad Request)} if the login is already used.
     */

//    @GetMapping("/testic")
//    public void registerQuotes(){
//        userQuoteService.generateNewLineOfQuotes();
//    }
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

//    @GetMapping("/payment-status/me")
//    public Object getPaymentStatus() {
//        System.out.println("::::::::::::::::::::::::::::::CHECK PAYMENT ME:::::::::::::::::::::::::::::::::");
//
//        Optional<User> optionalUser = userService.getUserWithAuthorities();
//        if (!optionalUser.isPresent()) {
//            return null;
//        }
//
//        User user = optionalUser.get();
//        UserAdditionalFields userAdditionalFields = userAdditionalFieldsService.findByUser(user);
//
//        Object o = checkForLastPaymentPremium(userAdditionalFields);
//        return o;
//
//    }
//    private Object checkForLastPaymentPremium(UserAdditionalFields userAdditionalFields) {
//
//        List<Payment> paymentList = paymentRepository.findAllByUserAdditionalFieldsAndUsed(userAdditionalFields, false);
//
//        if (paymentList.size() > 0) {
//            Payment latestPayment = returnLatestPayment(paymentList);
//
//
//            //TODO: pozvaati onaj njihov endpoint da vidim da li je placeno
//
//            //send payment transaction
//            RestTemplate restTemplate = new RestTemplate();
//
//            HttpHeaders headers = new HttpHeaders();
//            headers.setContentType(MediaType.MULTIPART_FORM_DATA);
//
//
//            MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
//            map.add("ACTION", "QUERYTRANSACTION");
//            map.add("SESSIONTOKEN", latestPayment.getSessionToken());
//
//            HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(map, headers);
//
//            String resp = restTemplate.postForObject("https://test.merchantsafeunipay.com/msu/api/v2", request, String.class);
//
//            System.out.println("Response: " + resp); // Printing the entire response
//
//            ObjectMapper mapper = new ObjectMapper();
//            try {
//                JsonNode root = mapper.readTree(resp);
//                JsonNode transactionList = root.path("transactionList");
//                String transactionStatus = null;
//                System.out.println(":::::::::::::::TRLRLRLRLRLRLLR:::::::::::::::::::::");
//
//                for (JsonNode transaction : transactionList) {
//                    transactionStatus = transaction.get("transactionStatus").asText();
//                    System.out.println("/////////////////" + transactionStatus + "/////////////////////");
//                    break;
//                }
//
//
//                if (transactionStatus.equalsIgnoreCase("AP")) {
//
//                    userAdditionalFields.setExpiry(Instant.now().plus(Duration.ofDays(365)));
//                    latestPayment.setUsed(true);
//                    paymentRepository.save(latestPayment);
//                    userAdditionalFieldsRepository.save(userAdditionalFields);
//
//                }
//                return resp;
//            } catch (Exception e) {
//                e.printStackTrace();
//            }
//        }
//        return null;
//    }
    @Transactional
    @GetMapping("/account")
    public AdminUserDTO getAccountNew() {
        System.out.println("::::::::::::::::::::::::::::::GETTING ACCOUNT:::::::::::::::::::::::::::::::::");
        Optional<User> optionalUser = userService.getUserWithAuthorities();
        if (!optionalUser.isPresent()) throw new AccountResourceException("User could not be found");

        User user = optionalUser.get();
        UserAdditionalFields userAdditionalFields = userAdditionalFieldsService.findByUser(user);

        AdminUserDTO adminUserDTO = new AdminUserDTO(user);
        if (userAdditionalFields == null) {
            return adminUserDTO;
        }

        adminUserDTO.setUserAdditionalFields(userAdditionalFields);
        adminUserDTO.setCategoryList(getCategoriesForUser());

        //check if premium active
        if (userAdditionalFields.getTrialExpiry() == null || userAdditionalFields.getTrialExpiry().isAfter(Instant.now())) {
            adminUserDTO.setHasTrial(true);
        } else {
            adminUserDTO.setHasTrial(false);
        }
        if (userAdditionalFields.getExpiry() != null && userAdditionalFields.getExpiry().isAfter(Instant.now())) {
            adminUserDTO.setHasPremium(true);
        } else {
            adminUserDTO.setHasPremium(false);
        }


        //set last payment data
        if (userAdditionalFields.getFirstTimePremium() == true || userAdditionalFields.getFailedPayment() == true) {
            Payment payment = getLatestPayment(userAdditionalFields);
            adminUserDTO.setPaymentDataJson(payment.getPaymentDataJson());
        }

        System.out.println("-------------------------------PREMIUM-------------------------------------");
        System.out.println(adminUserDTO.isHasPremium());
        System.out.println("-------------------------------========-------------------------------------");


        //if no premium check maybe he bought ??
        if (adminUserDTO.isHasPremium() == false) {
            Payment latestPayment = getLatestPaymentNotUsed(userAdditionalFields);
            if (latestPayment == null)
                return adminUserDTO;

            //Call the new Endpoint to check transaction status
            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.MULTIPART_FORM_DATA);
            MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
            map.add("ACTION", "QUERYTRANSACTION");
            map.add("SESSIONTOKEN", latestPayment.getSessionToken());
            HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(map, headers);
            String resp = restTemplate.postForObject("https://test.merchantsafeunipay.com/msu/api/v2", request, String.class);


            //Parse response
            String transactionStatus = getTransactionStatus(resp);

            if (transactionStatus==null){
                latestPayment.setUsed(true);
                paymentRepository.save(latestPayment);
                return adminUserDTO;
            }
            switch (transactionStatus) {
                case "IP":
                    System.out.println("In Progress");
                    //TODO: mozda izmeniti?
                    failedTransactionStatus(resp, adminUserDTO, userAdditionalFields, latestPayment);

                    break;
                case "CA":
                    System.out.println("Cancelled");
                    failedTransactionStatus(resp, adminUserDTO, userAdditionalFields, latestPayment);

                    break;
                case "FA":
                    System.out.println("Failed");
                    failedTransactionStatus(resp, adminUserDTO, userAdditionalFields, latestPayment);

                    break;
                case "AP":
                    System.out.println("Approved");
                    succeededTransactionStatus(resp, adminUserDTO, userAdditionalFields, latestPayment);

                    break;
                case "VD":
                    System.out.println("Voided");
                    failedTransactionStatus(resp, adminUserDTO, userAdditionalFields, latestPayment);

                    break;
                case "MR":
                    System.out.println("Marked as Refund");
                    failedTransactionStatus(resp, adminUserDTO, userAdditionalFields, latestPayment);

                    break;
                default:
                    System.out.println("Unknown transaction status");
                    failedTransactionStatus(resp, adminUserDTO, userAdditionalFields, latestPayment);
                    break;
            }

        }

        return adminUserDTO;
    }

    private void succeededTransactionStatus(String resp, AdminUserDTO adminUserDTO, UserAdditionalFields userAdditionalFields, Payment latestPayment) {
        latestPayment.setUsed(true);
        latestPayment.setPaymentDataJson(resp);
        paymentRepository.save(latestPayment);

        userAdditionalFields.setExpiry(latestPayment.getPaymentDate().plus(Duration.ofDays(366)));
        userAdditionalFields.setFailedPayment(false);
        userAdditionalFields.setFirstTimePremium(true);
        userAdditionalFieldsRepository.save(userAdditionalFields);

        adminUserDTO.setPaymentDataJson(resp);
        adminUserDTO.setHasPremium(true);

        mailService.sendPasswordPaymentSuccessful(latestPayment, userAdditionalFields);
    }

    private void failedTransactionStatus(String resp, AdminUserDTO adminUserDTO, UserAdditionalFields userAdditionalFields, Payment latestPayment) {
        latestPayment.setUsed(true);
        latestPayment.setPaymentDataJson(resp);
        paymentRepository.save(latestPayment);

        userAdditionalFields.setFailedPayment(true);
        userAdditionalFields.setFirstTimePremium(false);
        userAdditionalFieldsRepository.save(userAdditionalFields);

        adminUserDTO.setPaymentDataJson(resp);

        mailService.sendPasswordPaymentFail(latestPayment, userAdditionalFields);
    }

    private String getTransactionStatus(String resp) {
        ObjectMapper mapper = new ObjectMapper();
        try {
            JsonNode root = mapper.readTree(resp);
            JsonNode transactionList = root.path("transactionList");
            String transactionStatus = null;
            for (JsonNode transaction : transactionList) {
                transactionStatus = transaction.get("transactionStatus").asText();
                return transactionStatus;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    private Payment getLatestPaymentNotUsed(UserAdditionalFields userAdditionalFields) {
        List<Payment> paymentList = paymentRepository.findAllByUserAdditionalFieldsAndUsed(userAdditionalFields, false);

        if (paymentList.size() > 0) {
            Payment latestPayment = returnLatestPayment(paymentList);
            return latestPayment;
        }
        return null;
    }

    private Payment getLatestPayment(UserAdditionalFields userAdditionalFields) {
        List<Payment> paymentList = paymentRepository.findAllByUserAdditionalFields(userAdditionalFields);
        if (paymentList.size() > 0) {
            Payment latestPayment = returnLatestPayment(paymentList);
            return latestPayment;
        }
        return null;
    }


//    @Transactional
//    @GetMapping("/account")
//    public AdminUserDTO getAccount() {
//        System.out.println("::::::::::::::::::::::::::::::GETTING ACCOUNT:::::::::::::::::::::::::::::::::");
//        Optional<User> user = userService.getUserWithAuthorities();
//        if (user.isPresent()) {
//            AdminUserDTO adminUserDTO = new AdminUserDTO(user.get());
//            UserAdditionalFields userAdditionalFields = userAdditionalFieldsService.findByUser(user.get());
//            adminUserDTO.setUserAdditionalFields(userAdditionalFields);
//
//            if (userAdditionalFields != null) {
//                List<Category> kate = getCategoriesForUser();
//                adminUserDTO.setCategoryList(kate);
//            }
//
//
//            if (userAdditionalFields.getFirstTimePremium() == true || userAdditionalFields.getFailedPayment() == true) {
//                List<Payment> paymentList = paymentRepository.findAllByUserAdditionalFieldsAndUsed(userAdditionalFields, false);
//                if (paymentList.size() > 0) {
//                    Payment latestPayment = returnLatestPayment(paymentList);
//                    adminUserDTO.setPaymentDataJson(latestPayment.getPaymentDataJson());
//                }
//            }
//
//            //set trial and stuff
//            if (userAdditionalFields != null) {
//                if (userAdditionalFields.getTrialExpiry() == null || userAdditionalFields.getTrialExpiry().isAfter(Instant.now())) {
//                    adminUserDTO.setHasTrial(true);
//                } else {
//                    adminUserDTO.setHasTrial(false);
//                }
//                if (userAdditionalFields.getExpiry() != null && userAdditionalFields.getExpiry().isAfter(Instant.now())) {
//                    adminUserDTO.setHasPremium(true);
//                } else {
//                    adminUserDTO.setHasPremium(false);
//                }
//
//
//                System.out.println("-------------------------------PREMIUM-------------------------------------");
//                System.out.println(adminUserDTO.isHasPremium());
//                System.out.println("-------------------------------========-------------------------------------");
//                //check if it has payments, if it has check maybe if premium is active
//                //TODO: mozda dodati sta ako uskoro istice?
//                if (adminUserDTO.isHasPremium() == false) {
//
//                    List<Payment> paymentList = paymentRepository.findAllByUserAdditionalFieldsAndUsed(userAdditionalFields, false);
//
//                    if (paymentList.size() > 0) {
//                        Payment latestPayment = returnLatestPayment(paymentList);
//
//
//                        //TODO: pozvaati onaj njihov endpoint da vidim da li je placeno
//
//                        //send payment transaction
//                        RestTemplate restTemplate = new RestTemplate();
//
//                        HttpHeaders headers = new HttpHeaders();
//                        headers.setContentType(MediaType.MULTIPART_FORM_DATA);
//
//
//                        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
//                        map.add("ACTION", "QUERYTRANSACTION");
//                        map.add("SESSIONTOKEN", latestPayment.getSessionToken());
//
//                        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(map, headers);
//
//                        String resp = restTemplate.postForObject("https://test.merchantsafeunipay.com/msu/api/v2", request, String.class);
//
//
//                        System.out.println("Response: " + resp); // Printing the entire response
//
//                        ObjectMapper mapper = new ObjectMapper();
//                        try {
//                            JsonNode root = mapper.readTree(resp);
//
//
//                            JsonNode transactionList = root.path("transactionList");
//                            String transactionStatus = null;
//                            System.out.println(":::::::::::::::TRLRLRLRLRLRLLR:::::::::::::::::::::");
//
//                            for (JsonNode transaction : transactionList) {
//                                transactionStatus = transaction.get("transactionStatus").asText();
//                                System.out.println("/////////////////" + transactionStatus + "/////////////////////");
//                                break;
//                            }
//
//                            if (transactionStatus == null) {
//                                userAdditionalFields.setFailedPayment(true);
//                                userAdditionalFields.setFirstTimePremium(false);
//                                userAdditionalFieldsRepository.save(userAdditionalFields);
//                                adminUserDTO.setFailedPayment(true);
//
//                                return adminUserDTO;
//                            }
//                            //TODO: SWITCH CASE ZA SVE TRANS STATUSE
//
//                            if (transactionStatus.equalsIgnoreCase("AP")) {
//
//                                userAdditionalFields.setExpiry(latestPayment.getPaymentDate().plus(Duration.ofDays(366)));
//                                latestPayment.setUsed(true);
//
//
//                                latestPayment.setPaymentDataJson(mapica.toString());
//
//                                adminUserDTO.setPaymentDataJson(mapica.toString());
//
//                                adminUserDTO.setFailedPayment(userAdditionalFields.getFailedPayment());
//
//
//                                paymentRepository.save(latestPayment);
//                                userAdditionalFields.setFailedPayment(false);
//                                userAdditionalFields.setFirstTimePremium(true);
//                                userAdditionalFieldsRepository.save(userAdditionalFields);
//                                adminUserDTO.setFirstTimePremium(userAdditionalFields.getFirstTimePremium());
//                                adminUserDTO.setHasPremium(true);
//
//
//                            } else {
//                                userAdditionalFields.setFailedPayment(true);
//                                userAdditionalFields.setFirstTimePremium(false);
//                                userAdditionalFieldsRepository.save(userAdditionalFields);
//                                adminUserDTO.setFailedPayment(true);
//
//
//                                return adminUserDTO;
//                            }
//                        } catch (Exception e) {
//                            e.printStackTrace();
//                        }
//                    }
//                }
//            }
//
//            return adminUserDTO;
//        } else {
//            throw new AccountResourceException("User could not be found");
//        }
//    }


    @PatchMapping("/ok-premium")
    public void okPremium() {
        Optional<User> user = userService.getUserWithAuthorities();
        if (user.isPresent()) {
            UserAdditionalFields uaf = userAdditionalFieldsService.findByUser(user.get());
            uaf.setFirstTimePremium(false);
            userAdditionalFieldsRepository.save(uaf);
        } else {
            throw new AccountResourceException("User could not be found");
        }
    }

    @PatchMapping("/ok-failed")
    public void okFailed() {
        Optional<User> user = userService.getUserWithAuthorities();
        if (user.isPresent()) {
            UserAdditionalFields uaf = userAdditionalFieldsService.findByUser(user.get());
            uaf.setFailedPayment(false);
            userAdditionalFieldsRepository.save(uaf);
        } else {
            throw new AccountResourceException("User could not be found");
        }
    }


    private Payment returnLatestPayment(List<Payment> paymentList) {
        Payment latestPayment = paymentList.get(0);
        for (Payment payment : paymentList) {
            if (payment.getPaymentDate().isAfter(latestPayment.getPaymentDate())) {
                latestPayment = payment;
            }
        }
        return latestPayment;
    }


//    @PostMapping("/payment/return/{token}")
//    public void paymentCallback(@PathVariable String token) {
//        Optional<UserAdditionalFields> optionalUserAdditionalFields = userAdditionalFieldsRepository.findByPaymentToken(token);
//
//        if (!optionalUserAdditionalFields.isPresent()) {
//            System.out.println("::::::::::::::::::::::::::::::ERROR - TOKEN NOT FOUND");
//            return;
//        }
//
//        UserAdditionalFields userAdditionalFields = optionalUserAdditionalFields.get();
//
//        //check if token has expired
//        if (isExpiryIn1Hour(userAdditionalFields.getPaymentTokenExpiry())) {
//            System.out.println("::::::::::::::::::::::::::::::ERROR - TOKEN EXPIRED");
//            return;
//        }
//
//        //set users TO PREMIUM
//        userAdditionalFields.setTrialExpired(false);
//        userAdditionalFields.setExpiry(Instant.now().plus(Duration.ofDays(365)));
//        userAdditionalFieldsRepository.save(userAdditionalFields);
//    }


    @Transactional
    @GetMapping("/get/payment-link")
    public String getPaymentLink() {
        Optional<User> user = userService.getUserWithAuthorities();

        if (!user.isPresent()) {
            throw new AccountResourceException("User could not be found");
        }
        UserAdditionalFields userAdditionalFields = userAdditionalFieldsService.findByUser(user.get());
        if (userAdditionalFields == null) {
            throw new AccountResourceException("User additional fields could not be found");
        }
        //check if user already has premium
        if (!isExpiryInNext7Days(userAdditionalFields.getExpiry())) {
            throw new AccountResourceException("You already have a premium account");
        }

        Payment payment = new Payment();
        payment.setPaymentDate(Instant.now().plus(Duration.ofHours(1)));
        payment.setUserAdditionalFields(userAdditionalFields);
        payment.setOrderId(new SimpleDateFormat("yyyyMMddHHmmss").format(Date.from(payment.getPaymentDate())));

        //Call ChipCard to get session
        String sessionToken = sendPaymentRequest(userAdditionalFields, payment.getOrderId());

        payment.setSessionToken(sessionToken);
        paymentRepository.save(payment);

        if (sessionToken == null) {
            return null;
        }


        return "https://test.merchantsafeunipay.com/chipcard/pay3d/" + sessionToken;

    }


    private String sendPaymentRequest(UserAdditionalFields userAdditionalFields, String paymentId) {
        //prepare payment transaction
        PaymentTransaction pt = new PaymentTransaction(userAdditionalFields);
        //send payment transaction
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);


        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.add("ACTION", pt.getSESSION_TOKEN());
        map.add("MERCHANTUSER", pt.getMerchantUser());
        map.add("MERCHANTPASSWORD", pt.getMerchantPassword());
        map.add("MERCHANT", pt.getMerchant());

        map.add("CUSTOMER", pt.getCustomer());
        map.add("AMOUNT", pt.getAmount());
        map.add("CURRENCY", pt.getCurrency());
        map.add("SESSIONTYPE", pt.getSessionType());
        map.add("CUSTOMEREMAIL", pt.getCustomerEmail());
        map.add("CUSTOMERNAME", pt.getCustomerName());
        map.add("CUSTOMERPHONE", pt.getCustomerPhone());
        map.add("RETURNURL", pt.getReturnUrl());
        map.add("SESSIONEXPIRY", pt.getSessionExpiry());

        map.add("ORDERITEMS[0].NAME", "Premium account");
        map.add("ORDERITEMS[0].DESCRIPTION", "1 year of daily quotes");
        map.add("ORDERITEMS[0].QUANTITY", "1");
        map.add("ORDERITEMS[0].AMOUNT", "2000.00");
        map.add("ORDERITEMS[0].CODE", "premium");

        map.add("MERCHANTPAYMENTID", paymentId);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(map, headers);
        String resp = restTemplate.postForObject("https://test.merchantsafeunipay.com/msu/api/v2", request, String.class);
        //  System.out.println("Response: " + resp); // Printing the entire response

        ObjectMapper mapper = new ObjectMapper();
        try {
            JsonNode root = mapper.readTree(resp);
            String sessionToken = root.path("sessionToken").asText();
            if (sessionToken == null || sessionToken.isEmpty()) {
                return null;
            }
            return sessionToken;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }


    }

    @PostMapping("/set/category")
    public List<Category> setCategories(@RequestBody List<Category> kategorije) {
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
     * @throws RuntimeException          {@code 500 (Internal Server Error)} if the user login wasn't found.
     */
    @PostMapping("/account")
    public void saveAccount(@Valid @RequestBody AdminUserDTO userDTO) {
        String userLogin = SecurityUtils.getCurrentUserLogin().orElseThrow(() -> new AccountResourceException("Current user login not found"));
        Optional<User> existingUser = userRepository.findOneByEmailIgnoreCase(userDTO.getEmail());
        if (existingUser.isPresent() && (!existingUser.get().getLogin().equalsIgnoreCase(userLogin))) {
            throw new EmailAlreadyUsedException();
        }
        Optional<User> user = userRepository.findOneByLogin(userLogin);
        if (!user.isPresent()) {
            throw new AccountResourceException("User could not be found");
        }
        userService.updateUser(userDTO.getFirstName(), userDTO.getLastName(), userDTO.getEmail(), userDTO.getLangKey(), userDTO.getImageUrl());
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


    @GetMapping("/reset-app")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @Transactional
    public void resetApp() {
        userQuoteRepository.deleteAll();
        quoteRepository.deleteAll();
        authorRepository.deleteAll();
        categoryRepository.deleteAll();
    }


    @GetMapping("/count-cat")
    public long count() {
        return quoteRepository.count();
    }

    @PostMapping(path = "/improt")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @Transactional
    public void appReset(@RequestParam("file") MultipartFile file) throws Exception {


        //   String excelFilePath = "quotes.xlsx";
        //        File folder = new File(".");
        //        File[] files = folder.listFiles();
        //        for (File file : files) {
        //            if (file.isFile()) {
        //                System.out.println(file.getName());
        //            }
        //        }
        // create a file input stream to read the Excel file
        // FileInputStream inputStream = new FileInputStream(new File(excelFilePath));

        // create a workbook object from the input stream
        Workbook workbook = WorkbookFactory.create(file.getInputStream());

        // get the first sheet of the workbook
        Sheet sheet = workbook.getSheetAt(0);

        Set<String> categoriesStrings = new HashSet<>();
        Set<String> authorStrings = new HashSet<>();
        List<QAC> qacList = new ArrayList<>();

        //Get Categories and Authors
        for (Row row : sheet) {
            if (row.getRowNum() == 0) continue;


            String quote = null;
            String strAuthor = null;
            String strCategory = null;

            try {
                quote = row.getCell(0).getStringCellValue().trim();
            } catch (Exception e) {
                continue;
            }
            try {
                strAuthor = row.getCell(1).getStringCellValue().trim();
            } catch (Exception e) {
                strAuthor = "unknown";
            }
            try {
                strCategory = row.getCell(2).getStringCellValue().trim();
            } catch (Exception e) {
                continue;
            }


            qacList.add(new QAC(quote, strAuthor, strCategory));

            authorStrings.add(strAuthor);
            categoriesStrings.add(strCategory);
        }

        List<Author> authors = new ArrayList<>();
        for (String authorS : authorStrings) {
            authors.add(new Author(authorS));
        }

        List<Category> categories = new ArrayList<>();
        for (String categoryS : categoriesStrings) {
            categories.add(new Category(categoryS));
        }


        userQuoteRepository.deleteAll();
        quoteRepository.deleteAll();
        authorRepository.deleteAll();
        categoryRepository.deleteAll();


        List<Author> authorList = authorRepository.saveAll(authors);
        List<Category> categoryList = categoryRepository.saveAll(categories);

        List<Quote> quoteList = new ArrayList<>();
        for (QAC qac : qacList) {
            if (qac.getQuote() == null || qac.getQuote().isEmpty()) {
                continue;
            }

            Quote quote = new Quote();

            if (qac.getQuote().length() > 250) {
                continue;
            } else {
                quote.setText(qac.getQuote());
            }

            if (quote.getText() == null) {
                quote.setText("Error :)");
            }
            quote.setAuthor(findAuthor(authorList, qac.getAuthor()));

            //da li vec postoji taj quote?
            boolean found = false;
            for (Quote q : quoteList) {
                if (q.getText().equals(qac.getQuote())) {
                    found = true;
                    break;
                }
            }
            if (found) continue;


            List<String> names = new ArrayList<>();

            for (QAC qac1 : qacList) {
                if (qac.getQuote().equals(qac1.getQuote())) {
                    names.add(qac1.getCategory());
                }
            }

            quote.setCategories(findCategory(categoryList, names));
            quoteList.add(quote);
        }

        List<Quote> quotes = quoteRepository.saveAll(quoteList);

        // close the workbook and input stream
        workbook.close();
    }

    private Author findAuthor(List<Author> authorList, String name) {
        for (Author author : authorList) {
            if (author.getName().equals(name)) {
                return author;
            }
        }
        return null;
    }

    private Set<Category> findCategory(List<Category> categoryList, List<String> names) {
        Set<Category> categories = new HashSet<>();
        for (Category category : categoryList) {
            for (String name : names) {
                if (category.getName().equals(name)) {
                    categories.add(category);
                    continue;
                }
            }
        }
        return categories;
    }

    /**
     * {@code POST   /account/reset-password/init} : Send an email to reset the password of the user.
     *
     * @param mail the mail of the user.
     */
    @PostMapping(path = "/account/reset-password/init")
    public void requestPasswordReset(@RequestBody EmailDTO mail) {
        System.out.println(mail.getEmail());
        Optional<User> user = userService.requestPasswordReset(mail.getEmail());
        if (user.isPresent()) {
            mailService.sendPasswordResetMail(user.get());
        } else {
            log.warn("Password reset requested for non existing mail");
        }
    }


    /**
     * {@code POST   /account/reset-password/finish} : Finish to reset the password of the user.
     *
     * @param keyAndPassword the generated key and the new password.
     * @throws InvalidPasswordException {@code 400 (Bad Request)} if the password is incorrect.
     * @throws RuntimeException         {@code 500 (Internal Server Error)} if the password could not be reset.
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
        return (StringUtils.isEmpty(password) || password.length() < ManagedUserVM.PASSWORD_MIN_LENGTH || password.length() > ManagedUserVM.PASSWORD_MAX_LENGTH);
    }

    public boolean isExpiryInNext7Days(Instant expiry) {
        if (expiry == null) {
            return true;
        }
        Instant now = Instant.now();
        Instant sevenDaysFromNow = now.plus(Duration.ofDays(7));
        return !expiry.isBefore(now) && expiry.isBefore(sevenDaysFromNow);
    }

    public boolean isExpiryIn1Hour(Instant expiry) {
        if (expiry == null) {
            return false;
        }
        Instant now = Instant.now();
        Instant sevenDaysFromNow = now.plus(Duration.ofHours(1));
        return !expiry.isBefore(now) && expiry.isBefore(sevenDaysFromNow);
    }
}

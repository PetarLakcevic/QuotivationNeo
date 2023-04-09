package pws.quo.service.impl;

import java.time.Instant;
import java.util.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pws.quo.domain.*;
import pws.quo.repository.QuoteRepository;
import pws.quo.repository.UserAdditionalFieldsRepository;
import pws.quo.repository.UserQuoteRepository;
import pws.quo.service.UserAdditionalFieldsService;

/**
 * Service Implementation for managing {@link UserAdditionalFields}.
 */
@Service
@Transactional
public class UserAdditionalFieldsServiceImpl implements UserAdditionalFieldsService {

    private final Logger log = LoggerFactory.getLogger(UserAdditionalFieldsServiceImpl.class);

    private final UserAdditionalFieldsRepository userAdditionalFieldsRepository;

    private final UserQuoteRepository userQuoteRepository;

    private final QuoteRepository quoteRepository;

    public UserAdditionalFieldsServiceImpl(
        UserAdditionalFieldsRepository userAdditionalFieldsRepository,
        UserQuoteRepository userQuoteRepository,
        QuoteRepository quoteRepository
    ) {
        this.userAdditionalFieldsRepository = userAdditionalFieldsRepository;
        this.userQuoteRepository = userQuoteRepository;
        this.quoteRepository = quoteRepository;
    }

    @Override
    public UserAdditionalFields save(UserAdditionalFields userAdditionalFields) {
        log.debug("Request to save UserAdditionalFields : {}", userAdditionalFields);
        return userAdditionalFieldsRepository.save(userAdditionalFields);
    }

    @Override
    public UserAdditionalFields update(UserAdditionalFields userAdditionalFields) {
        log.debug("Request to update UserAdditionalFields : {}", userAdditionalFields);
        return userAdditionalFieldsRepository.save(userAdditionalFields);
    }

    @Override
    public Optional<UserAdditionalFields> partialUpdate(UserAdditionalFields userAdditionalFields) {
        log.debug("Request to partially update UserAdditionalFields : {}", userAdditionalFields);

        return userAdditionalFieldsRepository
            .findById(userAdditionalFields.getId())
            .map(existingUserAdditionalFields -> {
                if (userAdditionalFields.getExpiry() != null) {
                    existingUserAdditionalFields.setExpiry(userAdditionalFields.getExpiry());
                }
                if (userAdditionalFields.getRegistrationDate() != null) {
                    existingUserAdditionalFields.setRegistrationDate(userAdditionalFields.getRegistrationDate());
                }
                if (userAdditionalFields.getThemePicture() != null) {
                    existingUserAdditionalFields.setThemePicture(userAdditionalFields.getThemePicture());
                }

                return existingUserAdditionalFields;
            })
            .map(userAdditionalFieldsRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<UserAdditionalFields> findAll(Pageable pageable) {
        log.debug("Request to get all UserAdditionalFields");
        return userAdditionalFieldsRepository.findAll(pageable);
    }

    public Page<UserAdditionalFields> findAllWithEagerRelationships(Pageable pageable) {
        return userAdditionalFieldsRepository.findAllWithEagerRelationships(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<UserAdditionalFields> findOne(Long id) {
        log.debug("Request to get UserAdditionalFields : {}", id);
        return userAdditionalFieldsRepository.findOneWithEagerRelationships(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete UserAdditionalFields : {}", id);
        userAdditionalFieldsRepository.deleteById(id);
    }

    @Override
    public UserAdditionalFields findByUser(User user) {
        Optional<UserAdditionalFields> optional = userAdditionalFieldsRepository.findByInternalUserId(user.getId());
        if (optional.isPresent()) {
            return optional.get();
        } else {
            return null;
        }
    }

    @Override
    public List<Category> getCategoriesForUser(User user) {
        UserAdditionalFields uaf = findByUser(user);
        if (uaf == null) {
            throw new RuntimeException("User could not be found");
        }
        return new LinkedList<>(uaf.getCategories());
    }

    @Override
    public UserAdditionalFields saveNewTheme(User user, int id) {
        UserAdditionalFields uaf = findByUser(user);
        if (uaf == null) {
            throw new RuntimeException("User could not be found");
        }
        uaf.setThemePicture(id);
        return userAdditionalFieldsRepository.save(uaf);
    }

    @Transactional
    @Override
    public List<Category> saveCategoriesForUser(List<Category> categories, User user) {
        UserAdditionalFields uaf = findByUser(user);
        if (uaf == null) {
            throw new RuntimeException("User could not be found");
        }
        Set<Category> categorySet = new HashSet<>(categories);
        uaf.setCategories(categorySet);
        UserAdditionalFields saved = userAdditionalFieldsRepository.save(uaf);

        //TODO CHANGE
        //Generate first quote for the user
        List<Quote> quotesByCategories = quoteRepository.findByCategoriesIn(categorySet);
        List<UserQuote> userQuotesByMe = userQuoteRepository.findByUserId(user.getId());

        List<Quote> quotesByMe = new LinkedList<>();

        for (UserQuote userQuote : userQuotesByMe) {
            quotesByMe.add(userQuote.getQuote());
        }

        List<Quote> poolQuote = new LinkedList<>();
        //Find which quotes from my categories I have not yet seen
        for (Quote q1 : quotesByCategories) {
            boolean add = true;
            for (Quote q2 : quotesByMe) {
                if (q1.getId().equals(q2.getId())) {
                    add = false;
                    break;
                }
            }
            if (add) poolQuote.add(q1);
        }

        int size = poolQuote.size();
        //Nema vise quotova

        if (size == 0) {
            return new LinkedList<>(saved.getCategories());
        }

        Random random = new Random();
        int randomIndex = random.nextInt(size);

        Quote quote = poolQuote.get(randomIndex);

        UserQuote uq = new UserQuote();
        uq.setUser(user);
        uq.setQuote(quote);
        uq.setTime(Instant.now());
        uq.setFavourite(false);

        userQuoteRepository.save(uq);

        return new LinkedList<>(saved.getCategories());
    }
}

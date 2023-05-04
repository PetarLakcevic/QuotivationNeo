package pws.quo.service.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pws.quo.domain.*;
import pws.quo.repository.QuoteRepository;
import pws.quo.repository.UserAdditionalFieldsRepository;
import pws.quo.repository.UserQuoteRepository;
import pws.quo.repository.UserRepository;
import pws.quo.service.UserQuoteService;

import java.time.Instant;
import java.util.*;

/**
 * Service Implementation for managing {@link UserQuote}.
 */
@Service
@Transactional
public class UserQuoteServiceImpl implements UserQuoteService {

    private final Logger log = LoggerFactory.getLogger(UserQuoteServiceImpl.class);

    private final UserQuoteRepository userQuoteRepository;

    private final UserRepository userRepository;

    private final QuoteRepository quoteRepository;

    private final UserAdditionalFieldsRepository userAdditionalFieldsRepository;

    public UserQuoteServiceImpl(UserQuoteRepository userQuoteRepository, UserRepository userRepository, QuoteRepository quoteRepository, UserAdditionalFieldsRepository userAdditionalFieldsRepository) {
        this.userQuoteRepository = userQuoteRepository;
        this.userRepository = userRepository;
        this.quoteRepository = quoteRepository;
        this.userAdditionalFieldsRepository = userAdditionalFieldsRepository;
    }

    @Override
    public UserQuote save(UserQuote userQuote) {
        log.debug("Request to save UserQuote : {}", userQuote);
        return userQuoteRepository.save(userQuote);
    }

    @Override
    public UserQuote update(UserQuote userQuote) {
        log.debug("Request to update UserQuote : {}", userQuote);
        return userQuoteRepository.save(userQuote);
    }

    @Override
    public Optional<UserQuote> partialUpdate(UserQuote userQuote) {
        log.debug("Request to partially update UserQuote : {}", userQuote);

        return userQuoteRepository
            .findById(userQuote.getId())
            .map(existingUserQuote -> {
                if (userQuote.getFavourite() != null) {
                    existingUserQuote.setFavourite(userQuote.getFavourite());
                }
                if (userQuote.getTime() != null) {
                    existingUserQuote.setTime(userQuote.getTime());
                }

                return existingUserQuote;
            })
            .map(userQuoteRepository::save);
    }

    @Scheduled(cron = "0 0 9 * * *")
    @Scheduled(cron = "0 0 18 * * *")
    public void generateNewLineOfQuotes() {
        List<UserAdditionalFields> userAdditionalFields = userAdditionalFieldsRepository.findAll();
        List<UserQuote> userQuoteList = userQuoteRepository.findAll();

        List<UserQuote> newQuotes = new ArrayList<>();

        for (UserAdditionalFields uaf : userAdditionalFields) {
            Quote newQuote = null;
            List<Quote> myQuotes = findMyQuotes(uaf.getInternalUser(), userQuoteList);
            Set<Category> myCategories = uaf.getCategories();
            List<Quote> quotesByCategories = quoteRepository.findByCategoriesIn(myCategories);

            Collections.shuffle(quotesByCategories);

            for (Quote quote : quotesByCategories) {
                if (!myQuotes.contains(quote)) {
                    newQuote = quote;
                    break;
                }
            }

            if(newQuote != null){
                UserQuote uq = new UserQuote();
                uq.setUser(uaf.getInternalUser());
                uq.setQuote(newQuote);
                uq.setTime(Instant.now());
                uq.setFavourite(false);
                newQuotes.add(uq);
            }

        }

        userQuoteRepository.saveAll(newQuotes);

    }


    private List<Quote> findMyQuotes(User user, List<UserQuote> userQuoteList) {
        if(user==null){
            return new ArrayList<>();
        }
        List<Quote> list = new ArrayList<>();
        for (UserQuote uq : userQuoteList) {
            if (uq.getUser().getId().equals(user.getId())) {
                list.add(uq.getQuote());
            }
        }
        return list;
    }

    @Override
    @Transactional(readOnly = true)
    public Page<UserQuote> findAll(Pageable pageable) {
        log.debug("Request to get all UserQuotes");
        return userQuoteRepository.findAll(pageable);
    }

    public Page<UserQuote> findAllWithEagerRelationships(Pageable pageable) {
        return userQuoteRepository.findAllWithEagerRelationships(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<UserQuote> findOne(Long id) {
        log.debug("Request to get UserQuote : {}", id);
        return userQuoteRepository.findOneWithEagerRelationships(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete UserQuote : {}", id);
        userQuoteRepository.deleteById(id);
    }

    @Override
    public List<Quote> findQuotesForUser(User user) {
        List<UserQuote> userQuoteList = userQuoteRepository.findByUserIdOrderByTimeDesc(user.getId());
        List<Quote> quoteList = new LinkedList<>();

        for (UserQuote uq : userQuoteList) {
            quoteList.add(uq.getQuote());
        }

        return quoteList;
    }

    @Override
    public Quote findLastQuote(User user) {
        UserQuote userQuote = userQuoteRepository.findTopByUserIdOrderByTimeDesc(user.getId());
        return userQuote.getQuote();
    }
}

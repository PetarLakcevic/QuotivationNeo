package pws.quo.service.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pws.quo.domain.Quote;
import pws.quo.domain.User;
import pws.quo.domain.UserQuote;
import pws.quo.repository.QuoteRepository;
import pws.quo.repository.UserQuoteRepository;
import pws.quo.repository.UserRepository;
import pws.quo.service.UserQuoteService;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

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

    public UserQuoteServiceImpl(UserQuoteRepository userQuoteRepository, UserRepository userRepository, QuoteRepository quoteRepository) {
        this.userQuoteRepository = userQuoteRepository;
        this.userRepository = userRepository;
        this.quoteRepository = quoteRepository;
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

    @Scheduled(cron = "0 0 1 * * ?")
    public void generateNewLineOfQuotes() {
        List<User> userList = userRepository.findAll();
        List<UserQuote> userQuoteList = userQuoteRepository.findAll();
        List<Quote> quoteList = quoteRepository.findAll();


        for (User user : userList) {
            



        }


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

package pws.quo.service.impl;

import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pws.quo.domain.Quote;
import pws.quo.repository.QuoteRepository;
import pws.quo.service.QuoteService;

/**
 * Service Implementation for managing {@link Quote}.
 */
@Service
@Transactional
public class QuoteServiceImpl implements QuoteService {

    private final Logger log = LoggerFactory.getLogger(QuoteServiceImpl.class);

    private final QuoteRepository quoteRepository;

    public QuoteServiceImpl(QuoteRepository quoteRepository) {
        this.quoteRepository = quoteRepository;
    }

    @Override
    public Quote save(Quote quote) {
        log.debug("Request to save Quote : {}", quote);
        return quoteRepository.save(quote);
    }

    @Override
    public Quote update(Quote quote) {
        log.debug("Request to update Quote : {}", quote);
        return quoteRepository.save(quote);
    }

    @Override
    public Optional<Quote> partialUpdate(Quote quote) {
        log.debug("Request to partially update Quote : {}", quote);

        return quoteRepository
            .findById(quote.getId())
            .map(existingQuote -> {
                if (quote.getText() != null) {
                    existingQuote.setText(quote.getText());
                }

                return existingQuote;
            })
            .map(quoteRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Quote> findAll(Pageable pageable) {
        log.debug("Request to get all Quotes");
        return quoteRepository.findAll(pageable);
    }

    public Page<Quote> findAllWithEagerRelationships(Pageable pageable) {
        return quoteRepository.findAllWithEagerRelationships(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Quote> findOne(Long id) {
        log.debug("Request to get Quote : {}", id);
        return quoteRepository.findOneWithEagerRelationships(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Quote : {}", id);
        quoteRepository.deleteById(id);
    }

    @Override
    public List<Quote> findAllQuotes() {
        return quoteRepository.findAll();
    }
}

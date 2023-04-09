package pws.quo.service.impl;

import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pws.quo.domain.QuoteSuggestion;
import pws.quo.repository.QuoteSuggestionRepository;
import pws.quo.service.QuoteSuggestionService;

/**
 * Service Implementation for managing {@link QuoteSuggestion}.
 */
@Service
@Transactional
public class QuoteSuggestionServiceImpl implements QuoteSuggestionService {

    private final Logger log = LoggerFactory.getLogger(QuoteSuggestionServiceImpl.class);

    private final QuoteSuggestionRepository quoteSuggestionRepository;

    public QuoteSuggestionServiceImpl(QuoteSuggestionRepository quoteSuggestionRepository) {
        this.quoteSuggestionRepository = quoteSuggestionRepository;
    }

    @Override
    public QuoteSuggestion save(QuoteSuggestion quoteSuggestion) {
        log.debug("Request to save QuoteSuggestion : {}", quoteSuggestion);
        return quoteSuggestionRepository.save(quoteSuggestion);
    }

    @Override
    public QuoteSuggestion update(QuoteSuggestion quoteSuggestion) {
        log.debug("Request to update QuoteSuggestion : {}", quoteSuggestion);
        return quoteSuggestionRepository.save(quoteSuggestion);
    }

    @Override
    public Optional<QuoteSuggestion> partialUpdate(QuoteSuggestion quoteSuggestion) {
        log.debug("Request to partially update QuoteSuggestion : {}", quoteSuggestion);

        return quoteSuggestionRepository
            .findById(quoteSuggestion.getId())
            .map(existingQuoteSuggestion -> {
                if (quoteSuggestion.getAuthor() != null) {
                    existingQuoteSuggestion.setAuthor(quoteSuggestion.getAuthor());
                }
                if (quoteSuggestion.getText() != null) {
                    existingQuoteSuggestion.setText(quoteSuggestion.getText());
                }

                return existingQuoteSuggestion;
            })
            .map(quoteSuggestionRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<QuoteSuggestion> findAll(Pageable pageable) {
        log.debug("Request to get all QuoteSuggestions");
        return quoteSuggestionRepository.findAll(pageable);
    }

    public Page<QuoteSuggestion> findAllWithEagerRelationships(Pageable pageable) {
        return quoteSuggestionRepository.findAllWithEagerRelationships(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<QuoteSuggestion> findOne(Long id) {
        log.debug("Request to get QuoteSuggestion : {}", id);
        return quoteSuggestionRepository.findOneWithEagerRelationships(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete QuoteSuggestion : {}", id);
        quoteSuggestionRepository.deleteById(id);
    }
}

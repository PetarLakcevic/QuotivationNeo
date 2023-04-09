package pws.quo.service;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import pws.quo.domain.QuoteSuggestion;

/**
 * Service Interface for managing {@link QuoteSuggestion}.
 */
public interface QuoteSuggestionService {
    /**
     * Save a quoteSuggestion.
     *
     * @param quoteSuggestion the entity to save.
     * @return the persisted entity.
     */
    QuoteSuggestion save(QuoteSuggestion quoteSuggestion);

    /**
     * Updates a quoteSuggestion.
     *
     * @param quoteSuggestion the entity to update.
     * @return the persisted entity.
     */
    QuoteSuggestion update(QuoteSuggestion quoteSuggestion);

    /**
     * Partially updates a quoteSuggestion.
     *
     * @param quoteSuggestion the entity to update partially.
     * @return the persisted entity.
     */
    Optional<QuoteSuggestion> partialUpdate(QuoteSuggestion quoteSuggestion);

    /**
     * Get all the quoteSuggestions.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<QuoteSuggestion> findAll(Pageable pageable);

    /**
     * Get all the quoteSuggestions with eager load of many-to-many relationships.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<QuoteSuggestion> findAllWithEagerRelationships(Pageable pageable);

    /**
     * Get the "id" quoteSuggestion.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<QuoteSuggestion> findOne(Long id);

    /**
     * Delete the "id" quoteSuggestion.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}

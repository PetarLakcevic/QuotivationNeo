package pws.quo.service;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import pws.quo.domain.Quote;

/**
 * Service Interface for managing {@link Quote}.
 */
public interface QuoteService {
    /**
     * Save a quote.
     *
     * @param quote the entity to save.
     * @return the persisted entity.
     */
    Quote save(Quote quote);

    /**
     * Updates a quote.
     *
     * @param quote the entity to update.
     * @return the persisted entity.
     */
    Quote update(Quote quote);

    /**
     * Partially updates a quote.
     *
     * @param quote the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Quote> partialUpdate(Quote quote);

    /**
     * Get all the quotes.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Quote> findAll(Pageable pageable);

    /**
     * Get all the quotes with eager load of many-to-many relationships.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Quote> findAllWithEagerRelationships(Pageable pageable);

    /**
     * Get the "id" quote.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Quote> findOne(Long id);

    /**
     * Delete the "id" quote.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    List<Quote> findAllQuotes();
}

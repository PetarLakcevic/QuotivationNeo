package pws.quo.service;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import pws.quo.domain.Quote;
import pws.quo.domain.User;
import pws.quo.domain.UserQuote;

/**
 * Service Interface for managing {@link UserQuote}.
 */
public interface UserQuoteService {
    /**
     * Save a userQuote.
     *
     * @param userQuote the entity to save.
     * @return the persisted entity.
     */
    UserQuote save(UserQuote userQuote);

    /**
     * Updates a userQuote.
     *
     * @param userQuote the entity to update.
     * @return the persisted entity.
     */
    UserQuote update(UserQuote userQuote);

    /**
     * Partially updates a userQuote.
     *
     * @param userQuote the entity to update partially.
     * @return the persisted entity.
     */
    Optional<UserQuote> partialUpdate(UserQuote userQuote);

    /**
     * Get all the userQuotes.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<UserQuote> findAll(Pageable pageable);

    /**
     * Get all the userQuotes with eager load of many-to-many relationships.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<UserQuote> findAllWithEagerRelationships(Pageable pageable);

    /**
     * Get the "id" userQuote.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<UserQuote> findOne(Long id);

    /**
     * Delete the "id" userQuote.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    Quote findLastQuote(User user);

    List<Quote> findQuotesForUser(User user);

    void generateNewLineOfQuotes();
}

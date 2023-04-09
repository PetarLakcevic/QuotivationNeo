package pws.quo.service;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import pws.quo.domain.Category;
import pws.quo.domain.User;
import pws.quo.domain.UserAdditionalFields;

/**
 * Service Interface for managing {@link UserAdditionalFields}.
 */
public interface UserAdditionalFieldsService {
    /**
     * Save a userAdditionalFields.
     *
     * @param userAdditionalFields the entity to save.
     * @return the persisted entity.
     */
    UserAdditionalFields save(UserAdditionalFields userAdditionalFields);

    /**
     * Updates a userAdditionalFields.
     *
     * @param userAdditionalFields the entity to update.
     * @return the persisted entity.
     */
    UserAdditionalFields update(UserAdditionalFields userAdditionalFields);

    /**
     * Partially updates a userAdditionalFields.
     *
     * @param userAdditionalFields the entity to update partially.
     * @return the persisted entity.
     */
    Optional<UserAdditionalFields> partialUpdate(UserAdditionalFields userAdditionalFields);

    /**
     * Get all the userAdditionalFields.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<UserAdditionalFields> findAll(Pageable pageable);

    /**
     * Get all the userAdditionalFields with eager load of many-to-many relationships.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<UserAdditionalFields> findAllWithEagerRelationships(Pageable pageable);

    /**
     * Get the "id" userAdditionalFields.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<UserAdditionalFields> findOne(Long id);

    /**
     * Delete the "id" userAdditionalFields.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    UserAdditionalFields findByUser(User user);

    List<Category> getCategoriesForUser(User user);

    UserAdditionalFields saveNewTheme(User user, int id);

    List<Category> saveCategoriesForUser(List<Category> kategorije, User user);
}

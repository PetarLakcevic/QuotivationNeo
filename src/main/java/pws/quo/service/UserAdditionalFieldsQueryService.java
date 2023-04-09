package pws.quo.service;

import java.util.List;
import javax.persistence.criteria.JoinType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pws.quo.domain.*; // for static metamodels
import pws.quo.domain.UserAdditionalFields;
import pws.quo.repository.UserAdditionalFieldsRepository;
import pws.quo.service.criteria.UserAdditionalFieldsCriteria;
import tech.jhipster.service.QueryService;

/**
 * Service for executing complex queries for {@link UserAdditionalFields} entities in the database.
 * The main input is a {@link UserAdditionalFieldsCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link UserAdditionalFields} or a {@link Page} of {@link UserAdditionalFields} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class UserAdditionalFieldsQueryService extends QueryService<UserAdditionalFields> {

    private final Logger log = LoggerFactory.getLogger(UserAdditionalFieldsQueryService.class);

    private final UserAdditionalFieldsRepository userAdditionalFieldsRepository;

    public UserAdditionalFieldsQueryService(UserAdditionalFieldsRepository userAdditionalFieldsRepository) {
        this.userAdditionalFieldsRepository = userAdditionalFieldsRepository;
    }

    /**
     * Return a {@link List} of {@link UserAdditionalFields} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<UserAdditionalFields> findByCriteria(UserAdditionalFieldsCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<UserAdditionalFields> specification = createSpecification(criteria);
        return userAdditionalFieldsRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link UserAdditionalFields} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<UserAdditionalFields> findByCriteria(UserAdditionalFieldsCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<UserAdditionalFields> specification = createSpecification(criteria);
        return userAdditionalFieldsRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(UserAdditionalFieldsCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<UserAdditionalFields> specification = createSpecification(criteria);
        return userAdditionalFieldsRepository.count(specification);
    }

    /**
     * Function to convert {@link UserAdditionalFieldsCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<UserAdditionalFields> createSpecification(UserAdditionalFieldsCriteria criteria) {
        Specification<UserAdditionalFields> specification = Specification.where(null);
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            if (criteria.getDistinct() != null) {
                specification = specification.and(distinct(criteria.getDistinct()));
            }
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), UserAdditionalFields_.id));
            }
            if (criteria.getExpiry() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getExpiry(), UserAdditionalFields_.expiry));
            }
            if (criteria.getRegistrationDate() != null) {
                specification =
                    specification.and(buildRangeSpecification(criteria.getRegistrationDate(), UserAdditionalFields_.registrationDate));
            }
            if (criteria.getThemePicture() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getThemePicture(), UserAdditionalFields_.themePicture));
            }
            if (criteria.getInternalUserId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getInternalUserId(),
                            root -> root.join(UserAdditionalFields_.internalUser, JoinType.LEFT).get(User_.id)
                        )
                    );
            }
            if (criteria.getCategoryId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getCategoryId(),
                            root -> root.join(UserAdditionalFields_.categories, JoinType.LEFT).get(Category_.id)
                        )
                    );
            }
            if (criteria.getPaymentsId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getPaymentsId(),
                            root -> root.join(UserAdditionalFields_.payments, JoinType.LEFT).get(Payment_.id)
                        )
                    );
            }
        }
        return specification;
    }
}

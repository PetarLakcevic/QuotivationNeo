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
import pws.quo.domain.UserQuote;
import pws.quo.repository.UserQuoteRepository;
import pws.quo.service.criteria.UserQuoteCriteria;
import tech.jhipster.service.QueryService;

/**
 * Service for executing complex queries for {@link UserQuote} entities in the database.
 * The main input is a {@link UserQuoteCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link UserQuote} or a {@link Page} of {@link UserQuote} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class UserQuoteQueryService extends QueryService<UserQuote> {

    private final Logger log = LoggerFactory.getLogger(UserQuoteQueryService.class);

    private final UserQuoteRepository userQuoteRepository;

    public UserQuoteQueryService(UserQuoteRepository userQuoteRepository) {
        this.userQuoteRepository = userQuoteRepository;
    }

    /**
     * Return a {@link List} of {@link UserQuote} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<UserQuote> findByCriteria(UserQuoteCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<UserQuote> specification = createSpecification(criteria);
        return userQuoteRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link UserQuote} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<UserQuote> findByCriteria(UserQuoteCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<UserQuote> specification = createSpecification(criteria);
        return userQuoteRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(UserQuoteCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<UserQuote> specification = createSpecification(criteria);
        return userQuoteRepository.count(specification);
    }

    /**
     * Function to convert {@link UserQuoteCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<UserQuote> createSpecification(UserQuoteCriteria criteria) {
        Specification<UserQuote> specification = Specification.where(null);
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            if (criteria.getDistinct() != null) {
                specification = specification.and(distinct(criteria.getDistinct()));
            }
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), UserQuote_.id));
            }
            if (criteria.getFavourite() != null) {
                specification = specification.and(buildSpecification(criteria.getFavourite(), UserQuote_.favourite));
            }
            if (criteria.getTime() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getTime(), UserQuote_.time));
            }
            if (criteria.getUserId() != null) {
                specification =
                    specification.and(
                        buildSpecification(criteria.getUserId(), root -> root.join(UserQuote_.user, JoinType.LEFT).get(User_.id))
                    );
            }
            if (criteria.getQuoteId() != null) {
                specification =
                    specification.and(
                        buildSpecification(criteria.getQuoteId(), root -> root.join(UserQuote_.quote, JoinType.LEFT).get(Quote_.id))
                    );
            }
        }
        return specification;
    }
}

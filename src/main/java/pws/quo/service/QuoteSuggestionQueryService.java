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
import pws.quo.domain.QuoteSuggestion;
import pws.quo.repository.QuoteSuggestionRepository;
import pws.quo.service.criteria.QuoteSuggestionCriteria;
import tech.jhipster.service.QueryService;

/**
 * Service for executing complex queries for {@link QuoteSuggestion} entities in the database.
 * The main input is a {@link QuoteSuggestionCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link QuoteSuggestion} or a {@link Page} of {@link QuoteSuggestion} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class QuoteSuggestionQueryService extends QueryService<QuoteSuggestion> {

    private final Logger log = LoggerFactory.getLogger(QuoteSuggestionQueryService.class);

    private final QuoteSuggestionRepository quoteSuggestionRepository;

    public QuoteSuggestionQueryService(QuoteSuggestionRepository quoteSuggestionRepository) {
        this.quoteSuggestionRepository = quoteSuggestionRepository;
    }

    /**
     * Return a {@link List} of {@link QuoteSuggestion} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<QuoteSuggestion> findByCriteria(QuoteSuggestionCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<QuoteSuggestion> specification = createSpecification(criteria);
        return quoteSuggestionRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link QuoteSuggestion} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<QuoteSuggestion> findByCriteria(QuoteSuggestionCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<QuoteSuggestion> specification = createSpecification(criteria);
        return quoteSuggestionRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(QuoteSuggestionCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<QuoteSuggestion> specification = createSpecification(criteria);
        return quoteSuggestionRepository.count(specification);
    }

    /**
     * Function to convert {@link QuoteSuggestionCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<QuoteSuggestion> createSpecification(QuoteSuggestionCriteria criteria) {
        Specification<QuoteSuggestion> specification = Specification.where(null);
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            if (criteria.getDistinct() != null) {
                specification = specification.and(distinct(criteria.getDistinct()));
            }
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), QuoteSuggestion_.id));
            }
            if (criteria.getAuthor() != null) {
                specification = specification.and(buildStringSpecification(criteria.getAuthor(), QuoteSuggestion_.author));
            }
            if (criteria.getText() != null) {
                specification = specification.and(buildStringSpecification(criteria.getText(), QuoteSuggestion_.text));
            }
            if (criteria.getUserId() != null) {
                specification =
                    specification.and(
                        buildSpecification(criteria.getUserId(), root -> root.join(QuoteSuggestion_.user, JoinType.LEFT).get(User_.id))
                    );
            }
        }
        return specification;
    }
}

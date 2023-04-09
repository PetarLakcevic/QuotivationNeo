package pws.quo.repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pws.quo.domain.Category;
import pws.quo.domain.Quote;

/**
 * Spring Data JPA repository for the Quote entity.
 *
 * When extending this class, extend QuoteRepositoryWithBagRelationships too.
 * For more information refer to https://github.com/jhipster/generator-jhipster/issues/17990.
 */
@Repository
public interface QuoteRepository extends QuoteRepositoryWithBagRelationships, JpaRepository<Quote, Long>, JpaSpecificationExecutor<Quote> {
    default Optional<Quote> findOneWithEagerRelationships(Long id) {
        return this.fetchBagRelationships(this.findOneWithToOneRelationships(id));
    }

    default List<Quote> findAllWithEagerRelationships() {
        return this.fetchBagRelationships(this.findAllWithToOneRelationships());
    }

    default Page<Quote> findAllWithEagerRelationships(Pageable pageable) {
        return this.fetchBagRelationships(this.findAllWithToOneRelationships(pageable));
    }

    @Query(
        value = "select distinct quote from Quote quote left join fetch quote.author",
        countQuery = "select count(distinct quote) from Quote quote"
    )
    Page<Quote> findAllWithToOneRelationships(Pageable pageable);

    @Query("select distinct quote from Quote quote left join fetch quote.author")
    List<Quote> findAllWithToOneRelationships();

    @Query("select quote from Quote quote left join fetch quote.author where quote.id =:id")
    Optional<Quote> findOneWithToOneRelationships(@Param("id") Long id);

    List<Quote> findByCategoriesIn(Set<Category> categorySet);
}

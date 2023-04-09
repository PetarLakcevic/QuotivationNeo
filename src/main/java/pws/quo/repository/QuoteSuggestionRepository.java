package pws.quo.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pws.quo.domain.QuoteSuggestion;

/**
 * Spring Data JPA repository for the QuoteSuggestion entity.
 */
@Repository
public interface QuoteSuggestionRepository extends JpaRepository<QuoteSuggestion, Long>, JpaSpecificationExecutor<QuoteSuggestion> {
    @Query("select quoteSuggestion from QuoteSuggestion quoteSuggestion where quoteSuggestion.user.login = ?#{principal.username}")
    List<QuoteSuggestion> findByUserIsCurrentUser();

    default Optional<QuoteSuggestion> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<QuoteSuggestion> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<QuoteSuggestion> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct quoteSuggestion from QuoteSuggestion quoteSuggestion left join fetch quoteSuggestion.user",
        countQuery = "select count(distinct quoteSuggestion) from QuoteSuggestion quoteSuggestion"
    )
    Page<QuoteSuggestion> findAllWithToOneRelationships(Pageable pageable);

    @Query("select distinct quoteSuggestion from QuoteSuggestion quoteSuggestion left join fetch quoteSuggestion.user")
    List<QuoteSuggestion> findAllWithToOneRelationships();

    @Query("select quoteSuggestion from QuoteSuggestion quoteSuggestion left join fetch quoteSuggestion.user where quoteSuggestion.id =:id")
    Optional<QuoteSuggestion> findOneWithToOneRelationships(@Param("id") Long id);
}

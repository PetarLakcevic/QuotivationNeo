package pws.quo.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pws.quo.domain.UserQuote;

/**
 * Spring Data JPA repository for the UserQuote entity.
 */
@Repository
public interface UserQuoteRepository extends JpaRepository<UserQuote, Long>, JpaSpecificationExecutor<UserQuote> {
    @Query("select userQuote from UserQuote userQuote where userQuote.user.login = ?#{principal.username}")
    List<UserQuote> findByUserIsCurrentUser();

    default Optional<UserQuote> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<UserQuote> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<UserQuote> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct userQuote from UserQuote userQuote left join fetch userQuote.user",
        countQuery = "select count(distinct userQuote) from UserQuote userQuote"
    )
    Page<UserQuote> findAllWithToOneRelationships(Pageable pageable);

    @Query("select distinct userQuote from UserQuote userQuote left join fetch userQuote.user")
    List<UserQuote> findAllWithToOneRelationships();

    @Query("select userQuote from UserQuote userQuote left join fetch userQuote.user where userQuote.id =:id")
    Optional<UserQuote> findOneWithToOneRelationships(@Param("id") Long id);

    List<UserQuote> findByUserIdOrderByTimeDesc(Long id);

    UserQuote findTopByUserIdOrderByTimeDesc(Long id);

    List<UserQuote> findByUserId(Long id);
}

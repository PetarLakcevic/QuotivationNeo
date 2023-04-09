package pws.quo.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pws.quo.domain.UserAdditionalFields;

/**
 * Spring Data JPA repository for the UserAdditionalFields entity.
 *
 * When extending this class, extend UserAdditionalFieldsRepositoryWithBagRelationships too.
 * For more information refer to https://github.com/jhipster/generator-jhipster/issues/17990.
 */
@Repository
public interface UserAdditionalFieldsRepository
    extends
        UserAdditionalFieldsRepositoryWithBagRelationships,
        JpaRepository<UserAdditionalFields, Long>,
        JpaSpecificationExecutor<UserAdditionalFields> {
    default Optional<UserAdditionalFields> findOneWithEagerRelationships(Long id) {
        return this.fetchBagRelationships(this.findById(id));
    }

    default List<UserAdditionalFields> findAllWithEagerRelationships() {
        return this.fetchBagRelationships(this.findAll());
    }

    default Page<UserAdditionalFields> findAllWithEagerRelationships(Pageable pageable) {
        return this.fetchBagRelationships(this.findAll(pageable));
    }

    Optional<UserAdditionalFields> findByInternalUserId(Long id);
}

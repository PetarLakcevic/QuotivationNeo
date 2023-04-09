package pws.quo.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import pws.quo.domain.Author;

/**
 * Spring Data JPA repository for the Author entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AuthorRepository extends JpaRepository<Author, Long>, JpaSpecificationExecutor<Author> {}

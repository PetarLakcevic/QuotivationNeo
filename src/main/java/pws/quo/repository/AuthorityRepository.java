package pws.quo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pws.quo.domain.Authority;

/**
 * Spring Data JPA repository for the {@link Authority} entity.
 */
public interface AuthorityRepository extends JpaRepository<Authority, String> {}

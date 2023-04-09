package pws.quo.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import pws.quo.domain.UserAdditionalFields;

public interface UserAdditionalFieldsRepositoryWithBagRelationships {
    Optional<UserAdditionalFields> fetchBagRelationships(Optional<UserAdditionalFields> userAdditionalFields);

    List<UserAdditionalFields> fetchBagRelationships(List<UserAdditionalFields> userAdditionalFields);

    Page<UserAdditionalFields> fetchBagRelationships(Page<UserAdditionalFields> userAdditionalFields);
}

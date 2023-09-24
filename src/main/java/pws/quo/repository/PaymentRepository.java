package pws.quo.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import pws.quo.domain.Payment;
import pws.quo.domain.UserAdditionalFields;

import java.util.List;

/**
 * Spring Data JPA repository for the Payment entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long>, JpaSpecificationExecutor<Payment> {
    List<Payment> findAllByUserAdditionalFields(UserAdditionalFields userAdditionalFields);

    List<Payment> findAllByUserAdditionalFieldsAndUsed(UserAdditionalFields userAdditionalFields, boolean b);
}

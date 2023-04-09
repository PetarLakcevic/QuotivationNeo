package pws.quo.repository;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.stream.IntStream;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.hibernate.annotations.QueryHints;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import pws.quo.domain.UserAdditionalFields;

/**
 * Utility repository to load bag relationships based on https://vladmihalcea.com/hibernate-multiplebagfetchexception/
 */
public class UserAdditionalFieldsRepositoryWithBagRelationshipsImpl implements UserAdditionalFieldsRepositoryWithBagRelationships {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Optional<UserAdditionalFields> fetchBagRelationships(Optional<UserAdditionalFields> userAdditionalFields) {
        return userAdditionalFields.map(this::fetchCategories);
    }

    @Override
    public Page<UserAdditionalFields> fetchBagRelationships(Page<UserAdditionalFields> userAdditionalFields) {
        return new PageImpl<>(
            fetchBagRelationships(userAdditionalFields.getContent()),
            userAdditionalFields.getPageable(),
            userAdditionalFields.getTotalElements()
        );
    }

    @Override
    public List<UserAdditionalFields> fetchBagRelationships(List<UserAdditionalFields> userAdditionalFields) {
        return Optional.of(userAdditionalFields).map(this::fetchCategories).orElse(Collections.emptyList());
    }

    UserAdditionalFields fetchCategories(UserAdditionalFields result) {
        return entityManager
            .createQuery(
                "select userAdditionalFields from UserAdditionalFields userAdditionalFields left join fetch userAdditionalFields.categories where userAdditionalFields is :userAdditionalFields",
                UserAdditionalFields.class
            )
            .setParameter("userAdditionalFields", result)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getSingleResult();
    }

    List<UserAdditionalFields> fetchCategories(List<UserAdditionalFields> userAdditionalFields) {
        HashMap<Object, Integer> order = new HashMap<>();
        IntStream.range(0, userAdditionalFields.size()).forEach(index -> order.put(userAdditionalFields.get(index).getId(), index));
        List<UserAdditionalFields> result = entityManager
            .createQuery(
                "select distinct userAdditionalFields from UserAdditionalFields userAdditionalFields left join fetch userAdditionalFields.categories where userAdditionalFields in :userAdditionalFields",
                UserAdditionalFields.class
            )
            .setParameter("userAdditionalFields", userAdditionalFields)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getResultList();
        Collections.sort(result, (o1, o2) -> Integer.compare(order.get(o1.getId()), order.get(o2.getId())));
        return result;
    }
}

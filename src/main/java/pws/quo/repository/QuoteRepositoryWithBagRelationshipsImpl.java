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
import pws.quo.domain.Quote;

/**
 * Utility repository to load bag relationships based on https://vladmihalcea.com/hibernate-multiplebagfetchexception/
 */
public class QuoteRepositoryWithBagRelationshipsImpl implements QuoteRepositoryWithBagRelationships {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Optional<Quote> fetchBagRelationships(Optional<Quote> quote) {
        return quote.map(this::fetchCategories);
    }

    @Override
    public Page<Quote> fetchBagRelationships(Page<Quote> quotes) {
        return new PageImpl<>(fetchBagRelationships(quotes.getContent()), quotes.getPageable(), quotes.getTotalElements());
    }

    @Override
    public List<Quote> fetchBagRelationships(List<Quote> quotes) {
        return Optional.of(quotes).map(this::fetchCategories).orElse(Collections.emptyList());
    }

    Quote fetchCategories(Quote result) {
        return entityManager
            .createQuery("select quote from Quote quote left join fetch quote.categories where quote is :quote", Quote.class)
            .setParameter("quote", result)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getSingleResult();
    }

    List<Quote> fetchCategories(List<Quote> quotes) {
        HashMap<Object, Integer> order = new HashMap<>();
        IntStream.range(0, quotes.size()).forEach(index -> order.put(quotes.get(index).getId(), index));
        List<Quote> result = entityManager
            .createQuery("select distinct quote from Quote quote left join fetch quote.categories where quote in :quotes", Quote.class)
            .setParameter("quotes", quotes)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getResultList();
        Collections.sort(result, (o1, o2) -> Integer.compare(order.get(o1.getId()), order.get(o2.getId())));
        return result;
    }
}

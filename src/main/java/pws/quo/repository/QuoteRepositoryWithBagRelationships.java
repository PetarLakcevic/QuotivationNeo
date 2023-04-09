package pws.quo.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import pws.quo.domain.Quote;

public interface QuoteRepositoryWithBagRelationships {
    Optional<Quote> fetchBagRelationships(Optional<Quote> quote);

    List<Quote> fetchBagRelationships(List<Quote> quotes);

    Page<Quote> fetchBagRelationships(Page<Quote> quotes);
}

package pws.quo.domain.dto;

import java.util.List;
import javax.persistence.Column;
import javax.validation.constraints.NotNull;
import pws.quo.domain.Quote;

public class AuthorDTO {

    private Long id;

    private String name;
    private List<Quote> quoteList;

    public AuthorDTO(Long id, String name, List<Quote> quoteList) {
        this.id = id;
        this.name = name;
        this.quoteList = quoteList;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public List<Quote> getQuoteList() {
        return quoteList;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setQuoteList(List<Quote> quoteList) {
        this.quoteList = quoteList;
    }
}

package pws.quo.domain.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import pws.quo.domain.Category;
import pws.quo.domain.Quote;
import pws.quo.domain.UserAdditionalFields;

public class CategoryDTO {

    private Long id;
    private String name;
    private Set<Quote> quotes = new HashSet<>();

    public CategoryDTO(Category category) {
        this.id = category.getId();
        this.name = category.getName();
        this.quotes = category.getQuotes();
    }

    public CategoryDTO(Category category, boolean a1) {
        this.id = category.getId();
        this.name = category.getName();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Quote> getQuotes() {
        return quotes;
    }

    public void setQuotes(Set<Quote> quotes) {
        this.quotes = quotes;
    }
}

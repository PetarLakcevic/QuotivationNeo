package pws.quo.domain.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import pws.quo.domain.Author;
import pws.quo.domain.Category;
import pws.quo.domain.Quote;

public class QuoteDTO {

    private Long id;

    private String text;

    private Author author;

    private Set<Category> categories = new HashSet<>();

    public QuoteDTO() {}

    public QuoteDTO(Quote quote) {
        this.id = quote.getId();
        this.text = quote.getText();
        this.author = quote.getAuthor();
        this.categories = quote.getCategories();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Author getAuthor() {
        return author;
    }

    public void setAuthor(Author author) {
        this.author = author;
    }

    public Set<Category> getCategories() {
        return categories;
    }

    public void setCategories(Set<Category> categories) {
        this.categories = categories;
    }
}

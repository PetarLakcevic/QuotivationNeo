package pws.quo.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A Category.
 */
@Entity
@Table(name = "category")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Category implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @ManyToMany(mappedBy = "categories", fetch = FetchType.EAGER)
    @JsonIgnoreProperties(value = { "author", "categories" }, allowSetters = true)
    private Set<Quote> quotes = new HashSet<>();

    @ManyToMany(mappedBy = "categories", fetch = FetchType.EAGER)
    @JsonIgnoreProperties(value = { "internalUser", "categories", "payments" }, allowSetters = true)
    private Set<UserAdditionalFields> userAdditionalFields = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Category id(Long id) {
        this.setId(id);
        return this;
    }

    public Category() {}

    public Category(String name) {
        this.name = name;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public Category name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Quote> getQuotes() {
        return this.quotes;
    }

    public void setQuotes(Set<Quote> quotes) {
        if (this.quotes != null) {
            this.quotes.forEach(i -> i.removeCategory(this));
        }
        if (quotes != null) {
            quotes.forEach(i -> i.addCategory(this));
        }
        this.quotes = quotes;
    }

    public Category quotes(Set<Quote> quotes) {
        this.setQuotes(quotes);
        return this;
    }

    public Category addQuote(Quote quote) {
        this.quotes.add(quote);
        quote.getCategories().add(this);
        return this;
    }

    public Category removeQuote(Quote quote) {
        this.quotes.remove(quote);
        quote.getCategories().remove(this);
        return this;
    }

    public Set<UserAdditionalFields> getUserAdditionalFields() {
        return this.userAdditionalFields;
    }

    public void setUserAdditionalFields(Set<UserAdditionalFields> userAdditionalFields) {
        if (this.userAdditionalFields != null) {
            this.userAdditionalFields.forEach(i -> i.removeCategory(this));
        }
        if (userAdditionalFields != null) {
            userAdditionalFields.forEach(i -> i.addCategory(this));
        }
        this.userAdditionalFields = userAdditionalFields;
    }

    public Category userAdditionalFields(Set<UserAdditionalFields> userAdditionalFields) {
        this.setUserAdditionalFields(userAdditionalFields);
        return this;
    }

    public Category addUserAdditionalFields(UserAdditionalFields userAdditionalFields) {
        this.userAdditionalFields.add(userAdditionalFields);
        userAdditionalFields.getCategories().add(this);
        return this;
    }

    public Category removeUserAdditionalFields(UserAdditionalFields userAdditionalFields) {
        this.userAdditionalFields.remove(userAdditionalFields);
        userAdditionalFields.getCategories().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Category)) {
            return false;
        }
        return id != null && id.equals(((Category) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Category{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}

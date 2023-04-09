package pws.quo.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.Instant;
import javax.persistence.*;

/**
 * A UserQuote.
 */
@Entity
@Table(name = "user_quote")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class UserQuote implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "favourite")
    private Boolean favourite;

    @Column(name = "time")
    private Instant time;

    @ManyToOne
    private User user;

    @ManyToOne
    @JsonIgnoreProperties(value = { "author", "categories" }, allowSetters = true)
    private Quote quote;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public UserQuote id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean getFavourite() {
        return this.favourite;
    }

    public UserQuote favourite(Boolean favourite) {
        this.setFavourite(favourite);
        return this;
    }

    public void setFavourite(Boolean favourite) {
        this.favourite = favourite;
    }

    public Instant getTime() {
        return this.time;
    }

    public UserQuote time(Instant time) {
        this.setTime(time);
        return this;
    }

    public void setTime(Instant time) {
        this.time = time;
    }

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public UserQuote user(User user) {
        this.setUser(user);
        return this;
    }

    public Quote getQuote() {
        return this.quote;
    }

    public void setQuote(Quote quote) {
        this.quote = quote;
    }

    public UserQuote quote(Quote quote) {
        this.setQuote(quote);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof UserQuote)) {
            return false;
        }
        return id != null && id.equals(((UserQuote) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "UserQuote{" +
            "id=" + getId() +
            ", favourite='" + getFavourite() + "'" +
            ", time='" + getTime() + "'" +
            "}";
    }
}

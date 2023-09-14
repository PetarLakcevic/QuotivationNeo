package pws.quo.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.v3.oas.annotations.media.Schema;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;

/**
 * not an ignored comment
 */
@Schema(description = "not an ignored comment")
@Entity
@Table(name = "user_additional_fields")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class UserAdditionalFields implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "expiry")
    private Instant expiry;

    @Column(name = "registration_date")
    private Instant registrationDate;
    @Column(name = "theme_picture")
    private Integer themePicture;
    @OneToOne
    @JoinColumn(unique = true)
    private User internalUser;
    @Column(name = "payment_token_expiry")
    private Instant paymentTokenExpiry;
    @Column(name = "trial_expiry")
    private Instant trialExpiry = Instant.now();
    @Column(name = "trial_expired")
    private Boolean trialExpired;
    @Column(name = "payment_token")
    private String paymentToken;


    @ManyToMany
    @JoinTable(
        name = "rel_user_additional_fields__category",
        joinColumns = @JoinColumn(name = "user_additional_fields_id"),
        inverseJoinColumns = @JoinColumn(name = "category_id")
    )
    @JsonIgnoreProperties(value = { "quotes", "userAdditionalFields" }, allowSetters = true)
    private Set<Category> categories = new HashSet<>();

    @OneToMany(mappedBy = "userAdditionalFields")
    @JsonIgnoreProperties(value = { "userAdditionalFields" }, allowSetters = true)
    private Set<Payment> payments = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public UserAdditionalFields id(Long id) {
        this.setId(id);
        return this;
    }

    public Instant getTrialExpiry() {
        return trialExpiry;
    }

    public void setTrialExpiry(Instant trialExpiry) {
        this.trialExpiry = trialExpiry;
    }

    public Boolean getTrialExpired() {
        return trialExpired;
    }

    public void setTrialExpired(Boolean trialExpired) {
        this.trialExpired = trialExpired;
    }

    public Instant getPaymentTokenExpiry() {
        return paymentTokenExpiry;
    }

    public void setPaymentTokenExpiry(Instant paymentTokenExpiry) {
        this.paymentTokenExpiry = paymentTokenExpiry;
    }

    public String getPaymentToken() {
        return paymentToken;
    }

    public void setPaymentToken(String paymentToken) {
        this.paymentToken = paymentToken;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getExpiry() {
        return this.expiry;
    }

    public UserAdditionalFields expiry(Instant expiry) {
        this.setExpiry(expiry);
        return this;
    }

    public void setExpiry(Instant expiry) {
        this.expiry = expiry;
    }

    public Instant getRegistrationDate() {
        return this.registrationDate;
    }

    public UserAdditionalFields registrationDate(Instant registrationDate) {
        this.setRegistrationDate(registrationDate);
        return this;
    }

    public void setRegistrationDate(Instant registrationDate) {
        this.registrationDate = registrationDate;
    }

    public Integer getThemePicture() {
        return this.themePicture;
    }

    public UserAdditionalFields themePicture(Integer themePicture) {
        this.setThemePicture(themePicture);
        return this;
    }

    public void setThemePicture(Integer themePicture) {
        this.themePicture = themePicture;
    }

    public User getInternalUser() {
        return this.internalUser;
    }

    public void setInternalUser(User user) {
        this.internalUser = user;
    }

    public UserAdditionalFields internalUser(User user) {
        this.setInternalUser(user);
        return this;
    }

    public Set<Category> getCategories() {
        return this.categories;
    }

    public void setCategories(Set<Category> categories) {
        this.categories = categories;
    }

    public UserAdditionalFields categories(Set<Category> categories) {
        this.setCategories(categories);
        return this;
    }

    public UserAdditionalFields addCategory(Category category) {
        this.categories.add(category);
        category.getUserAdditionalFields().add(this);
        return this;
    }

    public UserAdditionalFields removeCategory(Category category) {
        this.categories.remove(category);
        category.getUserAdditionalFields().remove(this);
        return this;
    }

    public Set<Payment> getPayments() {
        return this.payments;
    }

    public void setPayments(Set<Payment> payments) {
        if (this.payments != null) {
            this.payments.forEach(i -> i.setUserAdditionalFields(null));
        }
        if (payments != null) {
            payments.forEach(i -> i.setUserAdditionalFields(this));
        }
        this.payments = payments;
    }

    public UserAdditionalFields payments(Set<Payment> payments) {
        this.setPayments(payments);
        return this;
    }

    public UserAdditionalFields addPayments(Payment payment) {
        this.payments.add(payment);
        payment.setUserAdditionalFields(this);
        return this;
    }

    public UserAdditionalFields removePayments(Payment payment) {
        this.payments.remove(payment);
        payment.setUserAdditionalFields(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof UserAdditionalFields)) {
            return false;
        }
        return id != null && id.equals(((UserAdditionalFields) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "UserAdditionalFields{" +
            "id=" + getId() +
            ", expiry='" + getExpiry() + "'" +
            ", registrationDate='" + getRegistrationDate() + "'" +
            ", themePicture=" + getThemePicture() +
            "}";
    }
}

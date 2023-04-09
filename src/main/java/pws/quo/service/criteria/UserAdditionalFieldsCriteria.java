package pws.quo.service.criteria;

import java.io.Serializable;
import java.util.Objects;
import org.springdoc.api.annotations.ParameterObject;
import tech.jhipster.service.Criteria;
import tech.jhipster.service.filter.*;

/**
 * Criteria class for the {@link pws.quo.domain.UserAdditionalFields} entity. This class is used
 * in {@link pws.quo.web.rest.UserAdditionalFieldsResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /user-additional-fields?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@ParameterObject
@SuppressWarnings("common-java:DuplicatedBlocks")
public class UserAdditionalFieldsCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private InstantFilter expiry;

    private InstantFilter registrationDate;

    private IntegerFilter themePicture;

    private LongFilter internalUserId;

    private LongFilter categoryId;

    private LongFilter paymentsId;

    private Boolean distinct;

    public UserAdditionalFieldsCriteria() {}

    public UserAdditionalFieldsCriteria(UserAdditionalFieldsCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.expiry = other.expiry == null ? null : other.expiry.copy();
        this.registrationDate = other.registrationDate == null ? null : other.registrationDate.copy();
        this.themePicture = other.themePicture == null ? null : other.themePicture.copy();
        this.internalUserId = other.internalUserId == null ? null : other.internalUserId.copy();
        this.categoryId = other.categoryId == null ? null : other.categoryId.copy();
        this.paymentsId = other.paymentsId == null ? null : other.paymentsId.copy();
        this.distinct = other.distinct;
    }

    @Override
    public UserAdditionalFieldsCriteria copy() {
        return new UserAdditionalFieldsCriteria(this);
    }

    public LongFilter getId() {
        return id;
    }

    public LongFilter id() {
        if (id == null) {
            id = new LongFilter();
        }
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public InstantFilter getExpiry() {
        return expiry;
    }

    public InstantFilter expiry() {
        if (expiry == null) {
            expiry = new InstantFilter();
        }
        return expiry;
    }

    public void setExpiry(InstantFilter expiry) {
        this.expiry = expiry;
    }

    public InstantFilter getRegistrationDate() {
        return registrationDate;
    }

    public InstantFilter registrationDate() {
        if (registrationDate == null) {
            registrationDate = new InstantFilter();
        }
        return registrationDate;
    }

    public void setRegistrationDate(InstantFilter registrationDate) {
        this.registrationDate = registrationDate;
    }

    public IntegerFilter getThemePicture() {
        return themePicture;
    }

    public IntegerFilter themePicture() {
        if (themePicture == null) {
            themePicture = new IntegerFilter();
        }
        return themePicture;
    }

    public void setThemePicture(IntegerFilter themePicture) {
        this.themePicture = themePicture;
    }

    public LongFilter getInternalUserId() {
        return internalUserId;
    }

    public LongFilter internalUserId() {
        if (internalUserId == null) {
            internalUserId = new LongFilter();
        }
        return internalUserId;
    }

    public void setInternalUserId(LongFilter internalUserId) {
        this.internalUserId = internalUserId;
    }

    public LongFilter getCategoryId() {
        return categoryId;
    }

    public LongFilter categoryId() {
        if (categoryId == null) {
            categoryId = new LongFilter();
        }
        return categoryId;
    }

    public void setCategoryId(LongFilter categoryId) {
        this.categoryId = categoryId;
    }

    public LongFilter getPaymentsId() {
        return paymentsId;
    }

    public LongFilter paymentsId() {
        if (paymentsId == null) {
            paymentsId = new LongFilter();
        }
        return paymentsId;
    }

    public void setPaymentsId(LongFilter paymentsId) {
        this.paymentsId = paymentsId;
    }

    public Boolean getDistinct() {
        return distinct;
    }

    public void setDistinct(Boolean distinct) {
        this.distinct = distinct;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final UserAdditionalFieldsCriteria that = (UserAdditionalFieldsCriteria) o;
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(expiry, that.expiry) &&
            Objects.equals(registrationDate, that.registrationDate) &&
            Objects.equals(themePicture, that.themePicture) &&
            Objects.equals(internalUserId, that.internalUserId) &&
            Objects.equals(categoryId, that.categoryId) &&
            Objects.equals(paymentsId, that.paymentsId) &&
            Objects.equals(distinct, that.distinct)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, expiry, registrationDate, themePicture, internalUserId, categoryId, paymentsId, distinct);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "UserAdditionalFieldsCriteria{" +
            (id != null ? "id=" + id + ", " : "") +
            (expiry != null ? "expiry=" + expiry + ", " : "") +
            (registrationDate != null ? "registrationDate=" + registrationDate + ", " : "") +
            (themePicture != null ? "themePicture=" + themePicture + ", " : "") +
            (internalUserId != null ? "internalUserId=" + internalUserId + ", " : "") +
            (categoryId != null ? "categoryId=" + categoryId + ", " : "") +
            (paymentsId != null ? "paymentsId=" + paymentsId + ", " : "") +
            (distinct != null ? "distinct=" + distinct + ", " : "") +
            "}";
    }
}

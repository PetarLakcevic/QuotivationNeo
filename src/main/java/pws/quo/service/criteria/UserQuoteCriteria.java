package pws.quo.service.criteria;

import java.io.Serializable;
import java.util.Objects;
import org.springdoc.api.annotations.ParameterObject;
import tech.jhipster.service.Criteria;
import tech.jhipster.service.filter.*;

/**
 * Criteria class for the {@link pws.quo.domain.UserQuote} entity. This class is used
 * in {@link pws.quo.web.rest.UserQuoteResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /user-quotes?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@ParameterObject
@SuppressWarnings("common-java:DuplicatedBlocks")
public class UserQuoteCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private BooleanFilter favourite;

    private InstantFilter time;

    private LongFilter userId;

    private LongFilter quoteId;

    private Boolean distinct;

    public UserQuoteCriteria() {}

    public UserQuoteCriteria(UserQuoteCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.favourite = other.favourite == null ? null : other.favourite.copy();
        this.time = other.time == null ? null : other.time.copy();
        this.userId = other.userId == null ? null : other.userId.copy();
        this.quoteId = other.quoteId == null ? null : other.quoteId.copy();
        this.distinct = other.distinct;
    }

    @Override
    public UserQuoteCriteria copy() {
        return new UserQuoteCriteria(this);
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

    public BooleanFilter getFavourite() {
        return favourite;
    }

    public BooleanFilter favourite() {
        if (favourite == null) {
            favourite = new BooleanFilter();
        }
        return favourite;
    }

    public void setFavourite(BooleanFilter favourite) {
        this.favourite = favourite;
    }

    public InstantFilter getTime() {
        return time;
    }

    public InstantFilter time() {
        if (time == null) {
            time = new InstantFilter();
        }
        return time;
    }

    public void setTime(InstantFilter time) {
        this.time = time;
    }

    public LongFilter getUserId() {
        return userId;
    }

    public LongFilter userId() {
        if (userId == null) {
            userId = new LongFilter();
        }
        return userId;
    }

    public void setUserId(LongFilter userId) {
        this.userId = userId;
    }

    public LongFilter getQuoteId() {
        return quoteId;
    }

    public LongFilter quoteId() {
        if (quoteId == null) {
            quoteId = new LongFilter();
        }
        return quoteId;
    }

    public void setQuoteId(LongFilter quoteId) {
        this.quoteId = quoteId;
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
        final UserQuoteCriteria that = (UserQuoteCriteria) o;
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(favourite, that.favourite) &&
            Objects.equals(time, that.time) &&
            Objects.equals(userId, that.userId) &&
            Objects.equals(quoteId, that.quoteId) &&
            Objects.equals(distinct, that.distinct)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, favourite, time, userId, quoteId, distinct);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "UserQuoteCriteria{" +
            (id != null ? "id=" + id + ", " : "") +
            (favourite != null ? "favourite=" + favourite + ", " : "") +
            (time != null ? "time=" + time + ", " : "") +
            (userId != null ? "userId=" + userId + ", " : "") +
            (quoteId != null ? "quoteId=" + quoteId + ", " : "") +
            (distinct != null ? "distinct=" + distinct + ", " : "") +
            "}";
    }
}

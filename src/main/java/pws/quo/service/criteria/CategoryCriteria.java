package pws.quo.service.criteria;

import java.io.Serializable;
import java.util.Objects;
import org.springdoc.api.annotations.ParameterObject;
import tech.jhipster.service.Criteria;
import tech.jhipster.service.filter.*;

/**
 * Criteria class for the {@link pws.quo.domain.Category} entity. This class is used
 * in {@link pws.quo.web.rest.CategoryResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /categories?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@ParameterObject
@SuppressWarnings("common-java:DuplicatedBlocks")
public class CategoryCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter name;

    private LongFilter quoteId;

    private LongFilter userAdditionalFieldsId;

    private Boolean distinct;

    public CategoryCriteria() {}

    public CategoryCriteria(CategoryCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.name = other.name == null ? null : other.name.copy();
        this.quoteId = other.quoteId == null ? null : other.quoteId.copy();
        this.userAdditionalFieldsId = other.userAdditionalFieldsId == null ? null : other.userAdditionalFieldsId.copy();
        this.distinct = other.distinct;
    }

    @Override
    public CategoryCriteria copy() {
        return new CategoryCriteria(this);
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

    public StringFilter getName() {
        return name;
    }

    public StringFilter name() {
        if (name == null) {
            name = new StringFilter();
        }
        return name;
    }

    public void setName(StringFilter name) {
        this.name = name;
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

    public LongFilter getUserAdditionalFieldsId() {
        return userAdditionalFieldsId;
    }

    public LongFilter userAdditionalFieldsId() {
        if (userAdditionalFieldsId == null) {
            userAdditionalFieldsId = new LongFilter();
        }
        return userAdditionalFieldsId;
    }

    public void setUserAdditionalFieldsId(LongFilter userAdditionalFieldsId) {
        this.userAdditionalFieldsId = userAdditionalFieldsId;
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
        final CategoryCriteria that = (CategoryCriteria) o;
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(name, that.name) &&
            Objects.equals(quoteId, that.quoteId) &&
            Objects.equals(userAdditionalFieldsId, that.userAdditionalFieldsId) &&
            Objects.equals(distinct, that.distinct)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, quoteId, userAdditionalFieldsId, distinct);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CategoryCriteria{" +
            (id != null ? "id=" + id + ", " : "") +
            (name != null ? "name=" + name + ", " : "") +
            (quoteId != null ? "quoteId=" + quoteId + ", " : "") +
            (userAdditionalFieldsId != null ? "userAdditionalFieldsId=" + userAdditionalFieldsId + ", " : "") +
            (distinct != null ? "distinct=" + distinct + ", " : "") +
            "}";
    }
}

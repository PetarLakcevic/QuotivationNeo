package pws.quo.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import pws.quo.IntegrationTest;
import pws.quo.domain.Category;
import pws.quo.domain.Payment;
import pws.quo.domain.User;
import pws.quo.domain.UserAdditionalFields;
import pws.quo.repository.UserAdditionalFieldsRepository;
import pws.quo.service.UserAdditionalFieldsService;
import pws.quo.service.criteria.UserAdditionalFieldsCriteria;

/**
 * Integration tests for the {@link UserAdditionalFieldsResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class UserAdditionalFieldsResourceIT {

    private static final Instant DEFAULT_EXPIRY = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_EXPIRY = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_REGISTRATION_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_REGISTRATION_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Integer DEFAULT_THEME_PICTURE = 1;
    private static final Integer UPDATED_THEME_PICTURE = 2;
    private static final Integer SMALLER_THEME_PICTURE = 1 - 1;

    private static final String ENTITY_API_URL = "/api/user-additional-fields";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private UserAdditionalFieldsRepository userAdditionalFieldsRepository;

    @Mock
    private UserAdditionalFieldsRepository userAdditionalFieldsRepositoryMock;

    @Mock
    private UserAdditionalFieldsService userAdditionalFieldsServiceMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restUserAdditionalFieldsMockMvc;

    private UserAdditionalFields userAdditionalFields;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UserAdditionalFields createEntity(EntityManager em) {
        UserAdditionalFields userAdditionalFields = new UserAdditionalFields()
            .expiry(DEFAULT_EXPIRY)
            .registrationDate(DEFAULT_REGISTRATION_DATE)
            .themePicture(DEFAULT_THEME_PICTURE);
        return userAdditionalFields;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UserAdditionalFields createUpdatedEntity(EntityManager em) {
        UserAdditionalFields userAdditionalFields = new UserAdditionalFields()
            .expiry(UPDATED_EXPIRY)
            .registrationDate(UPDATED_REGISTRATION_DATE)
            .themePicture(UPDATED_THEME_PICTURE);
        return userAdditionalFields;
    }

    @BeforeEach
    public void initTest() {
        userAdditionalFields = createEntity(em);
    }

    @Test
    @Transactional
    void createUserAdditionalFields() throws Exception {
        int databaseSizeBeforeCreate = userAdditionalFieldsRepository.findAll().size();
        // Create the UserAdditionalFields
        restUserAdditionalFieldsMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(userAdditionalFields))
            )
            .andExpect(status().isCreated());

        // Validate the UserAdditionalFields in the database
        List<UserAdditionalFields> userAdditionalFieldsList = userAdditionalFieldsRepository.findAll();
        assertThat(userAdditionalFieldsList).hasSize(databaseSizeBeforeCreate + 1);
        UserAdditionalFields testUserAdditionalFields = userAdditionalFieldsList.get(userAdditionalFieldsList.size() - 1);
        assertThat(testUserAdditionalFields.getExpiry()).isEqualTo(DEFAULT_EXPIRY);
        assertThat(testUserAdditionalFields.getRegistrationDate()).isEqualTo(DEFAULT_REGISTRATION_DATE);
        assertThat(testUserAdditionalFields.getThemePicture()).isEqualTo(DEFAULT_THEME_PICTURE);
    }

    @Test
    @Transactional
    void createUserAdditionalFieldsWithExistingId() throws Exception {
        // Create the UserAdditionalFields with an existing ID
        userAdditionalFields.setId(1L);

        int databaseSizeBeforeCreate = userAdditionalFieldsRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restUserAdditionalFieldsMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(userAdditionalFields))
            )
            .andExpect(status().isBadRequest());

        // Validate the UserAdditionalFields in the database
        List<UserAdditionalFields> userAdditionalFieldsList = userAdditionalFieldsRepository.findAll();
        assertThat(userAdditionalFieldsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllUserAdditionalFields() throws Exception {
        // Initialize the database
        userAdditionalFieldsRepository.saveAndFlush(userAdditionalFields);

        // Get all the userAdditionalFieldsList
        restUserAdditionalFieldsMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(userAdditionalFields.getId().intValue())))
            .andExpect(jsonPath("$.[*].expiry").value(hasItem(DEFAULT_EXPIRY.toString())))
            .andExpect(jsonPath("$.[*].registrationDate").value(hasItem(DEFAULT_REGISTRATION_DATE.toString())))
            .andExpect(jsonPath("$.[*].themePicture").value(hasItem(DEFAULT_THEME_PICTURE)));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllUserAdditionalFieldsWithEagerRelationshipsIsEnabled() throws Exception {
        when(userAdditionalFieldsServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restUserAdditionalFieldsMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(userAdditionalFieldsServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllUserAdditionalFieldsWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(userAdditionalFieldsServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restUserAdditionalFieldsMockMvc.perform(get(ENTITY_API_URL + "?eagerload=false")).andExpect(status().isOk());
        verify(userAdditionalFieldsRepositoryMock, times(1)).findAll(any(Pageable.class));
    }

    @Test
    @Transactional
    void getUserAdditionalFields() throws Exception {
        // Initialize the database
        userAdditionalFieldsRepository.saveAndFlush(userAdditionalFields);

        // Get the userAdditionalFields
        restUserAdditionalFieldsMockMvc
            .perform(get(ENTITY_API_URL_ID, userAdditionalFields.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(userAdditionalFields.getId().intValue()))
            .andExpect(jsonPath("$.expiry").value(DEFAULT_EXPIRY.toString()))
            .andExpect(jsonPath("$.registrationDate").value(DEFAULT_REGISTRATION_DATE.toString()))
            .andExpect(jsonPath("$.themePicture").value(DEFAULT_THEME_PICTURE));
    }

    @Test
    @Transactional
    void getUserAdditionalFieldsByIdFiltering() throws Exception {
        // Initialize the database
        userAdditionalFieldsRepository.saveAndFlush(userAdditionalFields);

        Long id = userAdditionalFields.getId();

        defaultUserAdditionalFieldsShouldBeFound("id.equals=" + id);
        defaultUserAdditionalFieldsShouldNotBeFound("id.notEquals=" + id);

        defaultUserAdditionalFieldsShouldBeFound("id.greaterThanOrEqual=" + id);
        defaultUserAdditionalFieldsShouldNotBeFound("id.greaterThan=" + id);

        defaultUserAdditionalFieldsShouldBeFound("id.lessThanOrEqual=" + id);
        defaultUserAdditionalFieldsShouldNotBeFound("id.lessThan=" + id);
    }

    @Test
    @Transactional
    void getAllUserAdditionalFieldsByExpiryIsEqualToSomething() throws Exception {
        // Initialize the database
        userAdditionalFieldsRepository.saveAndFlush(userAdditionalFields);

        // Get all the userAdditionalFieldsList where expiry equals to DEFAULT_EXPIRY
        defaultUserAdditionalFieldsShouldBeFound("expiry.equals=" + DEFAULT_EXPIRY);

        // Get all the userAdditionalFieldsList where expiry equals to UPDATED_EXPIRY
        defaultUserAdditionalFieldsShouldNotBeFound("expiry.equals=" + UPDATED_EXPIRY);
    }

    @Test
    @Transactional
    void getAllUserAdditionalFieldsByExpiryIsInShouldWork() throws Exception {
        // Initialize the database
        userAdditionalFieldsRepository.saveAndFlush(userAdditionalFields);

        // Get all the userAdditionalFieldsList where expiry in DEFAULT_EXPIRY or UPDATED_EXPIRY
        defaultUserAdditionalFieldsShouldBeFound("expiry.in=" + DEFAULT_EXPIRY + "," + UPDATED_EXPIRY);

        // Get all the userAdditionalFieldsList where expiry equals to UPDATED_EXPIRY
        defaultUserAdditionalFieldsShouldNotBeFound("expiry.in=" + UPDATED_EXPIRY);
    }

    @Test
    @Transactional
    void getAllUserAdditionalFieldsByExpiryIsNullOrNotNull() throws Exception {
        // Initialize the database
        userAdditionalFieldsRepository.saveAndFlush(userAdditionalFields);

        // Get all the userAdditionalFieldsList where expiry is not null
        defaultUserAdditionalFieldsShouldBeFound("expiry.specified=true");

        // Get all the userAdditionalFieldsList where expiry is null
        defaultUserAdditionalFieldsShouldNotBeFound("expiry.specified=false");
    }

    @Test
    @Transactional
    void getAllUserAdditionalFieldsByRegistrationDateIsEqualToSomething() throws Exception {
        // Initialize the database
        userAdditionalFieldsRepository.saveAndFlush(userAdditionalFields);

        // Get all the userAdditionalFieldsList where registrationDate equals to DEFAULT_REGISTRATION_DATE
        defaultUserAdditionalFieldsShouldBeFound("registrationDate.equals=" + DEFAULT_REGISTRATION_DATE);

        // Get all the userAdditionalFieldsList where registrationDate equals to UPDATED_REGISTRATION_DATE
        defaultUserAdditionalFieldsShouldNotBeFound("registrationDate.equals=" + UPDATED_REGISTRATION_DATE);
    }

    @Test
    @Transactional
    void getAllUserAdditionalFieldsByRegistrationDateIsInShouldWork() throws Exception {
        // Initialize the database
        userAdditionalFieldsRepository.saveAndFlush(userAdditionalFields);

        // Get all the userAdditionalFieldsList where registrationDate in DEFAULT_REGISTRATION_DATE or UPDATED_REGISTRATION_DATE
        defaultUserAdditionalFieldsShouldBeFound("registrationDate.in=" + DEFAULT_REGISTRATION_DATE + "," + UPDATED_REGISTRATION_DATE);

        // Get all the userAdditionalFieldsList where registrationDate equals to UPDATED_REGISTRATION_DATE
        defaultUserAdditionalFieldsShouldNotBeFound("registrationDate.in=" + UPDATED_REGISTRATION_DATE);
    }

    @Test
    @Transactional
    void getAllUserAdditionalFieldsByRegistrationDateIsNullOrNotNull() throws Exception {
        // Initialize the database
        userAdditionalFieldsRepository.saveAndFlush(userAdditionalFields);

        // Get all the userAdditionalFieldsList where registrationDate is not null
        defaultUserAdditionalFieldsShouldBeFound("registrationDate.specified=true");

        // Get all the userAdditionalFieldsList where registrationDate is null
        defaultUserAdditionalFieldsShouldNotBeFound("registrationDate.specified=false");
    }

    @Test
    @Transactional
    void getAllUserAdditionalFieldsByThemePictureIsEqualToSomething() throws Exception {
        // Initialize the database
        userAdditionalFieldsRepository.saveAndFlush(userAdditionalFields);

        // Get all the userAdditionalFieldsList where themePicture equals to DEFAULT_THEME_PICTURE
        defaultUserAdditionalFieldsShouldBeFound("themePicture.equals=" + DEFAULT_THEME_PICTURE);

        // Get all the userAdditionalFieldsList where themePicture equals to UPDATED_THEME_PICTURE
        defaultUserAdditionalFieldsShouldNotBeFound("themePicture.equals=" + UPDATED_THEME_PICTURE);
    }

    @Test
    @Transactional
    void getAllUserAdditionalFieldsByThemePictureIsInShouldWork() throws Exception {
        // Initialize the database
        userAdditionalFieldsRepository.saveAndFlush(userAdditionalFields);

        // Get all the userAdditionalFieldsList where themePicture in DEFAULT_THEME_PICTURE or UPDATED_THEME_PICTURE
        defaultUserAdditionalFieldsShouldBeFound("themePicture.in=" + DEFAULT_THEME_PICTURE + "," + UPDATED_THEME_PICTURE);

        // Get all the userAdditionalFieldsList where themePicture equals to UPDATED_THEME_PICTURE
        defaultUserAdditionalFieldsShouldNotBeFound("themePicture.in=" + UPDATED_THEME_PICTURE);
    }

    @Test
    @Transactional
    void getAllUserAdditionalFieldsByThemePictureIsNullOrNotNull() throws Exception {
        // Initialize the database
        userAdditionalFieldsRepository.saveAndFlush(userAdditionalFields);

        // Get all the userAdditionalFieldsList where themePicture is not null
        defaultUserAdditionalFieldsShouldBeFound("themePicture.specified=true");

        // Get all the userAdditionalFieldsList where themePicture is null
        defaultUserAdditionalFieldsShouldNotBeFound("themePicture.specified=false");
    }

    @Test
    @Transactional
    void getAllUserAdditionalFieldsByThemePictureIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        userAdditionalFieldsRepository.saveAndFlush(userAdditionalFields);

        // Get all the userAdditionalFieldsList where themePicture is greater than or equal to DEFAULT_THEME_PICTURE
        defaultUserAdditionalFieldsShouldBeFound("themePicture.greaterThanOrEqual=" + DEFAULT_THEME_PICTURE);

        // Get all the userAdditionalFieldsList where themePicture is greater than or equal to UPDATED_THEME_PICTURE
        defaultUserAdditionalFieldsShouldNotBeFound("themePicture.greaterThanOrEqual=" + UPDATED_THEME_PICTURE);
    }

    @Test
    @Transactional
    void getAllUserAdditionalFieldsByThemePictureIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        userAdditionalFieldsRepository.saveAndFlush(userAdditionalFields);

        // Get all the userAdditionalFieldsList where themePicture is less than or equal to DEFAULT_THEME_PICTURE
        defaultUserAdditionalFieldsShouldBeFound("themePicture.lessThanOrEqual=" + DEFAULT_THEME_PICTURE);

        // Get all the userAdditionalFieldsList where themePicture is less than or equal to SMALLER_THEME_PICTURE
        defaultUserAdditionalFieldsShouldNotBeFound("themePicture.lessThanOrEqual=" + SMALLER_THEME_PICTURE);
    }

    @Test
    @Transactional
    void getAllUserAdditionalFieldsByThemePictureIsLessThanSomething() throws Exception {
        // Initialize the database
        userAdditionalFieldsRepository.saveAndFlush(userAdditionalFields);

        // Get all the userAdditionalFieldsList where themePicture is less than DEFAULT_THEME_PICTURE
        defaultUserAdditionalFieldsShouldNotBeFound("themePicture.lessThan=" + DEFAULT_THEME_PICTURE);

        // Get all the userAdditionalFieldsList where themePicture is less than UPDATED_THEME_PICTURE
        defaultUserAdditionalFieldsShouldBeFound("themePicture.lessThan=" + UPDATED_THEME_PICTURE);
    }

    @Test
    @Transactional
    void getAllUserAdditionalFieldsByThemePictureIsGreaterThanSomething() throws Exception {
        // Initialize the database
        userAdditionalFieldsRepository.saveAndFlush(userAdditionalFields);

        // Get all the userAdditionalFieldsList where themePicture is greater than DEFAULT_THEME_PICTURE
        defaultUserAdditionalFieldsShouldNotBeFound("themePicture.greaterThan=" + DEFAULT_THEME_PICTURE);

        // Get all the userAdditionalFieldsList where themePicture is greater than SMALLER_THEME_PICTURE
        defaultUserAdditionalFieldsShouldBeFound("themePicture.greaterThan=" + SMALLER_THEME_PICTURE);
    }

    @Test
    @Transactional
    void getAllUserAdditionalFieldsByInternalUserIsEqualToSomething() throws Exception {
        User internalUser;
        if (TestUtil.findAll(em, User.class).isEmpty()) {
            userAdditionalFieldsRepository.saveAndFlush(userAdditionalFields);
            internalUser = UserResourceIT.createEntity(em);
        } else {
            internalUser = TestUtil.findAll(em, User.class).get(0);
        }
        em.persist(internalUser);
        em.flush();
        userAdditionalFields.setInternalUser(internalUser);
        userAdditionalFieldsRepository.saveAndFlush(userAdditionalFields);
        Long internalUserId = internalUser.getId();

        // Get all the userAdditionalFieldsList where internalUser equals to internalUserId
        defaultUserAdditionalFieldsShouldBeFound("internalUserId.equals=" + internalUserId);

        // Get all the userAdditionalFieldsList where internalUser equals to (internalUserId + 1)
        defaultUserAdditionalFieldsShouldNotBeFound("internalUserId.equals=" + (internalUserId + 1));
    }

    @Test
    @Transactional
    void getAllUserAdditionalFieldsByCategoryIsEqualToSomething() throws Exception {
        Category category;
        if (TestUtil.findAll(em, Category.class).isEmpty()) {
            userAdditionalFieldsRepository.saveAndFlush(userAdditionalFields);
            category = CategoryResourceIT.createEntity(em);
        } else {
            category = TestUtil.findAll(em, Category.class).get(0);
        }
        em.persist(category);
        em.flush();
        userAdditionalFields.addCategory(category);
        userAdditionalFieldsRepository.saveAndFlush(userAdditionalFields);
        Long categoryId = category.getId();

        // Get all the userAdditionalFieldsList where category equals to categoryId
        defaultUserAdditionalFieldsShouldBeFound("categoryId.equals=" + categoryId);

        // Get all the userAdditionalFieldsList where category equals to (categoryId + 1)
        defaultUserAdditionalFieldsShouldNotBeFound("categoryId.equals=" + (categoryId + 1));
    }

    @Test
    @Transactional
    void getAllUserAdditionalFieldsByPaymentsIsEqualToSomething() throws Exception {
        Payment payments;
        if (TestUtil.findAll(em, Payment.class).isEmpty()) {
            userAdditionalFieldsRepository.saveAndFlush(userAdditionalFields);
            payments = PaymentResourceIT.createEntity(em);
        } else {
            payments = TestUtil.findAll(em, Payment.class).get(0);
        }
        em.persist(payments);
        em.flush();
        userAdditionalFields.addPayments(payments);
        userAdditionalFieldsRepository.saveAndFlush(userAdditionalFields);
        Long paymentsId = payments.getId();

        // Get all the userAdditionalFieldsList where payments equals to paymentsId
        defaultUserAdditionalFieldsShouldBeFound("paymentsId.equals=" + paymentsId);

        // Get all the userAdditionalFieldsList where payments equals to (paymentsId + 1)
        defaultUserAdditionalFieldsShouldNotBeFound("paymentsId.equals=" + (paymentsId + 1));
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultUserAdditionalFieldsShouldBeFound(String filter) throws Exception {
        restUserAdditionalFieldsMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(userAdditionalFields.getId().intValue())))
            .andExpect(jsonPath("$.[*].expiry").value(hasItem(DEFAULT_EXPIRY.toString())))
            .andExpect(jsonPath("$.[*].registrationDate").value(hasItem(DEFAULT_REGISTRATION_DATE.toString())))
            .andExpect(jsonPath("$.[*].themePicture").value(hasItem(DEFAULT_THEME_PICTURE)));

        // Check, that the count call also returns 1
        restUserAdditionalFieldsMockMvc
            .perform(get(ENTITY_API_URL + "/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultUserAdditionalFieldsShouldNotBeFound(String filter) throws Exception {
        restUserAdditionalFieldsMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restUserAdditionalFieldsMockMvc
            .perform(get(ENTITY_API_URL + "/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("0"));
    }

    @Test
    @Transactional
    void getNonExistingUserAdditionalFields() throws Exception {
        // Get the userAdditionalFields
        restUserAdditionalFieldsMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingUserAdditionalFields() throws Exception {
        // Initialize the database
        userAdditionalFieldsRepository.saveAndFlush(userAdditionalFields);

        int databaseSizeBeforeUpdate = userAdditionalFieldsRepository.findAll().size();

        // Update the userAdditionalFields
        UserAdditionalFields updatedUserAdditionalFields = userAdditionalFieldsRepository.findById(userAdditionalFields.getId()).get();
        // Disconnect from session so that the updates on updatedUserAdditionalFields are not directly saved in db
        em.detach(updatedUserAdditionalFields);
        updatedUserAdditionalFields.expiry(UPDATED_EXPIRY).registrationDate(UPDATED_REGISTRATION_DATE).themePicture(UPDATED_THEME_PICTURE);

        restUserAdditionalFieldsMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedUserAdditionalFields.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedUserAdditionalFields))
            )
            .andExpect(status().isOk());

        // Validate the UserAdditionalFields in the database
        List<UserAdditionalFields> userAdditionalFieldsList = userAdditionalFieldsRepository.findAll();
        assertThat(userAdditionalFieldsList).hasSize(databaseSizeBeforeUpdate);
        UserAdditionalFields testUserAdditionalFields = userAdditionalFieldsList.get(userAdditionalFieldsList.size() - 1);
        assertThat(testUserAdditionalFields.getExpiry()).isEqualTo(UPDATED_EXPIRY);
        assertThat(testUserAdditionalFields.getRegistrationDate()).isEqualTo(UPDATED_REGISTRATION_DATE);
        assertThat(testUserAdditionalFields.getThemePicture()).isEqualTo(UPDATED_THEME_PICTURE);
    }

    @Test
    @Transactional
    void putNonExistingUserAdditionalFields() throws Exception {
        int databaseSizeBeforeUpdate = userAdditionalFieldsRepository.findAll().size();
        userAdditionalFields.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUserAdditionalFieldsMockMvc
            .perform(
                put(ENTITY_API_URL_ID, userAdditionalFields.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(userAdditionalFields))
            )
            .andExpect(status().isBadRequest());

        // Validate the UserAdditionalFields in the database
        List<UserAdditionalFields> userAdditionalFieldsList = userAdditionalFieldsRepository.findAll();
        assertThat(userAdditionalFieldsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchUserAdditionalFields() throws Exception {
        int databaseSizeBeforeUpdate = userAdditionalFieldsRepository.findAll().size();
        userAdditionalFields.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUserAdditionalFieldsMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(userAdditionalFields))
            )
            .andExpect(status().isBadRequest());

        // Validate the UserAdditionalFields in the database
        List<UserAdditionalFields> userAdditionalFieldsList = userAdditionalFieldsRepository.findAll();
        assertThat(userAdditionalFieldsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamUserAdditionalFields() throws Exception {
        int databaseSizeBeforeUpdate = userAdditionalFieldsRepository.findAll().size();
        userAdditionalFields.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUserAdditionalFieldsMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(userAdditionalFields))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the UserAdditionalFields in the database
        List<UserAdditionalFields> userAdditionalFieldsList = userAdditionalFieldsRepository.findAll();
        assertThat(userAdditionalFieldsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateUserAdditionalFieldsWithPatch() throws Exception {
        // Initialize the database
        userAdditionalFieldsRepository.saveAndFlush(userAdditionalFields);

        int databaseSizeBeforeUpdate = userAdditionalFieldsRepository.findAll().size();

        // Update the userAdditionalFields using partial update
        UserAdditionalFields partialUpdatedUserAdditionalFields = new UserAdditionalFields();
        partialUpdatedUserAdditionalFields.setId(userAdditionalFields.getId());

        partialUpdatedUserAdditionalFields.expiry(UPDATED_EXPIRY);

        restUserAdditionalFieldsMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedUserAdditionalFields.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedUserAdditionalFields))
            )
            .andExpect(status().isOk());

        // Validate the UserAdditionalFields in the database
        List<UserAdditionalFields> userAdditionalFieldsList = userAdditionalFieldsRepository.findAll();
        assertThat(userAdditionalFieldsList).hasSize(databaseSizeBeforeUpdate);
        UserAdditionalFields testUserAdditionalFields = userAdditionalFieldsList.get(userAdditionalFieldsList.size() - 1);
        assertThat(testUserAdditionalFields.getExpiry()).isEqualTo(UPDATED_EXPIRY);
        assertThat(testUserAdditionalFields.getRegistrationDate()).isEqualTo(DEFAULT_REGISTRATION_DATE);
        assertThat(testUserAdditionalFields.getThemePicture()).isEqualTo(DEFAULT_THEME_PICTURE);
    }

    @Test
    @Transactional
    void fullUpdateUserAdditionalFieldsWithPatch() throws Exception {
        // Initialize the database
        userAdditionalFieldsRepository.saveAndFlush(userAdditionalFields);

        int databaseSizeBeforeUpdate = userAdditionalFieldsRepository.findAll().size();

        // Update the userAdditionalFields using partial update
        UserAdditionalFields partialUpdatedUserAdditionalFields = new UserAdditionalFields();
        partialUpdatedUserAdditionalFields.setId(userAdditionalFields.getId());

        partialUpdatedUserAdditionalFields
            .expiry(UPDATED_EXPIRY)
            .registrationDate(UPDATED_REGISTRATION_DATE)
            .themePicture(UPDATED_THEME_PICTURE);

        restUserAdditionalFieldsMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedUserAdditionalFields.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedUserAdditionalFields))
            )
            .andExpect(status().isOk());

        // Validate the UserAdditionalFields in the database
        List<UserAdditionalFields> userAdditionalFieldsList = userAdditionalFieldsRepository.findAll();
        assertThat(userAdditionalFieldsList).hasSize(databaseSizeBeforeUpdate);
        UserAdditionalFields testUserAdditionalFields = userAdditionalFieldsList.get(userAdditionalFieldsList.size() - 1);
        assertThat(testUserAdditionalFields.getExpiry()).isEqualTo(UPDATED_EXPIRY);
        assertThat(testUserAdditionalFields.getRegistrationDate()).isEqualTo(UPDATED_REGISTRATION_DATE);
        assertThat(testUserAdditionalFields.getThemePicture()).isEqualTo(UPDATED_THEME_PICTURE);
    }

    @Test
    @Transactional
    void patchNonExistingUserAdditionalFields() throws Exception {
        int databaseSizeBeforeUpdate = userAdditionalFieldsRepository.findAll().size();
        userAdditionalFields.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUserAdditionalFieldsMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, userAdditionalFields.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(userAdditionalFields))
            )
            .andExpect(status().isBadRequest());

        // Validate the UserAdditionalFields in the database
        List<UserAdditionalFields> userAdditionalFieldsList = userAdditionalFieldsRepository.findAll();
        assertThat(userAdditionalFieldsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchUserAdditionalFields() throws Exception {
        int databaseSizeBeforeUpdate = userAdditionalFieldsRepository.findAll().size();
        userAdditionalFields.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUserAdditionalFieldsMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(userAdditionalFields))
            )
            .andExpect(status().isBadRequest());

        // Validate the UserAdditionalFields in the database
        List<UserAdditionalFields> userAdditionalFieldsList = userAdditionalFieldsRepository.findAll();
        assertThat(userAdditionalFieldsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamUserAdditionalFields() throws Exception {
        int databaseSizeBeforeUpdate = userAdditionalFieldsRepository.findAll().size();
        userAdditionalFields.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUserAdditionalFieldsMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(userAdditionalFields))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the UserAdditionalFields in the database
        List<UserAdditionalFields> userAdditionalFieldsList = userAdditionalFieldsRepository.findAll();
        assertThat(userAdditionalFieldsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteUserAdditionalFields() throws Exception {
        // Initialize the database
        userAdditionalFieldsRepository.saveAndFlush(userAdditionalFields);

        int databaseSizeBeforeDelete = userAdditionalFieldsRepository.findAll().size();

        // Delete the userAdditionalFields
        restUserAdditionalFieldsMockMvc
            .perform(delete(ENTITY_API_URL_ID, userAdditionalFields.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<UserAdditionalFields> userAdditionalFieldsList = userAdditionalFieldsRepository.findAll();
        assertThat(userAdditionalFieldsList).hasSize(databaseSizeBeforeDelete - 1);
    }
}

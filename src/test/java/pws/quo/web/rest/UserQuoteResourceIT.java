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
import pws.quo.domain.Quote;
import pws.quo.domain.User;
import pws.quo.domain.UserQuote;
import pws.quo.repository.UserQuoteRepository;
import pws.quo.service.UserQuoteService;
import pws.quo.service.criteria.UserQuoteCriteria;

/**
 * Integration tests for the {@link UserQuoteResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class UserQuoteResourceIT {

    private static final Boolean DEFAULT_FAVOURITE = false;
    private static final Boolean UPDATED_FAVOURITE = true;

    private static final Instant DEFAULT_TIME = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_TIME = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String ENTITY_API_URL = "/api/user-quotes";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private UserQuoteRepository userQuoteRepository;

    @Mock
    private UserQuoteRepository userQuoteRepositoryMock;

    @Mock
    private UserQuoteService userQuoteServiceMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restUserQuoteMockMvc;

    private UserQuote userQuote;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UserQuote createEntity(EntityManager em) {
        UserQuote userQuote = new UserQuote().favourite(DEFAULT_FAVOURITE).time(DEFAULT_TIME);
        return userQuote;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UserQuote createUpdatedEntity(EntityManager em) {
        UserQuote userQuote = new UserQuote().favourite(UPDATED_FAVOURITE).time(UPDATED_TIME);
        return userQuote;
    }

    @BeforeEach
    public void initTest() {
        userQuote = createEntity(em);
    }

    @Test
    @Transactional
    void createUserQuote() throws Exception {
        int databaseSizeBeforeCreate = userQuoteRepository.findAll().size();
        // Create the UserQuote
        restUserQuoteMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(userQuote)))
            .andExpect(status().isCreated());

        // Validate the UserQuote in the database
        List<UserQuote> userQuoteList = userQuoteRepository.findAll();
        assertThat(userQuoteList).hasSize(databaseSizeBeforeCreate + 1);
        UserQuote testUserQuote = userQuoteList.get(userQuoteList.size() - 1);
        assertThat(testUserQuote.getFavourite()).isEqualTo(DEFAULT_FAVOURITE);
        assertThat(testUserQuote.getTime()).isEqualTo(DEFAULT_TIME);
    }

    @Test
    @Transactional
    void createUserQuoteWithExistingId() throws Exception {
        // Create the UserQuote with an existing ID
        userQuote.setId(1L);

        int databaseSizeBeforeCreate = userQuoteRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restUserQuoteMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(userQuote)))
            .andExpect(status().isBadRequest());

        // Validate the UserQuote in the database
        List<UserQuote> userQuoteList = userQuoteRepository.findAll();
        assertThat(userQuoteList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllUserQuotes() throws Exception {
        // Initialize the database
        userQuoteRepository.saveAndFlush(userQuote);

        // Get all the userQuoteList
        restUserQuoteMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(userQuote.getId().intValue())))
            .andExpect(jsonPath("$.[*].favourite").value(hasItem(DEFAULT_FAVOURITE.booleanValue())))
            .andExpect(jsonPath("$.[*].time").value(hasItem(DEFAULT_TIME.toString())));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllUserQuotesWithEagerRelationshipsIsEnabled() throws Exception {
        when(userQuoteServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restUserQuoteMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(userQuoteServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllUserQuotesWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(userQuoteServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restUserQuoteMockMvc.perform(get(ENTITY_API_URL + "?eagerload=false")).andExpect(status().isOk());
        verify(userQuoteRepositoryMock, times(1)).findAll(any(Pageable.class));
    }

    @Test
    @Transactional
    void getUserQuote() throws Exception {
        // Initialize the database
        userQuoteRepository.saveAndFlush(userQuote);

        // Get the userQuote
        restUserQuoteMockMvc
            .perform(get(ENTITY_API_URL_ID, userQuote.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(userQuote.getId().intValue()))
            .andExpect(jsonPath("$.favourite").value(DEFAULT_FAVOURITE.booleanValue()))
            .andExpect(jsonPath("$.time").value(DEFAULT_TIME.toString()));
    }

    @Test
    @Transactional
    void getUserQuotesByIdFiltering() throws Exception {
        // Initialize the database
        userQuoteRepository.saveAndFlush(userQuote);

        Long id = userQuote.getId();

        defaultUserQuoteShouldBeFound("id.equals=" + id);
        defaultUserQuoteShouldNotBeFound("id.notEquals=" + id);

        defaultUserQuoteShouldBeFound("id.greaterThanOrEqual=" + id);
        defaultUserQuoteShouldNotBeFound("id.greaterThan=" + id);

        defaultUserQuoteShouldBeFound("id.lessThanOrEqual=" + id);
        defaultUserQuoteShouldNotBeFound("id.lessThan=" + id);
    }

    @Test
    @Transactional
    void getAllUserQuotesByFavouriteIsEqualToSomething() throws Exception {
        // Initialize the database
        userQuoteRepository.saveAndFlush(userQuote);

        // Get all the userQuoteList where favourite equals to DEFAULT_FAVOURITE
        defaultUserQuoteShouldBeFound("favourite.equals=" + DEFAULT_FAVOURITE);

        // Get all the userQuoteList where favourite equals to UPDATED_FAVOURITE
        defaultUserQuoteShouldNotBeFound("favourite.equals=" + UPDATED_FAVOURITE);
    }

    @Test
    @Transactional
    void getAllUserQuotesByFavouriteIsInShouldWork() throws Exception {
        // Initialize the database
        userQuoteRepository.saveAndFlush(userQuote);

        // Get all the userQuoteList where favourite in DEFAULT_FAVOURITE or UPDATED_FAVOURITE
        defaultUserQuoteShouldBeFound("favourite.in=" + DEFAULT_FAVOURITE + "," + UPDATED_FAVOURITE);

        // Get all the userQuoteList where favourite equals to UPDATED_FAVOURITE
        defaultUserQuoteShouldNotBeFound("favourite.in=" + UPDATED_FAVOURITE);
    }

    @Test
    @Transactional
    void getAllUserQuotesByFavouriteIsNullOrNotNull() throws Exception {
        // Initialize the database
        userQuoteRepository.saveAndFlush(userQuote);

        // Get all the userQuoteList where favourite is not null
        defaultUserQuoteShouldBeFound("favourite.specified=true");

        // Get all the userQuoteList where favourite is null
        defaultUserQuoteShouldNotBeFound("favourite.specified=false");
    }

    @Test
    @Transactional
    void getAllUserQuotesByTimeIsEqualToSomething() throws Exception {
        // Initialize the database
        userQuoteRepository.saveAndFlush(userQuote);

        // Get all the userQuoteList where time equals to DEFAULT_TIME
        defaultUserQuoteShouldBeFound("time.equals=" + DEFAULT_TIME);

        // Get all the userQuoteList where time equals to UPDATED_TIME
        defaultUserQuoteShouldNotBeFound("time.equals=" + UPDATED_TIME);
    }

    @Test
    @Transactional
    void getAllUserQuotesByTimeIsInShouldWork() throws Exception {
        // Initialize the database
        userQuoteRepository.saveAndFlush(userQuote);

        // Get all the userQuoteList where time in DEFAULT_TIME or UPDATED_TIME
        defaultUserQuoteShouldBeFound("time.in=" + DEFAULT_TIME + "," + UPDATED_TIME);

        // Get all the userQuoteList where time equals to UPDATED_TIME
        defaultUserQuoteShouldNotBeFound("time.in=" + UPDATED_TIME);
    }

    @Test
    @Transactional
    void getAllUserQuotesByTimeIsNullOrNotNull() throws Exception {
        // Initialize the database
        userQuoteRepository.saveAndFlush(userQuote);

        // Get all the userQuoteList where time is not null
        defaultUserQuoteShouldBeFound("time.specified=true");

        // Get all the userQuoteList where time is null
        defaultUserQuoteShouldNotBeFound("time.specified=false");
    }

    @Test
    @Transactional
    void getAllUserQuotesByUserIsEqualToSomething() throws Exception {
        User user;
        if (TestUtil.findAll(em, User.class).isEmpty()) {
            userQuoteRepository.saveAndFlush(userQuote);
            user = UserResourceIT.createEntity(em);
        } else {
            user = TestUtil.findAll(em, User.class).get(0);
        }
        em.persist(user);
        em.flush();
        userQuote.setUser(user);
        userQuoteRepository.saveAndFlush(userQuote);
        Long userId = user.getId();

        // Get all the userQuoteList where user equals to userId
        defaultUserQuoteShouldBeFound("userId.equals=" + userId);

        // Get all the userQuoteList where user equals to (userId + 1)
        defaultUserQuoteShouldNotBeFound("userId.equals=" + (userId + 1));
    }

    @Test
    @Transactional
    void getAllUserQuotesByQuoteIsEqualToSomething() throws Exception {
        Quote quote;
        if (TestUtil.findAll(em, Quote.class).isEmpty()) {
            userQuoteRepository.saveAndFlush(userQuote);
            quote = QuoteResourceIT.createEntity(em);
        } else {
            quote = TestUtil.findAll(em, Quote.class).get(0);
        }
        em.persist(quote);
        em.flush();
        userQuote.setQuote(quote);
        userQuoteRepository.saveAndFlush(userQuote);
        Long quoteId = quote.getId();

        // Get all the userQuoteList where quote equals to quoteId
        defaultUserQuoteShouldBeFound("quoteId.equals=" + quoteId);

        // Get all the userQuoteList where quote equals to (quoteId + 1)
        defaultUserQuoteShouldNotBeFound("quoteId.equals=" + (quoteId + 1));
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultUserQuoteShouldBeFound(String filter) throws Exception {
        restUserQuoteMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(userQuote.getId().intValue())))
            .andExpect(jsonPath("$.[*].favourite").value(hasItem(DEFAULT_FAVOURITE.booleanValue())))
            .andExpect(jsonPath("$.[*].time").value(hasItem(DEFAULT_TIME.toString())));

        // Check, that the count call also returns 1
        restUserQuoteMockMvc
            .perform(get(ENTITY_API_URL + "/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultUserQuoteShouldNotBeFound(String filter) throws Exception {
        restUserQuoteMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restUserQuoteMockMvc
            .perform(get(ENTITY_API_URL + "/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("0"));
    }

    @Test
    @Transactional
    void getNonExistingUserQuote() throws Exception {
        // Get the userQuote
        restUserQuoteMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingUserQuote() throws Exception {
        // Initialize the database
        userQuoteRepository.saveAndFlush(userQuote);

        int databaseSizeBeforeUpdate = userQuoteRepository.findAll().size();

        // Update the userQuote
        UserQuote updatedUserQuote = userQuoteRepository.findById(userQuote.getId()).get();
        // Disconnect from session so that the updates on updatedUserQuote are not directly saved in db
        em.detach(updatedUserQuote);
        updatedUserQuote.favourite(UPDATED_FAVOURITE).time(UPDATED_TIME);

        restUserQuoteMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedUserQuote.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedUserQuote))
            )
            .andExpect(status().isOk());

        // Validate the UserQuote in the database
        List<UserQuote> userQuoteList = userQuoteRepository.findAll();
        assertThat(userQuoteList).hasSize(databaseSizeBeforeUpdate);
        UserQuote testUserQuote = userQuoteList.get(userQuoteList.size() - 1);
        assertThat(testUserQuote.getFavourite()).isEqualTo(UPDATED_FAVOURITE);
        assertThat(testUserQuote.getTime()).isEqualTo(UPDATED_TIME);
    }

    @Test
    @Transactional
    void putNonExistingUserQuote() throws Exception {
        int databaseSizeBeforeUpdate = userQuoteRepository.findAll().size();
        userQuote.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUserQuoteMockMvc
            .perform(
                put(ENTITY_API_URL_ID, userQuote.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(userQuote))
            )
            .andExpect(status().isBadRequest());

        // Validate the UserQuote in the database
        List<UserQuote> userQuoteList = userQuoteRepository.findAll();
        assertThat(userQuoteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchUserQuote() throws Exception {
        int databaseSizeBeforeUpdate = userQuoteRepository.findAll().size();
        userQuote.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUserQuoteMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(userQuote))
            )
            .andExpect(status().isBadRequest());

        // Validate the UserQuote in the database
        List<UserQuote> userQuoteList = userQuoteRepository.findAll();
        assertThat(userQuoteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamUserQuote() throws Exception {
        int databaseSizeBeforeUpdate = userQuoteRepository.findAll().size();
        userQuote.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUserQuoteMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(userQuote)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the UserQuote in the database
        List<UserQuote> userQuoteList = userQuoteRepository.findAll();
        assertThat(userQuoteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateUserQuoteWithPatch() throws Exception {
        // Initialize the database
        userQuoteRepository.saveAndFlush(userQuote);

        int databaseSizeBeforeUpdate = userQuoteRepository.findAll().size();

        // Update the userQuote using partial update
        UserQuote partialUpdatedUserQuote = new UserQuote();
        partialUpdatedUserQuote.setId(userQuote.getId());

        restUserQuoteMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedUserQuote.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedUserQuote))
            )
            .andExpect(status().isOk());

        // Validate the UserQuote in the database
        List<UserQuote> userQuoteList = userQuoteRepository.findAll();
        assertThat(userQuoteList).hasSize(databaseSizeBeforeUpdate);
        UserQuote testUserQuote = userQuoteList.get(userQuoteList.size() - 1);
        assertThat(testUserQuote.getFavourite()).isEqualTo(DEFAULT_FAVOURITE);
        assertThat(testUserQuote.getTime()).isEqualTo(DEFAULT_TIME);
    }

    @Test
    @Transactional
    void fullUpdateUserQuoteWithPatch() throws Exception {
        // Initialize the database
        userQuoteRepository.saveAndFlush(userQuote);

        int databaseSizeBeforeUpdate = userQuoteRepository.findAll().size();

        // Update the userQuote using partial update
        UserQuote partialUpdatedUserQuote = new UserQuote();
        partialUpdatedUserQuote.setId(userQuote.getId());

        partialUpdatedUserQuote.favourite(UPDATED_FAVOURITE).time(UPDATED_TIME);

        restUserQuoteMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedUserQuote.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedUserQuote))
            )
            .andExpect(status().isOk());

        // Validate the UserQuote in the database
        List<UserQuote> userQuoteList = userQuoteRepository.findAll();
        assertThat(userQuoteList).hasSize(databaseSizeBeforeUpdate);
        UserQuote testUserQuote = userQuoteList.get(userQuoteList.size() - 1);
        assertThat(testUserQuote.getFavourite()).isEqualTo(UPDATED_FAVOURITE);
        assertThat(testUserQuote.getTime()).isEqualTo(UPDATED_TIME);
    }

    @Test
    @Transactional
    void patchNonExistingUserQuote() throws Exception {
        int databaseSizeBeforeUpdate = userQuoteRepository.findAll().size();
        userQuote.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUserQuoteMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, userQuote.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(userQuote))
            )
            .andExpect(status().isBadRequest());

        // Validate the UserQuote in the database
        List<UserQuote> userQuoteList = userQuoteRepository.findAll();
        assertThat(userQuoteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchUserQuote() throws Exception {
        int databaseSizeBeforeUpdate = userQuoteRepository.findAll().size();
        userQuote.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUserQuoteMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(userQuote))
            )
            .andExpect(status().isBadRequest());

        // Validate the UserQuote in the database
        List<UserQuote> userQuoteList = userQuoteRepository.findAll();
        assertThat(userQuoteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamUserQuote() throws Exception {
        int databaseSizeBeforeUpdate = userQuoteRepository.findAll().size();
        userQuote.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUserQuoteMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(userQuote))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the UserQuote in the database
        List<UserQuote> userQuoteList = userQuoteRepository.findAll();
        assertThat(userQuoteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteUserQuote() throws Exception {
        // Initialize the database
        userQuoteRepository.saveAndFlush(userQuote);

        int databaseSizeBeforeDelete = userQuoteRepository.findAll().size();

        // Delete the userQuote
        restUserQuoteMockMvc
            .perform(delete(ENTITY_API_URL_ID, userQuote.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<UserQuote> userQuoteList = userQuoteRepository.findAll();
        assertThat(userQuoteList).hasSize(databaseSizeBeforeDelete - 1);
    }
}

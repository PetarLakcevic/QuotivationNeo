package pws.quo.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

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
import pws.quo.domain.QuoteSuggestion;
import pws.quo.domain.User;
import pws.quo.repository.QuoteSuggestionRepository;
import pws.quo.service.QuoteSuggestionService;
import pws.quo.service.criteria.QuoteSuggestionCriteria;

/**
 * Integration tests for the {@link QuoteSuggestionResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class QuoteSuggestionResourceIT {

    private static final String DEFAULT_AUTHOR = "AAAAAAAAAA";
    private static final String UPDATED_AUTHOR = "BBBBBBBBBB";

    private static final String DEFAULT_TEXT = "AAAAAAAAAA";
    private static final String UPDATED_TEXT = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/quote-suggestions";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private QuoteSuggestionRepository quoteSuggestionRepository;

    @Mock
    private QuoteSuggestionRepository quoteSuggestionRepositoryMock;

    @Mock
    private QuoteSuggestionService quoteSuggestionServiceMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restQuoteSuggestionMockMvc;

    private QuoteSuggestion quoteSuggestion;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static QuoteSuggestion createEntity(EntityManager em) {
        QuoteSuggestion quoteSuggestion = new QuoteSuggestion().author(DEFAULT_AUTHOR).text(DEFAULT_TEXT);
        return quoteSuggestion;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static QuoteSuggestion createUpdatedEntity(EntityManager em) {
        QuoteSuggestion quoteSuggestion = new QuoteSuggestion().author(UPDATED_AUTHOR).text(UPDATED_TEXT);
        return quoteSuggestion;
    }

    @BeforeEach
    public void initTest() {
        quoteSuggestion = createEntity(em);
    }

    @Test
    @Transactional
    void createQuoteSuggestion() throws Exception {
        int databaseSizeBeforeCreate = quoteSuggestionRepository.findAll().size();
        // Create the QuoteSuggestion
        restQuoteSuggestionMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(quoteSuggestion))
            )
            .andExpect(status().isCreated());

        // Validate the QuoteSuggestion in the database
        List<QuoteSuggestion> quoteSuggestionList = quoteSuggestionRepository.findAll();
        assertThat(quoteSuggestionList).hasSize(databaseSizeBeforeCreate + 1);
        QuoteSuggestion testQuoteSuggestion = quoteSuggestionList.get(quoteSuggestionList.size() - 1);
        assertThat(testQuoteSuggestion.getAuthor()).isEqualTo(DEFAULT_AUTHOR);
        assertThat(testQuoteSuggestion.getText()).isEqualTo(DEFAULT_TEXT);
    }

    @Test
    @Transactional
    void createQuoteSuggestionWithExistingId() throws Exception {
        // Create the QuoteSuggestion with an existing ID
        quoteSuggestion.setId(1L);

        int databaseSizeBeforeCreate = quoteSuggestionRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restQuoteSuggestionMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(quoteSuggestion))
            )
            .andExpect(status().isBadRequest());

        // Validate the QuoteSuggestion in the database
        List<QuoteSuggestion> quoteSuggestionList = quoteSuggestionRepository.findAll();
        assertThat(quoteSuggestionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkTextIsRequired() throws Exception {
        int databaseSizeBeforeTest = quoteSuggestionRepository.findAll().size();
        // set the field null
        quoteSuggestion.setText(null);

        // Create the QuoteSuggestion, which fails.

        restQuoteSuggestionMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(quoteSuggestion))
            )
            .andExpect(status().isBadRequest());

        List<QuoteSuggestion> quoteSuggestionList = quoteSuggestionRepository.findAll();
        assertThat(quoteSuggestionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllQuoteSuggestions() throws Exception {
        // Initialize the database
        quoteSuggestionRepository.saveAndFlush(quoteSuggestion);

        // Get all the quoteSuggestionList
        restQuoteSuggestionMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(quoteSuggestion.getId().intValue())))
            .andExpect(jsonPath("$.[*].author").value(hasItem(DEFAULT_AUTHOR)))
            .andExpect(jsonPath("$.[*].text").value(hasItem(DEFAULT_TEXT)));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllQuoteSuggestionsWithEagerRelationshipsIsEnabled() throws Exception {
        when(quoteSuggestionServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restQuoteSuggestionMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(quoteSuggestionServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllQuoteSuggestionsWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(quoteSuggestionServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restQuoteSuggestionMockMvc.perform(get(ENTITY_API_URL + "?eagerload=false")).andExpect(status().isOk());
        verify(quoteSuggestionRepositoryMock, times(1)).findAll(any(Pageable.class));
    }

    @Test
    @Transactional
    void getQuoteSuggestion() throws Exception {
        // Initialize the database
        quoteSuggestionRepository.saveAndFlush(quoteSuggestion);

        // Get the quoteSuggestion
        restQuoteSuggestionMockMvc
            .perform(get(ENTITY_API_URL_ID, quoteSuggestion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(quoteSuggestion.getId().intValue()))
            .andExpect(jsonPath("$.author").value(DEFAULT_AUTHOR))
            .andExpect(jsonPath("$.text").value(DEFAULT_TEXT));
    }

    @Test
    @Transactional
    void getQuoteSuggestionsByIdFiltering() throws Exception {
        // Initialize the database
        quoteSuggestionRepository.saveAndFlush(quoteSuggestion);

        Long id = quoteSuggestion.getId();

        defaultQuoteSuggestionShouldBeFound("id.equals=" + id);
        defaultQuoteSuggestionShouldNotBeFound("id.notEquals=" + id);

        defaultQuoteSuggestionShouldBeFound("id.greaterThanOrEqual=" + id);
        defaultQuoteSuggestionShouldNotBeFound("id.greaterThan=" + id);

        defaultQuoteSuggestionShouldBeFound("id.lessThanOrEqual=" + id);
        defaultQuoteSuggestionShouldNotBeFound("id.lessThan=" + id);
    }

    @Test
    @Transactional
    void getAllQuoteSuggestionsByAuthorIsEqualToSomething() throws Exception {
        // Initialize the database
        quoteSuggestionRepository.saveAndFlush(quoteSuggestion);

        // Get all the quoteSuggestionList where author equals to DEFAULT_AUTHOR
        defaultQuoteSuggestionShouldBeFound("author.equals=" + DEFAULT_AUTHOR);

        // Get all the quoteSuggestionList where author equals to UPDATED_AUTHOR
        defaultQuoteSuggestionShouldNotBeFound("author.equals=" + UPDATED_AUTHOR);
    }

    @Test
    @Transactional
    void getAllQuoteSuggestionsByAuthorIsInShouldWork() throws Exception {
        // Initialize the database
        quoteSuggestionRepository.saveAndFlush(quoteSuggestion);

        // Get all the quoteSuggestionList where author in DEFAULT_AUTHOR or UPDATED_AUTHOR
        defaultQuoteSuggestionShouldBeFound("author.in=" + DEFAULT_AUTHOR + "," + UPDATED_AUTHOR);

        // Get all the quoteSuggestionList where author equals to UPDATED_AUTHOR
        defaultQuoteSuggestionShouldNotBeFound("author.in=" + UPDATED_AUTHOR);
    }

    @Test
    @Transactional
    void getAllQuoteSuggestionsByAuthorIsNullOrNotNull() throws Exception {
        // Initialize the database
        quoteSuggestionRepository.saveAndFlush(quoteSuggestion);

        // Get all the quoteSuggestionList where author is not null
        defaultQuoteSuggestionShouldBeFound("author.specified=true");

        // Get all the quoteSuggestionList where author is null
        defaultQuoteSuggestionShouldNotBeFound("author.specified=false");
    }

    @Test
    @Transactional
    void getAllQuoteSuggestionsByAuthorContainsSomething() throws Exception {
        // Initialize the database
        quoteSuggestionRepository.saveAndFlush(quoteSuggestion);

        // Get all the quoteSuggestionList where author contains DEFAULT_AUTHOR
        defaultQuoteSuggestionShouldBeFound("author.contains=" + DEFAULT_AUTHOR);

        // Get all the quoteSuggestionList where author contains UPDATED_AUTHOR
        defaultQuoteSuggestionShouldNotBeFound("author.contains=" + UPDATED_AUTHOR);
    }

    @Test
    @Transactional
    void getAllQuoteSuggestionsByAuthorNotContainsSomething() throws Exception {
        // Initialize the database
        quoteSuggestionRepository.saveAndFlush(quoteSuggestion);

        // Get all the quoteSuggestionList where author does not contain DEFAULT_AUTHOR
        defaultQuoteSuggestionShouldNotBeFound("author.doesNotContain=" + DEFAULT_AUTHOR);

        // Get all the quoteSuggestionList where author does not contain UPDATED_AUTHOR
        defaultQuoteSuggestionShouldBeFound("author.doesNotContain=" + UPDATED_AUTHOR);
    }

    @Test
    @Transactional
    void getAllQuoteSuggestionsByTextIsEqualToSomething() throws Exception {
        // Initialize the database
        quoteSuggestionRepository.saveAndFlush(quoteSuggestion);

        // Get all the quoteSuggestionList where text equals to DEFAULT_TEXT
        defaultQuoteSuggestionShouldBeFound("text.equals=" + DEFAULT_TEXT);

        // Get all the quoteSuggestionList where text equals to UPDATED_TEXT
        defaultQuoteSuggestionShouldNotBeFound("text.equals=" + UPDATED_TEXT);
    }

    @Test
    @Transactional
    void getAllQuoteSuggestionsByTextIsInShouldWork() throws Exception {
        // Initialize the database
        quoteSuggestionRepository.saveAndFlush(quoteSuggestion);

        // Get all the quoteSuggestionList where text in DEFAULT_TEXT or UPDATED_TEXT
        defaultQuoteSuggestionShouldBeFound("text.in=" + DEFAULT_TEXT + "," + UPDATED_TEXT);

        // Get all the quoteSuggestionList where text equals to UPDATED_TEXT
        defaultQuoteSuggestionShouldNotBeFound("text.in=" + UPDATED_TEXT);
    }

    @Test
    @Transactional
    void getAllQuoteSuggestionsByTextIsNullOrNotNull() throws Exception {
        // Initialize the database
        quoteSuggestionRepository.saveAndFlush(quoteSuggestion);

        // Get all the quoteSuggestionList where text is not null
        defaultQuoteSuggestionShouldBeFound("text.specified=true");

        // Get all the quoteSuggestionList where text is null
        defaultQuoteSuggestionShouldNotBeFound("text.specified=false");
    }

    @Test
    @Transactional
    void getAllQuoteSuggestionsByTextContainsSomething() throws Exception {
        // Initialize the database
        quoteSuggestionRepository.saveAndFlush(quoteSuggestion);

        // Get all the quoteSuggestionList where text contains DEFAULT_TEXT
        defaultQuoteSuggestionShouldBeFound("text.contains=" + DEFAULT_TEXT);

        // Get all the quoteSuggestionList where text contains UPDATED_TEXT
        defaultQuoteSuggestionShouldNotBeFound("text.contains=" + UPDATED_TEXT);
    }

    @Test
    @Transactional
    void getAllQuoteSuggestionsByTextNotContainsSomething() throws Exception {
        // Initialize the database
        quoteSuggestionRepository.saveAndFlush(quoteSuggestion);

        // Get all the quoteSuggestionList where text does not contain DEFAULT_TEXT
        defaultQuoteSuggestionShouldNotBeFound("text.doesNotContain=" + DEFAULT_TEXT);

        // Get all the quoteSuggestionList where text does not contain UPDATED_TEXT
        defaultQuoteSuggestionShouldBeFound("text.doesNotContain=" + UPDATED_TEXT);
    }

    @Test
    @Transactional
    void getAllQuoteSuggestionsByUserIsEqualToSomething() throws Exception {
        User user;
        if (TestUtil.findAll(em, User.class).isEmpty()) {
            quoteSuggestionRepository.saveAndFlush(quoteSuggestion);
            user = UserResourceIT.createEntity(em);
        } else {
            user = TestUtil.findAll(em, User.class).get(0);
        }
        em.persist(user);
        em.flush();
        quoteSuggestion.setUser(user);
        quoteSuggestionRepository.saveAndFlush(quoteSuggestion);
        Long userId = user.getId();

        // Get all the quoteSuggestionList where user equals to userId
        defaultQuoteSuggestionShouldBeFound("userId.equals=" + userId);

        // Get all the quoteSuggestionList where user equals to (userId + 1)
        defaultQuoteSuggestionShouldNotBeFound("userId.equals=" + (userId + 1));
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultQuoteSuggestionShouldBeFound(String filter) throws Exception {
        restQuoteSuggestionMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(quoteSuggestion.getId().intValue())))
            .andExpect(jsonPath("$.[*].author").value(hasItem(DEFAULT_AUTHOR)))
            .andExpect(jsonPath("$.[*].text").value(hasItem(DEFAULT_TEXT)));

        // Check, that the count call also returns 1
        restQuoteSuggestionMockMvc
            .perform(get(ENTITY_API_URL + "/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultQuoteSuggestionShouldNotBeFound(String filter) throws Exception {
        restQuoteSuggestionMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restQuoteSuggestionMockMvc
            .perform(get(ENTITY_API_URL + "/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("0"));
    }

    @Test
    @Transactional
    void getNonExistingQuoteSuggestion() throws Exception {
        // Get the quoteSuggestion
        restQuoteSuggestionMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingQuoteSuggestion() throws Exception {
        // Initialize the database
        quoteSuggestionRepository.saveAndFlush(quoteSuggestion);

        int databaseSizeBeforeUpdate = quoteSuggestionRepository.findAll().size();

        // Update the quoteSuggestion
        QuoteSuggestion updatedQuoteSuggestion = quoteSuggestionRepository.findById(quoteSuggestion.getId()).get();
        // Disconnect from session so that the updates on updatedQuoteSuggestion are not directly saved in db
        em.detach(updatedQuoteSuggestion);
        updatedQuoteSuggestion.author(UPDATED_AUTHOR).text(UPDATED_TEXT);

        restQuoteSuggestionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedQuoteSuggestion.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedQuoteSuggestion))
            )
            .andExpect(status().isOk());

        // Validate the QuoteSuggestion in the database
        List<QuoteSuggestion> quoteSuggestionList = quoteSuggestionRepository.findAll();
        assertThat(quoteSuggestionList).hasSize(databaseSizeBeforeUpdate);
        QuoteSuggestion testQuoteSuggestion = quoteSuggestionList.get(quoteSuggestionList.size() - 1);
        assertThat(testQuoteSuggestion.getAuthor()).isEqualTo(UPDATED_AUTHOR);
        assertThat(testQuoteSuggestion.getText()).isEqualTo(UPDATED_TEXT);
    }

    @Test
    @Transactional
    void putNonExistingQuoteSuggestion() throws Exception {
        int databaseSizeBeforeUpdate = quoteSuggestionRepository.findAll().size();
        quoteSuggestion.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restQuoteSuggestionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, quoteSuggestion.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(quoteSuggestion))
            )
            .andExpect(status().isBadRequest());

        // Validate the QuoteSuggestion in the database
        List<QuoteSuggestion> quoteSuggestionList = quoteSuggestionRepository.findAll();
        assertThat(quoteSuggestionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchQuoteSuggestion() throws Exception {
        int databaseSizeBeforeUpdate = quoteSuggestionRepository.findAll().size();
        quoteSuggestion.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restQuoteSuggestionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(quoteSuggestion))
            )
            .andExpect(status().isBadRequest());

        // Validate the QuoteSuggestion in the database
        List<QuoteSuggestion> quoteSuggestionList = quoteSuggestionRepository.findAll();
        assertThat(quoteSuggestionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamQuoteSuggestion() throws Exception {
        int databaseSizeBeforeUpdate = quoteSuggestionRepository.findAll().size();
        quoteSuggestion.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restQuoteSuggestionMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(quoteSuggestion))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the QuoteSuggestion in the database
        List<QuoteSuggestion> quoteSuggestionList = quoteSuggestionRepository.findAll();
        assertThat(quoteSuggestionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateQuoteSuggestionWithPatch() throws Exception {
        // Initialize the database
        quoteSuggestionRepository.saveAndFlush(quoteSuggestion);

        int databaseSizeBeforeUpdate = quoteSuggestionRepository.findAll().size();

        // Update the quoteSuggestion using partial update
        QuoteSuggestion partialUpdatedQuoteSuggestion = new QuoteSuggestion();
        partialUpdatedQuoteSuggestion.setId(quoteSuggestion.getId());

        partialUpdatedQuoteSuggestion.author(UPDATED_AUTHOR).text(UPDATED_TEXT);

        restQuoteSuggestionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedQuoteSuggestion.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedQuoteSuggestion))
            )
            .andExpect(status().isOk());

        // Validate the QuoteSuggestion in the database
        List<QuoteSuggestion> quoteSuggestionList = quoteSuggestionRepository.findAll();
        assertThat(quoteSuggestionList).hasSize(databaseSizeBeforeUpdate);
        QuoteSuggestion testQuoteSuggestion = quoteSuggestionList.get(quoteSuggestionList.size() - 1);
        assertThat(testQuoteSuggestion.getAuthor()).isEqualTo(UPDATED_AUTHOR);
        assertThat(testQuoteSuggestion.getText()).isEqualTo(UPDATED_TEXT);
    }

    @Test
    @Transactional
    void fullUpdateQuoteSuggestionWithPatch() throws Exception {
        // Initialize the database
        quoteSuggestionRepository.saveAndFlush(quoteSuggestion);

        int databaseSizeBeforeUpdate = quoteSuggestionRepository.findAll().size();

        // Update the quoteSuggestion using partial update
        QuoteSuggestion partialUpdatedQuoteSuggestion = new QuoteSuggestion();
        partialUpdatedQuoteSuggestion.setId(quoteSuggestion.getId());

        partialUpdatedQuoteSuggestion.author(UPDATED_AUTHOR).text(UPDATED_TEXT);

        restQuoteSuggestionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedQuoteSuggestion.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedQuoteSuggestion))
            )
            .andExpect(status().isOk());

        // Validate the QuoteSuggestion in the database
        List<QuoteSuggestion> quoteSuggestionList = quoteSuggestionRepository.findAll();
        assertThat(quoteSuggestionList).hasSize(databaseSizeBeforeUpdate);
        QuoteSuggestion testQuoteSuggestion = quoteSuggestionList.get(quoteSuggestionList.size() - 1);
        assertThat(testQuoteSuggestion.getAuthor()).isEqualTo(UPDATED_AUTHOR);
        assertThat(testQuoteSuggestion.getText()).isEqualTo(UPDATED_TEXT);
    }

    @Test
    @Transactional
    void patchNonExistingQuoteSuggestion() throws Exception {
        int databaseSizeBeforeUpdate = quoteSuggestionRepository.findAll().size();
        quoteSuggestion.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restQuoteSuggestionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, quoteSuggestion.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(quoteSuggestion))
            )
            .andExpect(status().isBadRequest());

        // Validate the QuoteSuggestion in the database
        List<QuoteSuggestion> quoteSuggestionList = quoteSuggestionRepository.findAll();
        assertThat(quoteSuggestionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchQuoteSuggestion() throws Exception {
        int databaseSizeBeforeUpdate = quoteSuggestionRepository.findAll().size();
        quoteSuggestion.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restQuoteSuggestionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(quoteSuggestion))
            )
            .andExpect(status().isBadRequest());

        // Validate the QuoteSuggestion in the database
        List<QuoteSuggestion> quoteSuggestionList = quoteSuggestionRepository.findAll();
        assertThat(quoteSuggestionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamQuoteSuggestion() throws Exception {
        int databaseSizeBeforeUpdate = quoteSuggestionRepository.findAll().size();
        quoteSuggestion.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restQuoteSuggestionMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(quoteSuggestion))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the QuoteSuggestion in the database
        List<QuoteSuggestion> quoteSuggestionList = quoteSuggestionRepository.findAll();
        assertThat(quoteSuggestionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteQuoteSuggestion() throws Exception {
        // Initialize the database
        quoteSuggestionRepository.saveAndFlush(quoteSuggestion);

        int databaseSizeBeforeDelete = quoteSuggestionRepository.findAll().size();

        // Delete the quoteSuggestion
        restQuoteSuggestionMockMvc
            .perform(delete(ENTITY_API_URL_ID, quoteSuggestion.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<QuoteSuggestion> quoteSuggestionList = quoteSuggestionRepository.findAll();
        assertThat(quoteSuggestionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}

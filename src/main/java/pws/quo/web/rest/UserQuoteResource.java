package pws.quo.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import pws.quo.domain.UserQuote;
import pws.quo.repository.UserQuoteRepository;
import pws.quo.service.UserQuoteQueryService;
import pws.quo.service.UserQuoteService;
import pws.quo.service.criteria.UserQuoteCriteria;
import pws.quo.web.rest.errors.BadRequestAlertException;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link pws.quo.domain.UserQuote}.
 */
@RestController
@RequestMapping("/api")
public class UserQuoteResource {

    private final Logger log = LoggerFactory.getLogger(UserQuoteResource.class);

    private static final String ENTITY_NAME = "userQuote";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final UserQuoteService userQuoteService;

    private final UserQuoteRepository userQuoteRepository;

    private final UserQuoteQueryService userQuoteQueryService;

    public UserQuoteResource(
        UserQuoteService userQuoteService,
        UserQuoteRepository userQuoteRepository,
        UserQuoteQueryService userQuoteQueryService
    ) {
        this.userQuoteService = userQuoteService;
        this.userQuoteRepository = userQuoteRepository;
        this.userQuoteQueryService = userQuoteQueryService;
    }

    /**
     * {@code POST  /user-quotes} : Create a new userQuote.
     *
     * @param userQuote the userQuote to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new userQuote, or with status {@code 400 (Bad Request)} if the userQuote has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/user-quotes")
    public ResponseEntity<UserQuote> createUserQuote(@RequestBody UserQuote userQuote) throws URISyntaxException {
        log.debug("REST request to save UserQuote : {}", userQuote);
        if (userQuote.getId() != null) {
            throw new BadRequestAlertException("A new userQuote cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UserQuote result = userQuoteService.save(userQuote);
        return ResponseEntity
            .created(new URI("/api/user-quotes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /user-quotes/:id} : Updates an existing userQuote.
     *
     * @param id the id of the userQuote to save.
     * @param userQuote the userQuote to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated userQuote,
     * or with status {@code 400 (Bad Request)} if the userQuote is not valid,
     * or with status {@code 500 (Internal Server Error)} if the userQuote couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/user-quotes/{id}")
    public ResponseEntity<UserQuote> updateUserQuote(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody UserQuote userQuote
    ) throws URISyntaxException {
        log.debug("REST request to update UserQuote : {}, {}", id, userQuote);
        if (userQuote.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, userQuote.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!userQuoteRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        UserQuote result = userQuoteService.update(userQuote);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, userQuote.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /user-quotes/:id} : Partial updates given fields of an existing userQuote, field will ignore if it is null
     *
     * @param id the id of the userQuote to save.
     * @param userQuote the userQuote to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated userQuote,
     * or with status {@code 400 (Bad Request)} if the userQuote is not valid,
     * or with status {@code 404 (Not Found)} if the userQuote is not found,
     * or with status {@code 500 (Internal Server Error)} if the userQuote couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/user-quotes/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<UserQuote> partialUpdateUserQuote(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody UserQuote userQuote
    ) throws URISyntaxException {
        log.debug("REST request to partial update UserQuote partially : {}, {}", id, userQuote);
        if (userQuote.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, userQuote.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!userQuoteRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<UserQuote> result = userQuoteService.partialUpdate(userQuote);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, userQuote.getId().toString())
        );
    }

    /**
     * {@code GET  /user-quotes} : get all the userQuotes.
     *
     * @param pageable the pagination information.
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of userQuotes in body.
     */
    @GetMapping("/user-quotes")
    public ResponseEntity<List<UserQuote>> getAllUserQuotes(
        UserQuoteCriteria criteria,
        @org.springdoc.api.annotations.ParameterObject Pageable pageable
    ) {
        log.debug("REST request to get UserQuotes by criteria: {}", criteria);
        Page<UserQuote> page = userQuoteQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /user-quotes/count} : count all the userQuotes.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/user-quotes/count")
    public ResponseEntity<Long> countUserQuotes(UserQuoteCriteria criteria) {
        log.debug("REST request to count UserQuotes by criteria: {}", criteria);
        return ResponseEntity.ok().body(userQuoteQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /user-quotes/:id} : get the "id" userQuote.
     *
     * @param id the id of the userQuote to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the userQuote, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/user-quotes/{id}")
    public ResponseEntity<UserQuote> getUserQuote(@PathVariable Long id) {
        log.debug("REST request to get UserQuote : {}", id);
        Optional<UserQuote> userQuote = userQuoteService.findOne(id);
        return ResponseUtil.wrapOrNotFound(userQuote);
    }

    /**
     * {@code DELETE  /user-quotes/:id} : delete the "id" userQuote.
     *
     * @param id the id of the userQuote to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/user-quotes/{id}")
    public ResponseEntity<Void> deleteUserQuote(@PathVariable Long id) {
        log.debug("REST request to delete UserQuote : {}", id);
        userQuoteService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}

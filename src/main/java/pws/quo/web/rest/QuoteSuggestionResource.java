package pws.quo.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import pws.quo.domain.QuoteSuggestion;
import pws.quo.domain.User;
import pws.quo.repository.QuoteSuggestionRepository;
import pws.quo.service.QuoteSuggestionQueryService;
import pws.quo.service.QuoteSuggestionService;
import pws.quo.service.criteria.QuoteSuggestionCriteria;
import pws.quo.web.rest.errors.BadRequestAlertException;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link pws.quo.domain.QuoteSuggestion}.
 */
@RestController
@RequestMapping("/api")
public class QuoteSuggestionResource {

    private final Logger log = LoggerFactory.getLogger(QuoteSuggestionResource.class);

    private static final String ENTITY_NAME = "quoteSuggestion";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final QuoteSuggestionService quoteSuggestionService;

    private final QuoteSuggestionRepository quoteSuggestionRepository;

    private final QuoteSuggestionQueryService quoteSuggestionQueryService;

    public QuoteSuggestionResource(
        QuoteSuggestionService quoteSuggestionService,
        QuoteSuggestionRepository quoteSuggestionRepository,
        QuoteSuggestionQueryService quoteSuggestionQueryService
    ) {
        this.quoteSuggestionService = quoteSuggestionService;
        this.quoteSuggestionRepository = quoteSuggestionRepository;
        this.quoteSuggestionQueryService = quoteSuggestionQueryService;
    }

    /**
     * {@code POST  /quote-suggestions} : Create a new quoteSuggestion.
     *
     * @param quoteSuggestion the quoteSuggestion to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new quoteSuggestion, or with status {@code 400 (Bad Request)} if the quoteSuggestion has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/quote-suggestions")
    public ResponseEntity<QuoteSuggestion> createQuoteSuggestion(@Valid @RequestBody QuoteSuggestion quoteSuggestion)
        throws URISyntaxException {
        log.debug("REST request to save QuoteSuggestion : {}", quoteSuggestion);
        if (quoteSuggestion.getId() != null) {
            throw new BadRequestAlertException("A new quoteSuggestion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        User user = getCurrentUser();
        if (user != null) quoteSuggestion.setUser(user);

        QuoteSuggestion result = quoteSuggestionService.save(quoteSuggestion);
        return ResponseEntity
            .created(new URI("/api/quote-suggestions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return null;
        }
        Object principal = authentication.getPrincipal();
        if (principal instanceof User) {
            return (User) principal;
        }
        return null;
    }
    /**
     * {@code PUT  /quote-suggestions/:id} : Updates an existing quoteSuggestion.
     *
     * @param id the id of the quoteSuggestion to save.
     * @param quoteSuggestion the quoteSuggestion to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated quoteSuggestion,
     * or with status {@code 400 (Bad Request)} if the quoteSuggestion is not valid,
     * or with status {@code 500 (Internal Server Error)} if the quoteSuggestion couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    //    @PutMapping("/quote-suggestions/{id}")
    //    public ResponseEntity<QuoteSuggestion> updateQuoteSuggestion(
    //        @PathVariable(value = "id", required = false) final Long id,
    //        @Valid @RequestBody QuoteSuggestion quoteSuggestion
    //    ) throws URISyntaxException {
    //        log.debug("REST request to update QuoteSuggestion : {}, {}", id, quoteSuggestion);
    //        if (quoteSuggestion.getId() == null) {
    //            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
    //        }
    //        if (!Objects.equals(id, quoteSuggestion.getId())) {
    //            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
    //        }
    //
    //        if (!quoteSuggestionRepository.existsById(id)) {
    //            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
    //        }
    //
    //        QuoteSuggestion result = quoteSuggestionService.update(quoteSuggestion);
    //        return ResponseEntity
    //            .ok()
    //            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, quoteSuggestion.getId().toString()))
    //            .body(result);
    //    }
    //
    //    /**
    //     * {@code PATCH  /quote-suggestions/:id} : Partial updates given fields of an existing quoteSuggestion, field will ignore if it is null
    //     *
    //     * @param id the id of the quoteSuggestion to save.
    //     * @param quoteSuggestion the quoteSuggestion to update.
    //     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated quoteSuggestion,
    //     * or with status {@code 400 (Bad Request)} if the quoteSuggestion is not valid,
    //     * or with status {@code 404 (Not Found)} if the quoteSuggestion is not found,
    //     * or with status {@code 500 (Internal Server Error)} if the quoteSuggestion couldn't be updated.
    //     * @throws URISyntaxException if the Location URI syntax is incorrect.
    //     */
    //    @PatchMapping(value = "/quote-suggestions/{id}", consumes = { "application/json", "application/merge-patch+json" })
    //    public ResponseEntity<QuoteSuggestion> partialUpdateQuoteSuggestion(
    //        @PathVariable(value = "id", required = false) final Long id,
    //        @NotNull @RequestBody QuoteSuggestion quoteSuggestion
    //    ) throws URISyntaxException {
    //        log.debug("REST request to partial update QuoteSuggestion partially : {}, {}", id, quoteSuggestion);
    //        if (quoteSuggestion.getId() == null) {
    //            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
    //        }
    //        if (!Objects.equals(id, quoteSuggestion.getId())) {
    //            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
    //        }
    //
    //        if (!quoteSuggestionRepository.existsById(id)) {
    //            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
    //        }
    //
    //        Optional<QuoteSuggestion> result = quoteSuggestionService.partialUpdate(quoteSuggestion);
    //
    //        return ResponseUtil.wrapOrNotFound(
    //            result,
    //            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, quoteSuggestion.getId().toString())
    //        );
    //    }
    //
        /**
         * {@code GET  /quote-suggestions} : get all the quoteSuggestions.
         *
         * @param pageable the pagination information.
         * @param criteria the criteria which the requested entities should match.
         * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of quoteSuggestions in body.
         */
        @GetMapping("/quote-suggestions")
        public ResponseEntity<List<QuoteSuggestion>> getAllQuoteSuggestions(
            QuoteSuggestionCriteria criteria,
            @org.springdoc.api.annotations.ParameterObject Pageable pageable
        ) {
            log.debug("REST request to get QuoteSuggestions by criteria: {}", criteria);
            Page<QuoteSuggestion> page = quoteSuggestionQueryService.findByCriteria(criteria, pageable);
            HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
            return ResponseEntity.ok().headers(headers).body(page.getContent());
        }

    //    /**
    //     * {@code GET  /quote-suggestions/count} : count all the quoteSuggestions.
    //     *
    //     * @param criteria the criteria which the requested entities should match.
    //     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
    //     */
    //    @GetMapping("/quote-suggestions/count")
    //    public ResponseEntity<Long> countQuoteSuggestions(QuoteSuggestionCriteria criteria) {
    //        log.debug("REST request to count QuoteSuggestions by criteria: {}", criteria);
    //        return ResponseEntity.ok().body(quoteSuggestionQueryService.countByCriteria(criteria));
    //    }
    //
    //    /**
    //     * {@code GET  /quote-suggestions/:id} : get the "id" quoteSuggestion.
    //     *
    //     * @param id the id of the quoteSuggestion to retrieve.
    //     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the quoteSuggestion, or with status {@code 404 (Not Found)}.
    //     */
    //    @GetMapping("/quote-suggestions/{id}")
    //    public ResponseEntity<QuoteSuggestion> getQuoteSuggestion(@PathVariable Long id) {
    //        log.debug("REST request to get QuoteSuggestion : {}", id);
    //        Optional<QuoteSuggestion> quoteSuggestion = quoteSuggestionService.findOne(id);
    //        return ResponseUtil.wrapOrNotFound(quoteSuggestion);
    //    }
    //
    //    /**
    //     * {@code DELETE  /quote-suggestions/:id} : delete the "id" quoteSuggestion.
    //     *
    //     * @param id the id of the quoteSuggestion to delete.
    //     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
    //     */
    //    @DeleteMapping("/quote-suggestions/{id}")
    //    public ResponseEntity<Void> deleteQuoteSuggestion(@PathVariable Long id) {
    //        log.debug("REST request to delete QuoteSuggestion : {}", id);
    //        quoteSuggestionService.delete(id);
    //        return ResponseEntity
    //            .noContent()
    //            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
    //            .build();
    //    }
}

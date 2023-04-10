package pws.quo.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import pws.quo.domain.Quote;
import pws.quo.domain.dto.QuoteDTO;
import pws.quo.repository.QuoteRepository;
import pws.quo.service.QuoteQueryService;
import pws.quo.service.QuoteService;
import pws.quo.service.criteria.QuoteCriteria;
import pws.quo.web.rest.errors.BadRequestAlertException;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link pws.quo.domain.Quote}.
 */
@RestController
@RequestMapping("/api")
public class QuoteResource {

    private final Logger log = LoggerFactory.getLogger(QuoteResource.class);

    private static final String ENTITY_NAME = "quote";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final QuoteService quoteService;

    private final QuoteRepository quoteRepository;

    private final QuoteQueryService quoteQueryService;

    public QuoteResource(QuoteService quoteService, QuoteRepository quoteRepository, QuoteQueryService quoteQueryService) {
        this.quoteService = quoteService;
        this.quoteRepository = quoteRepository;
        this.quoteQueryService = quoteQueryService;
    }

    /**
     * {@code POST  /quotes} : Create a new quote.
     *
     * @param quote the quote to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new quote, or with status {@code 400 (Bad Request)} if the quote has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/quotes")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Quote> createQuote(@Valid @RequestBody Quote quote) throws URISyntaxException {
        log.debug("REST request to save Quote : {}", quote);
        if (quote.getId() != null) {
            throw new BadRequestAlertException("A new quote cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Quote result = quoteService.save(quote);
        return ResponseEntity
            .created(new URI("/api/quotes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /quotes/:id} : Updates an existing quote.
     *
     * @param id the id of the quote to save.
     * @param quote the quote to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated quote,
     * or with status {@code 400 (Bad Request)} if the quote is not valid,
     * or with status {@code 500 (Internal Server Error)} if the quote couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/quotes/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Quote> updateQuote(@PathVariable(value = "id", required = false) final Long id, @Valid @RequestBody Quote quote)
        throws URISyntaxException {
        log.debug("REST request to update Quote : {}, {}", id, quote);
        if (quote.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, quote.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!quoteRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Quote result = quoteService.update(quote);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, quote.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /quotes/:id} : Partial updates given fields of an existing quote, field will ignore if it is null
     *
     * @param id the id of the quote to save.
     * @param quote the quote to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated quote,
     * or with status {@code 400 (Bad Request)} if the quote is not valid,
     * or with status {@code 404 (Not Found)} if the quote is not found,
     * or with status {@code 500 (Internal Server Error)} if the quote couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/quotes/{id}", consumes = { "application/json", "application/merge-patch+json" })
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Quote> partialUpdateQuote(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Quote quote
    ) throws URISyntaxException {
        log.debug("REST request to partial update Quote partially : {}, {}", id, quote);
        if (quote.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, quote.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!quoteRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Quote> result = quoteService.partialUpdate(quote);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, quote.getId().toString())
        );
    }

    /**
     * {@code GET  /quotes} : get all the quotes.
     *
     * @param pageable the pagination information.
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of quotes in body.
     */
    @GetMapping("/quotes")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<List<QuoteDTO>> getAllQuotes(
        QuoteCriteria criteria,
        @org.springdoc.api.annotations.ParameterObject Pageable pageable
    ) {
        log.debug("REST request to get Quotes by criteria: {}", criteria);
        List<Quote> page = quoteRepository.findAll();

        List<QuoteDTO> quoteDTOList = new ArrayList<>();
        for (Quote quote : page) {
            quoteDTOList.add(new QuoteDTO(quote));
        }

        return ResponseEntity.ok().body(quoteDTOList);
    }

    /**
     * {@code GET  /quotes/count} : count all the quotes.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/quotes/count")
    public ResponseEntity<Long> countQuotes(QuoteCriteria criteria) {
        log.debug("REST request to count Quotes by criteria: {}", criteria);
        return ResponseEntity.ok().body(quoteQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /quotes/:id} : get the "id" quote.
     *
     * @param id the id of the quote to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the quote, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/quotes/{id}")
    public ResponseEntity<QuoteDTO> getQuote(@PathVariable Long id) {
        log.debug("REST request to get Quote : {}", id);
        Optional<Quote> quote = quoteService.findOne(id);

        if (!quote.isPresent()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        } else {
            QuoteDTO quoteDTO = new QuoteDTO(quote.get());
            return ResponseEntity.ok().body(quoteDTO);
        }
    }

    /**
     * {@code DELETE  /quotes/:id} : delete the "id" quote.
     *
     * @param id the id of the quote to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/quotes/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Void> deleteQuote(@PathVariable Long id) {
        log.debug("REST request to delete Quote : {}", id);
        quoteService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}

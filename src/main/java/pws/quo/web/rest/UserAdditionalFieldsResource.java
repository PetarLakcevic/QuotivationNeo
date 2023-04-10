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
import pws.quo.domain.UserAdditionalFields;
import pws.quo.repository.UserAdditionalFieldsRepository;
import pws.quo.service.UserAdditionalFieldsQueryService;
import pws.quo.service.UserAdditionalFieldsService;
import pws.quo.service.criteria.UserAdditionalFieldsCriteria;
import pws.quo.web.rest.errors.BadRequestAlertException;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link pws.quo.domain.UserAdditionalFields}.
 */
@RestController
@RequestMapping("/api")
public class UserAdditionalFieldsResource {

    private final Logger log = LoggerFactory.getLogger(UserAdditionalFieldsResource.class);

    private static final String ENTITY_NAME = "userAdditionalFields";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final UserAdditionalFieldsService userAdditionalFieldsService;

    private final UserAdditionalFieldsRepository userAdditionalFieldsRepository;

    private final UserAdditionalFieldsQueryService userAdditionalFieldsQueryService;

    public UserAdditionalFieldsResource(
        UserAdditionalFieldsService userAdditionalFieldsService,
        UserAdditionalFieldsRepository userAdditionalFieldsRepository,
        UserAdditionalFieldsQueryService userAdditionalFieldsQueryService
    ) {
        this.userAdditionalFieldsService = userAdditionalFieldsService;
        this.userAdditionalFieldsRepository = userAdditionalFieldsRepository;
        this.userAdditionalFieldsQueryService = userAdditionalFieldsQueryService;
    }
    /**
     * {@code POST  /user-additional-fields} : Create a new userAdditionalFields.
     *
     * @param userAdditionalFields the userAdditionalFields to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new userAdditionalFields, or with status {@code 400 (Bad Request)} if the userAdditionalFields has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    //    @PostMapping("/user-additional-fields")
    //    public ResponseEntity<UserAdditionalFields> createUserAdditionalFields(@RequestBody UserAdditionalFields userAdditionalFields)
    //        throws URISyntaxException {
    //        log.debug("REST request to save UserAdditionalFields : {}", userAdditionalFields);
    //        if (userAdditionalFields.getId() != null) {
    //            throw new BadRequestAlertException("A new userAdditionalFields cannot already have an ID", ENTITY_NAME, "idexists");
    //        }
    //        UserAdditionalFields result = userAdditionalFieldsService.save(userAdditionalFields);
    //        return ResponseEntity
    //            .created(new URI("/api/user-additional-fields/" + result.getId()))
    //            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
    //            .body(result);
    //    }

    /**
     * {@code PUT  /user-additional-fields/:id} : Updates an existing userAdditionalFields.
     *
     * @param id the id of the userAdditionalFields to save.
     * @param userAdditionalFields the userAdditionalFields to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated userAdditionalFields,
     * or with status {@code 400 (Bad Request)} if the userAdditionalFields is not valid,
     * or with status {@code 500 (Internal Server Error)} if the userAdditionalFields couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    //    @PutMapping("/user-additional-fields/{id}")
    //    public ResponseEntity<UserAdditionalFields> updateUserAdditionalFields(
    //        @PathVariable(value = "id", required = false) final Long id,
    //        @RequestBody UserAdditionalFields userAdditionalFields
    //    ) throws URISyntaxException {
    //        log.debug("REST request to update UserAdditionalFields : {}, {}", id, userAdditionalFields);
    //        if (userAdditionalFields.getId() == null) {
    //            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
    //        }
    //        if (!Objects.equals(id, userAdditionalFields.getId())) {
    //            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
    //        }
    //
    //        if (!userAdditionalFieldsRepository.existsById(id)) {
    //            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
    //        }
    //
    //        UserAdditionalFields result = userAdditionalFieldsService.update(userAdditionalFields);
    //        return ResponseEntity
    //            .ok()
    //            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, userAdditionalFields.getId().toString()))
    //            .body(result);
    //    }

    /**
     * {@code PATCH  /user-additional-fields/:id} : Partial updates given fields of an existing userAdditionalFields, field will ignore if it is null
     *
     * @param id the id of the userAdditionalFields to save.
     * @param userAdditionalFields the userAdditionalFields to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated userAdditionalFields,
     * or with status {@code 400 (Bad Request)} if the userAdditionalFields is not valid,
     * or with status {@code 404 (Not Found)} if the userAdditionalFields is not found,
     * or with status {@code 500 (Internal Server Error)} if the userAdditionalFields couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    //    @PatchMapping(value = "/user-additional-fields/{id}", consumes = { "application/json", "application/merge-patch+json" })
    //    public ResponseEntity<UserAdditionalFields> partialUpdateUserAdditionalFields(
    //        @PathVariable(value = "id", required = false) final Long id,
    //        @RequestBody UserAdditionalFields userAdditionalFields
    //    ) throws URISyntaxException {
    //        log.debug("REST request to partial update UserAdditionalFields partially : {}, {}", id, userAdditionalFields);
    //        if (userAdditionalFields.getId() == null) {
    //            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
    //        }
    //        if (!Objects.equals(id, userAdditionalFields.getId())) {
    //            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
    //        }
    //
    //        if (!userAdditionalFieldsRepository.existsById(id)) {
    //            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
    //        }
    //
    //        Optional<UserAdditionalFields> result = userAdditionalFieldsService.partialUpdate(userAdditionalFields);
    //
    //        return ResponseUtil.wrapOrNotFound(
    //            result,
    //            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, userAdditionalFields.getId().toString())
    //        );
    //    }

    /**
     * {@code GET  /user-additional-fields} : get all the userAdditionalFields.
     *
     * @param pageable the pagination information.
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of userAdditionalFields in body.
     */
    //    @GetMapping("/user-additional-fields")
    //    public ResponseEntity<List<UserAdditionalFields>> getAllUserAdditionalFields(
    //        UserAdditionalFieldsCriteria criteria,
    //        @org.springdoc.api.annotations.ParameterObject Pageable pageable
    //    ) {
    //        log.debug("REST request to get UserAdditionalFields by criteria: {}", criteria);
    //        Page<UserAdditionalFields> page = userAdditionalFieldsQueryService.findByCriteria(criteria, pageable);
    //        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
    //        return ResponseEntity.ok().headers(headers).body(page.getContent());
    //    }

    /**
     * {@code GET  /user-additional-fields/count} : count all the userAdditionalFields.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    //    @GetMapping("/user-additional-fields/count")
    //    public ResponseEntity<Long> countUserAdditionalFields(UserAdditionalFieldsCriteria criteria) {
    //        log.debug("REST request to count UserAdditionalFields by criteria: {}", criteria);
    //        return ResponseEntity.ok().body(userAdditionalFieldsQueryService.countByCriteria(criteria));
    //    }

    /**
     * {@code GET  /user-additional-fields/:id} : get the "id" userAdditionalFields.
     *
     * @param id the id of the userAdditionalFields to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the userAdditionalFields, or with status {@code 404 (Not Found)}.
     */
    //    @GetMapping("/user-additional-fields/{id}")
    //    public ResponseEntity<UserAdditionalFields> getUserAdditionalFields(@PathVariable Long id) {
    //        log.debug("REST request to get UserAdditionalFields : {}", id);
    //        Optional<UserAdditionalFields> userAdditionalFields = userAdditionalFieldsService.findOne(id);
    //        return ResponseUtil.wrapOrNotFound(userAdditionalFields);
    //    }
    //
    //    /**
    //     * {@code DELETE  /user-additional-fields/:id} : delete the "id" userAdditionalFields.
    //     *
    //     * @param id the id of the userAdditionalFields to delete.
    //     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
    //     */
    //    @DeleteMapping("/user-additional-fields/{id}")
    //    public ResponseEntity<Void> deleteUserAdditionalFields(@PathVariable Long id) {
    //        log.debug("REST request to delete UserAdditionalFields : {}", id);
    //        userAdditionalFieldsService.delete(id);
    //        return ResponseEntity
    //            .noContent()
    //            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
    //            .build();
    //    }
}

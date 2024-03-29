package pws.quo.web.rest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import pws.quo.domain.Payment;
import pws.quo.repository.PaymentRepository;
import pws.quo.service.PaymentQueryService;
import pws.quo.service.PaymentService;
import pws.quo.web.rest.errors.BadRequestAlertException;
import tech.jhipster.web.util.HeaderUtil;

import java.net.URI;
import java.net.URISyntaxException;

/**
 * REST controller for managing {@link pws.quo.domain.Payment}.
 */
@RestController
public class PaymentResource {

    private final Logger log = LoggerFactory.getLogger(PaymentResource.class);

    private static final String ENTITY_NAME = "payment";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PaymentService paymentService;

    private final PaymentRepository paymentRepository;

    private final PaymentQueryService paymentQueryService;

    public PaymentResource(PaymentService paymentService, PaymentRepository paymentRepository, PaymentQueryService paymentQueryService) {
        this.paymentService = paymentService;
        this.paymentRepository = paymentRepository;
        this.paymentQueryService = paymentQueryService;
    }
    /**
     * {@code POST  /payments} : Create a new payment.
     *
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new payment, or with status {@code 400 (Bad Request)} if the payment has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
//      @PostMapping("/payment-status/process")
//      public String createPayment(@RequestBody Object object) throws URISyntaxException {
//          System.out.println(":::::::::::::::::::::::::::::THEY-CALLED:::::::::::::::::::::::::::::::::::::::::");
//          System.out.println(object.toString());
//          return "redirect:/payment-status";
//      }
    //
    //    /**
    //     * {@code PUT  /payments/:id} : Updates an existing payment.
    //     *
    //     * @param id the id of the payment to save.
    //     * @param payment the payment to update.
    //     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated payment,
    //     * or with status {@code 400 (Bad Request)} if the payment is not valid,
    //     * or with status {@code 500 (Internal Server Error)} if the payment couldn't be updated.
    //     * @throws URISyntaxException if the Location URI syntax is incorrect.
    //     */
    //    @PutMapping("/payments/{id}")
    //    public ResponseEntity<Payment> updatePayment(@PathVariable(value = "id", required = false) final Long id, @RequestBody Payment payment)
    //        throws URISyntaxException {
    //        log.debug("REST request to update Payment : {}, {}", id, payment);
    //        if (payment.getId() == null) {
    //            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
    //        }
    //        if (!Objects.equals(id, payment.getId())) {
    //            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
    //        }
    //
    //        if (!paymentRepository.existsById(id)) {
    //            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
    //        }
    //
    //        Payment result = paymentService.update(payment);
    //        return ResponseEntity
    //            .ok()
    //            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, payment.getId().toString()))
    //            .body(result);
    //    }
    //
    //    /**
    //     * {@code PATCH  /payments/:id} : Partial updates given fields of an existing payment, field will ignore if it is null
    //     *
    //     * @param id the id of the payment to save.
    //     * @param payment the payment to update.
    //     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated payment,
    //     * or with status {@code 400 (Bad Request)} if the payment is not valid,
    //     * or with status {@code 404 (Not Found)} if the payment is not found,
    //     * or with status {@code 500 (Internal Server Error)} if the payment couldn't be updated.
    //     * @throws URISyntaxException if the Location URI syntax is incorrect.
    //     */
    //    @PatchMapping(value = "/payments/{id}", consumes = { "application/json", "application/merge-patch+json" })
    //    public ResponseEntity<Payment> partialUpdatePayment(
    //        @PathVariable(value = "id", required = false) final Long id,
    //        @RequestBody Payment payment
    //    ) throws URISyntaxException {
    //        log.debug("REST request to partial update Payment partially : {}, {}", id, payment);
    //        if (payment.getId() == null) {
    //            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
    //        }
    //        if (!Objects.equals(id, payment.getId())) {
    //            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
    //        }
    //
    //        if (!paymentRepository.existsById(id)) {
    //            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
    //        }
    //
    //        Optional<Payment> result = paymentService.partialUpdate(payment);
    //
    //        return ResponseUtil.wrapOrNotFound(
    //            result,
    //            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, payment.getId().toString())
    //        );
    //    }
    //
    //    /**
    //     * {@code GET  /payments} : get all the payments.
    //     *
    //     * @param pageable the pagination information.
    //     * @param criteria the criteria which the requested entities should match.
    //     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of payments in body.
    //     */
    //    @GetMapping("/payments")
    //    public ResponseEntity<List<Payment>> getAllPayments(
    //        PaymentCriteria criteria,
    //        @org.springdoc.api.annotations.ParameterObject Pageable pageable
    //    ) {
    //        log.debug("REST request to get Payments by criteria: {}", criteria);
    //        Page<Payment> page = paymentQueryService.findByCriteria(criteria, pageable);
    //        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
    //        return ResponseEntity.ok().headers(headers).body(page.getContent());
    //    }
    //
    //    /**
    //     * {@code GET  /payments/count} : count all the payments.
    //     *
    //     * @param criteria the criteria which the requested entities should match.
    //     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
    //     */
    //    @GetMapping("/payments/count")
    //    public ResponseEntity<Long> countPayments(PaymentCriteria criteria) {
    //        log.debug("REST request to count Payments by criteria: {}", criteria);
    //        return ResponseEntity.ok().body(paymentQueryService.countByCriteria(criteria));
    //    }
    //
    //    /**
    //     * {@code GET  /payments/:id} : get the "id" payment.
    //     *
    //     * @param id the id of the payment to retrieve.
    //     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the payment, or with status {@code 404 (Not Found)}.
    //     */
    //    @GetMapping("/payments/{id}")
    //    public ResponseEntity<Payment> getPayment(@PathVariable Long id) {
    //        log.debug("REST request to get Payment : {}", id);
    //        Optional<Payment> payment = paymentService.findOne(id);
    //        return ResponseUtil.wrapOrNotFound(payment);
    //    }
    //
    //    /**
    //     * {@code DELETE  /payments/:id} : delete the "id" payment.
    //     *
    //     * @param id the id of the payment to delete.
    //     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
    //     */
    //    @DeleteMapping("/payments/{id}")
    //    public ResponseEntity<Void> deletePayment(@PathVariable Long id) {
    //        log.debug("REST request to delete Payment : {}", id);
    //        paymentService.delete(id);
    //        return ResponseEntity
    //            .noContent()
    //            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
    //            .build();
    //    }
}

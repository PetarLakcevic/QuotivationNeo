package pws.quo.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.MessageSource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;
import pws.quo.domain.Payment;
import pws.quo.domain.User;
import pws.quo.domain.UserAdditionalFields;
import tech.jhipster.config.JHipsterProperties;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.Locale;
import java.util.Properties;

/**
 * Service for sending emails.
 * <p>
 * We use the {@link Async} annotation to send emails asynchronously.
 */
@Service
public class MailService {

    private final Logger log = LoggerFactory.getLogger(MailService.class);

    private static final String USER = "user";

    private static final String BASE_URL = "baseUrl";

    private final JHipsterProperties jHipsterProperties;

    private final JavaMailSender javaMailSender;

    private final MessageSource messageSource;

    private final SpringTemplateEngine templateEngine;

    private final String paymentInfo = " <ul style={{ paddingLeft: '20px' }}>\n" +
        "            <li>Outcome of Payment: Successful – account charged</li>\n" +
        "            <li>\n" +
        "              User Information: {firstName} {lastName}, {email}\n" +
        "            </li>\n" +
        "            <li>\n" +
        "              Order Details: Premium, {amount} {currency}, Order ID:{orderId}\n" +
        "              {pgOrderId}\n" +
        "            </li>\n" +
        "            <li>Merchant Information: Wermax Consulting doo, 109871829, Hiladnarska 21, Beograd, Srbija</li>\n" +
        "            <li>\n" +
        "              Transaction Information:\n" +
        "              <ul style={{ paddingLeft: '20px' }}>\n" +
        "                <li>Order Number: {pgOrderId}</li>\n" +
        "                <li>Transaction Status: {transactionStatus}</li>\n" +
        "                <li>Transaction Status Code: {pgTranReturnCode}</li>\n" +
        "                <li>Transaction Number: {pgTranId}</li>\n" +
        "                <li>Transaction Date: {timeCreated}</li>\n" +
        "                <li>Transaction Amount: {amount}</li>\n" +
        "                <li>Transaction Reference ID: {pgTranRefId}</li>\n" +
        "              </ul>\n" +
        "            </li>\n" +
        "          </ul>";

    private final String paymentInfoFail = " <ul style={{ paddingLeft: '20px' }}>\n" +
        "            <li>Outcome of Payment: Unsuccessful – account NOT charged</li>\n" +
        "            <li>\n" +
        "              User Information: {firstName} {lastName}, {email}\n" +
        "            </li>\n" +
        "            <li>\n" +
        "              Order Details: Premium, {amount} {currency}, Order ID:{orderId}\n" +
        "              {pgOrderId}\n" +
        "            </li>\n" +
        "            <li>Merchant Information: Wermax Consulting doo, 109871829, Hiladnarska 21, Beograd, Srbija</li>\n" +
        "            <li>\n" +
        "              Transaction Information:\n" +
        "              <ul style={{ paddingLeft: '20px' }}>\n" +
        "                <li>Order Number: {pgOrderId}</li>\n" +
        "                <li>Transaction Status: {transactionStatus}</li>\n" +
        "                <li>Transaction Status Code: {pgTranReturnCode}</li>\n" +
        "                <li>Transaction Number: {pgTranId}</li>\n" +
        "                <li>Transaction Date: {timeCreated}</li>\n" +
        "                <li>Transaction Amount: {amount}</li>\n" +
        "                <li>Transaction Reference ID: {pgTranRefId}</li>\n" +
        "              </ul>\n" +
        "            </li>\n" +
        "          </ul>";
    private final String successEmail = "<!DOCTYPE html>\n" +
        "<html xmlns:th=\"http://www.thymeleaf.org\" th:lang=\"${#locale.language}\" lang=\"en\">\n" +
        "  <head>\n" +
        "    <title>Payment Successful - Quotivation</title>\n" +
        "    <meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\" />\n" +
        "  </head>\n" +
        "  <body>\n" +
        "    <p>Dear {1},</p>\n" +
        "    <p>\n" +
        "      We are happy to inform you that your purchase of a <b>Premium subscription has been successful.</b>\n" +
        "    </p>\n" +
        "    <p>\n" +
        "      You can now enjoy the full features of Quotivation.\n" +
        "    </p>\n" +
        "    <p><b>You can view detailed payment information below:</b></p>\n" +
        "    <p>{2}</p>\n" +
        "    <p>\n" +
        "      <span>Regards, </span>\n" +
        "      <br />\n" +
        "      <p>Quotivation Team</p>\n" +
        "    </p>\n" +
        "  </body>\n" +
        "</html>\n";

    private final String failEmail = "<!DOCTYPE html>\n" +
        "<html xmlns:th=\"http://www.thymeleaf.org\" th:lang=\"${#locale.language}\" lang=\"en\">\n" +
        "  <head>\n" +
        "    <title>Payment Successful - Quotivation</title>\n" +
        "    <meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\" />\n" +
        "  </head>\n" +
        "  <body>\n" +
        "    <p>Dear {1},</p>\n" +
        "    <p>\n" +
        "     Unfortunately, the premium subscription has not been purchased \n" +
        "    </p>\n" +
        "    <p><b>You can view detailed payment information below:</b></p>\n" +
        "    <p>{2}</p>\n" +
        "    <p>The payment was unsuccessful, your account has not been charged. The most common cause is an incorrectly entered card number, expiration date, or security code. Please try again, and in the case of repeated errors, contact your bank.</p>\n" +
        "    <p>\n" +
        "      <span>Regards, </span>\n" +
        "      <br />\n" +
        "      <p>Quotivation Team</p>\n" +
        "    </p>\n" +
        "  </body>\n" +
        "</html>\n";

    public MailService(
        JHipsterProperties jHipsterProperties,
        JavaMailSender javaMailSender,
        MessageSource messageSource,
        SpringTemplateEngine templateEngine
    ) {
        this.jHipsterProperties = jHipsterProperties;
        this.javaMailSender = javaMailSender;
        this.messageSource = messageSource;
        this.templateEngine = templateEngine;
    }

    @Async
    public void sendMailPera(String mail) throws UnsupportedEncodingException, MessagingException {

        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "587");
        props.put("mail.smtp.ssl.trust", "smtp.gmail.com");

        Session session = Session.getInstance(props, new Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication("quotivation.info@gmail.com", "fxboxpqjbkwcsngv");
            }
        });

        Message msg = new MimeMessage(session);

        msg.setFrom(new InternetAddress("info@quotivation.io", "Quotivation - noreply"));
        msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(mail));
        msg.setSubject("Password reset request");

        msg.setContent("fsafasfasfasfasf", "text/html; charset=UTF-8");
        msg.setSentDate(new Date());

        MimeBodyPart messageBodyPart = new MimeBodyPart();
        messageBodyPart.setContent("asdasdassd", "text/html; charset=UTF-8");

        Multipart multipart = new MimeMultipart();
        multipart.addBodyPart(messageBodyPart);

        msg.setContent(multipart);
        Transport.send(msg);
    }

    @Async
    public void sendEmail(String to, String subject, String content, boolean isMultipart, boolean isHtml) {
        log.debug(
            "Send email[multipart '{}' and html '{}'] to '{}' with subject '{}' and content={}",
            isMultipart,
            isHtml,
            to,
            subject,
            content
        );

        // Prepare message using a Spring helper
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        try {
            MimeMessageHelper message = new MimeMessageHelper(mimeMessage, isMultipart, StandardCharsets.UTF_8.name());
            message.setTo(to);
            message.setFrom(new InternetAddress("quotivation.info@gmail.com", "Quotivation - noreply"));
            message.setSubject(subject);
            message.setText(content, isHtml);
            javaMailSender.send(mimeMessage);
            log.debug("Sent email to User '{}'", to);
        } catch (Exception e) {
            log.warn("Email could not be sent to user '{}'", to, e);
        }
    }

    @Async
    public void sendEmailFromTemplate(User user, String templateName, String titleKey) {
        if (user.getEmail() == null) {
            log.debug("Email doesn't exist for user '{}'", user.getLogin());
            return;
        }
        Locale locale = Locale.ENGLISH;
        Context context = new Context(locale);
        context.setVariable(USER, user);
        context.setVariable(BASE_URL, jHipsterProperties.getMail().getBaseUrl());
        String content = templateEngine.process(templateName, context);
        String subject = messageSource.getMessage(titleKey, null, locale);
        sendEmail(user.getEmail(), subject, content, false, true);
    }

    @Async
    public void sendActivationEmail(User user) {
        log.debug("Sending activation email to '{}'", user.getEmail());
        sendEmailFromTemplate(user, "mail/activationEmail", "email.activation.title");
    }

    @Async
    public void sendCreationEmail(User user) {
        log.debug("Sending creation email to '{}'", user.getEmail());
        sendEmailFromTemplate(user, "mail/creationEmail", "email.activation.title");
    }

    @Async
    public void sendPasswordResetMail(User user) {
        log.debug("Sending password reset email to '{}'", user.getEmail());
        sendEmailFromTemplate(user, "mail/passwordResetEmail", "email.reset.title");
    }

    @Async
    public void sendPasswordPaymentSuccessful(Payment latestPayment, UserAdditionalFields userAdditionalFields) {
        User user = userAdditionalFields.getInternalUser();
        if (user.getEmail() == null) {
            log.debug("Email doesn't exist for user '{}'", user.getLogin());
            return;
        }
        log.debug("Sending password reset email to '{}'", user.getEmail());
        Locale locale = Locale.ENGLISH;
        //    String content = successEmail.replace("{0}", jHipsterProperties.getMail().getBaseUrl() + "/favicon.ico");
        String content = successEmail.replace("{1}", user.getFirstName() + " " + user.getLastName());

        //Payment to map
        String paymentString = null;
        try {
            paymentString = getPaymentString(latestPayment, userAdditionalFields);

        } catch (Exception e) {
            e.printStackTrace();
        }
        content = content.replace("{2}", paymentString);

        String subject = "Quotivation - Payment successful - Premium subscription activated";
        sendEmail(user.getEmail(), subject, content, false, true);
    }

    @Async
    public void sendPasswordPaymentFail(Payment latestPayment, UserAdditionalFields userAdditionalFields) {
        User user = userAdditionalFields.getInternalUser();
        if (user.getEmail() == null) {
            log.debug("Email doesn't exist for user '{}'", user.getLogin());
            return;
        }
        log.debug("Sending password reset email to '{}'", user.getEmail());
        Locale locale = Locale.ENGLISH;
        //    String content = successEmail.replace("{0}", jHipsterProperties.getMail().getBaseUrl() + "/favicon.ico");
        String content = failEmail.replace("{1}", user.getFirstName() + " " + user.getLastName());

        //Payment to map
        String paymentString = null;
        try {
            paymentString = getPaymentStringFailed(latestPayment, userAdditionalFields);

        } catch (Exception e) {
            e.printStackTrace();
        }
        content = content.replace("{2}", paymentString);

        String subject = "Quotivation - Payment unsuccessful - Premium subscription not activated";
        sendEmail(user.getEmail(), subject, content, false, true);
    }

    private String getPaymentString(Payment latestPayment, UserAdditionalFields uaf) throws Exception {
        ObjectMapper mapper = new ObjectMapper();


        JsonNode root = mapper.readTree(latestPayment.getPaymentDataJson());
        JsonNode transactionList = root.path("transactionList");
        String transactionStatus = null;
        String amount = null;
        String currency = null;
        String pgOrderId = null;
        String pgTranReturnCode = null;
        String pgTranId = null;
        String timeCreated = null;
        String pgTranRefId = null;
        for (JsonNode transaction : transactionList) {
            transactionStatus = transaction.get("transactionStatus").asText();
            amount = transaction.get("amount").asText();
            currency = transaction.get("currency").asText();
            pgOrderId = transaction.get("pgOrderId").asText();
            pgTranReturnCode = transaction.get("pgTranReturnCode").asText();
            pgTranId = transaction.get("pgTranId").asText();
            timeCreated = transaction.get("timeCreated").asText();
            pgTranRefId = transaction.get("pgTranRefId").asText();

        }


        return paymentInfo.replace("{firstName}", uaf.getInternalUser().getFirstName())
            .replace("{lastName}", uaf.getInternalUser().getLastName())
            .replace("{email}", uaf.getInternalUser().getEmail())
            .replace("{amount}", amount)
            .replace("{currency}", currency)
            .replace("{pgOrderId}", pgOrderId)
            .replace("{transactionStatus}", transactionStatus)
            .replace("{pgTranReturnCode}", pgTranReturnCode)
            .replace("{pgTranId}", pgTranId)
            .replace("{timeCreated}", timeCreated)
            .replace("{pgTranRefId}", pgTranRefId);
    }

    private String getPaymentStringFailed(Payment latestPayment, UserAdditionalFields uaf) throws Exception {
        ObjectMapper mapper = new ObjectMapper();


        JsonNode root = mapper.readTree(latestPayment.getPaymentDataJson());
        JsonNode transactionList = root.path("transactionList");
        String transactionStatus = null;
        String amount = null;
        String currency = null;
        String pgOrderId = null;
        String pgTranReturnCode = null;
        String pgTranId = null;
        String timeCreated = null;
        String pgTranRefId = null;
        for (JsonNode transaction : transactionList) {
            if (transaction.has("transactionStatus")) {
                transactionStatus = transaction.get("transactionStatus").asText();
            } else {
                transactionStatus = "In progress"; // Set a default value
            }

            if (transaction.has("amount")) {
                amount = transaction.get("amount").asText();
            } else {
                amount = "In progress"; // Set a default value
            }

            if (transaction.has("currency")) {
                currency = transaction.get("currency").asText();
            } else {
                currency = "In progress"; // Set a default value
            }

            if (transaction.has("pgOrderId")) {
                pgOrderId = transaction.get("pgOrderId").asText();
            } else {
                pgOrderId = "In progress"; // Set a default value
            }

            if (transaction.has("pgTranReturnCode")) {
                pgTranReturnCode = transaction.get("pgTranReturnCode").asText();
            } else {
                pgTranReturnCode = "In progress"; // Set a default value
            }

            if (transaction.has("pgTranId")) {
                pgTranId = transaction.get("pgTranId").asText();
            } else {
                pgTranId = "In progress"; // Set a default value
            }

            if (transaction.has("timeCreated")) {
                timeCreated = transaction.get("timeCreated").asText();
            } else {
                timeCreated = "In progress"; // Set a default value
            }

            if (transaction.has("pgTranRefId")) {
                pgTranRefId = transaction.get("pgTranRefId").asText();
            } else {
                pgTranRefId = "In progress"; // Set a default value
            }


        }


        return paymentInfoFail.replace("{firstName}", uaf.getInternalUser().getFirstName())
            .replace("{lastName}", uaf.getInternalUser().getLastName())
            .replace("{email}", uaf.getInternalUser().getEmail())
            .replace("{amount}", amount)
            .replace("{currency}", currency)
            .replace("{pgOrderId}", pgOrderId)
            .replace("{orderId}", pgOrderId)
            .replace("{transactionStatus}", transactionStatus)
            .replace("{pgTranReturnCode}", pgTranReturnCode)
            .replace("{pgTranId}", pgTranId)
            .replace("{timeCreated}", timeCreated)
            .replace("{pgTranRefId}", pgTranRefId);
    }


}

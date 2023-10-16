package pws.quo.service;

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

    private final String paymentInfo = "<ul style={{ paddingLeft: '20px' }}>\n" +
        "                <li>Order Number: {0}</li>\n" +
        "                <li>Transaction Status: {1}</li>\n" +
        "                <li>Transaction Status Code: {2}</li>\n" +
        "                <li>Transaction Number: {3}</li>\n" +
        "                <li>Transaction Date: {4}</li>\n" +
        "                <li>Transaction Amount: {5}</li>\n" +
        "                <li>Transaction Reference ID: {6}</li>\n" +
        "              </ul>";
    private final String successEmail = "<!DOCTYPE html>\n" +
        "<html xmlns:th=\"http://www.thymeleaf.org\" th:lang=\"${#locale.language}\" lang=\"en\">\n" +
        "  <head>\n" +
        "    <title>Payment Successful - Quotivation</title>\n" +
        "    <meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\" />\n" +
        "    <link>{0}</link>\n" +
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
        "    <p>\n" +
        "      Merchant Information: Wermax Consulting doo, 109871829, Hiladnarska 21, Beograd, Srbija\n" +
        "    </p>\n" +
        "    <p>{2}</p>\n" +
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
        String content = successEmail.replace("{0}", jHipsterProperties.getMail().getBaseUrl()+"/favicon.ico");
        content = content.replace("{1}", user.getFirstName()+ " " + user.getLastName());
        content = content.replace("{2}", latestPayment.toString());
        //Payment to map
        //String paymentString = getPaymentString(latestPayment);

        content = content.replace("{2}", latestPayment.getPaymentDataJson());

        content = content.replace("{3}", latestPayment.toString());
        String subject = "Quotivation - Payment successful - Premium subscription activated";
        sendEmail(user.getEmail(), subject, content, false, true);
    }

//    private String getPaymentString(Payment latestPayment) {
//
//
//
//        return paymentInfo.replace("{0}", latestPayment.getPaymentDataJson().get)
//            .replace("{1}", latestPayment.getTransactionStatus())
//            .replace("{2}", latestPayment.getTransactionStatusCode())
//            .replace("{3}", latestPayment.getTransactionNumber())
//            .replace("{4}", latestPayment.getTransactionDate().toString())
//            .replace("{5}", latestPayment.getTransactionAmount().toString())
//            .replace("{6}", latestPayment.getTransactionReferenceId());
//    }


}

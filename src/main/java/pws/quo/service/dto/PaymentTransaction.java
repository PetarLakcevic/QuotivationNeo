package pws.quo.service.dto;

import pws.quo.domain.UserAdditionalFields;

import java.util.Date;

public class PaymentTransaction {

    private String SESSION_TOKEN = "SESSIONTOKEN";
    private String merchantUser; // TEST
    private String merchantPassword; // TEST
    private String merchant; // TEST
    private Date merchantPaymentId;
    private String customer;
    private String amount;
    private String currency;
    private String sessionType;
    private String customerEmail;
    private String customerName;
    private String customerPhone;
    private String returnUrl;
    private String sessionExpiry;

    public PaymentTransaction(UserAdditionalFields userAdditionalFields) {
        // MERCHANT DATA - CHANGE
        this.merchantUser = "npavlovi@nassan.rs";
        this.merchantPassword = "+5UQ8@NDVm@*=r3";
        this.merchant = "ems02";


        // TRANSACTION DATA - DONT CHANGE
        this.merchantPaymentId = new Date();
        this.customer = userAdditionalFields.getInternalUser().getLogin();
        this.amount = "2000.00";
        this.currency = "RSD";
        this.sessionType = "PAYMENTSESSION";
        this.customerEmail = userAdditionalFields.getInternalUser().getEmail();
        this.customerName = userAdditionalFields.getInternalUser().getFirstName()+" "+userAdditionalFields.getInternalUser().getLastName();
        this.customerPhone = "/";
        this.returnUrl = "https://quotivation.io/home";
        this.sessionExpiry = "12h";
    }

    // Getters, setters, and other methods can be added here

    public String getSESSION_TOKEN() {
        return SESSION_TOKEN;
    }

    public void setSESSION_TOKEN(String SESSION_TOKEN) {
        this.SESSION_TOKEN = SESSION_TOKEN;
    }

    public String getMerchantUser() {
        return merchantUser;
    }

    public void setMerchantUser(String merchantUser) {
        this.merchantUser = merchantUser;
    }

    public String getMerchantPassword() {
        return merchantPassword;
    }

    public void setMerchantPassword(String merchantPassword) {
        this.merchantPassword = merchantPassword;
    }

    public String getMerchant() {
        return merchant;
    }

    public void setMerchant(String merchant) {
        this.merchant = merchant;
    }

    public Date getMerchantPaymentId() {
        return merchantPaymentId;
    }

    public void setMerchantPaymentId(Date merchantPaymentId) {
        this.merchantPaymentId = merchantPaymentId;
    }

    public String getCustomer() {
        return customer;
    }

    public void setCustomer(String customer) {
        this.customer = customer;
    }

    public String getAmount() {
        return amount;
    }

    public void setAmount(String amount) {
        this.amount = amount;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getSessionType() {
        return sessionType;
    }

    public void setSessionType(String sessionType) {
        this.sessionType = sessionType;
    }

    public String getCustomerEmail() {
        return customerEmail;
    }

    public void setCustomerEmail(String customerEmail) {
        this.customerEmail = customerEmail;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getCustomerPhone() {
        return customerPhone;
    }

    public void setCustomerPhone(String customerPhone) {
        this.customerPhone = customerPhone;
    }

    public String getReturnUrl() {
        return returnUrl;
    }

    public void setReturnUrl(String returnUrl) {
        this.returnUrl = returnUrl;
    }

    public String getSessionExpiry() {
        return sessionExpiry;
    }

    public void setSessionExpiry(String sessionExpiry) {
        this.sessionExpiry = sessionExpiry;
    }
}

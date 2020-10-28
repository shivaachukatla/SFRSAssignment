/* 
 * Each Debtholder record data will be stored in the class format below which has all the attributes that we get from response. 
 * Each instance of this class will be one rown inthe lightning component table
 */
public class DebtHoldersResponseWrapper {
    @AuraEnabled public decimal balance{get;set;}
    @AuraEnabled public String creditorName{get;set;}
    @AuraEnabled public String firstName{get;set;}
    @AuraEnabled public String id{get;set;}
    @AuraEnabled public String lastName{get;set;}
    @AuraEnabled public decimal minPaymentPercentage{get;set;}
}
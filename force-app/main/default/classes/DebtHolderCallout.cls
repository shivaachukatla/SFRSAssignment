public class DebtHolderCallout {
    /* @methodName: getDebtHoldersData
     * @description: 1. getDebtHoldersData in json Format using Rest HTTP Callout. 
     *               2. The Endpoint and Authorization headers are configured in a named Credential 
     * @parameters: none 
     * @returnType: json body as a string
     */
    @AuraEnabled
    public static string doCalloutForDebtHoldersData(){
       String response = ''; 
       try{ 
           HttpRequest req = new HttpRequest();
           req.setEndpoint('callout:StrategicFS');
           req.setMethod('GET');
           Http http = new Http();
           HTTPResponse res = http.send(req);
           response = res.getBody();
       }Catch(Exception e){
           /*1. Error Handling mechanism can be implemented by creating a custom Object called Error Logger 
             2. Error logger object can store Status Code, Response Body and Request headers if any 
             3. A callout retry mechanism can be either implemented from Catch block or kicked off through Error 
                logger record creation Process
           */
           response = 'Failed to get Data because '+e.getMessage();
           System.debug('The Exception is '+e);
       }
       return response;
    }
}
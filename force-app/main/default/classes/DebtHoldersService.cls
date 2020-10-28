public class DebtHoldersService {
    /* @methodName: getDebtHoldersData
     * @description: 1. this method is response for calling the external service which provides DebtHolders Data
     *               2. DebtHolderCallout class has doCalloutForDebtHoldersData method which has constructs Http request and does callout
     * @parameters: none 
     * @returnType: List<DebtHoldersResponseWrapper>, each debtHolder record data is maintained as DebtHoldersResponseWrapper
     */
    @AuraEnabled
    public static List<DebtHoldersResponseWrapper> getDebtHoldersData(){
        String jsonResponse = DebtHolderCallout.doCalloutForDebtHoldersData();
        List<DebtHoldersResponseWrapper> debtHoldersData = new List<DebtHoldersResponseWrapper>();
        debtHoldersData = constructResponse(jsonResponse);
        system.debug(debtHoldersData);
        return debtHoldersData;
    } 
    /* @methodName: constructResponse
     * @description: 1. this method is responsbile for constructing response from JSON input. 
     *               2. This response format will be used in the lightning component
     * @parameters: jsonResponse fetched in getDebtHoldersData method   
     * @returnType: List<DebtHoldersResponseWrapper>, each debtHolder record data is maintained as DebtHoldersResponseWrapper
     */
    @AuraEnabled
    public static List<DebtHoldersResponseWrapper> constructResponse(string jsonResponse){
        return (List<DebtHoldersResponseWrapper>) System.JSON.deserialize(jsonResponse, List<DebtHoldersResponseWrapper>.class);
    }
}
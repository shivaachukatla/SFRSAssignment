@isTest public with sharing class DebtHolderServiceTest {
    @isTest static void testDevtService() {
        // Use StaticResourceCalloutMock built-in class to
        // specify fake response and include response body 
        // in a static resource.
        StaticResourceCalloutMock mock = new StaticResourceCalloutMock();
        mock.setStaticResource('mockDebtResponse');
        mock.setStatusCode(200);
        mock.setHeader('Content-Type', 'application/json');

        // Set the mock callout mode
        Test.setMock(HttpCalloutMock.class, mock);

        // Call the method that performs the callout
        List<DebtHoldersResponseWrapper> debtHoldersData = DebtHoldersService.getDebtHoldersData();

        // the mock response.
        // This is the content of the static resource.
        System.assertEquals(10,debtHoldersData.size());

    }
}

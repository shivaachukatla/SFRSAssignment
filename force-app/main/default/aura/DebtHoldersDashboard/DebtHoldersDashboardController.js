({
    //Define Column Names 
	init: function (cmp, event, helper) {
        var actions = [
            { label: 'Delete', name: 'delete' }
        ];
		cmp.set('v.mycolumns', [
            { label: 'id', fieldName: 'id', type: 'text',editable : 'true'},
            { label: 'creditorName', fieldName: 'creditorName', type: 'text',editable : 'true'},
            { label: 'firstName', fieldName: 'firstName', type: 'text',editable : 'true'},
            { label: 'lastName', fieldName: 'lastName', type: 'text',editable : 'true'},
            { label: 'minPaymentPercentage', fieldName: 'minPaymentPercentage', type: 'decimal',editable : 'true'},
            { label: 'balance', fieldName: 'balance', type: 'decimal',editable : 'true'}
        ]);
        //get data to be deployed in Datatable
        helper.getData(cmp);
	},
    //get Selected rows
    getSelectedData: function (cmp, event) {
        var selectedRows = event.getParam('selectedRows'); 
        cmp.set('v.CheckRowCount',selectedRows.length);
        var selectedTotal = 0; 
        for ( var i = 0; i < selectedRows.length; i++ ) {
            selectedTotal += parseInt(selectedRows[i].balance);
        }
        cmp.set('v.selectedData',selectedRows);
        cmp.set('v.TotalAmount',selectedTotal);
    },
    //Add Empty row with an ability to enter Inline values. Once value is added, hit save button
    addRow : function (cmp, event, helper) {
        var debtData = cmp.get('v.debtHoldersData');
        var totalCount = cmp.get('v.TotalRowCount');
        debtData.push(
            {
                id: totalCount+1,
                creditorName: "",
                firstName: "",
                lastName: "",
                minPaymentPercentage: 0,
                balance: 0,
            } 
        );
        cmp.set("v.debtHoldersData", debtData);
        cmp.set('v.TotalRowCount',totalCount+1);
    },
    //remove Selected Rows
    removeRow: function (cmp, event) {
       var rows = cmp.get('v.debtHoldersData');
       var selectedRows = cmp.get('v.selectedData');
       var rowsIds = [];
       for(var j=0;j<selectedRows.length;j++){
          rowsIds.push(selectedRows[j].id);
       }  
       var rowsDupe = [];
       for(var i=0;i<rows.length;i++){
           if(!rowsIds.includes(rows[i].id)){
               rowsDupe.push(rows[i]);
           }
       }
       cmp.set('v.debtHoldersData',rowsDupe);
       cmp.set('v.TotalRowCount',rowsDupe.length);
       cmp.set('v.CheckRowCount',0);
       var ltngCmp = cmp.find("DebtTable");
       selectedRows = [];
       if(ltngCmp){
         ltngCmp.set("v.selectedRows", selectedRows);            
       }  
    },
    //save adds a row to the JSON file
    handleSave: function (cmp, event) {
        var draftValues = event.getParam('draftValues'); 
        var rows = cmp.get("v.debtHoldersData");
        rows[rows.length-1].id = draftValues[0].id;
        rows[rows.length-1].creditorName = draftValues[0].creditorName;
        rows[rows.length-1].firstName = draftValues[0].firstName;
        rows[rows.length-1].lastName = draftValues[0].lastName;
        rows[rows.length-1].minPaymentPercentage = draftValues[0].minPaymentPercentage;
        rows[rows.length-1].balance = draftValues[0].balance;
        cmp.set("v.debtHoldersData",rows);
        alert("Data added to Json");
    }
})
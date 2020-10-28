({
    //Server side action to get the JSON Data
	getData  : function(cmp) {
		var action = cmp.get('c.getDebtHoldersData');
        action.setCallback(this, $A.getCallback(function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                cmp.set('v.debtHoldersData', response.getReturnValue());
                cmp.set('v.TotalRowCount', response.getReturnValue().length);
            } else if (state === "ERROR") {
                var errors = response.getError();
                console.error(errors);
            }
        }));
        $A.enqueueAction(action);
	}
})
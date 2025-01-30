

if (sap.n) {
    sap.n.Planet9.function({
        id: "AuditLog",
        method: "Save",
        data: {
            dateStart: Date.now(),
            dateEnd: Date.now(),
            changedBy: "System",
            content: JSON.stringify({ name: "nqm1000am_global" }),
            objectKey: "1ed2fd4f-643b-4ca0-a187-a0101aba5693",
            objectName: "inSimpleForm1rhNum",
            objectType: "sap.m.Input",
            action: "Interaction"
        },
        success: function(data) {
            // Handle success
        },
        error: function(data) {
            // Handle error
        }
    });
};
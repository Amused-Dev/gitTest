sap.ui.getCore().attachInit(function() {
    var options = {};
    apiRestAPIUserDataList(options).then((response) => {
        console.log("then");
    });
});
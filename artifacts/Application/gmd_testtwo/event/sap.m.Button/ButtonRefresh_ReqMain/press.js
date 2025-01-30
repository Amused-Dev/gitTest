var options = {
    // parameters: {
    //     "where": "", // Optional 
    //     "select": "", // Optional 
    //     "take": "", // Optional 
    //     "skip": "", // Optional 
    //     "order": "" // Optional 
    // }
};

apiReqHdrGET(options).then((response) => {
    console.log(response);
    console.log('****');
    console.log(Table_ReqMain.getModel());
});
// Custom Init - Happens only once when mounting the component
sap.ui.getCore().attachInit(function(startParams) {
    main();
});


function main(){
    //Get userdataLIST
    console.log('initBeforePromises');
    ReqMainPage.mainListingPromises();
    console.log('initAfterPromises');
    // var options = {};
    // apiUserDataLIST().then((response) => {

    // });

}





// function dateFormatter(timeStampDate: string | number | Date): string {
//     const date = new Date(timeStampDate);
//     const options: Intl.DateTimeFormatOptions = { day: "2-digit", month: "short", year: "numeric" };
//     const formattedDate = date.toLocaleDateString("en-US", options);
//     return formattedDate;
// }

// function dateFormatter(timeStampDate){
//     const date = new Date(timeStampDate);
//     const options = { day: "2-digit", month: "short", year: "numeric" };
//     const formattedDate = date.toLocaleDateString("en-US", options);
//     return formattedDate;     
// }






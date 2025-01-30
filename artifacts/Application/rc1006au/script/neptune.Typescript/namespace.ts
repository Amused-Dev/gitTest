// namespace CustomComponent {

//     export function initMatAutocomplete() {
//         //console.log('Material Autocomplete Custom Component Init');
//         let keyupTimeout;
        
//         ComboBoxMatAuto.setShowClearIcon(true);
//         ComboBoxMatAuto.attachBrowserEvent("keyup", function (oEvent) {
//             oEvent.preventDefault();

            

//             clearTimeout(keyupTimeout);
//             ComboBoxMatAuto.open();
            
//             keyupTimeout = setTimeout(function () { 
//                filterMaterialDataViaApi(ComboBoxMatAuto.getValue());
//             }, 750);

//             ComboBoxMatAuto.setBusyIndicatorDelay(2000).setBusy(true);          

//         });
 

//      }

//      async function filterMaterialDataViaApi(searchedValue: any){

//                 //Determine if user is seach by material number or Description
//                 let apiWhereClause : string;
//                 if(!isNaN(parseFloat(searchedValue)) && isFinite(searchedValue)){
//                     searchedValue = getSearchedMatNumber(ComboBoxMatAuto.getValue());
//                     apiWhereClause = JSON.stringify({ "Material_Number": `Like(%25${searchedValue}%25)` });
//                 }else{
//                     searchedValue = substringSearchValue(ComboBoxMatAuto.getValue());
//                     apiWhereClause = JSON.stringify({ "Material_Desc": `Like(%25${searchedValue}%25)` });
//                     //ComboBoxMatAuto.setValue(searchedValue);
//                 }

//                 var options = {
//                     parameters: {
//                         "where": apiWhereClause,
//                     }
//                 }       
//                 //console.log(options); 

                
//                 await apigetMaterialsAPI(options).then((response) => {
//                     ComboBoxMatAuto.setBusy(false);
//                     ComboBoxMatAuto.open();                   
//                     //console.log("rebuilt with API");
//                 });
//      }

//      //If the seached value contains " - ", then return only what comes before it.
//      function getSearchedMatNumber(searchedValue){
//         const str = searchedValue;
//         const result = str.split(" - ")[0] ? str.split(" - ")[0] : str; 
        
//         return result;
//      }      

//      //If the seached value contains " - ", then return only what comes after it.
//      function substringSearchValue(searchedValue){
//         const str = searchedValue;
//         const result = str.split(" - ")[1] ? str.split(" - ")[1] : str; 
        
//         return result;
//      }    
    
// }
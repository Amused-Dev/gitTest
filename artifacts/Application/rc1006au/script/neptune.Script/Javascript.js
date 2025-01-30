sap.ui.getCore().attachInit(function() {

    let ComboBoxMatAuto = new sap.m.ComboBox("ComboBoxMatAuto");
    ComboBoxMatAuto.attachEvent("_handleInput", function(){
        console.log('event');
    });
    FlexBox.insertItem(ComboBoxMatAuto, 0);

//     if (rc1004au_ComboBoxMatAuto) {
        
//         rc1004au_ComboBoxMatAuto.addEventDelegate({
//             attachPress: function(oEvent) {
//                 console.log("attachPress");
//                 //oEvent.preventDefault();
//             },            
//             _handleInput: function(oEvent) {
//                 console.log("_handleInput");
//                 //oEvent.preventDefault();
//             },
//             onAfterRendering: function() {               
//                 console.log('onAfterRender');
//                 var domRef = ComboBoxMatAuto.getFocusDomRef();
//                 if (domRef) {
//                     // Remove the aria-autocomplete attribute
//                     //domRef.removeAttribute("aria-autocomplete");
                    
//                     domRef.setAttribute("aria-autocomplete", "none");
//                     console.log(domRef);
//                 }                  
//                 rc1004au_ComboBoxMatAuto.fireEvent("customAfterRenderingOnce");
                
//             }           
//         });      

//         rc1004au_ComboBoxMatAuto.attachEventOnce("customAfterRenderingOnce", function() {
//             console.log("ComboBoxMatAuto has been rendered (custom event fired)");
//             rc1004au.initMatAutocomplete();
//         });
      
//     } else {
//         console.error("control not found");
//     }
 });

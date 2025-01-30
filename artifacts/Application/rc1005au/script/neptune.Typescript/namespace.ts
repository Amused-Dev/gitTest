/**
 * Use this namespace to reference objects in your custom component.
 * 
 * When using custom components you might have multiple instances of the
 * same custom component. When you add a custom component to an app this
 * namespace is renamed to the custom component object name in the app.
 * 
 * E.g. if the custom component object name is myCustomComponent you can call
 * functions from this namespace with myCustomComponent.foo()
 *
 */
namespace CustomComponent {

    export function getUserDataList(){
       console.log('got here two');
    }
    
    export function getUserFullName(userId) {
        console.log("1234545435394560");
        console.log(userId);
        let data = modelMultiModelUserDataList.getData();

        console.dir(data, {depth: 6});
    }
    
}
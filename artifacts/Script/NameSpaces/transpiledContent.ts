// appFunctions.ts
var Space;
(function (Space) {
    function name() {
        console.log('GOT OVER HERE');
    }
    Space.name = name;
})(Space || (Space = {}));

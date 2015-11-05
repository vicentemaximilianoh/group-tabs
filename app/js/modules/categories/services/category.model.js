(function (angular) {
    
    angular.module('categories')
    .factory('Category', Category);
    
    function Category () {
        
        var _name = null;
        var _urls = [];
        
        var getName = function getName () {
            return _name;
        };
        
        var setName = function setName (name) {
            _name = name;
        };
        
        var addUrl = function addUrl (url) {
            _urls.push(url);
        };
        
        
        return function (name) {
            getName: getName,
            setName: setName,
            addUrl: addUrl
        }
        
    };
    
    Category.$inject = [];
    
})(angular);
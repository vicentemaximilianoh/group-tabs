(function (angular){
    
    angular.module('libs')
    .factory('$_', UnderscoreService);

    function UnderscoreService () {
        return _;
    };
    UnderscoreService.$inject = [];
    
}());
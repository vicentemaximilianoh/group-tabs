//(function (angular){
    
    angular.module('libs')
    .factory('$underscore', UnderscoreService);

    function UnderscoreService () {
        return window._;
    };
    
    UnderscoreService.$inject = [];
    
//}(angular));
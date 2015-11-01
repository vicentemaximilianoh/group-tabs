angular.module('categories')
.config(['$stateProvider', function ($stateProvider){
    
    $stateProvider
    .state('categories', {
        url: '/categories',
        templateUrl: '/app/js/categories/category.html',
        controller: 'CategoriesCtrl'
    });
    
}]);
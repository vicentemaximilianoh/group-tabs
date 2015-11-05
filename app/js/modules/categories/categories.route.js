angular.module('categories')
.config(['$stateProvider', function ($stateProvider){
    
    $stateProvider
    .state('categories', {
        url: '/categories',
        templateUrl: '/app/js/modules/categories/templates/categories.html',
    })
    .state('categories.list', {
        url: '/list',
        templateUrl: '/app/js/modules/categories/templates/categories.list.html',
        controller: 'CategoriesCtrl as categoriesCtrl',
    })
    .state('categories.new', {
        url: '/new',
        templateUrl: '/app/js/modules/categories/templates/category.html',
        controller: 'CategoryNewCtrl'
    })
    .state('categories.edit', {
        url: '/edit/:categoryId',
        templateUrl: '/app/js/modules/categories/templates/category.html',
        controller: 'CategoryEditCtrl',
        controllerAs: 'categoryEdit',
        params: {
            categoryId: undefined
        },
        resolve: {
            category: ['$stateParams', 'CategoriesService', function ($stateParams, CategoriesService){
                return CategoriesService.get($stateParams.categoryId);
            }]
        }
    });
    
        
}]);
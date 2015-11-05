angular.module('categories')
    .config(['$stateProvider', '$urlRouterProvider',
             function ($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('categories', {
                    url: '/categories',
                    abstract: true,
                    templateUrl: '/app/js/modules/categories/templates/categories.html',
                })
                .state('categories.list', {
                    url: '',
                    templateUrl: '/app/js/modules/categories/templates/categories.list.html',
                    controller: 'CategoriesCtrl as categoriesCtrl',
                })
                .state('categories.new', {
                    url: '/new',
                    templateUrl: '/app/js/modules/categories/templates/category.html',
                    controller: 'CategoryNewCtrl as categoryItemCtrl'
                })
                .state('categories.edit', {
                    url: '/edit/:categoryId',
                    templateUrl: '/app/js/modules/categories/templates/category.html',
                    controller: 'CategoryEditCtrl as categoryItemCtrl',
                    params: {
                        categoryId: undefined
                    },
                    resolve: {
                        category: ['$stateParams', 'CategoriesService', function ($stateParams, CategoriesService) {
                            return CategoriesService.get(parseInt($stateParams.categoryId));
            }]
                    }
                });

}]);
angular.module('grouped-tabs', ['LocalStorageModule', 'ngRoute', 'ui.router', 'categories', 'libs'])
    .config([
    '$stateProvider', 'localStorageServiceProvider', '$urlRouterProvider',
    function ($stateProvider, localStorageServiceProvider, $urlRouterProvider) {

            localStorageServiceProvider.setPrefix('ls');

            $urlRouterProvider
                .when('/', '/categories')
                .otherwise('/');
  }]);
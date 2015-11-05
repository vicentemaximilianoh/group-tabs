angular.module('grouped-tabs', ['LocalStorageModule', 'ngRoute', 'ui.router','categories'])
  .config([
    '$stateProvider','localStorageServiceProvider', 
    function($stateProvider, localStorageServiceProvider){
      
    localStorageServiceProvider.setPrefix('ls');
      
        
  }]);
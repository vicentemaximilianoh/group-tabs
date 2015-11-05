(function (angular) {
    
    angular.module('categories')
.controller('CategoriesCtrl', CategoriesCtrl);


function CategoriesCtrl ($scope, $state, CategoriesService) {
        
    $scope.categories = CategoriesService.getAll();
    
    this.goToAadd = function () {
        $state.go('categories.new');
    };
    
    this.deleteCategory = function (index) {
        $scope.categories.splice(index, 1);
        CategoriesService.remove(index);
    };
    
    this.recoverTabs = function (index) {
        var category = CategoriesService.get(index);
        category.tabs.forEach(function (tab) {
            chrome.tabs.create({ url: tab.url });
        });
    };
    
};

CategoriesCtrl.$inject = ['$scope', '$state', 'CategoriesService'];
    
})(angular);
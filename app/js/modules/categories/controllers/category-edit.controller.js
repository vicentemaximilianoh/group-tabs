(function (angular) {
    
    angular.module('categories')
    .controller('CategoryEditCtrl', CategoryCtrl);


    function CategoryCtrl ($scope, $state, $stateParams, $window, localStorageService, category, CategoriesService) {

        $scope.category = category;
        $scope.title = 'Edit Tabs Group';
        $scope.actionBtn = 'Update Tabs Group';
        
        
        $scope.openTabs = [];
        chrome.tabs.query({}, function(tabs) {
            $scope.openTabs = tabs;
        } );
        
        /*
        var inStore = localStorageService.get('categories');
        $scope.categories = inStore || [];
        $scope.$watch('categories', function () {
            localStorageService.set('categories', $scope.categories);
        }, true);
        */
    
        $scope.deleteTab = function (index) {
            if($scope.category.tabs.length > 1) {
                $scope.category.tabs.splice(index, 1);
            }else {
                $window.alert('The category must have one tab at least.');
            }
        };
        
        $scope.save = function () {
            
            $scope.openTabs.forEach(function (tab) {
                if (tab.checked) {
                    $scope.category.tabs.push(tab);
                }
            });
            
            CategoriesService.update($scope.category, $stateParams.categoryId);
            
            $scope.openTabs.forEach(function (tab) {
                if (tab.checked) {
                    chrome.tabs.remove(tab.id);
                }
            });
            
            $state.go('categories.list');
        };
        
        
    };

    CategoryCtrl.$inject = ['$scope', '$state', '$stateParams', '$window', 'localStorageService', 'category', 'CategoriesService'];
    
})(angular);
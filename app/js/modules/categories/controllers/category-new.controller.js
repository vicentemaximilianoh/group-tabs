(function (angular) {
    
    angular.module('categories')
    .controller('CategoryNewCtrl', CategoryCtrl);


    function CategoryCtrl ($scope, $state, $window, localStorageService, CategoriesService) {

            $scope.category = {
                name: null,
                tabs: []
            };
            $scope.title = 'New Tabs Group';
            $scope.actionBtn = 'Create Tabs Group';
        
        
        $scope.openTabs = [];
        chrome.tabs.query({}, function(tabs) {
            $scope.openTabs = tabs;
            console.log(tabs);
        } );
            
        var inStore = localStorageService.get('categories');
        $scope.categories = inStore || [];

        $scope.$watch('categories', function () {
            localStorageService.set('categories', $scope.categories);
        }, true);
    
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
                };
            });
            
            CategoriesService.create($scope.category);
            
            $scope.openTabs.forEach(function (tab) {
                if (tab.checked) {
                    chrome.tabs.remove(tab.id);
                };
            });
            
            $state.go('categories.list');
        };
        
        
    };

    CategoryCtrl.$inject = ['$scope', '$state', '$window', 'localStorageService', 'CategoriesService'];
    
})(angular);
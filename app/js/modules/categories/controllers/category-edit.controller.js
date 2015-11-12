(function (angular) {

    angular.module('categories')
        .controller('CategoryEditCtrl', CategoryCtrl);


    function CategoryCtrl($scope, $state, $stateParams, $window, localStorageService, category, CategoriesService) {

        //Initial data
        $scope.category = category;
        this.title = 'Edit Tabs Group';
        $scope.openTabs = [];
        chrome.tabs.query({}, function (tabs) {
            $scope.openTabs = tabs;
        });

        this.deleteTab = function deleteTab(id) {
            if ($window.confirm('You want to delete this tab?')) {
                if ($scope.category.tabs.length > 1) {
                    var index = -1;
                    $scope.openTabs.forEach(function (tab, key) {
                        if (tab.id === id) {
                            index = key;
                            return;
                        }
                    });

                    $scope.category.tabs.splice(index, 1);

                } else {
                    $window.alert('The category must have one tab at least.');
                }
            }
        };

        this.save = function save() {

            if (!$scope.category.tabs.length) {
                $window.alert('You must select one tab at least.');
            } else {

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
            }
        };


    };

    CategoryCtrl.$inject = ['$scope', '$state', '$stateParams', '$window', 'localStorageService', 'category', 'CategoriesService'];

})(angular);
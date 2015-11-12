(function (angular) {

    angular.module('categories')
        .controller('CategoryNewCtrl', CategoryCtrl);

    function CategoryCtrl($scope, $state, $window, localStorageService, CategoriesService, Category) {

        //Initial data
        $scope.category = new Category();
        /*{
            id: CategoriesService.getAutoincrementId(),
            name: null,
            tabs: []
        };*/
        this.title = 'New Tabs Group';

        $scope.openTabs = [];
        chrome.tabs.query({}, function (tabs) {
            $scope.openTabs = tabs;
        });

        this.deleteTab = function deleteTab(index) {
            if ($window.confirm('You want to delete this tab?')) {
                if ($scope.category.tabs.length > 1) {
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
                    };
                });

                CategoriesService.create($scope.category);

                $scope.openTabs.forEach(function (tab) {
                    if (tab.checked) {
                        chrome.tabs.remove(tab.id);
                    };
                });

                $state.go('categories.list');

            }
        };

    };

    CategoryCtrl.$inject = ['$scope', '$state', '$window', 'localStorageService', 'CategoriesService', 'Category'];

})(angular);
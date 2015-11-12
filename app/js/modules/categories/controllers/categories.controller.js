(function (angular) {

    angular.module('categories')
        .controller('CategoriesCtrl', CategoriesCtrl);


    function CategoriesCtrl($scope, $state, $window, CategoriesService) {

        $scope.categories = CategoriesService.getAll();

        this.goToAadd = function () {
            $state.go('categories.new');
        };

        this.deleteCategory = function (id) {

            if ($window.confirm('You want to delete this category?')) {
                CategoriesService.remove(id);
                $scope.categories = CategoriesService.getAll();
            }
        };

        this.recoverTabs = function (id) {
            var category = CategoriesService.get(id);
            category.tabs.forEach(function (tab) {
                chrome.tabs.create({
                    url: tab.url
                });
            });
        };

    };

    CategoriesCtrl.$inject = ['$scope', '$state', '$window', 'CategoriesService'];

})(angular);
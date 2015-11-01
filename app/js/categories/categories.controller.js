angular.module('categories')
.controller('CategoriesCtrl', CategoriesCtrl);


function CategoriesCtrl ($scope) {
    $scope.name = 'Maxi';
};

CategoriesCtrl.$inject = ['$scope'];
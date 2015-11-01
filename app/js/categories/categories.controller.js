angular.module('grouped-tabs')
.controller('CategoriesCtrl', CategoriesCtrl);


function CategoriesCtrl ($scope) {
    $scope.name = 'Maxi';
};

CategoriesCtrl.$inject = ['$scope'];
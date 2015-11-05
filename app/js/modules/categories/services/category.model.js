(function (angular) {

    angular.module('categories')
        .factory('Category', Category);

    function Category(CategoriesService) {

        var _name = null;
        var _tabs = [];

        var getName = function getName() {
            return _name;
        };

        var setName = function setName(name) {
            _name = name;
        };

        var addTab = function addTab(tab) {
            _tabs.push(tab);
        };


        function Category() {
            this.id = CategoriesService.getAutoincrementId();
            this.name = null;
            this.tabs = [];
        };

        Category.prototype.getName = getName;
        Category.prototype.setName = setName;
        Category.prototype.addTab = addTab;

        return Category;
    };

    Category.$inject = ['CategoriesService'];

})(angular);
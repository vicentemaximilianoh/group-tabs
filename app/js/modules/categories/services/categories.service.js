angular.module('categories')
.service('CategoriesService', CategoriesService);


function CategoriesService (localStorageService) {
    
    var _entity = 'categories';
    var _categories = localStorageService.get(_entity);
    
    function getCategories () {
        return _categories;
    };
    
    return {
        getAll: function () {
            return _categories;
        },
        get: function (index) {
            return _categories[index];
        },
        create: function (category) {
            _categories.push(category);
            localStorageService.set(_entity, _categories);
        },
        update: function (category, index) {
            _categories[index] = category;
            localStorageService.set(_entity, _categories);
        },
        remove: function (index) {
            delete _categories[index];
            localStorageService.set(_entity, _categories);
        }
    }
    
};

CategoriesService.$inject = ['localStorageService'];
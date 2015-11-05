angular.module('categories')
.service('CategoriesService', CategoriesService);


function CategoriesService ($underscore, localStorageService) {
    
    var _entity = 'categories';
    var _categories = localStorageService.get(_entity) || [];
    
    function getCategories () {
        return _categories;
    };
    
    function getCategoryById (id) {
        return $underscore.select(_categories, function (obj) {
            return obj.id === id;
        })[0];
    };
    
    function getCategoryIndexById (id) {
        var found = -1;
        angular.forEach(_categories, function (value, key) {
            if(value.id === id) {
                found = key;
                return;
            }
        });
        return found;
    };
    
    return {
        getAll: function () {
            return _categories;
        },
        get: function (id) {
            return getCategoryById(id);
        },
        create: function (category) {
            _categories.push(category);
            localStorageService.set(_entity, _categories);
        },
        update: function (category, id) {
            _categories[getCategoryIndexById(id)] = category;
            localStorageService.set(_entity, _categories);
        },
        remove: function (id) {
            _categories.splice(getCategoryIndexById(id), 1);
            localStorageService.set(_entity, _categories);
        },
        getAutoincrementId: function (){
            if (!_categories.length) {
                return (_categories.length + 1);
            } else {
                return ((_categories[_categories.length-1].id) + 1);
            }
        }
    }
    
};

CategoriesService.$inject = ['$underscore', 'localStorageService'];
import angular from 'angular';
import angularMeteor from 'angular-meteor';

import './sorting.html';

class Sorting {
    constructor() {
        this.changed();
    }

    changed() {
        this.onChange({
            sort: {
                [this.property]: parseInt(this.order)
            }
        });
    }
}

const name = 'sorting';

// create a module
export default angular.module(name, [
    angularMeteor
]).component(name, {
    templateUrl: `imports/ui/components/admin/${name}/${name}.html`,
    bindings: {
        onChange: '&',
        property: '@',
        order: '@'
    },
    controllerAs: "vm",
    controller: Sorting
});
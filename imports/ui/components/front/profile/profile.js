import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import './profile.html';

import { Profiles } from '../../../../api/profiles';


class Profile {
    constructor($scope, $reactive){
        'ngInject';

        $reactive(this).attach($scope);


        var profile = Profiles.findOne({});
        this.helpers({
            profile ()  {
                return profile;
            },

        });

        this.getIndexOfSkill =function (elem)   {
            return getIndexOfSkill(elem);
        }

        this.toDate = function(string)  {
            return toDate(string);
        }


        function getIndexOfSkill(elem) {
            var index = -1;
            if (profile) {
                index = profile.personalInformation.skills.indexOf(elem);
            }
            return index;
        }

        function toDate(string) {
            var date = null;
            if (profile && string != '') {
                var aux = string.split('-');
                date = new Date(parseInt(aux[1]), parseInt(aux[0]) - 1);
            }
            return date;
        }

    }
}

const name = 'profile';

// create a module
export default angular.module(name, [
    angularMeteor,
    uiRouter
]).component(name, {
    templateUrl: `imports/ui/components/front/${name}/${name}.html`,
    controllerAs: name,
    controller: Profile
})
    .config(config);

function config($stateProvider) {
    'ngInject';

    $stateProvider
        .state('profile.cv', {
            url: "/",
            views: {
                content: {
                    template: '<profile></profile>'
                }
            }
        });

}

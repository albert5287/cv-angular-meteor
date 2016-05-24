import angular from 'angular';
import angularMeteor from 'angular-meteor';

import './sidebar.html';
import { Profiles } from '../../../../api/profiles';

class Sidebar{
    constructor($scope, $reactive){
        'ngInject';

        $reactive(this).attach($scope);

        this.helpers({
            profile() {
                return Profiles.findOne({});
            }
            ,
            getFullName() {
                return this.getFullName();
            },
            getFullPhoneNumber(){
                return this.getFullPhoneNumber();
            },

            getPhoneNumberFormatted() {
                return this.getPhoneNumberFormatted();
            }
        });

    }

    getFullName(){
        var profile = this.profile;
        var fullName = '';
        if(profile){
            fullName = profile.firstName + ' ' + profile.lastName;
        }
        return fullName;
    }

    getFullPhoneNumber(){
        var profile = this.profile;
        var fullNumber = '';
        if(profile){
            fullNumber = profile.personalInformation.phone.code +  profile.personalInformation.phone.number;
        }
        return fullNumber;
    }

    getPhoneNumberFormatted(){
        var profile = this.profile;
        var fullNumber = '';
        if(profile){
            fullNumber = '(' + profile.personalInformation.phone.code + ') ' + profile.personalInformation.phone.number;
        }
        return fullNumber;
    }
}

const name = 'sidebar';

// create a module
export default angular.module(name, [
    angularMeteor
]).component(name, {
    templateUrl: `imports/ui/components/front/${name}/${name}.html`,
    controllerAs: name,
    controller: Sidebar
});

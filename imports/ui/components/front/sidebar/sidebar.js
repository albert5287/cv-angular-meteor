import angular from 'angular';
import angularMeteor from 'angular-meteor';

import './sidebar.html';
import { Profiles } from '../../../../api/profiles';

class Sidebar{
  constructor($scope, $reactive){
    'ngInject';

    $reactive(this).attach($scope);

    var profile = Profiles.findOne({});

    this.helpers({
      profile() {
        return profile;
      },
      getFullName() {
        return getFullName();
      },
      getFullPhoneNumber(){
        return getFullPhoneNumber();
      },

      getPhoneNumberFormatted() {
        return getPhoneNumberFormatted();
      }
    });

    function getFullName(){
      var fullName = '';
      if(profile){
        fullName = profile.firstName + ' ' + profile.lastName;
      }
      return fullName;
    }

    function getFullPhoneNumber(){
      var fullNumber = '';
      if(profile){
        fullNumber = profile.personalInformation.phone.code +  profile.personalInformation.phone.number;
      }
      return fullNumber;
    }

    function getPhoneNumberFormatted(){
      var fullNumber = '';
      if(profile){
        fullNumber = '(' + profile.personalInformation.phone.code + ') ' + profile.personalInformation.phone.number;
      }
      return fullNumber;
    }
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

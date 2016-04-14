import angular from 'angular';
import angularMeteor from 'angular-meteor';

import './sidebar.html';
import { Profiles } from '../../../api/profiles';

class Sidebar{
  constructor($scope, $reactive){
    'ngInject';

    $reactive(this).attach($scope);
    //this.subscribe('profile');
    console.log('aqui andamos')
    var profile = Profiles.findOne({});
    console.log(profile)
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
  templateUrl: `imports/ui/components/${name}/${name}.html`,
  controllerAs: name,
  controller: Sidebar
});
/*
angular.module('cv').directive('sidebar', function () {
  return {
    restrict: 'E',
    templateUrl: 'client/cv/sidebar/sidebar.html',
    controllerAs: 'sidebar',
    controller: function ($scope, $reactive) {
      $reactive(this).attach($scope);
      this.subscribe('coverLetters');
      var profile = Profiles.findOne({});

      this.helpers({
        profile: () => {
          return profile;
        },
        getFullName : () => {
          return getFullName();
        },
        getFullPhoneNumber : () => {
          return getFullPhoneNumber();
        },

        getPhoneNumberFormatted : () => {
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
  });*/
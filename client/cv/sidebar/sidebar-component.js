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
  });
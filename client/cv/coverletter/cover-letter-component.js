angular.module('cv').directive('coverletter', function () {
    return {
      restrict: 'E',
      templateUrl: 'client/cv/coverletter/coverletter.html',
      controllerAs: 'letter',
      controller: function ($scope, $reactive, $stateParams, $sce) {
        $reactive(this).attach($scope);
        var coverLetter = CoverLetters.findOne({slug: $stateParams.slug});
        this.helpers({
          coverLetter: () => {
            return coverLetter;
          },
          getContent: () =>{
            return $sce.trustAsHtml(coverLetter.content);
          }

        });

        /*var profile = Profiles.findOne({});
        this.helpers({
          profile: () => {
            return profile;
          }
        });

        this.getIndexOfSkill = (elem) => {
          return getIndexOfSkill(elem);
        };

        this.toDate = (string) => {
          return toDate(string);
        };
        

        function getIndexOfSkill(elem){
          var index = -1;
          if(profile){
            index = profile.personalInformation.skills.indexOf(elem);
          }
          return index;
        }

        function toDate(string){
          var date = null;
          if(profile && string != ''){
            var aux = string.split('-');
            date = new Date(parseInt(aux[1]), parseInt(aux[0])-1);
          }
          return date;
        }*/
      }
    }
  });
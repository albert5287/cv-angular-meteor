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
          },
          fileUrl: () => {
              var url =  Files.findOne({_id : coverLetter.file});
              if(url){
                  return url.url();
              }
              else{
                  return false;
              }
          }

        });
      }
    }
  });
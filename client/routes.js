angular.module('cv').config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider
  .state('cv', {
    url: "/",
    views:{
      sidebar: {
        template: '<sidebar></sidebar>'
      },
      content:{
        template: '<profile></profile>'
      }
    },
    resolve: {
      profile: ['$meteor',function($meteor){
        return $meteor.subscribe('profile');
      }]
    }
  })
  .state('cv.coverLetter', {
    url: 'cover-letter/:slug',
    views:{
      'content@': {
        template: '<coverletter></coverletter>'
      }
    },
    resolve: {
      coverLetter: ['$meteor',function($meteor){
        return $meteor.subscribe('coverLetters');
      }]
    },
    onEnter: function($stateParams, $state){
      var letter = CoverLetters.findOne({slug : $stateParams.slug});
      if(!letter){
        $state.go('cv');
      }
    }
  });

  $urlRouterProvider.otherwise("/");
});
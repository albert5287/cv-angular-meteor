angular.module('cv').config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $stateProvider
        .state('profile', {
            abstract: true,
            template: '<profilestructure></profilestructure>'
        })
        .state('profile.cv', {
            url: "/",
            views: {
                sidebar: {
                    template: '<sidebar></sidebar>'
                },
                content: {
                    template: '<profile></profile>'
                }
            },
            resolve: {
                profile: ['$q', function ($q) {
                    var deferred = $q.defer();

                    Meteor.subscribe('profile', {
                        onReady: deferred.resolve,
                        onStop: deferred.reject
                    });

                    return deferred.promise;
                }]
            }
        })
        .state('profile.coverLetter', {
            url: 'cover-letter/:slug',
            views: {
                'content@': {
                    template: '<coverletter></coverletter>'
                }
            },
            resolve: {
                coverLetter: ['$q', function ($q) {
                    var deferred = $q.defer();

                    Meteor.subscribe('coverLetters', {
                        onReady: deferred.resolve,
                        onStop: deferred.reject
                    });

                    return deferred.promise;
                }]
            },
            onEnter: function ($stateParams, $state) {
                var letter = CoverLetters.findOne({slug: $stateParams.slug});
                if (!letter) {
                    $state.go('cv');
                }
            }
        })
        .state('admin', {
            abstract: true,
            url: '/admin',
            template: '<ui-view/>'
        })
        .state('admin.login', {
            url: '/login',
            template: '<adminlogin></adminlogin>'
        });

    $urlRouterProvider.otherwise("/");
});
angular.module('cv').config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $stateProvider
        .state('cv', {
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
        .state('cv.coverLetter', {
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
        .state('login', {
            url: '/admin/login',
            views: {
                'content@': {
                    templateUrl: 'client/cv/admin/admin.html',
                    controllerAs: 'covers',
                    controller: function($scope, $reactive){
                        var vm = this;
                        var letterDetails = {
                            name : '',
                            title: '',
                            subtitle: '',
                            content: ''
                        };
                        console.log('aqui');
                        $reactive(vm).attach($scope);
                        vm.idShowForm = null;
                        vm.subscribe('coverLetters');

                        vm.helpers({
                            coverLetters: () => {
                                return  CoverLetters.find({});
                            },
                            isLoggedIn: () => {
                                return Meteor.user() ? true : false;
                            },
                            selectedLetter: () => {
                                console.log('selected');
                                if(vm.getReactively('idShowForm') == null){
                                    return letterDetails
                                }
                                else{
                                    return CoverLetters.findOne({_id : vm.getReactively('idShowForm')})
                                }
                            }
                        });

                        vm.showForm = false;
                        vm.setShowForm = function(id){
                            vm.idShowForm = id;
                            vm.showForm = true;
                        };
                        vm.hideForm = function(){
                            console.log('test')
                            vm.showForm = false;
                        };
                        vm.save = function(){
                            vm.selectedLetter.slug = slugify(vm.selectedLetter.name);
                            if(vm.showForm == null){
                                CoverLetters.insert(vm.selectedLetter);
                            }
                            else{
                                CoverLetters.update({_id : vm.selectedLetter._id},
                                    {
                                        $set: {
                                            name : vm.selectedLetter.name,
                                            slug : vm.selectedLetter.slug,
                                            title : vm.selectedLetter.title,
                                            subtitle : vm.selectedLetter.subtitle,
                                            content : vm.selectedLetter.content
                                        }
                                    });
                            }
                            console.log('test', vm.selectedLetter);
                        }
                    }
                },
            },
        });

    $urlRouterProvider.otherwise("/");
});
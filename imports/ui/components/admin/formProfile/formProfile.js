import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import angularSchemaForm from 'angular-schema-form';
import angularSchemaFormBootstrap from 'angular-schema-form-bootstrap';

import { Meteor } from 'meteor/meteor';

import './formProfile.html';

import { Profiles } from '../../../../api/profiles';




class FormProfile {
    constructor($scope, $reactive, $state){
        'ngInject';

        $reactive(this).attach($scope);

        //helpers
        this.helpers({
            profile ()  {
                return Profiles.findOne({});
            }
        });

        this.schema = {
            "type": "object",
            "properties": {
                "firstName": {
                    type: "string",
                    minLength: 2,
                    title: "First Name"
                },
                "lastName": {
                    type: "string",
                    minLength: 2,
                    title: "Last Name"
                },
                "headline":{
                    type: "string",
                    minLength: 2,
                    title: "Profession"
                },
                "personalInformation":{
                    "type": "object",
                    "title": "Personal Information",
                    "properties": {
                        "extract": {
                            type: "string",
                            minLength: 2,
                            title: "extract"
                        },
                        "phone":{
                            "type": "object",
                            "title": "Phone",
                            "properties": {
                                "type": {
                                    type: "string"
                                },
                                "code": {
                                    type: "string",
                                    maxLength: 5
                                },
                                "number": {
                                    type: "string"
                                }

                            }
                        },
                        "languages":{
                            "type": "array",
                            "title": "Languages",
                            "items": {
                                "type": "object",
                                "title": "Language",
                                "properties": {
                                    "name": {
                                        "type": "string"
                                    },
                                    "level": {
                                        "type": "string"
                                    }
                                }
                            }
                        },
                        "skills":{
                            "type": "array",
                            "title": "Skills",
                            "items": {
                                "type": "object",
                                "title": "Skill",
                                "properties": {
                                    "name": {
                                        "type": "string"
                                    },
                                    "value": {
                                        "type": "string"
                                    }
                                }
                            }
                        },
                        "interests":{
                            "type": "array",
                            "title": "Interests",
                            "items": {
                                "type": "object",
                                "title": "Interest",
                                "properties": {
                                    "name": {
                                        "type": "string"
                                    },
                                    "icon": {
                                        "type": "string"
                                    }
                                }
                            }
                        }

                    }
                },
                "workExperience": {
                    "type": "array",
                    "title": "Work Experience",
                    "items": {
                        "type": "object",
                        "properties": {
                            "company": {
                                "type": "string"
                            },
                            "title": {
                                "type": "string"
                            },
                            "description": {
                                "type": "string"
                            },
                            "from": {
                                "type": "string"
                            },
                            "until": {
                                "type": "string"
                            }
                        }
                    }
                },
                "education": {
                    "type": "array",
                    "title": "Education",
                    "items": {
                        "type": "object",
                        "properties": {
                            "institute": {
                                "type": "string"
                            },
                            "title": {
                                "type": "string"
                            },
                            "discipline": {
                                "type": "string"
                            },
                            "score": {
                                "type": "string"
                            },
                            "activities": {
                                "type": "string"
                            },
                            "from": {
                                "type": "string"
                            },
                            "until": {
                                "type": "string"
                            }
                        }
                    }
                }

            }
        };

        /*this.form = [
            {
                "type": "help",
                "helpvalue": "<h4>Array Example</h4><p>Try adding a couple of forms, reorder by drag'n'drop.</p>"
            },
            {
                "key": "comments",
                "add": "New",
                "style": {
                    "add": "btn-success"
                },
                "items": [
                    "comments[].name",
                    "comments[].email",
                    {
                        "key": "comments[].spam",
                        "type": "checkbox",
                        "title": "Yes I want spam.",
                        "condition": "model.comments[arrayIndex].email"
                    },
                    {
                        "key": "comments[].comment",
                        "type": "textarea"
                    }
                ]
            },
            {
                "type": "submit",
                "style": "btn-info",
                "title": "OK"
            }
        ];*/

        this.form = [
           "*",
            {
                "key": "personalInformation.extract",
                "type": "textarea",
                "placeholder": "Make a comment"
            },
            {
                type: "submit",
                title: "Save"
            }
        ];

        /*this.form = [
            {
                type: "tabs",
                tabs: [
                    {
                        title: "Tab 1",
                        items: [
                            "firstName"
                        ]
                    },
                    {
                        title: "Tab 2",
                        items: [
                            "lastName"
                        ]
                    }
                ]
            }
        ];*/



    }
    save(profile){
        Profiles.update(profile._id, profile);
    }
}

const name = 'formProfile';

// create a module
export default angular.module(name, [
    angularMeteor,
    uiRouter,
    'schemaForm'
]).component(name, {
    templateUrl: `imports/ui/components/admin/${name}/${name}.html`,
    controllerAs: "vm",
    controller: FormProfile
})
    .config(config);

function config($stateProvider) {
    'ngInject';

    $stateProvider
        .state('admin.profile', {
            url: "/profile",
            views: {
                'content@admin': {
                    template: '<form-profile></form-profile>'
                }
            },
            data: {
                title: 'New Cover Letter'
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
        });

}

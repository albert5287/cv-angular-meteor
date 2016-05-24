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

        this.model = {
            "firstName": "Albert",
            "lastName": "Gracia",
            "headline": "Full Stack Web Developer",
            "personalInformation": {
                "extract": "Self-starter with good communication skills, autodidact and always looking for new challenges. Utilises an efficient and practical approach to problem solving to meet deadlines, budgets and goals. Turns into an absolute passionate geek when two of his favorite things combine: developing & diving into new technologies. ",
                "phone": {
                    "type": "mobile",
                    "code": "0041",
                    "number": "762771079"
                },
                "email": {
                    "type": "personal",
                    "email": "albertgrac@gmail.com"
                },
                "address": {
                    "street": "Goliathgasse",
                    "number": "12",
                    "zip": "9000",
                    "city": "St. Gallen",
                    "country": "Switzerland"
                },
                "languages":[
                    {
                        "name": "Spanish",
                        "level": "Native"
                    },
                    {
                        "name": "English",
                        "level": "Full professional working proficiency"
                    },
                    {
                        "name": "German",
                        "level": "Elementary proficiency"
                    }
                ],
                "skills": [
                    {
                        "name": "PHP",
                        "value": "75"
                    },
                    {
                        "name": "JavaScript",
                        "value": "75"
                    },
                    {
                        "name": "HTML",
                        "value": "75"
                    },
                    {
                        "name": "CSS",
                        "value": "70"
                    },
                    {
                        "name": "Sass",
                        "value": "60"
                    },
                    {
                        "name": "Less",
                        "value": "60"
                    },
                    {
                        "name": "MySql",
                        "value": "70"
                    },
                    {
                        "name": "SQL",
                        "value": "60"
                    },
                    {
                        "name": "C#",
                        "value": "50"
                    },
                    {
                        "name": "AngularJs",
                        "value": "65"
                    },
                    {
                        "name": "Jquery",
                        "value": "70"
                    },
                    {
                        "name": "Laravel",
                        "value": "70"
                    },
                    {
                        "name": "Ionic",
                        "value": "65"
                    },
                    {
                        "name": "Git",
                        "value": "60"
                    },
                    {
                        "name": "Gulp",
                        "value": "55"
                    },
                    {
                        "name": "Grunt",
                        "value": "55"
                    },
                    {
                        "name": "Meteor",
                        "value": "50"
                    }
                ],
                "interests": [
                    {
                        "name" : "Travel",
                        "icon": "flight_takeoff"
                    },
                    {
                        "name" : "Music",
                        "icon": "headset"
                    },
                    {
                        "name" : "Friends",
                        "icon": "people"
                    },
                    {
                        "name" : "Sports",
                        "icon": "pool"
                    },
                    {
                        "name" : "Movies",
                        "icon": "movie"
                    }

                ]
            },
            "workExperience": [
                {
                    "company" : "Ecrome Group AG",
                    "title": "Full Stack Web Developer",
                    "description": "As a full stack web developer, my job currently consists in developing and maintaining the front and back end functionality of websites, as well as the API that serves the mobile apps.",
                    "from": "01-2015",
                    "until": ""
                },
                {
                    "company" : "WhiteBox Office",
                    "title": "Web Developer and Sub-project manager",
                    "description": "I was in charge of the development and the implementation of Web applications as well as the expansion of existing applications.  I also assisted with the analysis of the requirements to prepare and start the implementation of systems. During my time at WBO I was mainly working on the new website launch of \"La Liga de Futbol Profesional LFP\" (Spanish Football League), which won the Best Sport Website Award given away by the Spanish Ministry of Industry in 2014.",
                    "from": "10-2012",
                    "until": "12-2014"
                }
            ],
            "education": [
                {
                    "institute": "Athlone Institute of Technology",
                    "title": "Bachelor of Engineering (B.Eng.)",
                    "discipline": "Computer Software Engineering",
                    "score": "First Class Honours",
                    "activities": "Software Design, Databases, Networks, Server Side Technologies, Software Management and Practice, Project, Software Design, The Engineer in Society, Distributed Systems, Client-Side Technologies, Software Management and Practice, Project.",
                    "from": "2011",
                    "until": "2012"
                },
                {
                    "institute": "Universitat Jaume I",
                    "title": "Ingeniero Técnico en Informática de Sistemas",
                    "discipline": "Ingeniería informática",
                    "score": "73/100",
                    "activities": "Distributed Programming, Advanced Databases, InformationTechnologies and Society, Client/Server Systems, Algorithmic Scheme, Networks, Advanced Programming, Data and Information Structures, Operating Systems, Calculus, Physics, Management Software Engineering",
                    "from": "2011",
                    "until": "2012"
                }

            ]
        };


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

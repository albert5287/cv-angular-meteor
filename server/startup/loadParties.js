Meteor.startup(function () {
  if (Profiles.find().count() === 0) {
    var profiles = [
      {
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
}
    ];

    for (var i = 0; i < profiles.length; i++) {
      Profiles.insert(profiles[i]);
    }
  }
});

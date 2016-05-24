import angular from 'angular';
import angularMeteor from 'angular-meteor';
import ngMaterial from 'angular-material';
import uiRouter from 'angular-ui-router';

import { name as Cv } from '../imports/ui/components/cv/cv';

//import { name as AdminStructure } from '../imports/ui/components/admin/adminStructure/adminStructure';

angular.module('resume', [
    angularMeteor,
    ngMaterial,
    uiRouter,
    Cv,
//    AdminStructure
]);

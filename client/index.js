import angular from 'angular';
import angularMeteor from 'angular-meteor';
import ngMaterial from 'angular-material';
import uiRouter from 'angular-ui-router';

import { name as Cv } from '../imports/ui/components/front/cv/cv';

angular.module('resume', [
  angularMeteor,
  ngMaterial,
  uiRouter,
  Cv
]);

angular.module('cv').directive('profile', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/cv/profile/profile.html',
        controllerAs: 'main',
        controller: function ($scope, $reactive) {
            $reactive(this).attach($scope);

            var profile = Profiles.findOne({});
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


            function getIndexOfSkill(elem) {
                var index = -1;
                if (profile) {
                    index = profile.personalInformation.skills.indexOf(elem);
                }
                return index;
            }

            function toDate(string) {
                var date = null;
                if (profile && string != '') {
                    var aux = string.split('-');
                    date = new Date(parseInt(aux[1]), parseInt(aux[0]) - 1);
                }
                return date;
            }
        }
    }
});
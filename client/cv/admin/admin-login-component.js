angular.module('cv').directive('adminlogin', function () {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'client/cv/admin/admin.html',
        controllerAs: 'covers',
        controller: function ($scope, $reactive) {
            var vm = this;
            var letterDetails = {
                name : '',
                title: '',
                subtitle: '',
                content: ''
            };
            $reactive(vm).attach($scope);
            vm.idShowForm = null;

            vm.subscribe('coverLetters');
            vm.subscribe('files');

            vm.helpers({
                coverLetters: () => {
                    return  CoverLetters.find({});
                },
                isLoggedIn: () => {
                    return Meteor.user() ? true : false;
                },
                selectedLetter: () => {
                    if(vm.getReactively('idShowForm') == null){
                        return letterDetails
                    }
                    else{
                        return CoverLetters.findOne({_id : vm.getReactively('idShowForm')})
                    }
                }
            });
            vm.form = {};
            vm.showForm = false;
            vm.setShowForm = function(id){
                vm.idShowForm = id;
                vm.showForm = true;
            };
            vm.hideForm = function(){
                vm.showForm = false;
                vm.selectedLetter.file = null;
                angular.element("input[type='file']").val(null);
            };
            vm.save = function(){
                vm.selectedLetter.slug = slugify(vm.selectedLetter.name);
                var saveValues = {
                    name : vm.selectedLetter.name,
                    slug : vm.selectedLetter.slug,
                    title : vm.selectedLetter.title,
                    subtitle : vm.selectedLetter.subtitle,
                    content : vm.selectedLetter.content
                };

                //if file delete previous file, and insert new one
                if(vm.file){
                    Files.remove({_id: vm.selectedLetter.file}); // delete previous file
                    var savedFile = Files.insert(vm.file[0]);
                    saveValues.file = savedFile._id
                }

                //if null is new record
                if(vm.showForm == null){
                    CoverLetters.insert(vm.selectedLetter);
                }
                //else i have to update
                else{
                    CoverLetters.update({_id : vm.selectedLetter._id},
                        {
                            $set: saveValues
                        });
                }
            }
        }
    };
});
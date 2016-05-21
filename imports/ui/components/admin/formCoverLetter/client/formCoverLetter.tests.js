import { name as FormCoverLetter } from '../formCoverLetter';
import { CoverLetters, saveCoverLetter } from '../../../../../api/coverLetters';
import { Files } from '../../../../../api/files';
import { Meteor } from 'meteor/meteor';
import 'angular-mocks';

describe('FormCoverLetter', () => {
    beforeEach(() => {
        window.module(FormCoverLetter);
        window.module(Files);
    });

    describe('controller', () => {
        let controller;
        const coverLetter = {
            name: 'Foo',
            title: 'Birthday of Foo'
        };
        const file = 'new file';

        beforeEach(() => {
            inject(($rootScope, $componentController) => {
                controller = $componentController(FormCoverLetter, {
                    $scope: $rootScope.$new(true)
                });
            });
        });

        describe('reset()', () => {
            it('should clean up party object', () => {
                controller.coverLetter = coverLetter;
                controller.reset();

                expect(controller.coverLetter).toEqual({});
            });
        });

        /*describe('save()', () => {
            beforeEach(() => {
                spyOn(CoverLetters, 'insert');
                spyOn(Files, 'insert');
                spyOn(Files, 'remove');
                //spyOn(saveCoverLetter, 'apply');
                spyOn(controller, 'reset').and.callThrough();

                controller.coverLetter = coverLetter;
                controller.file = file;

                controller.save();
            });

            it('should insert a new file when it was not file before', () => {

                //spyOn(Files, 'insert');
                expect(Files.insert).toHaveBeenCalledWith(file);
            })*/

            /*it('should insert a new party', () => {
                //expect(CoverLetters.saveCoverLetter).toHaveBeenCalledWith(coverLetter);
                spyOn(saveCoverLetter, 'apply');
                try {
                    Meteor.call('saveCoverLetter');
                } catch (e) {}

                expect(saveCoverLetter.apply).toHaveBeenCalled();
            });*/

            /*it('should call reset()', () => {
                expect(controller.reset).toHaveBeenCalled();
            });
        });*/

        /*describe('submit()', () => {
            beforeEach(() => {
                spyOn(Parties, 'insert');
                spyOn(controller, 'reset').and.callThrough();

                controller.party = party;

                controller.submit();
            });

            it('should insert a new party', () => {
                expect(Parties.insert).toHaveBeenCalledWith(party);
            });

            it('should call reset()', () => {
                expect(controller.reset).toHaveBeenCalled();
            });
        });*/
    });
});
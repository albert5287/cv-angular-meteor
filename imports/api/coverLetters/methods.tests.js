import { saveCoverLetter, deleteCoverLetter } from './methods';
import { CoverLetters } from './collection';
import { Files } from '../files/collection';

import { Meteor } from 'meteor/meteor';

if (Meteor.isServer) {
    describe('CoverLetters / Methods', () => {
        describe('saveCoverLetter', () => {
            function loggedIn(userId = 'userId') {
                return {
                    userId
                };
            }

            const coverLetter = {
                name: 'cover letter',
                title: 'title cover letter'
            };

            it('should be called from Method', () => {
                spyOn(saveCoverLetter, 'apply');

                try {
                    Meteor.call('saveCoverLetter');
                } catch (e) {}

                expect(saveCoverLetter.apply).toHaveBeenCalled();
            });

            it('should fail on missing coverLetter', () => {
                expect(() => {
                    saveCoverLetter.call({});
                }).toThrowError();
            });

            it('should fail on missing userId', () => {
                expect(() => {
                    saveCoverLetter.call({}, coverLetter);
                }).toThrowError();
            });

            it('should fail on not logged in', () => {
                expect(() => {
                    saveCoverLetter.call({}, coverLetter, 'userId');
                }).toThrowError(/logged in/i);
            });


            it('should upsert the cover letter', () => {
                spyOn(CoverLetters, 'upsert');

                try {
                    saveCoverLetter.call(loggedIn(), coverLetter, 'userId');
                } catch (e) {}

                expect(CoverLetters.upsert).toHaveBeenCalledWith(coverLetter._id, coverLetter);
            });

        });
    });

    describe('deleteCoverLetter', () => {
        function loggedIn(userId = 'userId') {
            return {
                userId
            };
        }

        it('should be called from Method', () => {
            spyOn(deleteCoverLetter, 'apply');

            try {
                Meteor.call('deleteCoverLetter');
            } catch (e) {}

            expect(deleteCoverLetter.apply).toHaveBeenCalled();
        });

        it('should fail on missing id', () => {
            expect(() => {
                deleteCoverLetter.call({});
            }).toThrowError();
        });


        it('should fail if not logged in', () => {
            expect(() => {
                deleteCoverLetter.call({}, 'id');
            }).toThrowError(/403/);
        });

        // TODO: more tests
    });
}
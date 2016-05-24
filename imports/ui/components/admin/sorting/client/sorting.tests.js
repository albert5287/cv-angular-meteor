import { name as Sorting } from '../sorting';
import 'angular-mocks';

describe('Sorting', () => {
    beforeEach(() => {
        window.module(Sorting);
    });

    describe('controller', () => {
        let controller;

        /* these are the bindings of the component*/
        const onChange = function() {};
        const property = 'name';
        const order = -1;

        beforeEach(() => {
            inject(($rootScope, $componentController) => {
                controller = $componentController(Sorting, {
                    $scope: $rootScope.$new(true)
                }, {
                    onChange,
                    property,
                    order
                });
            });
        });
        it('should set property', () => {
            expect(controller.property).toEqual(property);
        });

        it('should set order', () => {
            expect(controller.order).toEqual(order);
        });

        it('should set onChange', () => {
            expect(controller.onChange).toBe(onChange);
        });

        describe('changed()', () => {
            it('should call onChange expression', () => {
                spyOn(controller, 'onChange');

                controller.changed();

                expect(controller.onChange).toHaveBeenCalledWith({
                    sort: {
                        [property]: order
                    }
                });
            });
        });
    })
})
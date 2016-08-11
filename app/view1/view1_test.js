'use strict';

describe('myApp.view1 module', function() {

    beforeEach(module('myApp.view1'));
    var scope, view1Ctrl, AgeFactory, Funfactory;

    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        view1Ctrl = $controller('View1Ctrl', {
            $scope: scope
        });
        AgeFactory = angular.injector(['myApp.view1']).get('AgeFactory');
        Funfactory = angular.injector(['myApp.view1']).get('Funfactory');
    }));

    describe('view1 controller', function(){

        it('should be defined', inject(function($controller) {
            expect(view1Ctrl).toBeDefined();
        }));

        it('should return the correct age from DOB', function() {
            var dob = new Date("04/27/1999");
            expect(AgeFactory.getAge(dob)).toEqual(17);
        });

        it('should return date fact', function() {
            var dob = new Date("04/27/1999");
            return Funfactory.getDateFact(dob).then(function(fact) {
                expect(fact).toBeDefined();
            });
        });

        it('should return math fact', function() {
            return Funfactory.getMathFact(17).then(function(fact) {
                expect(fact).toBeDefined();
            });
        });

        it('should return trivia fact', function() {
            return Funfactory.getTriviaFact(17).then(function(fact) {
                expect(fact).toBeDefined();
            });
        });

  });
});
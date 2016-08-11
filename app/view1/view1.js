'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])
.controller('View1Ctrl', ['$scope', 'AgeFactory', 'Funfactory', function($scope, AgeFactory, Funfactory) {
    $scope.guest = {};
    $scope.facts = false;

    $scope.submit = function() {
        $scope.guest.age = AgeFactory.getAge($scope.guest.dob);
        Funfactory.getDateFact($scope.guest.dob).then(function(fact) {
            $scope.guest.fact_date = fact;
            Funfactory.getMathFact($scope.guest.age).then(function(fact) {
                $scope.guest.fact_math = fact;
                Funfactory.getTriviaFact($scope.guest.age).then(function(fact) {
                    $scope.guest.fact_trivia = fact;
                    $scope.facts = true;
                });
            });
        });
    }

    $scope.reset = function() {
        $scope.guest = {};
        $scope.facts = false;
    }
}])
.factory('AgeFactory', [function() {
    return {
        getAge: function(dob) {
            var ageDate = new Date(Date.now() - dob.getTime());
            return Math.abs(ageDate.getUTCFullYear() - 1970);
        }
    }
}])
.factory('Funfactory', ["$http", function($http) {
    return{
        getDateFact: function(dob) {
            var month = dob.getMonth() + 1, 
                day   = dob.getDate();

            return $http.get('http://numbersapi.com/' + month + '/' + day + '/date').then(function(fact) {
                return fact.data;
            });  
        },
        getMathFact: function(age) {
            return $http.get('http://numbersapi.com/' + age + '/math').then(function(fact) {
                return fact.data;
            });
        },
        getTriviaFact: function(age) {
            return $http.get('http://numbersapi.com/' + age).then(function(fact) {
                return fact.data;
            });
        }
    }
}]);

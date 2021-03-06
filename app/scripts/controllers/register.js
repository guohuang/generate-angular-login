'use strict';

angular.module('organizationApp.register', ['organizationApp.security'])
  .config(function($stateProvider) {
    $stateProvider
      .state('app.register', {
        url: '/register',
        templateUrl: 'templates/register.tpl.html',
        controller: 'RegisterController',
        accessLevel: accessLevels.public
      });
  })
  .controller('RegisterController', function($scope, $http, $timeout, $state) {
    $scope.xhr = false;
    $scope.redirect = false;

    $scope.registerObj = {
      role: 'user'
    };

    $scope.submit = function(formInstance) {
      // xhr is departing
      $scope.xhr = true;
      $http.post('/user', $scope.registerObj)
        .success(function(data) {
          console.info('post success - ', data);
          $scope.xhr = false;
          $scope.redirect = true;
          $timeout(function() {
            $state.go('app.home');
          }, 2000);
        })
        .error(function(data) {
          data.errors.forEach(function(error) {
            formInstance[error.field].$error[error.name] = true;
          });
          formInstance.$setPristine();
          console.info('post error - ', data);
          $scope.xhr = false;
        });
    };
  });
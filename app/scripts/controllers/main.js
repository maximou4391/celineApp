'use strict';

/**
 * @ngdoc function
 * @name celineApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the celineApp
 */
angular.module('celineApp')
  .controller('MainCtrl', ['$scope', 'DonorsService', 'Ref', 'ngDialog', function ($scope, DonorsService, Ref, ngDialog) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    /**
     * Get all the donors and put it in donors scope variable
     */
    $scope.donors = DonorsService.getDonors();

    $scope.getDonations = function(donor) {
      DonorsService.getDonations(donor);
    };

    $scope.deleteDonor = function(donor) {
      DonorsService.deleteDonor(donor);
    };

    $scope.deleteDonation = function(donor, donation) {
      console.log('donation: ', donation);
      console.log('donor: ', donor);
        //DonorsService.deleteDonation(donor, donation);
    };

    $scope.addDonor = function() {
      DonorsService.addDonor(
        $scope.firstName,
        $scope.familyName,
        {
          streetNumber: $scope.streetNumber,
          street: $scope.street,
          postalCode: $scope.postalCode,
          town : $scope.town
        }
      );
    };

    $scope.openEditDonorDetailsPopIn = function (donor) {
      ngDialog.open({
        template: '../views/popin/editDonorDetails.html',
        controller: ['$scope', 'DonorsService', 'Ref', '$firebaseObject', function($scope, DonorsService, Ref, $firebaseObject) {
          var ref = Ref.child('donors').child(donor.$id);
          $scope.donorToModified = $firebaseObject(ref);
          $scope.updateDonor = function(donor) {
            DonorsService.updateDonor(donor);
          };
        }],
        closeByDocument: false
      });
    };
    $scope.openAddDonationPopIn = function (donor) {
      ngDialog.open({
        template: '../views/popin/addDonation.html',
        controller: ['$scope', 'DonorsService', 'Ref', '$firebaseObject', '$firebaseArray', function($scope, DonorsService, Ref, $firebaseObject, $firebaseArray) {
          var donorRef = Ref.child('donors').child(donor.$id);

          var donorObj = $firebaseObject(donorRef);

          console.log('ref', donorRef);




          $scope.addDonation = function(donation) {
            console.log('donorObj.$ref', donorObj.$ref());
            donorObj.$ref().child('donations').push().set(donation);
            //console.log('newDonationobj', $firebaseObject(newDonation));
            //obj.push()
            //obj.$add(donation);

           /* console.log('donation', donation);
            console.log('donorModified', $scope.donorToModified);
            $scope.donorToModified.donations.push(donation);*/
            //DonorsService.updateDonor(donorObj);
          };
        }],
        closeByDocument: false
      });
    };

  }]);

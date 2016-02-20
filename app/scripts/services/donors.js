'use strict';

/**
 * @ngdoc service
 * @name celineApp.donors
 * @description
 * # donors
 * Service in the celineApp.
 */
angular.module('celineApp')
  .factory('DonorsService', ['Ref', '$firebaseArray', '$firebaseObject', '$timeout', function (Ref, $firebaseArray, $firebaseObject, $timeout) {
    var fac = {};
    var self = this;

    fac.test = function () {
      return console.log('enfin');
    };

    /**
     *Add a donor
     * @param _firstName
     * @param _familyName
     * @param _address
     */
    fac.addDonor = function (_firstName, _familyName, _address) {
      $firebaseArray(Ref.child('donors')).$add(
        {
          firstName: _firstName,
          familyName: _familyName,
          address: _address
        }
        );
    };

    /**
     * Get donors' list
     * @param _firstName
     * @param _familyName
     * @param _address
     */
    fac.getDonors = function () {
     return $firebaseArray(Ref.child('donors'));
    };

    fac.getDonations = function (donor) {
      console.log('coucou');
      //TODO handle this
     // console.log('firebase', $firebaseObject(Ref.child('donors').child(donor.$id)));
      //console.log('firebase donations', $firebaseArray(donor.$ref.child('donations')))
      //return $firebaseArray(Ref.child('donors'));
    };

    /**
     * Delete a specific donor
     * @param donor
     */
    fac.deleteDonor = function (donor) {
      var ref = Ref.child('donors').child(donor.$id);
      var obj = $firebaseObject(ref);
      obj.$remove().then(function(ref) {
        console.log(ref);
        //TODO handle delete success
      }, function(error) {
        //TODO handle error here
        console.log('Error:', error);
      });
    };

    fac.updateDonor = function (donor) {
      donor.$save().then(function(ref) {
        //ref.key() === obj.$id; // true
        //TODO handle success with toast
      }, function(error) {
        console.log('Error:', error);
      });
    };

   /* fac.deleteDonation = function (donor, donation) {
      console.log('donation id: ', donation.$id);
      console.log('donation id: ', donation.$id);
      var ref = Ref.child('donors').child(donor.$id).child('donations').child(donation.$id);
      var obj = $firebaseObject(ref);
      console.log('obj', obj);
    };*/

    fac.alert = function (msg) {
      this.err = msg;
      $timeout(function () {
        this.err = null;
      }, 5000);
    };
    return fac;


  }]);

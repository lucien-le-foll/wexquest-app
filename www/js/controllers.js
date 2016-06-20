angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function() {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function() {
            $scope.closeLogin();
        }, 1000);
    };

    $scope.places = [
        {name : 'Wexford Town', picture : 'wex-town.jpg', complete : false, tags : [
            {name : 'Opera', found : true, coord : "52.336031, -6.465723"},
            {name : 'Crescent', found : true, coord : "52.336031, -6.465723"},
            {name : "Mooney's", found : false, coord : "52.336031, -6.465723"}
        ]},
        {name : 'Gorey', picture : 'gorey.jpg', complete : false, tags : [
            {name : 'Wells House', found : false, coord : "52.676073, -6.294367"},
            {name : 'Kia Ora Mini Farm', found : true, coord : "52.676073, -6.294367"},
            {name : "Courtown Woods", found : false, coord : "52.676073, -6.294367"}
        ]},
        {name : 'Kilmore Quay', picture : 'kilmore.jpg', complete : false, tags : [
            {name : 'Old Boat', found : true, coord : "52.176436, -6.586435"},
            {name : 'Ballyteige Burrow', found : false, coord : "52.176436, -6.586435"},
            {name : "Beach", found : false, coord : "52.176436, -6.586435"}
        ]},
        {name : 'Rosslare', picture : 'rosslare.jpg', complete : true, tags : [
            {name : 'Rosslare Golf', found : true, coord : "52.252093, -6.341748"},
            {name : 'Carnsor Point', found : true, coord : "52.252093, -6.341748"},
            {name : "The Oscar Wilde", found : true, coord : "52.252093, -6.341748"}
        ]},
        {name : 'New Ross', picture : 'new-ross.jpg', complete : true, tags : [
            {name : 'Dunbrody Famine Ship Experience', found : true, coord : "52.394536, -6.944944"},
            {name : 'Hook Head Safaris', found : true, coord : "52.394536, -6.944944"},
            {name : "Ring of Hook", found : true, coord : "52.394536, -6.944944"}
        ]}
    ];
})

.controller('PlacesCtrl', function($scope) {

})

.controller('CameraCtrl', function($scope, $cordovaBarcodeScanner){
    document.addEventListener('deviceready', function(){
        $cordovaBarcodeScanner
            .scan()
            .then(function(barcodeData){
                for(var i in $scope.places){
                    for(var n in $scope.places[i].tags){
                        if($scope.places[i].tags[n].name == barcodeData.text){
                            $scope.places[i].tags[n].found = true;
                        }
                    }
                }
            }, function(error){

            });
    })
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

;

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
        {name : 'Wexford Town', coord : "52.336031, -6.465723", picture : 'wex-town.jpg', complete : false, tags : [
            {name : 'Opera', found : true},
            {name : 'Crescent', found : true},
            {name : "Mooney's", found : false}
        ]},
        {name : 'Gorey', picture : 'gorey.jpg', coord : "52.676073, -6.294367", complete : false, tags : [
            {name : 'Wells House', found : false},
            {name : 'Kia Ora Mini Farm', found : true},
            {name : "Courtown Woods", found : false}
        ]},
        {name : 'Kilmore Quay', picture : 'kilmore.jpg', coord : "52.176436, -6.586435", complete : false, tags : [
            {name : 'Old Boat', found : true},
            {name : 'Ballyteige Burrow', found : false},
            {name : "Beach", found : false}
        ]},
        {name : 'Rosslare', picture : 'rosslare.jpg', coord : "52.252093, -6.341748", complete : true, tags : [
            {name : 'Rosslare Golf', found : true},
            {name : 'Carnsor Point', found : true},
            {name : "The Oscar Wilde", found : true}
        ]},
        {name : 'New Ross', picture : 'new-ross.jpg', coord : "52.394536, -6.944944", complete : true, tags : [
            {name : 'Dunbrody Famine Ship Experience', found : true},
            {name : 'Hook Head Safaris', found : true},
            {name : "Ring of Hook", found : true}
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

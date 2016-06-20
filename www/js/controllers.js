angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $cordovaToast) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $ionicModal.fromTemplateUrl('templates/map.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });

    $scope.openMap = function(lat, lon){
        $scope.map = { center: { latitude: lat, longitude: lon }, zoom: 12 };
        var markercenter = $scope.map.center;
        $scope.markercenter = markercenter;
        console.log($scope.map);
        $scope.modal.show();
    };

    $scope.closeMap = function(){
        $scope.modal.hide();
    };

    $scope.warningPoi = function(){
        $cordovaToast
            .show("You haven't found this place yet!", 'short', 'bottom');
    };

    $scope.places = [
        {name : 'Wexford Town', coord : "52.336031, -6.465723", picture : 'wex-town.jpg', complete : false, tags : [
            {name : 'Opera', found : true, description : 'The Wexford Opera, widely know for its festival.', picture : ''},
            {name : 'Crescent', found : true, description : 'The Crescent with the John Barry Statue', picture : ''},
            {name : "Mooney's", found : false, description : 'Highly Cultural Place for students', picture : ''}
        ]},
        {name : 'Gorey', picture : 'gorey.jpg', coord : "52.676073, -6.294367", complete : false, tags : [
            {name : 'Wells House', found : false, description : 'A house held by Lady Frances with a lot of Wells', picture : ''},
            {name : 'Kia Ora Mini Farm', found : true, description : 'Kia Ora Mini farm is a family run open farm in Gorey', picture : ''},
            {name : "Courtown Woods", found : false, description : 'Woodland nice for walks.', picture : ''}
        ]},
        {name : 'Kilmore Quay', picture : 'kilmore.jpg', coord : "52.176436, -6.586435", complete : false, tags : [
            {name : 'Old Boat', found : true, description : 'An old boat that is all rusty, yet charming.', picture : ''},
            {name : 'Ballyteige Burrow', found : false, description : 'Nature reserve for sealife and wildfowl.', picture : ''},
            {name : "Beach", found : false, description : 'A nice and long beach, for weekends and trips with friends.', picture : ''}
        ]},
        {name : 'Rosslare', picture : 'rosslare.jpg', coord : "52.252093, -6.341748", complete : true, tags : [
            {name : 'Rosslare Golf', found : true, description : 'A golf.', picture : ''},
            {name : 'Carnsore Point', found : true, description : 'Very South East point of Ireland.', picture : ''},
            {name : "The Oscar Wilde", found : true, description : 'The Biggest boat of the Irish Ferries company', picture : ''}
        ]},
        {name : 'New Ross', picture : 'new-ross.jpg', coord : "52.394536, -6.944944", complete : true, tags : [
            {name : 'Dunbrody Famine Ship Experience', found : true, description : 'Dunbrody Famine Ship is one of the premier tourist attractions in the South East of Ireland.  Centred on an authentic reproduction of an 1840\’s emigrant vessel', picture : ''},
            {name : 'Hook Head Safaris', found : true, description : 'Enjoy the Craic with our friendlyu local guides', picture : ''},
            {name : "Ring of Hook", found : true, description : 'Drive to soak up the stunning coastal rural scenery this beautiful part of Ireland has to offer, while catching sight of some of our county’s most important built heritage.', picture : ''}
        ]}
    ];
})

.controller('PlacesCtrl', function($scope, $stateParams) {
    $scope.poi = {found : false, name : "", description : "", picture : ""};
    for(var i in $scope.places){
        for(var n in $scope.places[i].tags){
            if($scope.places[i].tags[n].name == $stateParams.name){
                $scope.poi = {found : true, name : $scope.places[i].tags[n].name, description : $scope.places[i].tags[n].description, picture : $scope.places[i].tags[n].picture};
            }
        }
    }
})

.controller('CameraCtrl', function($scope, $cordovaBarcodeScanner, $location, $cordovaToast){
    document.addEventListener('deviceready', function(){
        $cordovaBarcodeScanner
            .scan()
            .then(function(barcodeData){
                for(var i in $scope.places){
                    for(var n in $scope.places[i].tags){
                        if($scope.places[i].tags[n].name == barcodeData.text){
                            $scope.places[i].tags[n].found = true;
                            $location.path('/app/poi/'+$scope.places[i].tags[n].name);
                        }
                    }
                }
            }, function(error){
                $cordovaToast.show("Invalid tag", 'long', 'bottom')
                $location.path('/app/home');
            });
    })
})

;

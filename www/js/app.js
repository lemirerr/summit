var App = angular.module("App", ["ionic"]);

App.config(function($stateProvider, $urlRouterProvider){

	$stateProvider
		.state('tabs', {
			url: "/tab",
			abstract: true,
			templateUrl: "templates/tabs.html"
		})
		.state('tabs.home', {
			url: "/home",
			views: {
				'home-tab': {
					templateUrl: "templates/home.html",
					controller: 'HomeTabCtrl'
				}
			}
		})
		.state('tabs.day1', {
			url: "/day1",
			views:{
				'day1':{
					templateUrl: "templates/day1.html"
				}
			}
		})
		.state('tabs.day2', {
			url:"/day2",
			views:{
				'day2':{
					templateUrl: "templates/day2.html"
				}
			}
		})
		.state('tabs.day3', {
			url: "/day3",
			views:{
				'day3':{
					templateUrl: "templates/day3.html"
			}
		}
	});
	$urlRouterProvider.otherwise("/tab/home");
})

App.service("Agenda", ["$http", "$rootScope", "$log", Agenda]);

App.service("Agenda2", ["$http", "$rootScope", "$log", Agenda2]);

App.controller("AppCtrl", ["$scope", "$ionicLoading", "Agenda", "$log", AppCtrl]);

App.controller("Day2Ctrl", ["$scope", "$ionicLoading", "Agenda2", "$log", Day2Ctrl]);

App.controller('HomeTabCtrl', function($scope){
	console.log('HomeTabCtrl');
});




function AppCtrl($scope, $ionicLoading, Agenda, $log){

		$ionicLoading.show({template: "Loading agenda..."});
	
		$scope.agenda = [];
		$scope.$on("App.agenda", function(_, result){
			result.agenda.forEach(function(a){
				$scope.agenda.push({
					speaker: a.speaker,
					description : a.description,
					photo : a.photo,
					room : a.room,
					time : a.time,
					session : a.session,
					date : a.date,
					day : a.day,
					more_url : a.more_url

				});
			});
			$scope.$broadcast("scroll.refreshComplete");
			$ionicLoading.hide();
		});
		Agenda.getAgenda();

		$scope.reload = function(){
			$scope.agenda = [];
			Agenda.getAgenda();

		}
}



function Day2Ctrl($scope, $ionicLoading, Agenda2, $log){

		$ionicLoading.show({template: "Loading agenda..."});
	
		$scope.agenda2 = [];
		$scope.$on("App.agenda2", function(_, result){
			result.agenda.forEach(function(a){
				$scope.agenda2.push({
					speaker: a.speaker,
					description : a.description,
					photo : a.photo,
					room : a.room,
					time : a.time,
					session : a.session,
					date : a.date,
					day : a.day,
					more_url : a.more_url

				});
			});
			$scope.$broadcast("scroll.refreshComplete");
			$ionicLoading.hide();
		});
		Agenda2.getAgenda();

		$scope.reload = function(){
			$scope.agenda2 = [];
			Agenda2.getAgenda();

		}
	
}


function Agenda($http, $rootScope, $log){
	this.getAgenda = function($scope){
		$http.get("agenda1.json").success(function(result){
			$rootScope.$broadcast("App.agenda", result);			
		});
	};
}


function Agenda2($http, $rootScope, $log){
	this.getAgenda = function($scope){
		$http.get("agenda.json").success(function(result){
			$rootScope.$broadcast("App.agenda2", result);			
		});
	};
}

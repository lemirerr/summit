var App = angular.module("App", ["ionic"]);


App.service("Agenda", ["$http", "$rootScope", "$log", Agenda]);

App.controller("AppCtrl", ["$scope", "$ionicLoading", "Agenda", "$log", AppCtrl]);

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


function Agenda($http, $rootScope, $log){
	this.getAgenda = function($scope){
		$http.get("agenda.json").success(function(result){
			$rootScope.$broadcast("App.agenda", result);			
		});
	};
}

//6to5 awesomeness
//https://6to5.org/docs/tour/

(function(){
var $doc = $(document);



// Class Code
// ========
// Setup functions
function setProps (_this, inst) {
	for(var i in inst){
		_this[i] = inst[i];
	}
}
function setPropsAndInit(_this, inst){
  setProps(_this, inst);
  inst.init();
}

// class Human {
// 	constructor(inst){
// 		setPropsAndInit(this, inst);	
// 	}
// }

// let x = new Human({
// 	name: 'grant',
// 	age: 24,
// 	init: function(){
// 	  echo('yolo');
// 	}
// });



// Pure functions
// ==============
function getItemFromObjArray(id, arr){
	for(var i=0; i<arr.length; i++){
		if(arr[i].id === id){
			return arr[i];
		}
	}
}


// Angular
// =======
// var app = angular.module('app', []);

// app.controller('MainFeed', ['$scope', function($scope){
// 	$scope.feed = [
// 		{id: 1, img: 'img/500x300.gif', title: 'Have you tried this?', points: 1000, comments: [{user:'john', comment: 'cool post'},{},{}], vote: 0},
// 		{id: 2, img: 'img/500x300.gif', title: 'Only in Indonesia'},
// 		{id: 3, img: 'img/500x300.gif', title: '13 year old German Girl starter kit'},
// 		{id: 4, img: 'img/500x300.gif', title: 'Huge huge huge huge huge Huge huge huge huge huge Huge huge huge huge huge Huge huge huge huge huge title'},
// 	];

// 	// Set's neutral/up/down vote
// 	// 0: neutral, 1: up, 2: down
// 	$scope.setVoteState = function(id, val){
// 		var item = getItemFromObjArray(id, $scope.feed);
// 		if(item.vote === val){
// 			item.vote = 0;
// 		}
// 		else{
// 			item.vote = val;
// 		}
// 	};
// }]);

// })();
/*=====================================
=            External Deps            =
=====================================*/
import 'util/polyfills';
/*=====  End of External Deps  ======*/

/*=================================
=             App code            =
=================================*/
let gup               = require('util/gup');
// let {log}             = require('util/helpers');
/*=====  End of Custom app code  ======*/


/*===============================
=            Helpers            =
===============================*/
// let getPath = function(str){
//   return str.replace(/^\//, '');
// };
/*=====  End of Helpers  ======*/



/*=============================
=            Setup            =
=============================*/
// let host    = window.location.hostname;
// Initialize Firebase
let url = 'https://node-app-f146b.firebaseio.com';
var config = {
  apiKey: "AIzaSyD17slySTvZWNILggKPrE2-uCNgJulCjIE",
  authDomain: "node-app-f146b.firebaseapp.com",
  databaseURL: "https://node-app-f146b.firebaseio.com",
  projectId: "node-app-f146b",
  storageBucket: "",
  messagingSenderId: "102825787456"
};
firebase.initializeApp(config);
/*=====  End of Setup  ======*/



fetch(url + '/posts.json')
.then(res => res.json())
.then(data => {
  App.posts = data;
})
.catch(e => {
  console.error(e);
})



/*===========================
=            App            =
===========================*/
let db = firebase.database();
let posts = db.ref('/posts/');

if(gup('user')){
  let email = `gk${new Date().getTime()}@test.com`;
  let password = "heyo123456";
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(res => {
    console.log(firebase.auth().currentUser.uid);
  })
  .catch(function(error) {
    // Handle Errors here.
    console.log('Error creating user');
    console.log(error);
  });
}

posts.on('value', snapshot => {
  let data = snapshot.val();
  App.posts = data;
});



firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    console.log(user.id, user.email);
    // ...
  } else {
    // User is signed out.
    // ...
  }
});




let App = new Vue({
  el: '#App',
  data: {
    posts: {

    }
  },
  methods:{
    addPost(){
      posts.push({
        name: 'My cool post',
        vote: new Date().getTime(),
      })
    }
  }
});




// let userId = 1;
// let name = "Grant";
// let email2 = "gk@test.com";
// let imageUrl = "http://test.com/img";

// firebase.database().ref('users/' + userId).set({
//   username: name,
//   email: email2,
//   profile_picture : imageUrl
// });

/*=====  End of App  ======*/










/*============================
=            Init            =
============================*/


/*=====  End of Init  ======*/
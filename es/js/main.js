function main() {
  "use strict";

  
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDFPaQhc4qfMsVSUEkbzU33D2fK0FFgAzQ",
    authDomain: "groceries-budget.firebaseapp.com",
    databaseURL: "https://groceries-budget.firebaseio.com",
    projectId: "groceries-budget",
    storageBucket: "groceries-budget.appspot.com",
    messagingSenderId: "216666611946"
  };
  firebase.initializeApp(config);
  
  $('#btnAddArticle').click(function(){
    var article = txtArticle.value;
    var category = txtCategory;
  });
 }
$(document).ready(main);
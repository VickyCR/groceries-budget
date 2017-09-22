function main() {
  "use strict";
  var database;
  var config = {
    apiKey: "AIzaSyDFPaQhc4qfMsVSUEkbzU33D2fK0FFgAzQ",
    authDomain: "groceries-budget.firebaseapp.com",
    databaseURL: "https://groceries-budget.firebaseio.com",
    projectId: "groceries-budget",
    storageBucket: "groceries-budget.appspot.com",
    messagingSenderId: "216666611946"
  };
  firebase.initializeApp(config);
  database = firebase.database();
  
  var ref = database.ref('es/frutasVegetales');
  ref.on('value', gotData, errData);
  
  function gotData(data) {
    var articles = data.val();
    var keys = Object.keys(articles);
    console.log(keys);
    for (var i = 0; i < keys.length; i++) {
      var k = keys[i];
      var article = articles[k].Article;
      var uprice = articles[k].UnitPrice;
      console.log(article,uprice,k,articles);
    }
  }
  
  function errData(err) {
    console.log('Error');
    console.log(err);
  }
  
  
  $('#btnAddArticle').on('click', function(){
    var article = $('#txtArticle').val(),
        category = $('#txtCategory').val(),
        unitPrice = $('#nmbrUnitPrice').val(),
        unitName = $('#txtUnitName').val(),
        recommended = $('#nmbrRecommended').val(),
        ref = database.ref('es/' + category);
    
    var data = {
      RecommendedCuantity: recommended,
      UnitName: unitName,
      UnitPrice: unitPrice,
      Article: article
    }
    
    var result = ref.push(data);
    console.log(result.key);
    
  });
 }
$(document).ready(main);
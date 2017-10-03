function main() {
  "use strict";
  var database;
  var ref;
  var srchCategory = $('#srchCategory').val();
  var srchName = $('#srchName').val();
  
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
  ref = database.ref('es');
  
  $('#btnAddArticle').on('click', function(){
    var article = $('#txtArticle').val(),
        category = $('#txtCategory').val(),
        unitPrice = $('#nmbrUnitPrice').val(),
        unitName = $('#txtUnitName').val(),
        recommended = $('#nmbrRecommended').val();
    
    $('.articles-list').empty();
    
    var refAdd = database.ref('es/' + category);
    var data = {
      RecommendedCuantity: recommended,
      UnitName: unitName,
      UnitPrice: unitPrice,
      Article: article,
      Category: category
    }
    refAdd.push(data);
    //var result = refAdd.push(data);
    //console.log(result.key);
    
  });
  
  $('#btnSearch').on('click', function() {
    //TODO search queries
    var refSrch;
    var refSrchName;
    
    srchCategory = $('#srchCategory').val();
    srchName = $('#srchName').val();
    
    $('.articles-list').empty();
    //TODO Invetigar como al cambiar selector se busca solo son necesidad de dar click en buscar.
    if ( srchCategory === 'Todos' && srchName === '' ) {
      ref.on('value', gotCategory);
    } else if ( srchCategory !== 'Todos' && srchName === '') {
      refSrch = database.ref('es/' + srchCategory);
      refSrch.on('value', gotData);
    } 
    //TODO Hay que hacer un search por palabra, investigar como ocultar DOM através de jquery, o utilizar JS normal. También se puede buscar por palabra en la base de datos, pero JS te oculta los "no resultados" mientras ingresas la búsqueda.
    /*else if ( srchCategory === 'Todos' && srchName !== '') {
      ref.on('value', searchCategory)
    }*/
    
  });
  
  if ( srchCategory === 'Todos' && srchName === ''  ) {
    ref.on('value', gotCategory);
  }
  
 }
$(document).ready(main);



function gotCategory(data) {
  var database = firebase.database();
  var categories = data.val();
  var keys = Object.keys(categories);
  for (var i = 0; i < keys.length; i++) {
    var refCategory = database.ref('es/' + keys[i]);
    refCategory.on('value', gotData, errData);
    refCategory.off('value', gotData);
  }
}

function gotData(data) {
  var articles = data.val();
  var keys = Object.keys(articles);
  for (var i = 0; i < keys.length; i++) {
    var k = keys[i];
    var category = articles[k].Category;
    var article = articles[k].Article;
    var unitPrice = articles[k].UnitPrice;
    var unitName = articles[k].UnitName;
    var recommended = articles[k].RecommendedCuantity;
    $('.articles-list').append('<tr><td>' + category + '</td><td>' + article + '</td><td>' + unitPrice + ' / ' + unitName + '</td><td>' + recommended + '</td></tr>');
  }
}

function errData(err) {
  console.log('Error');
  console.log(err);
}

/*function search (toSearch) {
  //var database = firebase.database();
  var categories = data.val();
  var keys = Object.keys(articles);
  for (var i = 0; i < keys.length; i++) {
    if ( toSearch  )
  }
}

function searchData (data) {
}*/
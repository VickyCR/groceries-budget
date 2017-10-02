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
    console.log('Acabo de subir data');
    //console.log(result.key);
    //FIXME Se está llamando primero a gotData por alguna razón... averiguar y corregir esta situación insportable... aaaaaah T_T
    
  });
  
  $('#btnSearch').on('click', function() {
    //TODO search queries
  });
  
  var ref = database.ref('es');
  ref.on('value', gotCategory);
  
 }
$(document).ready(main);

function gotCategory(data) {
  var departments = data.val();
  var categories = Object.keys(departments);
  //console.log('departments var');
  //console.log(departments);
  //console.log('categories var');
  //console.log(categories);
  console.log('Estoy obteniendo la categoría')
  for (var i = 0; i < categories.length; i++) {
    console.log('hola ',i);
    console.log('Estoy enviando la categoría', categories[i]);
    //console.log(categories[i]);
    var database = firebase.database();
    var refCategory = database.ref('es/' + categories[i]);
    refCategory.on('value', gotData, errData);
    refCategory.off('value', gotData);
  }
}

function gotData(data) {
  var articles = data.val();
  var keys = Object.keys(articles);
  //console.log('articles var');
  //console.log(articles);
  //console.log('keys var');
  //console.log(keys);
  console.log('Recibí categoría y voy a imprimir los artículos')
  for (var i = 0; i < keys.length; i++) {
    var k = keys[i];
    var category = articles[k].Category;
    var article = articles[k].Article;
    var unitPrice = articles[k].UnitPrice;
    var unitName = articles[k].UnitName;
    var recommended = articles[k].RecommendedCuantity;
    //console.log(k);
    console.log('Estoy analizando un artículo')
    $('.articles-list').append('<tr><td>' + category + '</td><td>' + article + '</td><td>' + unitPrice + ' / ' + unitName + '</td><td>' + recommended + '</td></tr>');
  }
}

function errData(err) {
  console.log('Error');
  console.log(err);
}
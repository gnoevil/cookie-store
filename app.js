'use strict';
var hoursOpen = ['6:00am', '7:00am', '8:00am','9:00am', '10:00am', '11:00am', '12:00pm','1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm'];
var allStores = [];
var hourlyTotals = [];
function createNewElement(elementTag, elementContent, target, setId){
  var newEl = document.createElement(elementTag);
  newEl.textContent = elementContent;
  target.appendChild(newEl);
  if(setId){
    newEl.setAttribute('id', setId);
  }
};
function createTable(){
  var table = document.getElementById('salesTable');
  table.innerHTML = '';
  //Create <thead> and append
  createNewElement('thead', '', document.getElementById('salesTable'), 'tHead');
  //Create <tbody> and append
  createNewElement('tbody', '', document.getElementById('salesTable'), 'tBody');
  //Create a <tr> to place a title for my table
  createNewElement('tr', '', document.getElementById('tHead'), 'titleRow');
  //Create a <th> to hold title
  createNewElement('th', 'Daily Report of Cookies Sold', document.getElementById('titleRow'), 'tableTitle');
  var tableTitle = document.getElementById('tableTitle');
  tableTitle.setAttribute('colspan', 16);
  //Create row displaying hours
  createNewElement('tr', '', document.getElementById('tHead'), 'firstRow');
  //Create first empty cell and append
  createNewElement('th', '', document.getElementById('firstRow'), 'firstEmptyCell');
  //Create and append one <th> for every hour
  for (var i = 0; i < hoursOpen.length; i++){
    createNewElement('th', hoursOpen[i], document.getElementById('firstRow'));
  }
  //create totals cell
  createNewElement('th', 'Daily Totals', document.getElementById('firstRow'), 'dailyTotals');
  for (var i = 0; i < allStores.length; i++){
    allStores[i].createStoreRowAndFill();
  }
  totalsByHour();
}
//Store constructor
function Store(name,minCust,maxCust,avgBought) {
  this.name = name;
  this.id = name.replace(/ /gi, '_').toLowerCase();
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgBought = avgBought;
  this.salesLog = [];
  this.totalSales = 0;
  this.custPerHour = function () {
    return Math.floor(Math.random() * (this.maxCust - this.minCust) + this.minCust);
  };
  this.cookiesBought = function (){
    return Math.floor(this.avgBought * this.custPerHour());
  };
  this.addSales = function (){
    for(var i = 0; i < hoursOpen.length; i++){
      this.salesLog[i] = this.cookiesBought();
      this.totalSales += this.salesLog[i];
    }
  };
  //Create a row of data for each store
  this.createStoreRowAndFill = function(){
    //create new <tr> for each store
    createNewElement('tr', '', document.getElementById('tBody'), (this.id + '_row'));
    //create new <th> for each store
    createNewElement('th', this.name, document.getElementById(this.id + '_row'), this.id);
    //loop through each hour and create a <td> for sales
    for(var i = 0; i < hoursOpen.length; i++){
      createNewElement('td', (this.salesLog[i] + ' cookies'), document.getElementById(this.id + '_row'));
    };
    //create a <td> for totals in current row
    createNewElement('td', (this.totalSales + ' cookies'), document.getElementById(this.id + '_row'));
  };
  this.addSales();
  allStores.push(this);
};
//Function will create the Hourly Totals row and render
function totalsByHour() {
  //function below for Hourly Totals
  calcAllSalesAtHour();
  //create <tr> for Totals by Hour
  createNewElement('tr', 'Totals By Hour', document.getElementById('tBody'), 'totalsByHourRow');
  for (var i = 0; i < hoursOpen.length; i++) {
    createNewElement('td', (hourlyTotals[i] + ' cookies'), document.getElementById('totalsByHourRow'));
  }
  //append an empty cell to the bottom row
  //also use reduce to add hourlyTotals array and fill cell (interwebs for reduce)
  createNewElement('td', (hourlyTotals.reduce(function(a, b) { return a + b; }, 0) + ' cookies'), document.getElementById('totalsByHourRow'));
}
function calcAllSalesAtHour(){
  for (var i = 0; i < hoursOpen.length; i++) {
    var hourlyTotal = 0;
    for(var j = 0; j < allStores.length; j++){
      // console.log(allStores[j].salesLog[i]);
      hourlyTotal += allStores[j].salesLog[i];
    }
    console.log(hourlyTotal);
    hourlyTotals.push(hourlyTotal);
  }
}
//Here is my section regarding 'Forms'
var firstAndPike = new Store('First and Pike', 23, 65, 6.3);
var seatac = new Store('Seatac', 3, 24, 1.2);
var seattleCenter = new Store('Seattle Center', 11, 38, 3.7);
var capHill = new Store('Capitol Hill', 20, 38, 2.3);
var alki = new Store('Alki', 2, 16, 4.6);
createTable();
var submitForm = document.getElementById('my_form');
function postForm(event) {
  event.preventDefault();
  console.log('postForm, event: ', event);
  console.dir(event.target.storeName.value);
  var name = event.target.storeName.value;
  var minCust = parseInt(event.target.minCust.value);
  var maxCust = parseInt(event.target.maxCust.value);
  var avgBought = parseInt(event.target.avgBought.value);
  var newStore = new Store(name, minCust, maxCust, avgBought);
  createTable();
}
submitForm.addEventListener('submit', postForm);

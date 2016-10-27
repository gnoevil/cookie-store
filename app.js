'use strict';

var hoursOpen = ['6:00am', '7:00am', '8:00am','9:00am', '10:00am', '11:00am', '12:00pm','1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm'];
var allStores = [];

//Table: Columns: 16, Rows:7
//Going to create a table to store my data and add it to the DOM.
var table = document.createElement('table');
table.className = 'salesTable';
var section = document.getElementById('table_area');
section.appendChild(table);

//create and append <thead> to my table
var tHead = document.createElement('thead');
table.appendChild(tHead);

//create a <tr> to place a title for my table
var titleRow = document.createElement('tr');
tHead.appendChild(titleRow);
var tableTitle = document.createElement('th');
tableTitle.textContent = 'Daily Report of Cookies Sold';
tableTitle.setAttribute('id', 'tableTitle');
tableTitle.setAttribute('colspan', 16);
titleRow.appendChild(tableTitle);

//Create first <tr> that goes in the <thead> which contains displayed hour.
var firstRow = document.createElement('tr');
firstRow.className = 'firstRow';
tHead.appendChild(firstRow);
var emptyCell = document.createElement('th'); //creating first empty cell and appending
firstRow.appendChild(emptyCell);

// create and append one <th> for every hour
for (var i = 0; i < hoursOpen.length; i++){
  var th = document.createElement('th');
  th.textContent = hoursOpen[i];
  firstRow.appendChild(th);
}

//'Totals Section'//
var dailyTotals = document.createElement('th');
dailyTotals.setAttribute('id', 'dailyTotals');
dailyTotals.textContent = 'Daily Totals';
firstRow.appendChild(dailyTotals);

//create <tbody> and append
var tBody = document.createElement('tbody');
tBody.setAttribute('id', 'tBody');
table.appendChild(tBody);

//Store constructor
function Store(name,minCust,maxCust,avgBought) {
  this.name = name;
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
    allStores.push(this); //add my completed (or any new) stores to the store array.
  };
  this.createStore = function(){
    //create a <tr> for each new Store and a <td>
    var tr = document.createElement('tr');
    tr.className = this.name;
    tBody.appendChild(tr);
    var td = document.createElement('td');
    td.textContent = this.name;
    td.setAttribute('id', this.name.replace(' ', '_').toLowerCase());
    tr.appendChild(td);
    var currentRow = document.getElementsByClassName(this.name)[0];
  };
  createStore();
  //Manually set FirstandPike id attribute because everything is failing =/
  // var firstAndPike = document.getElementsByClassName('first_and Pike')[0];
  // firstAndPike.setAttribute('id', 'first_and_pike');
  //store each hour's cookies sold in a <td> using a for-loop
  //call my addSales method and append totalSales to the last column.
  this.addSales();
  console.log(this.salesLog);

  this.createData = function(){
    for(var i = 0; i < hoursOpen.length; i++){
      var td = document.createElement('td');
      td.textContent = this.salesLog[i] + ' cookies';
      currentRow.appendChild(td);
    }
    console.log(this.salesLog);
    var totalsCell = document.createElement('td');
    totalsCell.textContent = this.totalSales + ' cookies';
    currentRow.appendChild(totalsCell);
  };
  createData();
};

//creating my stores (objects)

var firstAndPike = new Store('First and Pike', 23, 65, 6.3);
var seatac = new Store('Seatac', 3, 24, 1.2);
var seattleCenter = new Store('Seattle Center', 11, 38, 3.7);
var capHill = new Store('Capitol Hill', 20, 38, 2.3);
var alki = new Store('Alki', 2, 16, 4.6);

//append a new row and add each column's totals
function CreateTotalRow() {
  var totalsByHourRow = document.createElement('tr');
  totalsByHourRow.setAttribute('id', 'totalsByHourRow');
  totalsByHourRow.textContent = 'Totals by Hour';
  tBody.appendChild(totalsByHourRow);
};
//loop through the hours and add each hours' sales to an array.
var salesAtHour = [];
for (var i = 0; i < hoursOpen.length; i++) {
  var currentSales = (firstAndPike.salesLog[i] + seatac.salesLog[i] + seattleCenter.salesLog[i] + capHill.salesLog[i] + alki.salesLog[i]);
  salesAtHour.push(currentSales);
}

//using my array, create a new <td> element and append to totalsByHourRow
for (var i = 0; i < hoursOpen.length; i++) {
  var td = document.createElement('td');
  td.textContent = salesAtHour[i] + ' cookies';
  totalsByHourRow.appendChild(td);
}

//append an empty cell to the bottom row
var lastCell = document.createElement('td');
totalsByHourRow.appendChild(lastCell);

//Here is my section regarding 'Forms'

var newStore = [];

var submitForm = document.getElementById('my_form');
function postForm(event) {
  event.preventDefault();
  var name = event.target[1].value;
  var minCust = parseInt(event.target[2].value);
  var maxCust = parseInt(event.target[3].value);
  var avgBought = parseInt(event.target[4].value);
  var newStore = new Store(name, minCust, maxCust, avgBought);
  newStore.createData();
};

function populateTable(){
  console.log('populateTable');
  var tBody = document.getElementById('tBody');
  tBody.innerHTML = ' ';
  for(var i = 0; i < allStores.length; i++) {
    allStores[i].createStore();
    allStores[i].createData();
  }
  CreateTotalRow();
};

submitForm.addEventListener('submit', postForm);
// var myForm = document.getElementById('my_form');
// var storeData1 = document.getElementById('store_name_box')
// var storeData2 = document.getElementById('store_min_cust');
// var storeData3 =

//create an event-listener to wait for user-input

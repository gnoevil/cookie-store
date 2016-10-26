'use strict';

var hoursOpen = ['6:00am', '7:00am', '8:00am','9:00am', '10:00am', '11:00am', '12:00pm','1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm'];

//Table: Columns: 16, Rows:7
//Going to create a table to store my data and add it to the DOM.
var table = document.createElement('table');
table.className = 'salesTable';
var section = document.getElementsByTagName('section')[0];
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
tBody.className = 'tBody';
table.appendChild(tBody);

//Store constructor
var Store = function(name,minCust,maxCust,avgBought) {
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
  };

  //create a <tr> for each new Store and a <td>
  var tr = document.createElement('tr');
  tr.className = this.name;
  tBody.appendChild(tr);
  var td = document.createElement('td');
  td.textContent = this.name;
  td.setAttribute('id', this.name.replace(' ', '_').toLowerCase());
  tr.appendChild(td);
  var currentRow = document.getElementsByClassName(this.name)[0];

  //Manually set FirstandPike id attribute because everything is failing =/
  // var firstAndPike = document.getElementsByClassName('first_and Pike')[0];
  // firstAndPike.setAttribute('id', 'first_and_pike');

  //store each hour's cookies sold in a <td> using a for-loop
  //call my addSales method and append totalSales to the last column.
  this.addSales();
  console.log(this.salesLog);
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

//creating my stores (objects)

var firstAndPike = new Store('First and Pike', 23, 65, 6.3);
var seatac = new Store('Seatac', 3, 24, 1.2);
var seattleCenter = new Store('Seattle Center', 11, 38, 3.7);
var capHill = new Store('Capitol Hill', 20, 38, 2.3);
var alki = new Store('Alki', 2, 16, 4.6);

var allStores = [];

//append a new row and add each column's totals
var totalsByHourRow = document.createElement('tr');
totalsByHourRow.setAttribute('id', 'totalsByHourRow');
totalsByHourRow.textContent = 'Totals by Hour';
tBody.appendChild(totalsByHourRow);

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

/* Build a table from scratch in JS
//Step 1: Create my <table> element.
//Step 2: Give the table an ID.
//Step 3: Append the table to the DOM.
//Step 4: Create a <thead> for my column names
//Step 5: Append <thead> to the table
//Step 6: Create and append a <th> for every hour.
//Step 7: Create a <tr> element. (make a function)
//Step 8: Create one <td> for every hour + one blank to start and + one to end.
//Step 9: Append <tr> to the table.
//Step 10: Append the <td>s to the <tr>
// Repeat steps 4 through 7 for as many stores as we have.
*/

//create my own totals row at the bottom.

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

//Create first <tr> that goes in the <thead> which contains displayed hour.
var firstRow = document.createElement('tr');
firstRow.className = 'firstRow';
tHead.appendChild(firstRow);

// create and append one <th> for every hour
for (var i = 0; i < (hoursOpen.length + 2); i++){
  var th = document.createElement('th');
  th.textContent = hoursOpen[i];
  firstRow.appendChild(th);
}

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
  this.custPerHour = function () {
    return Math.floor(Math.random() * (this.maxCust - this.minCust) + this.minCust);
  };
  this.cookiesBought = function (){
    return Math.floor(this.avgBought * this.custPerHour());
  };

  //create a <tr> for each new Store
  var tr = document.createElement('tr');
  tr.className = this.name;
  tr.textContent = this.name;
  tBody.appendChild(tr);

  //store each hour's cookies sold in a <td> using a for-loop
  for(var i = 0; i < hoursOpen.length; i++){
    var td = document.createElement('td');
    var currentRow = document.getElementsByClassName(this.name)[0];
    currentRow.appendChild(td);
    td.textContent = this.cookiesBought() + ' cookies';
  }
};

//creating my stores (objects)
var firstAndPike = new Store('First and Pike', 23, 65, 6.3);
var seatac = new Store('Seatac', 3, 24, 1.2);
var seattleCenter = new Store('Seattle Center', 11, 38, 3.7);
var capHill = new Store('Capitol Hill', 20, 38, 2.3);
var alki = new Store('Alki', 2, 16, 4.6);

//Old function to calculate
// function calcCookiesAndStore(location) {
//   var newUl = document.createElement('ul');
//   newUl.className = location.name;
//   document.body.appendChild(newUl);
//   var myUl = document.getElementsByClassName(location.name)[0];
//   for (var hour = 0; hour < hoursOpen.length; hour++) {
//     var currentHour = hoursOpen[hour] + ': ';
//     var cookiesBought = Math.floor(location.avgBought * location.custPerHour());
//     location.sales.push(cookiesBought);
//     var newLi = document.createElement('li');
//     newLi.className = location;
//     newLi.innerText = currentHour + cookiesBought + 'cookies';
//     myUl.appendChild(newLi);
//   }

// var makeTotal = function(location) {
//   var total = location.reduce(function(a, b) { return a + b; }, 0); //interwebs
//   still need code to push total to html.
// };

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

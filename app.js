
var firstAndPike = {
  name: 'firstAndPike',
  minCust: 23,
  maxCust: 65,
  avgBought: 6.3,
  sales: [],
  totalCookies: [],
  custPerHour: function () {
    var peeps = Math.floor(Math.random() * (this.maxCust - this.minCust) + this.minCust);
    return peeps; //this function allows my random number to be within Pat's estimates.
  }
};

var seatac = {
  name: 'seatac',
  minCust: 3,
  maxCust: 24,
  avgBought: 1.2,
  sales: [],
  totalCookies: [],
  custPerHour: function () {
    var peeps = Math.floor(Math.random() * (this.maxCust - this.minCust) + this.minCust);
    return peeps;
  }
};

var seattleCenter = {
  name: 'seattleCenter',
  minCust: 11,
  maxCust: 38,
  avgBought: 3.7,
  sales: [],
  totalCookies: [],
  custPerHour: function () {
    var peeps = Math.floor(Math.random() * (this.maxCust - this.minCust) + this.minCust);
    return peeps;
  }
};

var capHill = {
  name: 'capHill',
  minCust: 20,
  maxCust: 38,
  avgBought: 2.3,
  sales: [],
  totalCookies: [],
  custPerHour: function () {
    var peeps = Math.floor(Math.random() * (this.maxCust - this.minCust) + this.minCust);
    return peeps;
  }
};

var alki = {
  name: 'alki',
  minCust: 2,
  maxCust: 16,
  avgBought: 4.6,
  sales: [],
  totalCookies: [],
  custPerHour: function () {
    var peeps = Math.floor(Math.random() * (this.maxCust - this.minCust) + this.minCust);
    return peeps;
  }
};

var hoursOpen = ['6:00am', '7:00am', '8:00am','9:00am', '10:00am', '11:00am', '12:00pm','1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm'];
function calcCookiesAndStore(location) {
  var newUl = document.createElement('ul');
  newUl.className = location.name;
  document.body.appendChild(newUl);
  var myUl = document.getElementsByClassName(location.name)[0];
  for (var hour = 0; hour < hoursOpen.length; hour++) {
    var currentHour = hoursOpen[hour] + ': ';
    var cookiesBought = Math.floor(location.avgBought * location.custPerHour());
    location.sales.push(cookiesBought);
    var newLi = document.createElement('li');
    newLi.className = location;
    newLi.innerText = currentHour + cookiesBought + 'cookies';
    myUl.appendChild(newLi);
  }
}

// var makeTotal = function(location) {
//   var total = location.reduce(function(a, b) { return a + b; }, 0); //interwebs
//   still need code to push total to html.
// };

calcCookiesAndStore(firstAndPike);
calcCookiesAndStore(seatac);
calcCookiesAndStore(seattleCenter);
calcCookiesAndStore(capHill);
calcCookiesAndStore(alki);

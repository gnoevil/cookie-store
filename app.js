var firstAndPikeSales = [];
var firstAndPike = {
  minCust: 23,
  maxCust: 65,
  avgBought: 6.3,
  sales: [],
  custPerHour: function(){
    Math.random() * 42 + 23; //this function allows my random number to be within Pat's estimates.
  }
};

var seatacSales = [];
var seatac = {
  minCust: 3,
  maxCust: 24,
  avgBought: 1.2,
  sales: [],
  custPerHour: function() {
    Math.random() * 21 + 3;
  }
};

var seattleCenterSales = [];
var seattleCenter = {
  minCust: 11,
  maxCust: 38,
  avgBought: 3.7,
  sales: [],
  custPerHour: function() {
    Math.random() * 27 + 11;
  }
};

var capHillSales = [];
var capHill = {
  minCust: 20,
  maxCust: 38,
  avgBought: 2.3,
  sales: [],
  custPerHour: function() {
    Math.random() * 18 + 20;
  }
};

var alki = {
  minCust: 2,
  maxCust: 16,
  avgBought: 4.6,
  sales: [],
  custPerHour: function () {
    Math.random() * 14 + 2;
  }
};

var calcCookiesBought = function(location){
  for (hour = 0; hour <= 15; hour++);
  var cookiesBought = location.avgBought * location.custPerHour;
  cookiesBought = location.sales;
};

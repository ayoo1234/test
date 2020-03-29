(function () {
	"use strict";

	Date.prototype.deltaDays = function (n) {
		return new Date(this.getFullYear(), this.getMonth(), this.getDate() + n);
	};

	Date.prototype.getSunday = function () {
		return this.deltaDays(-1 * this.getDay());
	};
}());


function Week(initial_d) {
	"use strict";

	this.sunday = initial_d.getSunday();
		
	
	this.nextWeek = function () {
		return new Week(this.sunday.deltaDays(7));
	};
	
	this.prevWeek = function () {
		return new Week(this.sunday.deltaDays(-7));
	};
	
	this.contains = function (d) {
		return (this.sunday.valueOf() === d.getSunday().valueOf());
	};
	
	this.getDates = function () {
		var dates = [];
		for(var i=0; i<7; i++){
			dates.push(this.sunday.deltaDays(i));
		}
		return dates;
	};
}

function Month(year, month) {
	"use strict";
	
	this.year = year;
	this.month = month;
	
	this.nextMonth = function () {
		return new Month( year + Math.floor((month+1)/12), (month+1) % 12);
	};
	
	this.prevMonth = function () {
		return new Month( year + Math.floor((month-1)/12), (month+11) % 12);
	};
	
	this.getDateObject = function(d) {
		return new Date(this.year, this.month, d);
	};
	
	this.getWeeks = function () {
		var firstDay = this.getDateObject(1);
		var lastDay = this.nextMonth().getDateObject(0);
		
		var weeks = [];
		var currweek = new Week(firstDay);
		weeks.push(currweek);
		while(!currweek.contains(lastDay)){
			currweek = currweek.nextWeek();
			weeks.push(currweek);
		}
		
		return weeks;
	};
}

let currentMonth = new Month(2019, 9); // October 2019
updateCalendar();
const months=["Janurary", "February","March","April","May","June","July","August","September","October","November","December"];

// Change the month when the "next" button is pressed
document.getElementById("nextMonth").addEventListener("click", function(event){
	currentMonth = currentMonth.nextMonth(); // Previous month would be currentMonth.prevMonth()
	refreshCalendar();
	updateCalendar(); // Whenever the month is updated, we'll need to re-render the calendar in HTML
	document.getElementById("currMonthYear").innerText=months[currentMonth.month]+ " "+currentMonth.year;
	//alert("The new month is "+currentMonth.month+" "+currentMonth.year);
}, false);

// Change the month when the "prev" button is pressed
document.getElementById("prevMonth").addEventListener("click", function(event){
	currentMonth = currentMonth.prevMonth(); // Previous month would be currentMonth.prevMonth()
	refreshCalendar();
	updateCalendar(); // Whenever the month is updated, we'll need to re-render the calendar in HTML
	document.getElementById("currMonthYear").innerHTML=months[currentMonth.month]+ " "+currentMonth.year;
	
	//alert("The new month is "+currentMonth.month+" "+currentMonth.year);
}, false);		
		
function refreshCalendar()
{
	for (let i = 0;  i<42; i++)
	{
		document.getElementById(i.toString()).innerText=null;
	}
}

		// This updateCalendar() function only alerts the dates in the currently specified month.  You need to write
		// it to modify the DOM (optionally using jQuery) to display the days and weeks in the current month.
function updateCalendar(){
	let weeks = currentMonth.getWeeks();
	let dayArray=[];
	let arrayIndex=0;
	let previous=0;
	
	for(var w in weeks){
		let days = weeks[w].getDates();
		// days contains normal JavaScript Date objects.
		
		//alert("Week starting on "+days[0]);
		
		for(var d in days){
			let str= days[d].toString();
			let strSplit=str.split(" ");
			
			console.log(parseInt(strSplit[2]));
			
			if (parseInt(strSplit[2])-1 == previous)
			{
				document.getElementById(arrayIndex.toString()).innerText=parseInt(strSplit[2]);
				previous++;
			}
			arrayIndex++;
			// You can see console.log() output in your JavaScript debugging tool, like Firebug,
			// WebWit Inspector, or Dragonfly.
		}
	}
}
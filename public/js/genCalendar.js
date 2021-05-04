var months = ["January", "February", "March", "April", "May", "June", "July",
 "August", "September", "October", "November", "December"];
var views = ["Monthly", "Weekly", "Daily"];
var startYear = 2021;
var endYear = 2099;
var month = 0;
var year = 0;
var selectedDays = [];
var mousedown = false;

function genMonths() {
	for (var i = 0; i < months.length; i++) {
		var doc = document.createElement("div");
		doc.innerHTML = months[i];
		doc.classList.add("dropdown-item");
		
		doc.onclick = (function () {
			var selectedMonth = i;
			return function () {
				month = selectedMonth;
				document.getElementById("curMonth").innerHTML = months[month];
				var url = window.location.href; 
				if (url.includes("monthly")) {
					genDays();
				} else if (url.includes("weekly")) {
					genDaysInWeek();
				}
				localStorage.setItem("month", month); // saves month
				return month;
			}
		})();

		document.getElementById("months").appendChild(doc);
	}
}

function genViews() {
	for (var i = 0; i < views.length; i++) {
		var doc = document.createElement("div");
		doc.innerHTML = views[i];
		doc.classList.add("dropdown-item");
		
		doc.onclick = (function () {
			var selectedView = i;
			return function () {
				view = selectedView;
				document.getElementById("curView").innerHTML = views[view];	
				
				// open url of page 
				// gets full URL of curent location
				var fullUrl = window.location.href;
				// start of URL
				var start = "http://";
				// splits URL at dashes
				var urlSplit = fullUrl.split("/");
				// gets main part of URL
				var partialURL = urlSplit[urlSplit.length-2];
				// adds the http:// and the main part of URL
				var url = start + partialURL;
				// add on extension
				if (views[view] == "Monthly") {
					url += "/monthly";
				} else if (views[view] == "Weekly") {
					url += "/weekly";
				} else {
					url += "/daily";
				}
				
				// open window
				window.open(url,"_self")
				localStorage.setItem("view", view);
				return view;
			}
		})();
		
		document.getElementById("views").appendChild(doc);
	}
}

function genYears() {
	document.getElementById("years").innerHTML = "";

	for (var i = startYear; i <= endYear; i++) {
		var doc = document.createElement("div");
		doc.innerHTML = i;
		doc.classList.add("dropdown-item");

		doc.onclick = (function () {
			var selectedYear = i;
			return function () {
				year = selectedYear;
				document.getElementById("curYear").innerHTML = year;
				var url = window.location.href; 
				if (url.includes("monthly")) {
					genDays();
				} else if (url.includes("weekly")) {
					genDaysInWeek();
				}
				localStorage.setItem("year", year); // saves year
				return year;
			}
		})();

		document.getElementById("years").appendChild(doc);
	}
}							

// TODO: edit function to display only week of current day
// Possible TODO: add arrows to go forward, backward a week
function genDays() {
	document.getElementById("calendarDays").innerHTML = "";

	var tmpDate = new Date(year, month, 0);
	var num = daysInMonth(month, year);
	var dayofweek = tmpDate.getDay();       // find where to start calendar day of week
	
	for (var i = 0; i <= dayofweek; i++) {
		var d = document.createElement("div");
		d.classList.add("day");
		d.classList.add("blank");
		document.getElementById("calendarDays").appendChild(d);
	}

	for (var i = 0; i < num; i++) {
		var tmp = i + 1;
		var d = document.createElement("div");
		d.id = "calendarday_" + i;
		d.className = "day";
		d.innerHTML = tmp;
		d.dataset.day = tmp;              // easier to retrieve the date
		
		/* ****************** Click Event ********************** */
        d.addEventListener('click', function(){
            this.classList.toggle('selected'); // changes color of day
			
			// if not in data set, select it
            if (!selectedDays.includes(this.dataset.day))
                selectedDays.push(this.dataset.day);

            else
                selectedDays.splice(selectedDays.indexOf(this.dataset.day), 1);
			
			localStorage.setItem("selectedDays", selectedDays);
			
			// open url of page 
			// gets full URL of curent location
			var fullUrl = window.location.href;
			// start of URL
			var start = "http://";
			// splits URL at dashes
			var urlSplit = fullUrl.split("/");
			// gets main part of URL
			var partialURL = urlSplit[urlSplit.length-2];
			// adds the http:// and the main part of URL
			var url = start + partialURL;
			// add on extension
			if (views[view] == "Monthly") {
				url += "/monthly";
			} else if (views[view] == "Weekly") {
				url += "/weekly";
			} else {
				url += "/daily";
			}
				
			// open window
			window.open(url,"_self")
			localStorage.setItem("view", 2);
			
        });
        /* **************************************************** */
		document.getElementById("calendarDays").appendChild(d);
	}

	var clear = document.createElement("div");
	clear.className = "clear";
	document.getElementById("calendarDays").appendChild(clear);
}

function genDaysInWeek() {
	document.getElementById("daysInWeek").innerHTML = "";
	
	var tmpDate = new Date(year, month, 0); // Date object of last day of prev month selected
	var num = daysInMonth(month, year);		// 30 -- number of days in April
	// 0 - Sun, 1 - Mon, 2 - Tues, 3 - Wed, 4 - Thurs, 5 - Fri, 6 - Sat
	var dayofweek = tmpDate.getDay();       // getting day of week for last day of prev month
	
	var curMonth = document.getElementById("curMonth").innerHTML
	var curYear = document.getElementById("curYear").innerHTML
	var selectedDays = localStorage.getItem("selectedDays").split(",");
	
	// potentially protects against case where user enters nothing
	if (selectedDays.length == 0) {
		selectedDays.push(15);
	}
	
	var lenArray = (selectedDays.length) - 1;
	var selected = new Date(curYear, months.indexOf(curMonth), parseInt(selectedDays[lenArray]));
	
	var selectedDayOfWeek = selected.getDay(); // gets what day of week the selected day is 
	
	// calc blanks as day of week last month ends at + num of selected day - day of week selected day is on
	var numBlanks = dayofweek + parseInt(selectedDays[lenArray]) - selectedDayOfWeek;
	
	// i <= day before calendar starts
	for (var i = 0; i < numBlanks; i++) {
		// creating blank spaces for everything before start day
		var d = document.createElement("div");
		d.classList.add("day");
		d.classList.add("blank");
		document.getElementById("daysInWeek").appendChild(d);
	}
	
	var tmp = parseInt(selectedDays[lenArray]) - selectedDayOfWeek;
	for (var i = 0; i <= 6; i++) {
		if (tmp > 0 && tmp < num + 1) { // if day is less than one or past last date, don't generate it
			// formatting stuff
			var d = document.createElement("div"); // create div object for date box
			d.id = "calendarday_" + i; // identifies date box as calendarday_i
			d.className = "day"; // defines class to be day
			d.innerHTML = tmp; // actual date that gets put into box

			document.getElementById("daysInWeek").appendChild(d);
		} else { // add blanks for whatever days don't exist
			var d = document.createElement("div");
			d.classList.add("day");
			d.classList.add("blank");
			document.getElementById("daysInWeek").appendChild(d);
		}
		tmp += 1;
	}
	
	
	// clear out div so new day schema can be generated
	var clear = document.createElement("div");
	clear.className = "clear";
	document.getElementById("daysInWeek").appendChild(clear);
}
	
function daysInMonth(month, year) {
	var d = new Date(year, month+1, 0);
	return d.getDate();
}
		
window.addEventListener('load', function () {
	var url = window.location.href;  // get ref to current URL
	
	var date = new Date(); // get ref to current date
	
	month = localStorage.getItem("month");
	if (month < 0 || month > 11) {
		month = date.getMonth();
	}
	
	year = localStorage.getItem("year");
	if (year < 2021 || year > 2099) {
		year = date.getFullYear();
	}
	
	// janky solution for view display when homepage is clicked
	// TODO: maybe fix by somehow doing this with html 
	if (url.includes("monthly")) {
		viewNum = 0;
	} else {
		viewNum = localStorage.getItem("view");
	}
	
	if (viewNum < 0 || viewNum > 2) {
		view = views[0];
	}
	
	view = views[viewNum];
	
	document.getElementById("curMonth").innerHTML = months[month];
	document.getElementById("curYear").innerHTML = year;
	document.getElementById("curView").innerHTML = view;
	genMonths();
	genYears();
	genViews();
	
	if (url.includes("monthly")) {
		genDays();
	} else if (url.includes("weekly")) {
		genDaysInWeek();
	} 
});
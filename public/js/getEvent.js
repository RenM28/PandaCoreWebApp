var months = ["January", "February", "March", "April", "May", "June", "July",
 "August", "September", "October", "November", "December"];

function firebaseInit() {
	firebaseConfig = {
		apiKey: "AIzaSyDQ51f00QrLyoWwuTXZrCJe_HUqT5QnSHU",
		authDomain: "pandacore.firebaseapp.com",
		databaseURL: "https://pandacore-default-rtdb.firebaseio.com",
		projectId: "pandacore",
		storageBucket: "pandacore.appspot.com",
		messagingSenderId: "239305821806",
		appId: "1:239305821806:web:412fd52e24504ac705a07f",
		measurementId: "G-DPJL1FMWK9"
	};
	firebase.initializeApp(firebaseConfig);
	var user = firebase.auth().currentUser;
}

function genToday() {
    console.log("getting event");
    firebaseInit();

	var email = localStorage.getItem("whatUser");

    var day = localStorage.getItem("selectedDays").split(",")[0];
	if (day.length < 2) day = "0" + day;

	month = months.indexOf(document.getElementById("curMonth").innerHTML) + 1;
	month = month.toString();
	if (month.length < 2) month = "0" + month;

	year = document.getElementById("curYear").innerHTML;
	dateString = year + "/" + month + "/" + day;
	console.log(dateString);

	document.getElementById("todaysDate").innerHTML = dateString;
    
	var databaseRef = firebase.database().ref('users/' + email.replace(".","") + "/" + dateString);
    databaseRef.on('value', (snapshot) => {
        const data = snapshot.val();
		if (data == null) {
			console.log("No events for today");
			// do something with no events
		}
		else {
			var d2 = Object.values(data);
			for (const o of d2) {
				console.log(o);
				createEvent(o);
			}
		}
    });
}

function createEvent(info) {
	var title = document.createElement("div");
	title.className = "eventHeader";
	title.innerHTML = info.title + ":";

	document.getElementById("holder").appendChild(title);

	var body = document.createElement("div");
	body.className = "eventBody";
	body.innerHTML = info.body

	document.getElementById("holder").appendChild(body);
}
window.addEventListener('load', function () {
    if (window.location.href.includes("daily")) {
        genToday();
    }
});
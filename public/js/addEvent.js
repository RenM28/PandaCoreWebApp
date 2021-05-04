function firebaseInit(){
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

function addEvent(){
    
    
 
    user = "matt"
    //email = user.email;
    var datepicker = document.getElementById("datepicker").value;
    whatDate = datepicker;
    var titlepicker = document.getElementById("title").value;
    var eventpicker = document.getElementById("event").value;
    //alert(datepicker + " " + titlepicker + " " + eventpicker)

    var email = localStorage.getItem("whatUser");  
    Email = email;
    console.log(Email.replace('.',''));
    datepicker = datepicker.split("/");
    
    date = "/" + datepicker[2] + "/" + datepicker[0] + "/" + datepicker[1]
    console.log(date);
    //email = user.email;  
     firebase.database().ref('users/' + Email.replace('.','') + date).push({
         
        email: Email,
        date: whatDate,
        title: titlepicker,
        body: eventpicker,
    });
 
}
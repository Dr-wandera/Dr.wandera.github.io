const firebaseConfig = {
    apiKey: "AIzaSyC1o-uyxJoPs3_PtDQ5ZEQ8mGyPGaxQ8yU",
    authDomain: "industrial-training-6dc37.firebaseapp.com",
    databaseURL: "https://industrial-training-6dc37-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "industrial-training-6dc37",
    storageBucket: "industrial-training-6dc37.firebasestorage.app",
    messagingSenderId: "933608618747",
    appId: "1:933608618747:web:6c9cc335c33e6271a38e5e",
    measurementId: "G-P6TV7HN5GE"
};

firebase.initializeApp(firebaseConfig);
const auth= firebase.auth()
console.log("connecting to firebase")

function  logout(){
    firebase.auth().signOut().then(function(){
        window.location.href="index.html";
    })
        .catch(error => {
            alert("Error occurred while try to logout");
            console.log(error);
        })
}
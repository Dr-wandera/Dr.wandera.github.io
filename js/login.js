
let btnLogin = document.getElementById("btnLogin");

btnLogin.addEventListener("click", () => {

    let username = document.getElementById("txtUsername").value;
    let password = document.getElementById("txtPassword").value;

    btnLogin.innerHTML = "please wait ...";

    if (txtUsername == "" || txtPassword == "") {

        alert("Please fill out all fields.");
        btnLogin.innerHTML = "Log in";

    } else {

        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)

            .then(() => {

                return firebase.auth().signInWithEmailAndPassword(username, password)

            })

            .then((userCredential) => {

                let emailId = username
                    .replace(/\./g, "_dot_")
                    .replace(/@/g, "_at_");

                return firebase.database()
                    .ref("userDetails/" + emailId)
                    .once("value")

            })

            .then((snapshot) => {

                const userDetails = snapshot.val();

                const role = userDetails.Role;
                const status = userDetails.status;

                if (status == "Active") {

                    if (role == "Admin") {

                        window.location.href = "dashboard.html";

                    } else if (role == "student") {

                        //student
                        alert("Student logged in!.");

                    } else {

                        //active with no role
                        alert("No Role added connect with admin!");

                    }

                } else {

                    //inactive account
                    alert("Account blocked contact admin!");

                }

            })

            .catch((error) => {

                alert(error.message);
                btnLogin.innerHTML = "Log in";

            })
    }
});
let btncreate=document.getElementById('btncreate');

btncreate.addEventListener('click', () =>{
    let txtFirstName = document.getElementById('txtFirstName').value;
    let txtLastName= document.getElementById('txtLastName').value;
    let txtEmail= document.getElementById('txtEmail').value;
    let txtPassword= document.getElementById('txtPassword').value;
    let txtConfirmPassword= document.getElementById('txtConfirmPassword').value;

    if (txtFirstName==""||txtEmail==""||txtPassword==""){
        alert("Name and email is required");
    }
    else {
        if (txtPassword==txtConfirmPassword){
            let emailId=txtEmail.replace(/\./g,"_dot_").replace(/@/g,"_at_");
            let status="active"
            let timeNow= Date.now();
            let role = "Admin"
            firebase.auth().createUserWithEmailAndPassword(txtEmail,txtPassword)
                .then((userCredential) => {
                    firebase.database().ref('userDetail/' + emailId).set({
                        FirstName: txtFirstName,
                        LastName: txtLastName,
                        Email: txtEmail,
                        Password: txtPassword,
                        ConfirmPassword: txtConfirmPassword,
                        Status: status,
                        createdBy: txtEmail,
                        Role: role,
                        createdAt: timeNow,

                    })

                    alert("Account created successfully.")
                })
                .catch((error) => {
                    console.log(error);
                    alert(error.message);
                })
        }
        else {
            alert("Passwords do not match try again");
        }
    }

})
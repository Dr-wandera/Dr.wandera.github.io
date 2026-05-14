let btncreate=document.getElementById('btnaddstudent');

btnaddstudent.addEventListener('click', () =>{
    let txtFirstName = document.getElementById('txtFirstName').value;
    let txtLastName= document.getElementById('txtLastName').value;
    let txtEmail= document.getElementById('txtEmail').value;


    if (txtFirstName==""||txtEmail==""){
        alert("Name and email is required");
    }
    else {
            let emailId=txtEmail.replace(/\./g,"_dot_").replace(/@/g,"_at_");
            let status=document.querySelector("select").value;
            let timeNow= Date.now();
            let role = "Student"
            let autopassword="123456"
            let user = firebase.auth().currentUser;
            let createdby = user.email;


        firebase.auth().createUserWithEmailAndPassword(txtEmail,txtPassword)
                .then((userCredential) => {
                    firebase.database().ref('userDetail/' + emailId).set({
                        FirstName: txtFirstName,
                        LastName: txtLastName,
                        Email: txtEmail,
                        Password: txtPassword,
                        ConfirmPassword: txtConfirmPassword,
                        Status: status,
                        createdBy: createdby,
                        Role: role,
                        createdAt: timeNow,

                    })

                    alert("New Student cadded sucessfully! Password is 11123456 and username is email.")
                })
                .catch((error) => {
                    console.log(error);
                    alert(error.message);
                })
        }
})

    function loaddata(){
        let tablebody = document.getElementById('tablebody');
        firebase.database().ref("userDetail").on("value", (snapshot) => {
            tablebody.innerHTML = "";
            snapshot.forEach(childSnapshot => {
                let data = childSnapshot.val();
                let key = childSnapshot.key;

                if(data.Status=="active" && data.Role=="student"){
                    tablebody.innerHTML += `
                    <tr>
                    <td>${data.Email}</td>
                    <td>${data.FirstName}</td>
                    <td>${data.LastName}</td>
                    <td>
                    <button class="btnred" onclick="suspendStudent(${key})"> Suspended </button>
                </td>
             </tr>

                    `
                }

            })
        })
    }

    loaddata();

    function suspendStudent(studenid){
        let confirmSuspended = confirm(" Are you sure you want to suspend  this student?");
        if (!confirmSuspended)  return;

         firebase.database().ref("userDetail/" + studenid).update({
             Status: "inactive",
         })
             .then((snapshot) => {
                 alert("Student suspended successfully!");
             })
             .then((err) =>{
                 alert("Error occured while suspending student!");
                 console.log(err.message);
             })
    }

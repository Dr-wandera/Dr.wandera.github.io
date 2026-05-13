let btnReset=document.getElementById("btnReset");
btnReset.addEventListener("click",()=>{
    let txtEmail=document.getElementById("txtEmail").value;
    auth.sendPasswordResetEmail(txtEmail)
    .then(()=>{
        alert("Reset link has been sent (If your email exist in our database)")
        txtEmail.value = "";
    })
    .catch((error)=>{
        alert(error.message);
        console.log(error);
        txtEmail.value = "";
    })
})
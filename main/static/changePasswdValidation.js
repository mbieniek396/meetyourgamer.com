const passwd1 = document.getElementById("chpasswd1")
const passwd2 = document.getElementById("chpasswd2")
const passwdCheck = document.getElementById("chpasswdCH")
const submit = document.getElementById("chpasswdSub")

submit.addEventListener('onclick', chpasswd2)
passwd2.addEventListener('focusout', chpasswd2)
passwd1.addEventListener('focusout', chpasswd2)

function chpasswd2(){
    if (passwd1.value != passwd2.value && passwd2.value != ""){
      passwd2.style.borderColor = "red";
      passwdCheck.classList.remove("hidden");
      submit.disabled = true
    }else{
      passwd2.style.borderColor = "";
      passwdCheck.classList.add("hidden");
      submit.disabled = false
    }
  }
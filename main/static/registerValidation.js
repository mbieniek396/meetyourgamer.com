const passwdCheck = document.getElementById("REGpasswdCheck")
const email= document.getElementById("Regemail")
const login= document.getElementById("RegLogin")
const loginCH= document.getElementById("RegLoginCH")
const emailCH = document.getElementById("RegemailCH")
const passwd= document.getElementById("REGpassword")
const passwd2= document.getElementById("REGpassword2")
const submit = document.getElementById("RegSubmit")
logins = logins.toString().split(";");
var passwdTF = true
var loginTF = true
var emailTF = true

passwd2.addEventListener('focusout', chpasswd2)
passwd.addEventListener('focusout', chpasswd2)
email.addEventListener('focusout', chemail)
login.addEventListener('focusout', checkLogin)
submit.addEventListener('onclick', chekcAll)

function chpasswd2(){
  if (passwd.value != passwd2.value && passwd2.value != ""){
    passwd2.style.borderColor = red;
    passwdCheck.classList.remove("hidden");
    passwdTF = false
  }else{
    passwd2.style.borderColor = "";
    passwdCheck.classList.add("hidden");
    passwdTF = true
  }
  if (passwdTF && emailTF && loginTF){ 
    submit.disabled = false
  }else{
    submit.disabled = true
  }
}

function chemail(){
  if(email.value.includes("@", 1) && email.value.includes(".", 3)){
    email.style.borderColor = "";
    emailCH.classList.add("hidden");
    emailTF = true
  }else if (email.value != ""){
    email.style.borderColor = red;
    emailCH.classList.remove("hidden");
    emailTF = false
  }else{
    email.style.borderColor = "";
    emailCH.classList.add("hidden");
    emailTF = true
  }
  if (passwdTF && emailTF && loginTF){ 
    submit.disabled = false
  }else{
    submit.disabled = true
  }
}

function checkLogin(){
  if (login.value == ""){
    login.style.borderColor = ""
    loginCH.classList.add("hidden");
    loginTF = true
    if (passwdTF && emailTF && loginTF){ 
      submit.disabled = false
    }else{
      submit.disabled = true
    }
    return
  }
  /*fetch('static/logins.txt')
  .then(response => response.text())
  .then(data => {
  	if (data.includes(login.value)){
      login.style.borderBlockColor = red
      loginCH.classList.remove("hidden");
      return
    }
  });*/
  //////////////////////////////////////////////////
  /*if(logins.includes(login.value)){
    login.style.borderBlockColor = red
    loginCH.classList.remove("hidden");
    loginTF = false
    if (passwdTF && emailTF && loginTF){ 
      submit.disabled = false
    }else{
      submit.disabled = true
    }
    return
  }*/
  login.style.borderColor = ""
  loginCH.classList.add("hidden");
  loginTF = true
  if (passwdTF && emailTF && loginTF){ 
    submit.disabled = false
  }else{
    submit.disabled = true
  }
  logins.forEach(element => {
    if (login.value == element){
    	login.style.borderColor = red
      loginCH.classList.remove("hidden");
      loginTF = false
      if (passwdTF && emailTF && loginTF){ 
        submit.disabled = false
      }else{
        submit.disabled = true
      }
      return
    }
  });
}

function chekcAll(){
  checkLogin()
  chemail()
  chpasswd2()
}
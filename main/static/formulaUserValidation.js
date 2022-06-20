const title = document.getElementById("gtU")
const titleCH = document.getElementById("gtUCH")
const submit1 = document.getElementById("sU1")
gameTits = gameTits.toString().split(";")

title.addEventListener('focusout', titlecheck)
submit1.addEventListener('onclick', titlecheck)

function titlecheck(){
    titleCH.innerText = ""
    title.style.borderColor = ""
    submit1.disabled = false
    if (title.value == ""){
        return
    }
    gameTits.forEach(element => {
        if (title.value == element){
            titleCH.innerText = "Taka gra już istnieje!"
            title.style.borderColor = "red"
            submit1.disabled = true
            return
        }
    });
}
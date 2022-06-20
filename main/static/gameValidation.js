const title = document.getElementById("GameStaffTitle")
const titleCH = document.getElementById("gameStaffTitleCH")
const submit1 = document.getElementById("submitSGW1")
const submit2 = document.getElementById("submitSGW2")
gameTits = gameTits.toString().split(";")

title.addEventListener('focusout', titlecheck)
submit1.addEventListener('onclick', titlecheck)
submit2.addEventListener('onclick', titlecheck)

function titlecheck(){
    titleCH.innerText = ""
    title.style.borderColor = ""
    submit1.disabled = false
    submit2.disabled = false
    if (title.value == ""){
        return
    }
    gameTits.forEach(element => {
        if (title.value == element){
            titleCH.innerText = "Taka gra już istnieje!"
            title.style.borderColor = "red"
            submit1.disabled = true
            submit2.disabled = true
            return
        }
    });
}

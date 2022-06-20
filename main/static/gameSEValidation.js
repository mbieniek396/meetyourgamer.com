const title = document.getElementById("GameStaffTitleSE")
const titleCH = document.getElementById("GameStaffTitleSECH")
const submit1 = document.getElementById("submitSE")
gameTits = gameTits.toString().split(";")


title.addEventListener('focusout', titlecheck)
submit1.addEventListener('onclick', titlecheck)

function titlecheck(){
    titleCH.innerText = ""
    title.style.borderColor = ""
    submit1.disabled = false 
    if (title.value == "" || title.value == selfTitle){
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

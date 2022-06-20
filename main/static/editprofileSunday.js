const sundayEmptyLabel = document.getElementById("sundayEmptyEPLabel")
const sundayEmptyButton = document.getElementById("sundayEmptyEP")
const sundayFullLabel = document.getElementById("sundayFullEPLabel")
const sundayFullButton = document.getElementById("sundayFullEP")
const sundayExactLabel = document.getElementById("sundayExactEPLabel")
const sundayExactButton = document.getElementById("sundayExactEP")
const sundayExactIntervalsDiv = document.getElementById("sundayExactIntervalsDiv")
var sundaynotPreped = true



function sundayBasics(){
    if (sundaysEmpty == "True"){
        sundayFullLabel.classList.remove("Choosen")
        sundayExactLabel.classList.remove("Choosen")
        sundayEmptyLabel.classList.add("Choosen")
        sundayEmptyButton.checked = true
        sundayHideExact()
    }else if (sundaysFull == "True"){
        sundayEmptyLabel.classList.remove("Choosen")
        sundayExactLabel.classList.remove("Choosen")
        sundayFullLabel.classList.add("Choosen")
        sundayFullButton.checked = true
        sundayHideExact()
    }else{
        sundayFullLabel.classList.remove("Choosen")
        sundayEmptyLabel.classList.remove("Choosen")
        sundayExactLabel.classList.add("Choosen")
        sundayExactButton.checked = true
        sundayShowExact()
        if (sundaynotPreped === true){
            sundayPrepExact()
        }
        
    }
}
sundayBasics()


document.getElementById("EPsubmit").addEventListener('submit', (e) =>{
    for(let i=0; i<sundayStartingIntervals.length; i++){
        if (sundayinterfears(i)){
            e.preventDefault()
        }
    }
})

function sundayinterfears(n){
    var what = false
    start = document.getElementById("sundayEP"+"start"+n).value
    end = document.getElementById("sundayEP"+"end"+n).value
    for(let i=0; i<sundayStartingIntervals.length; i++){
        if (n==i){
            continue
        }
        if (document.getElementById("sundayEPDiv"+i).style.backgroundColor == "rgb(255, 128, 129)"){
            document.getElementById("sundayEPDiv"+i).style.backgroundColor = ""
        }
        if (document.getElementById("sundayEPDiv"+i).style.backgroundColor == "rgb(255, 128, 128)"){
            continue
        }
        if (document.getElementById("sundayEP"+"start"+i)){
            s = document.getElementById("sundayEP"+"start"+i).value
        }else{ s = false}
        if (document.getElementById("sundayEP"+"end"+i)){
            e = document.getElementById("sundayEP"+"end"+i).value
        }else { e = false }
        if ((e >= start && e <= end) || (s <= end && s >= start) || (s <= start && e >= end)){
            if (document.getElementById("sundayEPDiv"+i).style.backgroundColor != "rgb(255, 128, 128)"){
                document.getElementById("sundayEPDiv"+i).style.backgroundColor = "#ff8081"
            }
            document.getElementById("sundayEPDiv"+n).style.backgroundColor = "#ff8081"
            what = true
        }
    }
    return what
}

function sundaynotcorrect(n){
    start = document.getElementById("sundayEP"+"start"+n).value
    end = document.getElementById("sundayEP"+"end"+n).value
    if (start >= end){
        return true
    }
    return false
}

function sundayinpustEve(event){
    if (!event) event = window.event
    event.target.parentElement.style.backgroundColor = ""
        if (document.getElementById("sundayErrorMSG"+event.target.id.slice(-1))){
            document.getElementById("sundayErrorMSG"+event.target.id.slice(-1)).remove()
        }
    if (sundaynotcorrect(parseInt(event.target.id.slice(-1)))){
        event.target.parentElement.style.backgroundColor = "#ff8080"
        if (!document.getElementById("sundayErrorMSG"+event.target.id.slice(-1))){
            var errorMsg = document.createElement("p")
            errorMsg.innerHTML="Początek przedziału musi być większy od końca!"
            errorMsg.style.color = "#4d0000"
            errorMsg.id = "sundayErrorMSG"+event.target.id.slice(-1)
            event.target.parentElement.appendChild(errorMsg)
        }

    }else if (sundayinterfears(parseInt(event.target.id.slice(-1)))){
    }
}

function sundayPrepExact(){
    sundaynotPreped = []
    for(let i=0; i<sundayStartingIntervals.length; i++){
        var inputS = document.createElement("input")
        inputS.type = "time"
        inputS.name = "sundayEP"+"start"+i
        inputS.id = "sundayEP"+"start"+i
        inputS.defaultValue = "00:00"
        inputS.value = sundayStartingIntervals[i][0]
        inputS.addEventListener('focusout', sundayinpustEve)
        var inputE = document.createElement("input")
        inputE.type = "time"
        inputE.name = "sundayEP"+"end"+i
        inputE.id = "sundayEP"+"end"+i
        inputE.defaultValue = "00:00"
        inputE.addEventListener('focusout', sundayinpustEve)
        inputE.value = sundayStartingIntervals[i][1]
        var del = document.createElement("p")
        del.id="sundayEPDelete"+i
        del.innerHTML="X"
        del.style.color = "red"
        del.style.display = "inline-block"
        del.classList.add("CustomHover")
        del.onclick = (event) => {
            nr = parseInt(event.target.id.slice(-1))
            sundayStartingIntervals.splice(nr, 1)
            event.target.parentNode.remove()
            for(let j=nr; j<sundayStartingIntervals.length; j++){
                var x = j+1
                var dele = document.getElementById("sundayEPDelete"+x)
                dele.id = "sundayEPDelete"+j
                dele.name = "sundayEPDelete"+j
                var s = document.getElementById("sundayEP"+"end"+x)
                s.id = "sundayEP"+"end"+j
                s.name = "sundayEP"+"end"+j
                var e = document.getElementById("sundayEP"+"start"+x)
                e.id = "sundayEP"+"start"+j
                e.name = "sundayEP"+"start"+j
                var d = document.getElementById("sundayEPDiv"+x)
                d.id = "sundayEPDiv"+j
                d.name = "sundayEPDiv"+j
            }
            if (sundayStartingIntervals.length < 5 && !document.getElementById("sundayAddInterval")){
                var addInterval = document.createElement("p")
                addInterval.id = "sundayAddInterval"
                addInterval.innerHTML = "Dodaj przedział"
                addInterval.classList.add("CustomHover")
                addInterval.addEventListener('click', sundayaddIntervalFunc)
                sundayExactIntervalsDiv.appendChild(addInterval) 
            }
        }
        var div = document.createElement("div")
        div.id = "sundayEPDiv"+i
        div.classList.add("sundayEPDiv"+i)
        div.appendChild(inputS)
        div.appendChild(inputE)
        div.appendChild(del)
        sundayExactIntervalsDiv.appendChild(div)
    }
    if (sundayStartingIntervals.length > 4){
        return
    }
    var addInterval = document.createElement("p")
    addInterval.id = "sundayAddInterval"
    addInterval.innerHTML = "Dodaj przedział"
    addInterval.classList.add("CustomHover")
    addInterval.addEventListener('click', sundayaddIntervalFunc)
    sundayExactIntervalsDiv.appendChild(addInterval) 
}

function sundayaddIntervalFunc(){
    if (sundayStartingIntervals.length > 4){
        document.getElementById("sundayAddInterval").remove()
        return
    }
    var arr = []
    arr.push("0")
    arr.push("0")
    i = sundayStartingIntervals.length
    sundayStartingIntervals.push(arr)
    var inputS = document.createElement("input")
    inputS.type = "time"
    inputS.name = "sundayEP"+"start"+i
    inputS.id = "sundayEP"+"start"+i
    inputS.defaultValue = "00:00"
    inputS.addEventListener('focusout', sundayinpustEve)
    var inputE = document.createElement("input")
    inputE.type = "time"
    inputE.name = "sundayEP"+"end"+i
    inputE.id = "sundayEP"+"end"+i
    inputE.addEventListener('focusout', sundayinpustEve)
    inputE.defaultValue = "00:00"
    var del = document.createElement("p")
    del.id="sundayEPDelete"+i
    del.innerHTML="X"
    del.style.color = "red"
    del.style.display = "inline-block"
    del.classList.add("CustomHover")
    del.onclick = (event) => {
        nr = parseInt(event.target.id.slice(-1))
        sundayStartingIntervals.splice(nr, 1)
        event.target.parentNode.remove()
        for(let j=nr; j<sundayStartingIntervals.length; j++){
            for(let j=nr; j<sundayStartingIntervals.length; j++){
                var x = j+1
                var dele = document.getElementById("sundayEPDelete"+x)
                dele.id = "sundayEPDelete"+j
                dele.name = "sundayEPDelete"+j
                var s = document.getElementById("sundayEP"+"end"+x)
                s.id = "sundayEP"+"end"+j
                s.name = "sundayEP"+"end"+j
                var e = document.getElementById("sundayEP"+"start"+x)
                e.id = "sundayEP"+"start"+j
                e.name = "sundayEP"+"start"+j
                var d = document.getElementById("sundayEPDiv"+x)
                d.id = "sundayEPDiv"+j
                d.name = "sundayEPDiv"+j
            }
        }
        if (sundayStartingIntervals.length < 5 && !document.getElementById("sundayAddInterval")){
            var addInterval = document.createElement("p")
            addInterval.id = "sundayAddInterval"
            addInterval.innerHTML = "Dodaj przedział"
            addInterval.classList.add("CustomHover")
            addInterval.addEventListener('click', sundayaddIntervalFunc)
            sundayExactIntervalsDiv.appendChild(addInterval) 
        }
    }
    var div = document.createElement("div")
    div.classList.add("sundayEPDiv"+i)
    div.id = "sundayEPDiv"+i
    div.appendChild(inputS)
    div.appendChild(inputE)
    div.appendChild(del)
    sundayExactIntervalsDiv.insertBefore(div, document.getElementById("sundayAddInterval"))
    if (sundayStartingIntervals.length > 4){
        document.getElementById("sundayAddInterval").remove()
        return
    }
}


function sundayHideExact(){
    sundayExactIntervalsDiv.classList.add("hidden")
}

function sundayShowExact(){
    sundayExactIntervalsDiv.classList.remove("hidden")
}

sundayEmptyButton.addEventListener('click', sundayChooseEmptyButton)

function sundayChooseEmptyButton(){
    sundaysEmpty = "True"
    sundaysFull = false
    sundayBasics()
}

sundayFullButton.addEventListener('click', sundayChooseFullButton)

function sundayChooseFullButton(){
    sundaysEmpty = false
    sundaysFull = "True"
    sundayBasics()
}

sundayExactButton.addEventListener('click', function(){
    sundaysEmpty = false
    sundaysFull = false
    sundayBasics()
});
const tuesdayEmptyLabel = document.getElementById("tuesdayEmptyEPLabel")
const tuesdayEmptyButton = document.getElementById("tuesdayEmptyEP")
const tuesdayFullLabel = document.getElementById("tuesdayFullEPLabel")
const tuesdayFullButton = document.getElementById("tuesdayFullEP")
const tuesdayExactLabel = document.getElementById("tuesdayExactEPLabel")
const tuesdayExactButton = document.getElementById("tuesdayExactEP")
const tuesdayExactIntervalsDiv = document.getElementById("tuesdayExactIntervalsDiv")
var tuesdaynotPreped = true



function tuesdayBasics(){
    if (tuesdaysEmpty == "True"){
        tuesdayFullLabel.classList.remove("Choosen")
        tuesdayExactLabel.classList.remove("Choosen")
        tuesdayEmptyLabel.classList.add("Choosen")
        tuesdayEmptyButton.checked = true
        tuesdayHideExact()
    }else if (tuesdaysFull == "True"){
        tuesdayEmptyLabel.classList.remove("Choosen")
        tuesdayExactLabel.classList.remove("Choosen")
        tuesdayFullLabel.classList.add("Choosen")
        tuesdayFullButton.checked = true
        tuesdayHideExact()
    }else{
        tuesdayFullLabel.classList.remove("Choosen")
        tuesdayEmptyLabel.classList.remove("Choosen")
        tuesdayExactLabel.classList.add("Choosen")
        tuesdayExactButton.checked = true
        tuesdayShowExact()
        if (tuesdaynotPreped === true){
            tuesdayPrepExact()
        }
        
    }
}
tuesdayBasics()


document.getElementById("EPsubmit").addEventListener('submit', (e) =>{
    for(let i=0; i<tuesdayStartingIntervals.length; i++){
        if (tuesdayinterfears(i)){
            e.preventDefault()
        }
    }
})

function tuesdayinterfears(n){
    var what = false
    start = document.getElementById("tuesdayEP"+"start"+n).value
    end = document.getElementById("tuesdayEP"+"end"+n).value
    for(let i=0; i<tuesdayStartingIntervals.length; i++){
        if (n==i){
            continue
        }
        if (document.getElementById("tuesdayEPDiv"+i).style.backgroundColor == "rgb(255, 128, 129)"){
            document.getElementById("tuesdayEPDiv"+i).style.backgroundColor = ""
        }
        if (document.getElementById("tuesdayEPDiv"+i).style.backgroundColor == "rgb(255, 128, 128)"){
            continue
        }
        if (document.getElementById("tuesdayEP"+"start"+i)){
            s = document.getElementById("tuesdayEP"+"start"+i).value
        }else{ s = false}
        if (document.getElementById("tuesdayEP"+"end"+i)){
            e = document.getElementById("tuesdayEP"+"end"+i).value
        }else { e = false }
        if ((e >= start && e <= end) || (s <= end && s >= start) || (s <= start && e >= end)){
            if (document.getElementById("tuesdayEPDiv"+i).style.backgroundColor != "rgb(255, 128, 128)"){
                document.getElementById("tuesdayEPDiv"+i).style.backgroundColor = "#ff8081"
            }
            document.getElementById("tuesdayEPDiv"+n).style.backgroundColor = "#ff8081"
            what = true
        }
    }
    return what
}

function tuesdaynotcorrect(n){
    start = document.getElementById("tuesdayEP"+"start"+n).value
    end = document.getElementById("tuesdayEP"+"end"+n).value
    if (start >= end){
        return true
    }
    return false
}

function tuesdayinpustEve(event){
    if (!event) event = window.event
    event.target.parentElement.style.backgroundColor = ""
        if (document.getElementById("tuesdayErrorMSG"+event.target.id.slice(-1))){
            document.getElementById("tuesdayErrorMSG"+event.target.id.slice(-1)).remove()
        }
    if (tuesdaynotcorrect(parseInt(event.target.id.slice(-1)))){
        event.target.parentElement.style.backgroundColor = "#ff8080"
        if (!document.getElementById("tuesdayErrorMSG"+event.target.id.slice(-1))){
            var errorMsg = document.createElement("p")
            errorMsg.innerHTML="Początek przedziału musi być większy od końca!"
            errorMsg.style.color = "#4d0000"
            errorMsg.id = "tuesdayErrorMSG"+event.target.id.slice(-1)
            event.target.parentElement.appendChild(errorMsg)
        }

    }else if (tuesdayinterfears(parseInt(event.target.id.slice(-1)))){
    }
}

function tuesdayPrepExact(){
    tuesdaynotPreped = []
    for(let i=0; i<tuesdayStartingIntervals.length; i++){
        var inputS = document.createElement("input")
        inputS.type = "time"
        inputS.name = "tuesdayEP"+"start"+i
        inputS.id = "tuesdayEP"+"start"+i
        inputS.defaultValue = "00:00"
        inputS.value = tuesdayStartingIntervals[i][0]
        inputS.addEventListener('focusout', tuesdayinpustEve)
        var inputE = document.createElement("input")
        inputE.type = "time"
        inputE.name = "tuesdayEP"+"end"+i
        inputE.id = "tuesdayEP"+"end"+i
        inputE.defaultValue = "00:00"
        inputE.addEventListener('focusout', tuesdayinpustEve)
        inputE.value = tuesdayStartingIntervals[i][1]
        var del = document.createElement("p")
        del.id="tuesdayEPDelete"+i
        del.innerHTML="X"
        del.style.color = "red"
        del.style.display = "inline-block"
        del.classList.add("CustomHover")
        del.onclick = (event) => {
            nr = parseInt(event.target.id.slice(-1))
            tuesdayStartingIntervals.splice(nr, 1)
            event.target.parentNode.remove()
            for(let j=nr; j<tuesdayStartingIntervals.length; j++){
                var x = j+1
                var dele = document.getElementById("tuesdayEPDelete"+x)
                dele.id = "tuesdayEPDelete"+j
                dele.name = "tuesdayEPDelete"+j
                var s = document.getElementById("tuesdayEP"+"end"+x)
                s.id = "tuesdayEP"+"end"+j
                s.name = "tuesdayEP"+"end"+j
                var e = document.getElementById("tuesdayEP"+"start"+x)
                e.id = "tuesdayEP"+"start"+j
                e.name = "tuesdayEP"+"start"+j
                var d = document.getElementById("tuesdayEPDiv"+x)
                d.id = "tuesdayEPDiv"+j
                d.name = "tuesdayEPDiv"+j
            }
            if (tuesdayStartingIntervals.length < 5 && !document.getElementById("tuesdayAddInterval")){
                var addInterval = document.createElement("p")
                addInterval.id = "tuesdayAddInterval"
                addInterval.innerHTML = "Dodaj przedział"
                addInterval.classList.add("CustomHover")
                addInterval.addEventListener('click', tuesdayaddIntervalFunc)
                tuesdayExactIntervalsDiv.appendChild(addInterval) 
            }
        }
        var div = document.createElement("div")
        div.id = "tuesdayEPDiv"+i
        div.classList.add("tuesdayEPDiv"+i)
        div.appendChild(inputS)
        div.appendChild(inputE)
        div.appendChild(del)
        tuesdayExactIntervalsDiv.appendChild(div)
    }
    if (tuesdayStartingIntervals.length > 4){
        return
    }
    var addInterval = document.createElement("p")
    addInterval.id = "tuesdayAddInterval"
    addInterval.innerHTML = "Dodaj przedział"
    addInterval.classList.add("CustomHover")
    addInterval.addEventListener('click', tuesdayaddIntervalFunc)
    tuesdayExactIntervalsDiv.appendChild(addInterval) 
}

function tuesdayaddIntervalFunc(){
    if (tuesdayStartingIntervals.length > 4){
        document.getElementById("tuesdayAddInterval").remove()
        return
    }
    var arr = []
    arr.push("0")
    arr.push("0")
    i = tuesdayStartingIntervals.length
    tuesdayStartingIntervals.push(arr)
    var inputS = document.createElement("input")
    inputS.type = "time"
    inputS.name = "tuesdayEP"+"start"+i
    inputS.id = "tuesdayEP"+"start"+i
    inputS.defaultValue = "00:00"
    inputS.addEventListener('focusout', tuesdayinpustEve)
    var inputE = document.createElement("input")
    inputE.type = "time"
    inputE.name = "tuesdayEP"+"end"+i
    inputE.id = "tuesdayEP"+"end"+i
    inputE.addEventListener('focusout', tuesdayinpustEve)
    inputE.defaultValue = "00:00"
    var del = document.createElement("p")
    del.id="tuesdayEPDelete"+i
    del.innerHTML="X"
    del.style.color = "red"
    del.style.display = "inline-block"
    del.classList.add("CustomHover")
    del.onclick = (event) => {
        nr = parseInt(event.target.id.slice(-1))
        tuesdayStartingIntervals.splice(nr, 1)
        event.target.parentNode.remove()
        for(let j=nr; j<tuesdayStartingIntervals.length; j++){
            for(let j=nr; j<tuesdayStartingIntervals.length; j++){
                var x = j+1
                var dele = document.getElementById("tuesdayEPDelete"+x)
                dele.id = "tuesdayEPDelete"+j
                dele.name = "tuesdayEPDelete"+j
                var s = document.getElementById("tuesdayEP"+"end"+x)
                s.id = "tuesdayEP"+"end"+j
                s.name = "tuesdayEP"+"end"+j
                var e = document.getElementById("tuesdayEP"+"start"+x)
                e.id = "tuesdayEP"+"start"+j
                e.name = "tuesdayEP"+"start"+j
                var d = document.getElementById("tuesdayEPDiv"+x)
                d.id = "tuesdayEPDiv"+j
                d.name = "tuesdayEPDiv"+j
            }
        }
        if (tuesdayStartingIntervals.length < 5 && !document.getElementById("tuesdayAddInterval")){
            var addInterval = document.createElement("p")
            addInterval.id = "tuesdayAddInterval"
            addInterval.innerHTML = "Dodaj przedział"
            addInterval.classList.add("CustomHover")
            addInterval.addEventListener('click', tuesdayaddIntervalFunc)
            tuesdayExactIntervalsDiv.appendChild(addInterval) 
        }
    }
    var div = document.createElement("div")
    div.classList.add("tuesdayEPDiv"+i)
    div.id = "tuesdayEPDiv"+i
    div.appendChild(inputS)
    div.appendChild(inputE)
    div.appendChild(del)
    tuesdayExactIntervalsDiv.insertBefore(div, document.getElementById("tuesdayAddInterval"))
    if (tuesdayStartingIntervals.length > 4){
        document.getElementById("tuesdayAddInterval").remove()
        return
    }
}

function deleteDel(e){
    this.remove()
    
}

function tuesdayHideExact(){
    tuesdayExactIntervalsDiv.classList.add("hidden")
}

function tuesdayShowExact(){
    tuesdayExactIntervalsDiv.classList.remove("hidden")
}

tuesdayEmptyButton.addEventListener('click', tuesdayChooseEmptyButton)

function tuesdayChooseEmptyButton(){
    tuesdaysEmpty = "True"
    tuesdaysFull = false
    tuesdayBasics()
}

tuesdayFullButton.addEventListener('click', tuesdayChooseFullButton)

function tuesdayChooseFullButton(){
    tuesdaysEmpty = false
    tuesdaysFull = "True"
    tuesdayBasics()
}

tuesdayExactButton.addEventListener('click', function(){
    tuesdaysEmpty = false
    tuesdaysFull = false
    tuesdayBasics()
});
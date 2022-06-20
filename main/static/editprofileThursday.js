const thursdayEmptyLabel = document.getElementById("thursdayEmptyEPLabel")
const thursdayEmptyButton = document.getElementById("thursdayEmptyEP")
const thursdayFullLabel = document.getElementById("thursdayFullEPLabel")
const thursdayFullButton = document.getElementById("thursdayFullEP")
const thursdayExactLabel = document.getElementById("thursdayExactEPLabel")
const thursdayExactButton = document.getElementById("thursdayExactEP")
const thursdayExactIntervalsDiv = document.getElementById("thursdayExactIntervalsDiv")
var thursdaynotPreped = true



function thursdayBasics(){
    if (thursdaysEmpty == "True"){
        thursdayFullLabel.classList.remove("Choosen")
        thursdayExactLabel.classList.remove("Choosen")
        thursdayEmptyLabel.classList.add("Choosen")
        thursdayEmptyButton.checked = true
        thursdayHideExact()
    }else if (thursdaysFull == "True"){
        thursdayEmptyLabel.classList.remove("Choosen")
        thursdayExactLabel.classList.remove("Choosen")
        thursdayFullLabel.classList.add("Choosen")
        thursdayFullButton.checked = true
        thursdayHideExact()
    }else{
        thursdayFullLabel.classList.remove("Choosen")
        thursdayEmptyLabel.classList.remove("Choosen")
        thursdayExactLabel.classList.add("Choosen")
        thursdayExactButton.checked = true
        thursdayShowExact()
        if (thursdaynotPreped === true){
            thursdayPrepExact()
        }
        
    }
}
thursdayBasics()


document.getElementById("EPsubmit").addEventListener('submit', (e) =>{
    for(let i=0; i<thursdayStartingIntervals.length; i++){
        if (thursdayinterfears(i)){
            e.preventDefault()
        }
    }
})

function thursdayinterfears(n){
    var what = false
    start = document.getElementById("thursdayEP"+"start"+n).value
    end = document.getElementById("thursdayEP"+"end"+n).value
    for(let i=0; i<thursdayStartingIntervals.length; i++){
        if (n==i){
            continue
        }
        if (document.getElementById("thursdayEPDiv"+i).style.backgroundColor == "rgb(255, 128, 129)"){
            document.getElementById("thursdayEPDiv"+i).style.backgroundColor = ""
        }
        if (document.getElementById("thursdayEPDiv"+i).style.backgroundColor == "rgb(255, 128, 128)"){
            continue
        }
        if (document.getElementById("thursdayEP"+"start"+i)){
            s = document.getElementById("thursdayEP"+"start"+i).value
        }else{ s = false}
        if (document.getElementById("thursdayEP"+"end"+i)){
            e = document.getElementById("thursdayEP"+"end"+i).value
        }else { e = false }
        if ((e >= start && e <= end) || (s <= end && s >= start) || (s <= start && e >= end)){
            if (document.getElementById("thursdayEPDiv"+i).style.backgroundColor != "rgb(255, 128, 128)"){
                document.getElementById("thursdayEPDiv"+i).style.backgroundColor = "#ff8081"
            }
            document.getElementById("thursdayEPDiv"+n).style.backgroundColor = "#ff8081"
            what = true
        }
    }
    return what
}

function thursdaynotcorrect(n){
    start = document.getElementById("thursdayEP"+"start"+n).value
    end = document.getElementById("thursdayEP"+"end"+n).value
    if (start >= end){
        return true
    }
    return false
}

function thursdayinpustEve(event){
    if (!event) event = window.event
    event.target.parentElement.style.backgroundColor = ""
        if (document.getElementById("thursdayErrorMSG"+event.target.id.slice(-1))){
            document.getElementById("thursdayErrorMSG"+event.target.id.slice(-1)).remove()
        }
    if (thursdaynotcorrect(parseInt(event.target.id.slice(-1)))){
        event.target.parentElement.style.backgroundColor = "#ff8080"
        if (!document.getElementById("thursdayErrorMSG"+event.target.id.slice(-1))){
            var errorMsg = document.createElement("p")
            errorMsg.innerHTML="Początek przedziału musi być większy od końca!"
            errorMsg.style.color = "#4d0000"
            errorMsg.id = "thursdayErrorMSG"+event.target.id.slice(-1)
            event.target.parentElement.appendChild(errorMsg)
        }

    }else if (thursdayinterfears(parseInt(event.target.id.slice(-1)))){
    }
}

function thursdayPrepExact(){
    thursdaynotPreped = []
    for(let i=0; i<thursdayStartingIntervals.length; i++){
        var inputS = document.createElement("input")
        inputS.type = "time"
        inputS.name = "thursdayEP"+"start"+i
        inputS.id = "thursdayEP"+"start"+i
        inputS.defaultValue = "00:00"
        inputS.value = thursdayStartingIntervals[i][0]
        inputS.addEventListener('focusout', thursdayinpustEve)
        var inputE = document.createElement("input")
        inputE.type = "time"
        inputE.name = "thursdayEP"+"end"+i
        inputE.id = "thursdayEP"+"end"+i
        inputE.defaultValue = "00:00"
        inputE.addEventListener('focusout', thursdayinpustEve)
        inputE.value = thursdayStartingIntervals[i][1]
        var del = document.createElement("p")
        del.id="thursdayEPDelete"+i
        del.innerHTML="X"
        del.style.color = "red"
        del.style.display = "inline-block"
        del.classList.add("CustomHover")
        del.onclick = (event) => {
            nr = parseInt(event.target.id.slice(-1))
            thursdayStartingIntervals.splice(nr, 1)
            event.target.parentNode.remove()
            for(let j=nr; j<thursdayStartingIntervals.length; j++){
                var x = j+1
                var dele = document.getElementById("thursdayEPDelete"+x)
                dele.id = "thursdayEPDelete"+j
                dele.name = "thursdayEPDelete"+j
                var s = document.getElementById("thursdayEP"+"end"+x)
                s.id = "thursdayEP"+"end"+j
                s.name = "thursdayEP"+"end"+j
                var e = document.getElementById("thursdayEP"+"start"+x)
                e.id = "thursdayEP"+"start"+j
                e.name = "thursdayEP"+"start"+j
                var d = document.getElementById("thursdayEPDiv"+x)
                d.id = "thursdayEPDiv"+j
                d.name = "thursdayEPDiv"+j
            }
            if (thursdayStartingIntervals.length < 5 && !document.getElementById("thursdayAddInterval")){
                var addInterval = document.createElement("p")
                addInterval.id = "thursdayAddInterval"
                addInterval.innerHTML = "Dodaj przedział"
                addInterval.classList.add("CustomHover")
                addInterval.addEventListener('click', thursdayaddIntervalFunc)
                thursdayExactIntervalsDiv.appendChild(addInterval) 
            }
        }
        var div = document.createElement("div")
        div.id = "thursdayEPDiv"+i
        div.classList.add("thursdayEPDiv"+i)
        div.appendChild(inputS)
        div.appendChild(inputE)
        div.appendChild(del)
        thursdayExactIntervalsDiv.appendChild(div)
    }
    if (thursdayStartingIntervals.length > 4){
        return
    }
    var addInterval = document.createElement("p")
    addInterval.id = "thursdayAddInterval"
    addInterval.innerHTML = "Dodaj przedział"
    addInterval.classList.add("CustomHover")
    addInterval.addEventListener('click', thursdayaddIntervalFunc)
    thursdayExactIntervalsDiv.appendChild(addInterval) 
}

function thursdayaddIntervalFunc(){
    if (thursdayStartingIntervals.length > 4){
        document.getElementById("thursdayAddInterval").remove()
        return
    }
    var arr = []
    arr.push("0")
    arr.push("0")
    i = thursdayStartingIntervals.length
    thursdayStartingIntervals.push(arr)
    var inputS = document.createElement("input")
    inputS.type = "time"
    inputS.name = "thursdayEP"+"start"+i
    inputS.id = "thursdayEP"+"start"+i
    inputS.defaultValue = "00:00"
    inputS.addEventListener('focusout', thursdayinpustEve)
    var inputE = document.createElement("input")
    inputE.type = "time"
    inputE.name = "thursdayEP"+"end"+i
    inputE.id = "thursdayEP"+"end"+i
    inputE.addEventListener('focusout', thursdayinpustEve)
    inputE.defaultValue = "00:00"
    var del = document.createElement("p")
    del.id="thursdayEPDelete"+i
    del.innerHTML="X"
    del.style.color = "red"
    del.style.display = "inline-block"
    del.classList.add("CustomHover")
    del.onclick = (event) => {
        nr = parseInt(event.target.id.slice(-1))
        thursdayStartingIntervals.splice(nr, 1)
        event.target.parentNode.remove()
        for(let j=nr; j<thursdayStartingIntervals.length; j++){
            for(let j=nr; j<thursdayStartingIntervals.length; j++){
                var x = j+1
                var dele = document.getElementById("thursdayEPDelete"+x)
                dele.id = "thursdayEPDelete"+j
                dele.name = "thursdayEPDelete"+j
                var s = document.getElementById("thursdayEP"+"end"+x)
                s.id = "thursdayEP"+"end"+j
                s.name = "thursdayEP"+"end"+j
                var e = document.getElementById("thursdayEP"+"start"+x)
                e.id = "thursdayEP"+"start"+j
                e.name = "thursdayEP"+"start"+j
                var d = document.getElementById("thursdayEPDiv"+x)
                d.id = "thursdayEPDiv"+j
                d.name = "thursdayEPDiv"+j
            }
        }
        if (thursdayStartingIntervals.length < 5 && !document.getElementById("thursdayAddInterval")){
            var addInterval = document.createElement("p")
            addInterval.id = "thursdayAddInterval"
            addInterval.innerHTML = "Dodaj przedział"
            addInterval.classList.add("CustomHover")
            addInterval.addEventListener('click', thursdayaddIntervalFunc)
            thursdayExactIntervalsDiv.appendChild(addInterval) 
        }
    }
    var div = document.createElement("div")
    div.classList.add("thursdayEPDiv"+i)
    div.id = "thursdayEPDiv"+i
    div.appendChild(inputS)
    div.appendChild(inputE)
    div.appendChild(del)
    thursdayExactIntervalsDiv.insertBefore(div, document.getElementById("thursdayAddInterval"))
    if (thursdayStartingIntervals.length > 4){
        document.getElementById("thursdayAddInterval").remove()
        return
    }
}

function deleteDel(e){
    this.remove()
    
}

function thursdayHideExact(){
    thursdayExactIntervalsDiv.classList.add("hidden")
}

function thursdayShowExact(){
    thursdayExactIntervalsDiv.classList.remove("hidden")
}

thursdayEmptyButton.addEventListener('click', thursdayChooseEmptyButton)

function thursdayChooseEmptyButton(){
    thursdaysEmpty = "True"
    thursdaysFull = false
    thursdayBasics()
}

thursdayFullButton.addEventListener('click', thursdayChooseFullButton)

function thursdayChooseFullButton(){
    thursdaysEmpty = false
    thursdaysFull = "True"
    thursdayBasics()
}

thursdayExactButton.addEventListener('click', function(){
    thursdaysEmpty = false
    thursdaysFull = false
    thursdayBasics()
});
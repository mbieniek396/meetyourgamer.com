const mondayEmptyLabel = document.getElementById("mondayEmptyEPLabel")
const mondayEmptyButton = document.getElementById("mondayEmptyEP")
const mondayFullLabel = document.getElementById("mondayFullEPLabel")
const mondayFullButton = document.getElementById("mondayFullEP")
const mondayExactLabel = document.getElementById("mondayExactEPLabel")
const mondayExactButton = document.getElementById("mondayExactEP")
const mondayExactIntervalsDiv = document.getElementById("mondayExactIntervalsDiv")
var mondaynotPreped = true



function mondayBasics(){
    if (mondaysEmpty == "True"){
        mondayFullLabel.classList.remove("Choosen")
        mondayExactLabel.classList.remove("Choosen")
        mondayEmptyLabel.classList.add("Choosen")
        mondayEmptyButton.checked = true
        mondayHideExact()
    }else if (mondaysFull == "True"){
        mondayEmptyLabel.classList.remove("Choosen")
        mondayExactLabel.classList.remove("Choosen")
        mondayFullLabel.classList.add("Choosen")
        mondayFullButton.checked = true
        mondayHideExact()
    }else{
        mondayFullLabel.classList.remove("Choosen")
        mondayEmptyLabel.classList.remove("Choosen")
        mondayExactLabel.classList.add("Choosen")
        mondayExactButton.checked = true
        mondayShowExact()
        if (mondaynotPreped === true){
            mondayPrepExact()
        }
        
    }
}
mondayBasics()


document.getElementById("EPsubmit").addEventListener('submit', (e) =>{
    for(let i=0; i<mondayStartingIntervals.length; i++){
        if (mondayinterfears(i)){
            e.preventDefault()
        }
    }
})

function mondayinterfears(n){
    var what = false
    start = document.getElementById("mondayEP"+"start"+n).value
    end = document.getElementById("mondayEP"+"end"+n).value
    for(let i=0; i<mondayStartingIntervals.length; i++){
        if (n==i){
            continue
        }
        if (document.getElementById("mondayEPDiv"+i).style.backgroundColor == "rgb(255, 128, 129)"){
            document.getElementById("mondayEPDiv"+i).style.backgroundColor = ""
        }
        if (document.getElementById("mondayEPDiv"+i).style.backgroundColor == "rgb(255, 128, 128)"){
            continue
        }
        if (document.getElementById("mondayEP"+"start"+i)){
            s = document.getElementById("mondayEP"+"start"+i).value
        }else{ s = false}
        if (document.getElementById("mondayEP"+"end"+i)){
            e = document.getElementById("mondayEP"+"end"+i).value
        }else { e = false }
        if ((e >= start && e <= end) || (s <= end && s >= start) || (s <= start && e >= end)){
            if (document.getElementById("mondayEPDiv"+i).style.backgroundColor != "rgb(255, 128, 128)"){
                document.getElementById("mondayEPDiv"+i).style.backgroundColor = "#ff8081"
            }
            document.getElementById("mondayEPDiv"+n).style.backgroundColor = "#ff8081"
            what = true
        }
    }
    return what
}

function mondaynotcorrect(n){
    start = document.getElementById("mondayEP"+"start"+n).value
    end = document.getElementById("mondayEP"+"end"+n).value
    if (start >= end){
        return true
    }
    return false
}

function mondayinpustEve(event){
    if (!event) event = window.event
    event.target.parentElement.style.backgroundColor = ""
        if (document.getElementById("mondayErrorMSG"+event.target.id.slice(-1))){
            document.getElementById("mondayErrorMSG"+event.target.id.slice(-1)).remove()
        }
    if (mondaynotcorrect(parseInt(event.target.id.slice(-1)))){
        event.target.parentElement.style.backgroundColor = "#ff8080"
        if (!document.getElementById("mondayErrorMSG"+event.target.id.slice(-1))){
            var errorMsg = document.createElement("p")
            errorMsg.innerHTML="Początek przedziału musi być większy od końca!"
            errorMsg.style.color = "#4d0000"
            errorMsg.id = "mondayErrorMSG"+event.target.id.slice(-1)
            event.target.parentElement.appendChild(errorMsg)
        }

    }else if (mondayinterfears(parseInt(event.target.id.slice(-1)))){
    }
}

function mondayPrepExact(){
    mondaynotPreped = []
    for(let i=0; i<mondayStartingIntervals.length; i++){
        var inputS = document.createElement("input")
        inputS.type = "time"
        inputS.name = "mondayEP"+"start"+i
        inputS.id = "mondayEP"+"start"+i
        inputS.defaultValue = "00:00"
        inputS.value = mondayStartingIntervals[i][0]
        inputS.addEventListener('focusout', mondayinpustEve)
        var inputE = document.createElement("input")
        inputE.type = "time"
        inputE.name = "mondayEP"+"end"+i
        inputE.id = "mondayEP"+"end"+i
        inputE.defaultValue = "00:00"
        inputE.addEventListener('focusout', mondayinpustEve)
        inputE.value = mondayStartingIntervals[i][1]
        var del = document.createElement("p")
        del.id="mondayEPDelete"+i
        del.innerHTML="X"
        del.style.color = "red"
        del.style.display = "inline-block"
        del.classList.add("CustomHover")
        del.onclick = (event) => {
            nr = parseInt(event.target.id.slice(-1))
            mondayStartingIntervals.splice(nr, 1)
            event.target.parentNode.remove()
            for(let j=nr; j<mondayStartingIntervals.length; j++){
                var x = j+1
                var dele = document.getElementById("mondayEPDelete"+x)
                dele.id = "mondayEPDelete"+j
                dele.name = "mondayEPDelete"+j
                var s = document.getElementById("mondayEP"+"end"+x)
                s.id = "mondayEP"+"end"+j
                s.name = "mondayEP"+"end"+j
                var e = document.getElementById("mondayEP"+"start"+x)
                e.id = "mondayEP"+"start"+j
                e.name = "mondayEP"+"start"+j
                var d = document.getElementById("mondayEPDiv"+x)
                d.id = "mondayEPDiv"+j
                d.name = "mondayEPDiv"+j
            }
            if (mondayStartingIntervals.length < 5 && !document.getElementById("mondayAddInterval")){
                var addInterval = document.createElement("p")
                addInterval.id = "mondayAddInterval"
                addInterval.innerHTML = "Dodaj przedział"
                addInterval.classList.add("CustomHover")
                addInterval.addEventListener('click', mondayaddIntervalFunc)
                mondayExactIntervalsDiv.appendChild(addInterval) 
            }
        }
        var div = document.createElement("div")
        div.id = "mondayEPDiv"+i
        div.classList.add("mondayEPDiv"+i)
        div.appendChild(inputS)
        div.appendChild(inputE)
        div.appendChild(del)
        mondayExactIntervalsDiv.appendChild(div)
    }
    if (mondayStartingIntervals.length > 4){
        return
    }
    var addInterval = document.createElement("p")
    addInterval.id = "mondayAddInterval"
    addInterval.innerHTML = "Dodaj przedział"
    addInterval.classList.add("CustomHover")
    addInterval.addEventListener('click', mondayaddIntervalFunc)
    mondayExactIntervalsDiv.appendChild(addInterval) 
}

function mondayaddIntervalFunc(){
    if (mondayStartingIntervals.length > 4){
        document.getElementById("mondayAddInterval").remove()
        return
    }
    var arr = []
    arr.push("0")
    arr.push("0")
    i = mondayStartingIntervals.length
    mondayStartingIntervals.push(arr)
    var inputS = document.createElement("input")
    inputS.type = "time"
    inputS.name = "mondayEP"+"start"+i
    inputS.id = "mondayEP"+"start"+i
    inputS.defaultValue = "00:00"
    inputS.addEventListener('focusout', mondayinpustEve)
    var inputE = document.createElement("input")
    inputE.type = "time"
    inputE.name = "mondayEP"+"end"+i
    inputE.id = "mondayEP"+"end"+i
    inputE.addEventListener('focusout', mondayinpustEve)
    inputE.defaultValue = "00:00"
    var del = document.createElement("p")
    del.id="mondayEPDelete"+i
    del.innerHTML="X"
    del.style.color = "red"
    del.style.display = "inline-block"
    del.classList.add("CustomHover")
    del.onclick = (event) => {
        nr = parseInt(event.target.id.slice(-1))
        mondayStartingIntervals.splice(nr, 1)
        event.target.parentNode.remove()
        for(let j=nr; j<mondayStartingIntervals.length; j++){
            for(let j=nr; j<mondayStartingIntervals.length; j++){
                var x = j+1
                var dele = document.getElementById("mondayEPDelete"+x)
                dele.id = "mondayEPDelete"+j
                dele.name = "mondayEPDelete"+j
                var s = document.getElementById("mondayEP"+"end"+x)
                s.id = "mondayEP"+"end"+j
                s.name = "mondayEP"+"end"+j
                var e = document.getElementById("mondayEP"+"start"+x)
                e.id = "mondayEP"+"start"+j
                e.name = "mondayEP"+"start"+j
                var d = document.getElementById("mondayEPDiv"+x)
                d.id = "mondayEPDiv"+j
                d.name = "mondayEPDiv"+j
            }
        }
        if (mondayStartingIntervals.length < 5 && !document.getElementById("mondayAddInterval")){
            var addInterval = document.createElement("p")
            addInterval.id = "mondayAddInterval"
            addInterval.innerHTML = "Dodaj przedział"
            addInterval.classList.add("CustomHover")
            addInterval.addEventListener('click', mondayaddIntervalFunc)
            mondayExactIntervalsDiv.appendChild(addInterval) 
        }
    }
    var div = document.createElement("div")
    div.classList.add("mondayEPDiv"+i)
    div.id = "mondayEPDiv"+i
    div.appendChild(inputS)
    div.appendChild(inputE)
    div.appendChild(del)
    mondayExactIntervalsDiv.insertBefore(div, document.getElementById("mondayAddInterval"))
    if (mondayStartingIntervals.length > 4){
        document.getElementById("mondayAddInterval").remove()
        return
    }
}

function deleteDel(e){
    this.remove()
    
}

function mondayHideExact(){
    mondayExactIntervalsDiv.classList.add("hidden")
}

function mondayShowExact(){
    mondayExactIntervalsDiv.classList.remove("hidden")
}

mondayEmptyButton.addEventListener('click', mondayChooseEmptyButton)

function mondayChooseEmptyButton(){
    mondaysEmpty = "True"
    mondaysFull = false
    mondayBasics()
}

mondayFullButton.addEventListener('click', mondayChooseFullButton)

function mondayChooseFullButton(){
    mondaysEmpty = false
    mondaysFull = "True"
    mondayBasics()
}

mondayExactButton.addEventListener('click', function(){
    mondaysEmpty = false
    mondaysFull = false
    mondayBasics()
});
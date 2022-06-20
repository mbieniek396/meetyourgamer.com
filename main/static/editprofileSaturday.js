const saturdayEmptyLabel = document.getElementById("saturdayEmptyEPLabel")
const saturdayEmptyButton = document.getElementById("saturdayEmptyEP")
const saturdayFullLabel = document.getElementById("saturdayFullEPLabel")
const saturdayFullButton = document.getElementById("saturdayFullEP")
const saturdayExactLabel = document.getElementById("saturdayExactEPLabel")
const saturdayExactButton = document.getElementById("saturdayExactEP")
const saturdayExactIntervalsDiv = document.getElementById("saturdayExactIntervalsDiv")
var saturdaynotPreped = true



function saturdayBasics(){
    if (saturdaysEmpty == "True"){
        saturdayFullLabel.classList.remove("Choosen")
        saturdayExactLabel.classList.remove("Choosen")
        saturdayEmptyLabel.classList.add("Choosen")
        saturdayEmptyButton.checked = true
        saturdayHideExact()
    }else if (saturdaysFull == "True"){
        saturdayEmptyLabel.classList.remove("Choosen")
        saturdayExactLabel.classList.remove("Choosen")
        saturdayFullLabel.classList.add("Choosen")
        saturdayFullButton.checked = true
        saturdayHideExact()
    }else{
        saturdayFullLabel.classList.remove("Choosen")
        saturdayEmptyLabel.classList.remove("Choosen")
        saturdayExactLabel.classList.add("Choosen")
        saturdayExactButton.checked = true
        saturdayShowExact()
        if (saturdaynotPreped === true){
            saturdayPrepExact()
        }
        
    }
}
saturdayBasics()


document.getElementById("EPsubmit").addEventListener('submit', (e) =>{
    for(let i=0; i<saturdayStartingIntervals.length; i++){
        if (saturdayinterfears(i)){
            e.preventDefault()
        }
    }
})

function saturdayinterfears(n){
    var what = false
    start = document.getElementById("saturdayEP"+"start"+n).value
    end = document.getElementById("saturdayEP"+"end"+n).value
    for(let i=0; i<saturdayStartingIntervals.length; i++){
        if (n==i){
            continue
        }
        if (document.getElementById("saturdayEPDiv"+i).style.backgroundColor == "rgb(255, 128, 129)"){
            document.getElementById("saturdayEPDiv"+i).style.backgroundColor = ""
        }
        if (document.getElementById("saturdayEPDiv"+i).style.backgroundColor == "rgb(255, 128, 128)"){
            continue
        }
        if (document.getElementById("saturdayEP"+"start"+i)){
            s = document.getElementById("saturdayEP"+"start"+i).value
        }else{ s = false}
        if (document.getElementById("saturdayEP"+"end"+i)){
            e = document.getElementById("saturdayEP"+"end"+i).value
        }else { e = false }
        if ((e >= start && e <= end) || (s <= end && s >= start) || (s <= start && e >= end)){
            if (document.getElementById("saturdayEPDiv"+i).style.backgroundColor != "rgb(255, 128, 128)"){
                document.getElementById("saturdayEPDiv"+i).style.backgroundColor = "#ff8081"
            }
            document.getElementById("saturdayEPDiv"+n).style.backgroundColor = "#ff8081"
            what = true
        }
    }
    return what
}

function saturdaynotcorrect(n){
    start = document.getElementById("saturdayEP"+"start"+n).value
    end = document.getElementById("saturdayEP"+"end"+n).value
    if (start >= end){
        return true
    }
    return false
}

function saturdayinpustEve(event){
    if (!event) event = window.event
    event.target.parentElement.style.backgroundColor = ""
        if (document.getElementById("saturdayErrorMSG"+event.target.id.slice(-1))){
            document.getElementById("saturdayErrorMSG"+event.target.id.slice(-1)).remove()
        }
    if (saturdaynotcorrect(parseInt(event.target.id.slice(-1)))){
        event.target.parentElement.style.backgroundColor = "#ff8080"
        if (!document.getElementById("saturdayErrorMSG"+event.target.id.slice(-1))){
            var errorMsg = document.createElement("p")
            errorMsg.innerHTML="Początek przedziału musi być większy od końca!"
            errorMsg.style.color = "#4d0000"
            errorMsg.id = "saturdayErrorMSG"+event.target.id.slice(-1)
            event.target.parentElement.appendChild(errorMsg)
        }

    }else if (saturdayinterfears(parseInt(event.target.id.slice(-1)))){
    }
}

function saturdayPrepExact(){
    saturdaynotPreped = []
    for(let i=0; i<saturdayStartingIntervals.length; i++){
        var inputS = document.createElement("input")
        inputS.type = "time"
        inputS.name = "saturdayEP"+"start"+i
        inputS.id = "saturdayEP"+"start"+i
        inputS.defaultValue = "00:00"
        inputS.value = saturdayStartingIntervals[i][0]
        inputS.addEventListener('focusout', saturdayinpustEve)
        var inputE = document.createElement("input")
        inputE.type = "time"
        inputE.name = "saturdayEP"+"end"+i
        inputE.id = "saturdayEP"+"end"+i
        inputE.defaultValue = "00:00"
        inputE.addEventListener('focusout', saturdayinpustEve)
        inputE.value = saturdayStartingIntervals[i][1]
        var del = document.createElement("p")
        del.id="saturdayEPDelete"+i
        del.innerHTML="X"
        del.style.color = "red"
        del.style.display = "inline-block"
        del.classList.add("CustomHover")
        del.onclick = (event) => {
            nr = parseInt(event.target.id.slice(-1))
            saturdayStartingIntervals.splice(nr, 1)
            event.target.parentNode.remove()
            for(let j=nr; j<saturdayStartingIntervals.length; j++){
                var x = j+1
                var dele = document.getElementById("saturdayEPDelete"+x)
                dele.id = "saturdayEPDelete"+j
                dele.name = "saturdayEPDelete"+j
                var s = document.getElementById("saturdayEP"+"end"+x)
                s.id = "saturdayEP"+"end"+j
                s.name = "saturdayEP"+"end"+j
                var e = document.getElementById("saturdayEP"+"start"+x)
                e.id = "saturdayEP"+"start"+j
                e.name = "saturdayEP"+"start"+j
                var d = document.getElementById("saturdayEPDiv"+x)
                d.id = "saturdayEPDiv"+j
                d.name = "saturdayEPDiv"+j
            }
            if (saturdayStartingIntervals.length < 5 && !document.getElementById("saturdayAddInterval")){
                var addInterval = document.createElement("p")
                addInterval.id = "saturdayAddInterval"
                addInterval.innerHTML = "Dodaj przedział"
                addInterval.classList.add("CustomHover")
                addInterval.addEventListener('click', saturdayaddIntervalFunc)
                saturdayExactIntervalsDiv.appendChild(addInterval) 
            }
        }
        var div = document.createElement("div")
        div.id = "saturdayEPDiv"+i
        div.classList.add("saturdayEPDiv"+i)
        div.appendChild(inputS)
        div.appendChild(inputE)
        div.appendChild(del)
        saturdayExactIntervalsDiv.appendChild(div)
    }
    if (saturdayStartingIntervals.length > 4){
        return
    }
    var addInterval = document.createElement("p")
    addInterval.id = "saturdayAddInterval"
    addInterval.innerHTML = "Dodaj przedział"
    addInterval.classList.add("CustomHover")
    addInterval.addEventListener('click', saturdayaddIntervalFunc)
    saturdayExactIntervalsDiv.appendChild(addInterval) 
}

function saturdayaddIntervalFunc(){
    if (saturdayStartingIntervals.length > 4){
        document.getElementById("saturdayAddInterval").remove()
        return
    }
    var arr = []
    arr.push("0")
    arr.push("0")
    i = saturdayStartingIntervals.length
    saturdayStartingIntervals.push(arr)
    var inputS = document.createElement("input")
    inputS.type = "time"
    inputS.name = "saturdayEP"+"start"+i
    inputS.id = "saturdayEP"+"start"+i
    inputS.defaultValue = "00:00"
    inputS.addEventListener('focusout', saturdayinpustEve)
    var inputE = document.createElement("input")
    inputE.type = "time"
    inputE.name = "saturdayEP"+"end"+i
    inputE.id = "saturdayEP"+"end"+i
    inputE.addEventListener('focusout', saturdayinpustEve)
    inputE.defaultValue = "00:00"
    var del = document.createElement("p")
    del.id="saturdayEPDelete"+i
    del.innerHTML="X"
    del.style.color = "red"
    del.style.display = "inline-block"
    del.classList.add("CustomHover")
    del.onclick = (event) => {
        nr = parseInt(event.target.id.slice(-1))
        saturdayStartingIntervals.splice(nr, 1)
        event.target.parentNode.remove()
        for(let j=nr; j<saturdayStartingIntervals.length; j++){
            for(let j=nr; j<saturdayStartingIntervals.length; j++){
                var x = j+1
                var dele = document.getElementById("saturdayEPDelete"+x)
                dele.id = "saturdayEPDelete"+j
                dele.name = "saturdayEPDelete"+j
                var s = document.getElementById("saturdayEP"+"end"+x)
                s.id = "saturdayEP"+"end"+j
                s.name = "saturdayEP"+"end"+j
                var e = document.getElementById("saturdayEP"+"start"+x)
                e.id = "saturdayEP"+"start"+j
                e.name = "saturdayEP"+"start"+j
                var d = document.getElementById("saturdayEPDiv"+x)
                d.id = "saturdayEPDiv"+j
                d.name = "saturdayEPDiv"+j
            }
        }
        if (saturdayStartingIntervals.length < 5 && !document.getElementById("saturdayAddInterval")){
            var addInterval = document.createElement("p")
            addInterval.id = "saturdayAddInterval"
            addInterval.innerHTML = "Dodaj przedział"
            addInterval.classList.add("CustomHover")
            addInterval.addEventListener('click', saturdayaddIntervalFunc)
            saturdayExactIntervalsDiv.appendChild(addInterval) 
        }
    }
    var div = document.createElement("div")
    div.classList.add("saturdayEPDiv"+i)
    div.id = "saturdayEPDiv"+i
    div.appendChild(inputS)
    div.appendChild(inputE)
    div.appendChild(del)
    saturdayExactIntervalsDiv.insertBefore(div, document.getElementById("saturdayAddInterval"))
    if (saturdayStartingIntervals.length > 4){
        document.getElementById("saturdayAddInterval").remove()
        return
    }
}

function deleteDel(e){
    this.remove()
    
}

function saturdayHideExact(){
    saturdayExactIntervalsDiv.classList.add("hidden")
}

function saturdayShowExact(){
    saturdayExactIntervalsDiv.classList.remove("hidden")
}

saturdayEmptyButton.addEventListener('click', saturdayChooseEmptyButton)

function saturdayChooseEmptyButton(){
    saturdaysEmpty = "True"
    saturdaysFull = false
    saturdayBasics()
}

saturdayFullButton.addEventListener('click', saturdayChooseFullButton)

function saturdayChooseFullButton(){
    saturdaysEmpty = false
    saturdaysFull = "True"
    saturdayBasics()
}

saturdayExactButton.addEventListener('click', function(){
    saturdaysEmpty = false
    saturdaysFull = false
    saturdayBasics()
});
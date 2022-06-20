const fridayEmptyLabel = document.getElementById("fridayEmptyEPLabel")
const fridayEmptyButton = document.getElementById("fridayEmptyEP")
const fridayFullLabel = document.getElementById("fridayFullEPLabel")
const fridayFullButton = document.getElementById("fridayFullEP")
const fridayExactLabel = document.getElementById("fridayExactEPLabel")
const fridayExactButton = document.getElementById("fridayExactEP")
const fridayExactIntervalsDiv = document.getElementById("fridayExactIntervalsDiv")
var fridaynotPreped = true



function fridayBasics(){
    if (fridaysEmpty == "True"){
        fridayFullLabel.classList.remove("Choosen")
        fridayExactLabel.classList.remove("Choosen")
        fridayEmptyLabel.classList.add("Choosen")
        fridayEmptyButton.checked = true
        fridayHideExact()
    }else if (fridaysFull == "True"){
        fridayEmptyLabel.classList.remove("Choosen")
        fridayExactLabel.classList.remove("Choosen")
        fridayFullLabel.classList.add("Choosen")
        fridayFullButton.checked = true
        fridayHideExact()
    }else{
        fridayFullLabel.classList.remove("Choosen")
        fridayEmptyLabel.classList.remove("Choosen")
        fridayExactLabel.classList.add("Choosen")
        fridayExactButton.checked = true
        fridayShowExact()
        if (fridaynotPreped === true){
            fridayPrepExact()
        }
        
    }
}
fridayBasics()


document.getElementById("EPsubmit").addEventListener('submit', (e) =>{
    for(let i=0; i<fridayStartingIntervals.length; i++){
        if (fridayinterfears(i)){
            e.preventDefault()
        }
    }
})

function fridayinterfears(n){
    var what = false
    start = document.getElementById("fridayEP"+"start"+n).value
    end = document.getElementById("fridayEP"+"end"+n).value
    for(let i=0; i<fridayStartingIntervals.length; i++){
        if (n==i){
            continue
        }
        if (document.getElementById("fridayEPDiv"+i).style.backgroundColor == "rgb(255, 128, 129)"){
            document.getElementById("fridayEPDiv"+i).style.backgroundColor = ""
        }
        if (document.getElementById("fridayEPDiv"+i).style.backgroundColor == "rgb(255, 128, 128)"){
            continue
        }
        if (document.getElementById("fridayEP"+"start"+i)){
            s = document.getElementById("fridayEP"+"start"+i).value
        }else{ s = false}
        if (document.getElementById("fridayEP"+"end"+i)){
            e = document.getElementById("fridayEP"+"end"+i).value
        }else { e = false }
        if ((e >= start && e <= end) || (s <= end && s >= start) || (s <= start && e >= end)){
            if (document.getElementById("fridayEPDiv"+i).style.backgroundColor != "rgb(255, 128, 128)"){
                document.getElementById("fridayEPDiv"+i).style.backgroundColor = "#ff8081"
            }
            document.getElementById("fridayEPDiv"+n).style.backgroundColor = "#ff8081"
            what = true
        }
    }
    return what
}

function fridaynotcorrect(n){
    start = document.getElementById("fridayEP"+"start"+n).value
    end = document.getElementById("fridayEP"+"end"+n).value
    if (start >= end){
        return true
    }
    return false
}

function fridayinpustEve(event){
    if (!event) event = window.event
    event.target.parentElement.style.backgroundColor = ""
        if (document.getElementById("fridayErrorMSG"+event.target.id.slice(-1))){
            document.getElementById("fridayErrorMSG"+event.target.id.slice(-1)).remove()
        }
    if (fridaynotcorrect(parseInt(event.target.id.slice(-1)))){
        event.target.parentElement.style.backgroundColor = "#ff8080"
        if (!document.getElementById("fridayErrorMSG"+event.target.id.slice(-1))){
            var errorMsg = document.createElement("p")
            errorMsg.innerHTML="Początek przedziału musi być większy od końca!"
            errorMsg.style.color = "#4d0000"
            errorMsg.id = "fridayErrorMSG"+event.target.id.slice(-1)
            event.target.parentElement.appendChild(errorMsg)
        }

    }else if (fridayinterfears(parseInt(event.target.id.slice(-1)))){
    }
}

function fridayPrepExact(){
    fridaynotPreped = []
    for(let i=0; i<fridayStartingIntervals.length; i++){
        var inputS = document.createElement("input")
        inputS.type = "time"
        inputS.name = "fridayEP"+"start"+i
        inputS.id = "fridayEP"+"start"+i
        inputS.defaultValue = "00:00"
        inputS.value = fridayStartingIntervals[i][0]
        inputS.addEventListener('focusout', fridayinpustEve)
        var inputE = document.createElement("input")
        inputE.type = "time"
        inputE.name = "fridayEP"+"end"+i
        inputE.id = "fridayEP"+"end"+i
        inputE.defaultValue = "00:00"
        inputE.addEventListener('focusout', fridayinpustEve)
        inputE.value = fridayStartingIntervals[i][1]
        var del = document.createElement("p")
        del.id="fridayEPDelete"+i
        del.innerHTML="X"
        del.style.color = "red"
        del.style.display = "inline-block"
        del.classList.add("CustomHover")
        del.onclick = (event) => {
            nr = parseInt(event.target.id.slice(-1))
            fridayStartingIntervals.splice(nr, 1)
            event.target.parentNode.remove()
            for(let j=nr; j<fridayStartingIntervals.length; j++){
                var x = j+1
                var dele = document.getElementById("fridayEPDelete"+x)
                dele.id = "fridayEPDelete"+j
                dele.name = "fridayEPDelete"+j
                var s = document.getElementById("fridayEP"+"end"+x)
                s.id = "fridayEP"+"end"+j
                s.name = "fridayEP"+"end"+j
                var e = document.getElementById("fridayEP"+"start"+x)
                e.id = "fridayEP"+"start"+j
                e.name = "fridayEP"+"start"+j
                var d = document.getElementById("fridayEPDiv"+x)
                d.id = "fridayEPDiv"+j
                d.name = "fridayEPDiv"+j
            }
            if (fridayStartingIntervals.length < 5 && !document.getElementById("fridayAddInterval")){
                var addInterval = document.createElement("p")
                addInterval.id = "fridayAddInterval"
                addInterval.innerHTML = "Dodaj przedział"
                addInterval.classList.add("CustomHover")
                addInterval.addEventListener('click', fridayaddIntervalFunc)
                fridayExactIntervalsDiv.appendChild(addInterval) 
            }
        }
        var div = document.createElement("div")
        div.id = "fridayEPDiv"+i
        div.classList.add("fridayEPDiv"+i)
        div.appendChild(inputS)
        div.appendChild(inputE)
        div.appendChild(del)
        fridayExactIntervalsDiv.appendChild(div)
    }
    if (fridayStartingIntervals.length > 4){
        return
    }
    var addInterval = document.createElement("p")
    addInterval.id = "fridayAddInterval"
    addInterval.innerHTML = "Dodaj przedział"
    addInterval.classList.add("CustomHover")
    addInterval.addEventListener('click', fridayaddIntervalFunc)
    fridayExactIntervalsDiv.appendChild(addInterval) 
}

function fridayaddIntervalFunc(){
    if (fridayStartingIntervals.length > 4){
        document.getElementById("fridayAddInterval").remove()
        return
    }
    var arr = []
    arr.push("0")
    arr.push("0")
    i = fridayStartingIntervals.length
    fridayStartingIntervals.push(arr)
    var inputS = document.createElement("input")
    inputS.type = "time"
    inputS.name = "fridayEP"+"start"+i
    inputS.id = "fridayEP"+"start"+i
    inputS.defaultValue = "00:00"
    inputS.addEventListener('focusout', fridayinpustEve)
    var inputE = document.createElement("input")
    inputE.type = "time"
    inputE.name = "fridayEP"+"end"+i
    inputE.id = "fridayEP"+"end"+i
    inputE.addEventListener('focusout', fridayinpustEve)
    inputE.defaultValue = "00:00"
    var del = document.createElement("p")
    del.id="fridayEPDelete"+i
    del.innerHTML="X"
    del.style.color = "red"
    del.style.display = "inline-block"
    del.classList.add("CustomHover")
    del.onclick = (event) => {
        nr = parseInt(event.target.id.slice(-1))
        fridayStartingIntervals.splice(nr, 1)
        event.target.parentNode.remove()
        for(let j=nr; j<fridayStartingIntervals.length; j++){
            for(let j=nr; j<fridayStartingIntervals.length; j++){
                var x = j+1
                var dele = document.getElementById("fridayEPDelete"+x)
                dele.id = "fridayEPDelete"+j
                dele.name = "fridayEPDelete"+j
                var s = document.getElementById("fridayEP"+"end"+x)
                s.id = "fridayEP"+"end"+j
                s.name = "fridayEP"+"end"+j
                var e = document.getElementById("fridayEP"+"start"+x)
                e.id = "fridayEP"+"start"+j
                e.name = "fridayEP"+"start"+j
                var d = document.getElementById("fridayEPDiv"+x)
                d.id = "fridayEPDiv"+j
                d.name = "fridayEPDiv"+j
            }
        }
        if (fridayStartingIntervals.length < 5 && !document.getElementById("fridayAddInterval")){
            var addInterval = document.createElement("p")
            addInterval.id = "fridayAddInterval"
            addInterval.innerHTML = "Dodaj przedział"
            addInterval.classList.add("CustomHover")
            addInterval.addEventListener('click', fridayaddIntervalFunc)
            fridayExactIntervalsDiv.appendChild(addInterval) 
        }
    }
    var div = document.createElement("div")
    div.classList.add("fridayEPDiv"+i)
    div.id = "fridayEPDiv"+i
    div.appendChild(inputS)
    div.appendChild(inputE)
    div.appendChild(del)
    fridayExactIntervalsDiv.insertBefore(div, document.getElementById("fridayAddInterval"))
    if (fridayStartingIntervals.length > 4){
        document.getElementById("fridayAddInterval").remove()
        return
    }
}

function deleteDel(e){
    this.remove()
    
}

function fridayHideExact(){
    fridayExactIntervalsDiv.classList.add("hidden")
}

function fridayShowExact(){
    fridayExactIntervalsDiv.classList.remove("hidden")
}

fridayEmptyButton.addEventListener('click', fridayChooseEmptyButton)

function fridayChooseEmptyButton(){
    fridaysEmpty = "True"
    fridaysFull = false
    fridayBasics()
}

fridayFullButton.addEventListener('click', fridayChooseFullButton)

function fridayChooseFullButton(){
    fridaysEmpty = false
    fridaysFull = "True"
    fridayBasics()
}

fridayExactButton.addEventListener('click', function(){
    fridaysEmpty = false
    fridaysFull = false
    fridayBasics()
});
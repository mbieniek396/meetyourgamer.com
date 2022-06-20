const wedensdayEmptyLabel = document.getElementById("wedensdayEmptyEPLabel")
const wedensdayEmptyButton = document.getElementById("wedensdayEmptyEP")
const wedensdayFullLabel = document.getElementById("wedensdayFullEPLabel")
const wedensdayFullButton = document.getElementById("wedensdayFullEP")
const wedensdayExactLabel = document.getElementById("wedensdayExactEPLabel")
const wedensdayExactButton = document.getElementById("wedensdayExactEP")
const wedensdayExactIntervalsDiv = document.getElementById("wedensdayExactIntervalsDiv")
var wedensdaynotPreped = true



function wedensdayBasics(){
    if (wedensdaysEmpty == "True"){
        wedensdayFullLabel.classList.remove("Choosen")
        wedensdayExactLabel.classList.remove("Choosen")
        wedensdayEmptyLabel.classList.add("Choosen")
        wedensdayEmptyButton.checked = true
        wedensdayHideExact()
    }else if (wedensdaysFull == "True"){
        wedensdayEmptyLabel.classList.remove("Choosen")
        wedensdayExactLabel.classList.remove("Choosen")
        wedensdayFullLabel.classList.add("Choosen")
        wedensdayFullButton.checked = true
        wedensdayHideExact()
    }else{
        wedensdayFullLabel.classList.remove("Choosen")
        wedensdayEmptyLabel.classList.remove("Choosen")
        wedensdayExactLabel.classList.add("Choosen")
        wedensdayExactButton.checked = true
        wedensdayShowExact()
        if (wedensdaynotPreped === true){
            wedensdayPrepExact()
        }
        
    }
}
wedensdayBasics()


document.getElementById("EPsubmit").addEventListener('submit', (e) =>{
    for(let i=0; i<wedensdayStartingIntervals.length; i++){
        if (wedensdayinterfears(i)){
            e.preventDefault()
        }
    }
})

function wedensdayinterfears(n){
    var what = false
    start = document.getElementById("wedensdayEP"+"start"+n).value
    end = document.getElementById("wedensdayEP"+"end"+n).value
    for(let i=0; i<wedensdayStartingIntervals.length; i++){
        if (n==i){
            continue
        }
        if (document.getElementById("wedensdayEPDiv"+i).style.backgroundColor == "rgb(255, 128, 129)"){
            document.getElementById("wedensdayEPDiv"+i).style.backgroundColor = ""
        }
        if (document.getElementById("wedensdayEPDiv"+i).style.backgroundColor == "rgb(255, 128, 128)"){
            continue
        }
        if (document.getElementById("wedensdayEP"+"start"+i)){
            s = document.getElementById("wedensdayEP"+"start"+i).value
        }else{ s = false}
        if (document.getElementById("wedensdayEP"+"end"+i)){
            e = document.getElementById("wedensdayEP"+"end"+i).value
        }else { e = false }
        if ((e >= start && e <= end) || (s <= end && s >= start) || (s <= start && e >= end)){
            if (document.getElementById("wedensdayEPDiv"+i).style.backgroundColor != "rgb(255, 128, 128)"){
                document.getElementById("wedensdayEPDiv"+i).style.backgroundColor = "#ff8081"
            }
            document.getElementById("wedensdayEPDiv"+n).style.backgroundColor = "#ff8081"
            what = true
        }
    }
    return what
}

function wedensdaynotcorrect(n){
    start = document.getElementById("wedensdayEP"+"start"+n).value
    end = document.getElementById("wedensdayEP"+"end"+n).value
    if (start >= end){
        return true
    }
    return false
}

function wedensdayinpustEve(event){
    if (!event) event = window.event
    event.target.parentElement.style.backgroundColor = ""
        if (document.getElementById("wedensdayErrorMSG"+event.target.id.slice(-1))){
            document.getElementById("wedensdayErrorMSG"+event.target.id.slice(-1)).remove()
        }
    if (wedensdaynotcorrect(parseInt(event.target.id.slice(-1)))){
        event.target.parentElement.style.backgroundColor = "#ff8080"
        if (!document.getElementById("wedensdayErrorMSG"+event.target.id.slice(-1))){
            var errorMsg = document.createElement("p")
            errorMsg.innerHTML="Początek przedziału musi być większy od końca!"
            errorMsg.style.color = "#4d0000"
            errorMsg.id = "wedensdayErrorMSG"+event.target.id.slice(-1)
            event.target.parentElement.appendChild(errorMsg)
        }

    }else if (wedensdayinterfears(parseInt(event.target.id.slice(-1)))){
    }
}

function wedensdayPrepExact(){
    wedensdaynotPreped = []
    for(let i=0; i<wedensdayStartingIntervals.length; i++){
        var inputS = document.createElement("input")
        inputS.type = "time"
        inputS.name = "wedensdayEP"+"start"+i
        inputS.id = "wedensdayEP"+"start"+i
        inputS.defaultValue = "00:00"
        inputS.value = wedensdayStartingIntervals[i][0]
        inputS.addEventListener('focusout', wedensdayinpustEve)
        var inputE = document.createElement("input")
        inputE.type = "time"
        inputE.name = "wedensdayEP"+"end"+i
        inputE.id = "wedensdayEP"+"end"+i
        inputE.defaultValue = "00:00"
        inputE.addEventListener('focusout', wedensdayinpustEve)
        inputE.value = wedensdayStartingIntervals[i][1]
        var del = document.createElement("p")
        del.id="wedensdayEPDelete"+i
        del.innerHTML="X"
        del.style.color = "red"
        del.style.display = "inline-block"
        del.classList.add("CustomHover")
        del.onclick = (event) => {
            nr = parseInt(event.target.id.slice(-1))
            wedensdayStartingIntervals.splice(nr, 1)
            event.target.parentNode.remove()
            for(let j=nr; j<wedensdayStartingIntervals.length; j++){
                var x = j+1
                var dele = document.getElementById("wedensdayEPDelete"+x)
                dele.id = "wedensdayEPDelete"+j
                dele.name = "wedensdayEPDelete"+j
                var s = document.getElementById("wedensdayEP"+"end"+x)
                s.id = "wedensdayEP"+"end"+j
                s.name = "wedensdayEP"+"end"+j
                var e = document.getElementById("wedensdayEP"+"start"+x)
                e.id = "wedensdayEP"+"start"+j
                e.name = "wedensdayEP"+"start"+j
                var d = document.getElementById("wedensdayEPDiv"+x)
                d.id = "wedensdayEPDiv"+j
                d.name = "wedensdayEPDiv"+j
            }
            if (wedensdayStartingIntervals.length < 5 && !document.getElementById("wedensdayAddInterval")){
                var addInterval = document.createElement("p")
                addInterval.id = "wedensdayAddInterval"
                addInterval.innerHTML = "Dodaj przedział"
                addInterval.classList.add("CustomHover")
                addInterval.addEventListener('click', wedensdayaddIntervalFunc)
                wedensdayExactIntervalsDiv.appendChild(addInterval) 
            }
        }
        var div = document.createElement("div")
        div.id = "wedensdayEPDiv"+i
        div.classList.add("wedensdayEPDiv"+i)
        div.appendChild(inputS)
        div.appendChild(inputE)
        div.appendChild(del)
        wedensdayExactIntervalsDiv.appendChild(div)
    }
    if (wedensdayStartingIntervals.length > 4){
        return
    }
    var addInterval = document.createElement("p")
    addInterval.id = "wedensdayAddInterval"
    addInterval.innerHTML = "Dodaj przedział"
    addInterval.classList.add("CustomHover")
    addInterval.addEventListener('click', wedensdayaddIntervalFunc)
    wedensdayExactIntervalsDiv.appendChild(addInterval) 
}

function wedensdayaddIntervalFunc(){
    if (wedensdayStartingIntervals.length > 4){
        document.getElementById("wedensdayAddInterval").remove()
        return
    }
    var arr = []
    arr.push("0")
    arr.push("0")
    i = wedensdayStartingIntervals.length
    wedensdayStartingIntervals.push(arr)
    var inputS = document.createElement("input")
    inputS.type = "time"
    inputS.name = "wedensdayEP"+"start"+i
    inputS.id = "wedensdayEP"+"start"+i
    inputS.defaultValue = "00:00"
    inputS.addEventListener('focusout', wedensdayinpustEve)
    var inputE = document.createElement("input")
    inputE.type = "time"
    inputE.name = "wedensdayEP"+"end"+i
    inputE.id = "wedensdayEP"+"end"+i
    inputE.addEventListener('focusout', wedensdayinpustEve)
    inputE.defaultValue = "00:00"
    var del = document.createElement("p")
    del.id="wedensdayEPDelete"+i
    del.innerHTML="X"
    del.style.color = "red"
    del.style.display = "inline-block"
    del.classList.add("CustomHover")
    del.onclick = (event) => {
        nr = parseInt(event.target.id.slice(-1))
        wedensdayStartingIntervals.splice(nr, 1)
        event.target.parentNode.remove()
        for(let j=nr; j<wedensdayStartingIntervals.length; j++){
            for(let j=nr; j<wedensdayStartingIntervals.length; j++){
                var x = j+1
                var dele = document.getElementById("wedensdayEPDelete"+x)
                dele.id = "wedensdayEPDelete"+j
                dele.name = "wedensdayEPDelete"+j
                var s = document.getElementById("wedensdayEP"+"end"+x)
                s.id = "wedensdayEP"+"end"+j
                s.name = "wedensdayEP"+"end"+j
                var e = document.getElementById("wedensdayEP"+"start"+x)
                e.id = "wedensdayEP"+"start"+j
                e.name = "wedensdayEP"+"start"+j
                var d = document.getElementById("wedensdayEPDiv"+x)
                d.id = "wedensdayEPDiv"+j
                d.name = "wedensdayEPDiv"+j
            }
        }
        if (wedensdayStartingIntervals.length < 5 && !document.getElementById("wedensdayAddInterval")){
            var addInterval = document.createElement("p")
            addInterval.id = "wedensdayAddInterval"
            addInterval.innerHTML = "Dodaj przedział"
            addInterval.classList.add("CustomHover")
            addInterval.addEventListener('click', wedensdayaddIntervalFunc)
            wedensdayExactIntervalsDiv.appendChild(addInterval) 
        }
    }
    var div = document.createElement("div")
    div.classList.add("wedensdayEPDiv"+i)
    div.id = "wedensdayEPDiv"+i
    div.appendChild(inputS)
    div.appendChild(inputE)
    div.appendChild(del)
    wedensdayExactIntervalsDiv.insertBefore(div, document.getElementById("wedensdayAddInterval"))
    if (wedensdayStartingIntervals.length > 4){
        document.getElementById("wedensdayAddInterval").remove()
        return
    }
}

function deleteDel(e){
    this.remove()
    
}

function wedensdayHideExact(){
    wedensdayExactIntervalsDiv.classList.add("hidden")
}

function wedensdayShowExact(){
    wedensdayExactIntervalsDiv.classList.remove("hidden")
}

wedensdayEmptyButton.addEventListener('click', wedensdayChooseEmptyButton)

function wedensdayChooseEmptyButton(){
    wedensdaysEmpty = "True"
    wedensdaysFull = false
    wedensdayBasics()
}

wedensdayFullButton.addEventListener('click', wedensdayChooseFullButton)

function wedensdayChooseFullButton(){
    wedensdaysEmpty = false
    wedensdaysFull = "True"
    wedensdayBasics()
}

wedensdayExactButton.addEventListener('click', function(){
    wedensdaysEmpty = false
    wedensdaysFull = false
    wedensdayBasics()
});
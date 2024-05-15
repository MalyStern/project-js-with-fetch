var Table = document.getElementById("table1")
var Data = []
var newData = []
filteredData = []
const button = document.getElementById("submitbutton")
const formadd = document.createElement("form");




function getFetch() {
    Table.replaceChildren()
    Data = []
    fetch("http://127.0.0.1:5500/json/aprtments.json", {
    }).then(response => { return response.json() })
        .then(response => {
            for (let d in response) {
                response[d]["finalPrice"] = response[d]['PricePerMeter'] * response[d]['Meters']
                Data.push(response[d])
            }
            filteredData = Data.slice()
            ShowHeaders()
            ShowData(Data)
        })
        .catch(err => console.log(err));
}


function ShowHeaders() {
    const header = document.createElement("tr")
    const headers = ["Code", "City", "Address", "Number Of Rooms", "Meters", "Price Per Meter", "Final Price", "Remove"]
    for (const head in headers) {
        let th = document.createElement("th")
        th.innerText = headers[head]
        header.appendChild(th)
    }
    Table.appendChild(header)
}


function ShowData(data) {
    const headers = ["Code", "City", "Address", "NumOfRooms", "Meters", "PricePerMeter", "finalPrice"]
    for (let index in data) {
        let tr = document.createElement("tr")
        tr.id = data[index]["Code"].toString()
        for (let cell in headers) {
            let td = document.createElement("td")
            td.innerText = data[index][headers[cell]]
            tr.appendChild(td)
        }
        let garbidge = document.createElement("td")
        let garbidgepic = document.createElement("img")
        garbidgepic.src = "../image/bin.png"
        garbidgepic.id = data[index]["Code"].toString()
        garbidgepic.addEventListener("click", removeTr)
        garbidge.appendChild(garbidgepic)
        tr.appendChild(garbidge);
        Table.appendChild(tr);
    }
}


function FinalSearch() {
    const searchby = document.getElementById("search").value;
    const searchinput = document.getElementById("input").value;
    if (searchinput == "") {
        alert("please fill in a search parameter")
        // document.getElementById("input").setCustomValidity("please fill in a search parameter");
        return;
    }
    if (searchby == "City") {
        filteredData = filteredData.filter((d) => {
            return d[searchby] == searchinput
        })
    }
    else if (searchby == "finalPrice") {
        filteredData = filteredData.filter((d) => {
            return d[searchby] <= searchinput
        })
    } else {
        filteredData = filteredData.filter((d) => {
            return d[searchby] >= searchinput
        })
    }
    Table.replaceChildren()
    ShowHeaders()
    ShowData(filteredData)

}





function addApartment() {
    const add = document.getElementById("add");
    add.replaceChildren()
    formadd.replaceChildren();
    const headersadd = ["City", "Address", "Number Of Rooms", "Meters", "Price Per Meter"]
    for (let h in headersadd) {
        let input = document.createElement("input")
        input.placeholder = headersadd[h]
        input.className = "inputTags"
        let br = document.createElement("br")
        formadd.appendChild(input)
        formadd.appendChild(br)

    }
    add.appendChild(formadd)
    let addButton = document.createElement("button")
    addButton.innerText = "Add";
    addButton.onclick = addf;
    add.appendChild(addButton);
    let cancelButton = document.createElement("button")
    cancelButton.innerText = "Cancel";
    cancelButton.onclick = cancel;
    add.appendChild(cancelButton);
}

function cancel(){
    const add = document.getElementById("add");
    add.replaceChildren()
    formadd.replaceChildren();
}

function clearSearch() {
    filteredData = Data.slice()
    Table.replaceChildren()
    ShowHeaders()
    ShowData(Data)
}


function addf() {
    filteredData = Data.slice()
    const inputValues = []
    const inputs = document.getElementsByClassName("inputTags")

    for (let i = 0; i < 5; i++) {
        if (i == 0 || i == 1) {
            if (inputs[i].value == "") {
                alert("please fill in validate field");
                return;
            }
        } else if (isNaN(inputs[i].value)) {
            alert("please fill in a validate number")
            return;
        } else if (i == 2) {
            if (parseInt(inputs[i].value) > 15 || parseInt(inputs[i]).value < 1) {
                alert("please fill in a validate number of rooms")
                return;
            }
        } else if (i == 3) {
            if (parseInt(inputs[i].value) < 15) {
                alert("please fill in a validate number of meters")
                return;
            }
        } else {
            if (parseInt(inputs[i].value) < 1000) {
                alert("please fill in a validate price")
                return;
            }
        }
        inputValues.push(inputs[i].value)
    }


    const key = ["City", "Address", "NumOfRooms", "Meters", "PricePerMeter"]
    let dict = {}
    dict["Code"] = Data[Data.length - 1]["Code"] + 1
    for (let i = 0; i < 5; i++) {
        dict[key[i]] = inputValues[i]
    }
    dict["finalPrice"] = dict["Meters"] * dict["PricePerMeter"];
    Data.push(dict)
    filteredData.push(dict)
    Table.replaceChildren()
    ShowHeaders()
    ShowData(Data)
    formadd.replaceChildren()
    button.style.display = "none"
}


function removeTr() {
    if (getConfirmation()) {
        var toRemove = document.getElementById(this.id)
        toRemove.remove()
        Data = Data.filter((d) => {
            return d["Code"] != this.id
        })
        filteredData = filteredData.filter((d) => {
            return d["Code"] != this.id
        })
    }
}


function getConfirmation() {
    var retVal = confirm("Are you sure you want to delete the row?");
    if (retVal == true) {
        return true;
    } else {
        return false;
    }

}








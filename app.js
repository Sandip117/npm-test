import 'regenerator-runtime/runtime';
import axios from 'axios'

let json = require('/list.json');
console.log(json, 'the json obj');
renderDataInTheTable(json);
async function renderDataInTheTable(todos) {
            const mytable = document.getElementById("html-data-table");
                
            Array.prototype.forEach.call(todos,todo => {
                let newRow = document.createElement("tr");
                Object.values(todo).forEach((value) => {
                    let cell = document.createElement("td");
                    cell.innerText = value;
                    newRow.appendChild(cell);
                })
                let button = document.createElement("a")
                let link = document.createTextNode("LLD")
                button.appendChild(link)
                button.title = "LLD"
                button.href = "#"
                button.data = todo
                button.addEventListener("click",async function(todo)
                {
                    await postData(todo.target.data)
                });
                newRow.appendChild(button);
                mytable.appendChild(newRow);
            });
        }
        
async function postData(data) {

  
  let bodyObj = {
  "PFDCMservice": "PFDCMLOCAL",
  "PACSservice": "orthanc",
  "PACSdirective": {
    "PatientID": data.PatientID,
    },
  "dblogbasepath": "/home/dicom/log",
  "thenArgs": {
    "db": "/home/dicom/log",
    "swift": "local",
    "swiftServicesPACS": "orthanc",
    "swiftPackEachDICOM": true,
    "CUBE": "local",
    "parseAllFilesWithSubStr": "dcm"
  },
  "feedArgs": {
    "FeedName": "%SeriesInstanceUID",
    "User": data.User,
    "Pipeline": "",
    "nodeArgs": {
      "PluginName": "pl-pfdorun",
      "Version": "",
      "Params": {},
      "PassUserCreds": false
    }
  }
};

  try {
    const response = await fetch("http://localhost:8050/workflow/do/",{
      method: 'POST',
      headers: {
         'Content-Type': "application/json",
         "Accept": "application/json",
      },
      body : JSON.stringify(bodyObj),
      });
    console.log("Request successful!");
  } catch (error) {
    if (error.response) {
      console.log(error.reponse.status);
    } else {
      console.log(error.message);
    }
  }
}


let kitchenInput = document.getElementById("kitchen-input")
let addBtn = document.getElementById("add-btn")
let kitchenItemsList = document.getElementById("kitchen-items-list");
let kitchenInputData;
let kitchenInputDataArray = [];

function setLocalStorage() {
    localStorage.setItem("kitchenInput", JSON.stringify(kitchenInputDataArray));
}

function getLocalStorage() {
    if(localStorage.getItem("kitchenInput")) {
        kitchenInputDataArray = JSON.parse(localStorage.getItem("kitchenInput"));
        buildUI();
        console.log("Data found")
    } else {
        console.log("No data found") 
    }
}

function buildUI() {
    kitchenItemsList.textContent = '';
    kitchenInputDataArray.forEach((item) => {
        // create DOM elements
        let li = document.createElement("li");

        let spanEl = document.createElement("span");
        li.appendChild(spanEl);
        spanEl.innerText = item;

        li.style.cssText = "animation: animated 1s; animation-name: slideIn;"
        kitchenItemsList.appendChild(li);
        kitchenInput.value = '';
        kitchenInput.focus();

        // create trash btn
        let trashBtn = document.createElement("i");
        trashBtn.classList.add("trash", "fa", "fa-trash");
        li.appendChild(trashBtn);
        // console.log(trashBtn);
            
        // create edit btn
        let editBtn = document.createElement("i");
        editBtn.classList.add("edit", "fa", "fa-edit");
        li.appendChild(editBtn);
        // console.log(editBtn);
    })
}

function addkitchenItems(event) {
    kitchenInputData = kitchenInput.value;

    if(kitchenInput.value === '' || kitchenInputDataArray.includes(kitchenInput.value)) {
        alert("No New Data Not found");
    } else {
        kitchenInputDataArray.unshift(kitchenInputData); // Use unshift to add item to the top
        console.log(kitchenInputDataArray);
    }

    // set to local storage
    setLocalStorage();

    // get from local storage
    getLocalStorage();
}

// detete KI
function deletekitchenItems(event) {
    if (event.target.classList[0] === "trash") {
        let item = event.target.parentElement;
        console.log(item);
        item.classList.add("slideOut");
        item.addEventListener("transitionend", function() {
            item.remove()
        });
        
        // Remove from array and update localStorage
        const index = Array.from(kitchenItemsList.children).indexOf(item);
        kitchenInputDataArray.splice(index, 1);
        setLocalStorage();
    }
}

// edit KI
function editkitchenItems(event) {
    if (event.target.classList[0] === "edit") {
        let editedValue = prompt("add new");
        let item = event.target.parentElement;

        let spanEl = item.querySelector("span");
        spanEl.innerText = editedValue;

        // Update array and localStorage
        const index = Array.from(kitchenItemsList.children).indexOf(item);
        kitchenInputDataArray[index] = editedValue;
        setLocalStorage();
    }
}

addBtn.addEventListener("click", addkitchenItems);
kitchenItemsList.addEventListener("click", deletekitchenItems);
kitchenItemsList.addEventListener("click", editkitchenItems);

getLocalStorage();

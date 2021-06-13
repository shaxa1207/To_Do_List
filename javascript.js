const inputBox = document.querySelector('.inputField input');
const addBtn = document.querySelector('.inputField button');
const todoList = document.querySelector('.todo-list');
const deleteBtn = document.querySelector('.footer button');

inputBox.onkeyup = ()=>{
    userData = inputBox.value; //  getting user entered value
    if (userData.trim() != 0) { //if user values aren't only spaces
        addBtn.classList.add('active'); // active the add button
    } else {
        addBtn.classList.remove('active'); // unactive the add button
    }
}

// if user click on the add button
addBtn.onclick = () =>{
    let userData = inputBox.value; //  getting user entered value
    let getLocalStorage = localStorage.getItem('new todo'); // getting localstorage
    if (getLocalStorage == null) { // if localstorage is null
        listArr = []; // creating blank array
    } else {
        listArr = JSON.parse(getLocalStorage); // transforming json string into a js object
    }
    listArr.push(userData); // pushing or adding user data
    localStorage.setItem('new todo', JSON.stringify(listArr)); // transforming js object into a json string
    showTasks(); // calling showTasks function  
    addBtn.classList.remove('active');
}

function showTasks(){        
    let getLocalStorage = localStorage.getItem('new todo'); // getting localstorage
    if (getLocalStorage == null) { // if localstorage is null
        listArr = []; // creating blank array
    } else {
        listArr = JSON.parse(getLocalStorage); // transforming json string into a js object
    }
    const pendingNumb = document.querySelector(".pendingNumb");
    pendingNumb.textContent = listArr.length;
    if (listArr.length > 0) {
        deleteBtn.classList.add("active");
    } else {
        deleteBtn.classList.remove("active");
    }
    let newLiTag = '';
    listArr.forEach((element, index) => {
        newLiTag += `<li> ${element} <span onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
    });
    todoList.innerHTML = newLiTag; // adding a new li tag inside ul tag
    inputBox.value = '';
}

function deleteTask(index){
    let getLocalStorage = localStorage.getItem("new todo");
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1);
    localStorage.setItem("new todo", JSON.stringify(listArr));
    showTasks();
}

deleteBtn.onclick = ()=>{
    listArr = [];
    localStorage.setItem("new todo", JSON.stringify(listArr));
    showTasks();
}
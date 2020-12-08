//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

//Event Listeners
todoButton.addEventListener("click" , addTodo);
todoList.addEventListener("click" , deleteCheck);


//Functions
function addTodo(event){
    event.preventDefault();

    //Todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //Create li
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    
    todoDiv.appendChild(newTodo);

    //Check mark button
    const completeButton = document.createElement("button");
    completeButton.innerHTML = '<i class="fas fa-check"><i>';
    completeButton.classList.add("complete-btn");
    todoDiv.appendChild(completeButton);

    //Check trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"><i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //Add todoDiv to list
    todoList.appendChild(todoDiv);

    //Clear the input field
    todoInput.value = "";
}


function deleteCheck(e){
    const item = e.target;

    //Delete todo
    if(item.classList[0] === "trash-btn"){       
        item.parentElement.remove();
    }

    //Check todo
    if(item.classList[0] == "complete-btn"){
        item.parentElement.classList.toggle("completed");
    }
}
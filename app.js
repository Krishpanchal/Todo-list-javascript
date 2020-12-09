//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event Listeners
document.addEventListener("DOMContentLoaded" , getTodos);
todoButton.addEventListener("click" , addTodo);
todoList.addEventListener("click" , deleteCheck);
filterOption.addEventListener("click" , filterTodo);


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

    //Add todo to localStorage
    saveLocalTodos(todoInput.value);

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
        const todo = item.parentElement;
        removeLocalTodo(todo);
        todo.classList.add('fall');      
        todo.addEventListener("transitionend" , function(){
            todo.remove();
        });
    }

    //Check todo
    if(item.classList[0] == "complete-btn"){
        console.log(item.parentElement);
        item.parentElement.classList.toggle("completed");
    }
}

function filterTodo(e){
    const todos = todoList.childNodes;
    
    todos.forEach( todo => {
        switch(e.target.value){

            case "all": 
                todo.style.display = "flex";
                break;
            
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = 'flex';
                }else {
                    todo.style.display = 'none'
                }
                break;
            
            case "uncompleted":
                case "completed":
                if(!todo.classList.contains("completed")){
                    todo.style.display = 'flex';
                }else {
                    todo.style.display = 'none'
                }
            
        }
    });


}

//Adding local Storage 
function saveLocalTodos(todo){
    //Check --if todos are there
    
    let todos;
    
    if(localStorage.getItem("todos") === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos" , JSON.stringify(todos));
}

function getTodos(){
    //Check --if todos are there
    
    let todos;
    
    if(localStorage.getItem("todos") === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(todo => {

        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        //Create li
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
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
    });
}

//removing a todo
function removeLocalTodo(todo){
    let todos;
    
    if(localStorage.getItem("todos") === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    const todoIndex = todos.indexOf(todo.children[0].innerText);

    todos.splice(todoIndex , 1);
    localStorage.setItem("todos" , JSON.stringify(todos));
}
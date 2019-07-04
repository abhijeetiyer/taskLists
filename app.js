const taskForm = document.querySelector('#taskForm');
const taskInput = document.querySelector('#taskInput');
const taskList = document.querySelector('.taskList');
const clearBtn = document.querySelector('.clearBtn');
const filterTask = document.querySelector('#filterTask');

loadEventListeners();

function loadEventListeners(){
    document.addEventListener('DOMContentLoaded', loadTask);
    taskForm.addEventListener('submit', addTask);
    taskList.addEventListener('click', removeTask);
    clearBtn.addEventListener('click', clearTasks);
    filterTask.addEventListener('keyup', taskFilter);
}
function loadTask(){
    let tasks;
    if(localStorage.getItem('tasks') === null)
    {
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task)
    {
        let li = document.createElement('li');
        li.className = 'panel-block';
        li.appendChild(document.createTextNode(task))
        let a = document.createElement('a');
        a.className = 'delete';
        li.appendChild(a);
        taskList.appendChild(li);
    });

}

function addTask(e){
    if(taskInput.value === ''){
        alert('add a task');
    }
    let li = document.createElement('li');
    li.className = 'panel-block';
    li.appendChild(document.createTextNode(taskInput.value));
    let a = document.createElement('a');
    a.className = 'delete';
    li.appendChild(a);
    taskList.appendChild(li);
    storeTaskToLS(taskInput.value);
    taskInput.value = '';
    
    e.preventDefault();
}

function storeTaskToLS(task){
    let tasks;
    if(localStorage.getItem('tasks') === null)
    {
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));   
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));    
}

function removeTask(e){
    if(e.target.classList.contains('delete'))
    {
        e.target.parentElement.remove();
        removeTasksFromLS(e.target.parentElement);
    }

    e.preventDefault();
}

function removeTasksFromLS(item){
    let tasks;
    if(localStorage.getItem('tasks') === null)
    {
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        tasks.forEach(function(task, index){
        if(item.textContent == task)
        {
            tasks.splice(index, 1);
        }
        });
        localStorage.setItem('tasks',JSON.stringify(tasks));
}

function clearTasks(e){
    if(confirm('are you sure ?'))
    {
        while(taskList.firstChild)
        {
            taskList.removeChild(taskList.firstChild);
            clearTasksFromLS();
        }
    }
    e.preventDefault();
}
function clearTasksFromLS(){
    localStorage.clear();
}

function taskFilter(e){
    let text = e.target.value.toLowerCase();
    document.querySelectorAll('.panel-block').forEach(function(task){
    let item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1)
    {
        task.style.display = 'block';
    }
    else{
        task.style.display = 'none';
    }
    });
    
}


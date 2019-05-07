// define UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// load all event listeners
loadEventListners();

//  Load all event listeners
function loadEventListners() {
  // DOM Load event
  document.addEventListener('DOMContentLoaded',getTasks);
  // add task event
  form.addEventListener('submit', addTask);
  // Remove task event
  taskList.addEventListener('click', removeTask);
  // Clear all task events
  clearBtn.addEventListener('click', clearTasks);
  // Filter tasks
  filter.addEventListener('keyup', filterTasks);
}

//Get tasks from LS
function getTasks(){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
tasks.forEach(function(task){
  // Create li element
  const li = document.createElement('li');
  // add class
  li.className = 'collection-item';
  // create text node and append to li
  li.appendChild(document.createTextNode(task));
  //Create new link element
  const link = document.createElement('a');
  // Add Class
  link.className = 'delete-item secondary-content';
  // Add icon html
  link.innerHTML = '<i class="far fa-trash-alt"></i>';
  //Append the link to the li
  li.appendChild(link);
  //Append li to ul
  taskList.appendChild(li);
});
}

// Add task
function addTask(e) {
  if (taskInput.value === '') {
    alert('Add a task');
    return;
  }

  // Create li element
  const li = document.createElement('li');
  
  // add class
  li.className = 'collection-item';
  
  // create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  
  //Create new link element
  const link = document.createElement('a');
  
  // Add Class
  link.className = 'delete-item secondary-content';
  
  // Add icon html
  link.innerHTML = '<i class="far fa-trash-alt"></i>';
  
  //Append the link to the li
  li.appendChild(link);
  
  //Append li to ul
  taskList.appendChild(li);
  
  // Store to local storage
  storeTaskInlocalStorage(taskInput.value);  

  //Clear input
  taskInput.value = '';
  e.preventDefault();
}
// Store task
function storeTaskInlocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// remove task
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are You Sure?')) {
      e.target.parentElement.parentElement.remove();
      // Remove from Local Storage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Remove from local storage
function removeTaskFromLocalStorage(taskItem){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index,1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear tasks
function clearTasks(e) {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  // Clear from local storage
  clearTasksFromLocalStorage();
}
// Clear from local storage
function clearTasksFromLocalStorage(){
  localStorage.clear();
}

//Filter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';      
    }else {
      task.style.display = 'none';
    }
  });
}


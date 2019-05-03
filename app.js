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
  // add task event
  form.addEventListener('submit', addTask);
  // Remove task event
  taskList.addEventListener('click', removeTask);
  // Clear all task events
  clearBtn.addEventListener('click', clearTasks);
  // Filter tasks
  filter.addEventListener('keyup', filterTasks);
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
  //Clear input
  taskInput.value = '';
  e.preventDefault();
}

// remove task
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are You Sure?')) {
      e.target.parentElement.parentElement.remove();
    }
  }
}

// Clear tasks
function clearTasks(e) {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
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


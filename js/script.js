const inputText = document.querySelector('.input-text');
const addTaskButton = document.querySelector('.add-task-button');
const taskList = document.querySelector('.task-list');
const template = document.querySelector('#element-template').content.querySelector('li');
const emptyTaskList = document.querySelector('.list-empty');

const addTask = function(text) {
  const element = template.cloneNode(true);
  element.querySelector('.task-text').textContent = text;

  taskList.appendChild(element)
  if (taskList.children.length === 1) {
    emptyTaskList.classList.toggle('none');
  }
};

addTaskButton.onclick = function() {
  const taskText = inputText.value;
  if (taskText !== '') {
    addTask(taskText);
  }

  inputText.value = '';
  inputText.focus();
};

function deleteTask(evt) {
  const taskDeleteButton = evt.target.closest('.task-delete-button');
  if(taskDeleteButton) {
    taskDeleteButton.closest('.task-list-unit').remove();
  }
  if (taskList.children.length === 0) {
    emptyTaskList.classList.toggle('none');
  }
};

taskList.addEventListener('click', deleteTask);

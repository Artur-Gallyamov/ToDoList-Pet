const inputText = document.querySelector('.input-text');
const addTaskButton = document.querySelector('.add-task-button');
const taskList = document.querySelector('.task-list');
const template = document.querySelector('#element-template').content.querySelector('li');
const emptyTaskList = document.querySelector('.list-empty');
const errorMessageToInput = document.querySelector('.error-input-message');

function updateTaskListState() {
  emptyTaskList.classList.toggle('none', taskList.children.length > 0)
};

const addTask = function(text) {
  const element = template.cloneNode(true);
  element.querySelector('.task-text').textContent = text;

  taskList.appendChild(element)
  updateTaskListState()
};

addTaskButton.onclick = function() {
  const taskText = inputText.value;
  const onlySpaces = /^[\s]+$/;

  if (taskText !== '' && !onlySpaces.test(taskText)) {
    inputText.classList.remove('error-empty-input');
    errorMessageToInput.textContent = '';
    addTask(taskText);
  } else {
    inputText.classList.add('error-empty-input');
    errorMessageToInput.textContent = 'Поле не заполнено!';
  }

  inputText.value = '';
  inputText.focus();
};

function deleteTask(evt) {
  const taskDeleteButton = evt.target.closest('.task-delete-button');
  if(taskDeleteButton) {
    taskDeleteButton.closest('.task-list-unit').remove();
  }
  updateTaskListState()
};

taskList.addEventListener('click', deleteTask);

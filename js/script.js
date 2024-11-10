const inputText = document.querySelector('.input-text');
const addTaskButton = document.querySelector('.add-task-button');
const taskList = document.querySelector('.task-list');
const template = document.querySelector('#element-template').content.querySelector('li');
const emptyTaskList = document.querySelector('.list-empty');
const errorMessageToInput = document.querySelector('.error-input-message');
const taskFilter = document.querySelector('.status-filter');

function updateTaskListState() {
  emptyTaskList.classList.toggle('none', taskList.children.length > 0)
};

const addTask = function(text) {
  const element = template.cloneNode(true);
  element.querySelector('.task-text').textContent = text;
  if (taskFilter.value === 'completed-task') {
    element.classList.add('none');
  }

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

function completeTask(evt) {
  const taskCompleteButton = evt.target.closest('.task-complete-button');
  if(taskCompleteButton) {
    taskCompleteButton.closest('.task-list-unit').classList.toggle('none', taskFilter.value === 'active-task' || taskFilter.value === 'completed-task');
    taskCompleteButton.closest('.task-list-unit').classList.toggle('active');
    taskCompleteButton.closest('.task-list-unit').classList.toggle('completed');
    taskCompleteButton.closest('.task-list-unit').querySelector('.completed-task-message').classList.toggle('none');
  }
  updateTaskListState()
};

taskFilter.onchange = function filterChange() {
  const tasks = taskList.querySelectorAll('.task-list-unit');
  for (let task of tasks) {
    if (task.classList.contains('completed') && taskFilter.value !== 'active-task' || task.classList.contains('active') && taskFilter.value !== 'completed-task') {
      task.classList.remove('none')
    } else {
      task.classList.add('none')
    }
  }
};

taskList.addEventListener('click', function(evt) {deleteTask(evt); completeTask(evt)});


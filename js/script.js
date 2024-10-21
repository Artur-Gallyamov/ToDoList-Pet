const inputText = document.querySelector('.input-text');
const addTaskButton = document.querySelector('.add-task-button');
const taskList = document.querySelector('.task-list');
const templateFragment = document.querySelector('#element-template').content;
const template = templateFragment.querySelector('li');
const emptyTaskList = document.querySelector('.list-empty');
const fragment = document.createDocumentFragment();

function taskListEmpty() {
  if (taskList.children.length > 0) {
    emptyTaskList.classList.add('none');
  } else {
    emptyTaskList.classList.remove('none');
  }
};

const addTask = function(cb) {
  const element = template.cloneNode(true);
  element.children[0].textContent = cb;

  fragment.appendChild(element)
  taskList.appendChild(fragment)
  taskListEmpty();
};

addTaskButton.onclick = function() {
  let taskText = inputText.value;
  if (taskText === '') {
    inputText.focus();
    return;
  } else {
    addTask(taskText);
  }
  inputText.value = '';
  inputText.focus();
};

function deleteTask(evt) {
  if(evt.target.closest('.task-delete-button')) {
    let parentNode = evt.target.closest('.task-list-unit')
    parentNode.remove();
  }
  taskListEmpty();
};

taskList.addEventListener('click', deleteTask);

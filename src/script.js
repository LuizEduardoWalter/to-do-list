const listScreen = document.querySelector("#listScreen");
const insertTaskScreen = document.querySelector("#insertTaskScreen");
const newTaskInput = document.querySelector("#newTaskInput");
const doneContainer = document.querySelector("#doneContainer");
const toDoContainer = document.querySelector("#toDoContainer");

function toggleScreen() {
  //flex significa display:flex
  if (listScreen.className.search("flex ") >= 0) {
    listScreen.className = listScreen.className.replace("flex ", "hidden ");
  } else {
    listScreen.className = listScreen.className.replace("hidden ", "flex ");
  }
  //hidden significa display:none
  if (insertTaskScreen.className.search("hidden") >= 0) {
    insertTaskScreen.className = insertTaskScreen.className.replace(
      "hidden",
      "flex"
    );
  } else {
    insertTaskScreen.className = insertTaskScreen.className.replace(
      "flex ",
      "hidden "
    );
  }
}

function templateToDoItem(value) {
  const id = new Date().getTime();
  return `
  <div id="${id}" class="flex bg-white px-2 py-1 rounded-md">
  <p class="flex-1">${value}</p>
  <button onclick="concludeTask(${id})" class="mr-2">✔️</button>
  <button onclick="deleteTask(${id})">❌</button>
  </div>`;
}

function createNewTask() {
  if (newTaskInput.value !== "") {
    toDoContainer.innerHTML = `
    ${toDoContainer.innerHTML} ${templateToDoItem(newTaskInput.value)}
    `;
    newTaskInput.value = "";
    toggleScreen();
  } else {
    alert("Insira um valor válido!");
  }
}

function deleteTask(id) {
  const taskToDelete = document.getElementById(id);
  if (taskToDelete !== null) {
    taskToDelete.remove();
  }
}

function concludeTask(id) {
  const taskToConclude = document.getElementById(id);
  const newTaskId = new Date().getTime();
  if (taskToConclude !== null) {
    doneContainer.innerHTML = `
   ${doneContainer.innerHTML}
    <div id="${newTaskId}" class="flex bg-white px-2 py-1 rounded-md">
              <p class="flex-1 line-through">${taskToConclude.children[0].innerHTML}</p>
              <button onclick="recoverTask(${newTaskId})">⬅️</button>
              <button onclick="deleteTask(${newTaskId})">❌</button>
    </div>
    `;
    taskToConclude.remove();
  }
}

function recoverTask(id) {
  const taskToRecover = document.getElementById(id);
  if (taskToRecover !== null) {
    toDoContainer.innerHTML = `
    ${toDoContainer.innerHTML} ${templateToDoItem(
      taskToRecover.children[0].innerHTML
    )}
    `;
    taskToRecover.remove();
  }
}

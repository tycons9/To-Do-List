document.addEventListener("DOMContentLoaded", loadTasks);

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

addTaskBtn.addEventListener("click", addTask);

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const li = document.createElement("li");
  li.innerHTML = `
              <span>${taskText}</span>
              <button onclick="deleteTask(this)">❌</button>
          `;

  li.addEventListener("click", toggleComplete);
  taskList.appendChild(li);

  saveTasks();
  taskInput.value = "";
}

function deleteTask(button) {
  button.parentElement.remove();
  saveTasks();
}

function toggleComplete(event) {
  if (event.target.tagName === "SPAN") {
    event.target.classList.toggle("completed");
    saveTasks();
  }
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("li").forEach((li) => {
    tasks.push({
      text: li.querySelector("span").innerText,
      completed: li.querySelector("span").classList.contains("completed"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.innerHTML = `
                  <span class="${task.completed ? "completed" : ""}">${
      task.text
    }</span>
                  <button onclick="deleteTask(this)">❌</button>
              `;
    li.addEventListener("click", toggleComplete);
    taskList.appendChild(li);
  });
}

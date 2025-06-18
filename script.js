// script.js

const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const addTaskButton = document.querySelector(".task-input button");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    const taskContent = document.createElement("div");
    taskContent.className = "task-content";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;
      saveTasks();
      renderTasks();
    });

    const taskText = document.createElement("span");
    taskText.textContent = task.text;
    taskText.className = task.completed ? "task-text completed" : "task-text";

    const editBtn = document.createElement("button");
    editBtn.innerHTML = "✏️";
    editBtn.className = "edit-btn";
    editBtn.onclick = () => {
      const newText = prompt("Edit your task:", task.text);
      if (newText && newText.trim()) {
        task.text = newText.trim();
        saveTasks();
        renderTasks();
      }
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "🗑️";
    deleteBtn.className = "delete-btn";
    deleteBtn.addEventListener("click", () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    taskContent.appendChild(checkbox);
    taskContent.appendChild(taskText);
    taskContent.appendChild(editBtn);
    taskContent.appendChild(deleteBtn);

    li.appendChild(taskContent);
    taskList.appendChild(li);
  });
}

addTaskButton.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText === "") {
    alert("Please enter a task.");
    return;
  }

  tasks.push({ text: taskText, completed: false });
  saveTasks();
  renderTasks();
  taskInput.value = "";
});

// Initial render
renderTasks();

// Array to store tasks
// Load from localStorage if available, otherwise empty array
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Default filter
let currentFilter = "all";

// When page loads → display saved tasks
window.onload = function () {
  displayTasks();
};

// Function to add a new task
function addTask() {
  let input = document.getElementById("taskInput");
  let taskText = input.value.trim(); // remove extra spaces

  if (taskText === "") {
    alert("Please enter a task");
    return;
  }

  // Create task object
  let task = {
    text: taskText,
    completed: false
  };

  // Add to array
  tasks.push(task);

  // Save and update UI
  saveTasks();
  displayTasks();

  // Clear input
  input.value = "";
}
console.log("displaying tasks:",tasks);

// Function to display tasks
function displayTasks() {
  let taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {

    if (
      (currentFilter === "completed" && !task.completed) ||
      (currentFilter === "pending" && task.completed)
    ) {
      return;
    }

    let li = document.createElement("li");

    // LEFT SIDE (checkbox + text)
    let leftDiv = document.createElement("div");
    leftDiv.className = "task-left";

    // Checkbox
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    checkbox.onchange = function () {
      tasks[index].completed = checkbox.checked;
      saveTasks();
      displayTasks();
    };

    // Text
    let span = document.createElement("span");
    span.innerText = task.text;

    if (task.completed) {
      span.style.textDecoration = "line-through";
    }

    // Add checkbox + text to leftDiv
    leftDiv.appendChild(checkbox);
    leftDiv.appendChild(span);

    // Delete button (right side)
    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "❌";

    deleteBtn.onclick = function () {
      tasks.splice(index, 1);
      saveTasks();
      displayTasks();
    };

    // Add both sections to li
    li.appendChild(leftDiv);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
  });
}// Save tasks to browser storage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Filter function
function filterTasks(filter) {
  currentFilter = filter;
  displayTasks();
}
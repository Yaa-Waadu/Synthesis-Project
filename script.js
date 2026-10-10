let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");

taskForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const title = document.getElementById("taskTitle").value.trim();
    const course = document.getElementById("course").value.trim();
    const dueDate = document.getElementById("dueDate").value;
    const priority = document.getElementById("priority").value;

    if (title === "" || course === "" || dueDate === "") {
        alert("Please fill in all the required fields.");
        return;
    }

    const task = {
        title: title,
        course: course,
        dueDate: dueDate,
        priority: priority,
        completed: false
    };

    tasks.push(task);

    saveTasks();
    displayTasks();

    taskForm.reset();

    alert("Task added successfully!");
});

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach(function(task, index) {
        const listItem = document.createElement("li");

        const taskDetails = document.createElement("span");

        taskDetails.textContent =
            task.title + " - " +
            task.course + " - Due: " +
            task.dueDate + " - Priority: " +
            task.priority + " ";

        if (task.completed) {
            taskDetails.style.textDecoration = "line-through";
        }

        const completeButton = document.createElement("button");

        completeButton.textContent = task.completed ? "Undo" : "Complete";

        completeButton.addEventListener("click", function() {
            tasks[index].completed = !tasks[index].completed;

            saveTasks();
            displayTasks();
        });

        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function() {
            tasks.splice(index, 1);

            saveTasks();
            displayTasks();
        });

        listItem.appendChild(taskDetails);
        listItem.appendChild(completeButton);
        listItem.appendChild(deleteButton);

        taskList.appendChild(listItem);
    });

    taskCount.textContent = "Total Tasks: " + tasks.length;

    if (tasks.length === 0) {
        taskList.innerHTML = "<li>No tasks added yet.</li>";
    }
}

displayTasks();
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");

taskForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const title = document.getElementById("taskTitle").value;
    const course = document.getElementById("course").value;
    const dueDate = document.getElementById("dueDate").value;
    const priority = document.getElementById("priority").value;

    const task = {
        title: title,
        course: course,
        dueDate: dueDate,
        priority: priority,
        completed: false
    };

    try {
        const response = await fetch("tasks.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(task)
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
            alert(result.message || "Unable to add task.");
            return;
        }

        tasks.push(task);

        saveTasks();
        displayTasks();

        taskForm.reset();

        alert(result.message);

    } catch (error) {
        console.error("Error:", error);
        alert("Could not connect to the PHP server.");
    }
});

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach(function(task, index) {
        const listItem = document.createElement("li");

        listItem.textContent =
            task.title + " - " +
            task.course + " - Due: " +
            task.dueDate + " - Priority: " +
            task.priority + " ";

        if (task.completed) {
            listItem.style.textDecoration = "line-through";
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
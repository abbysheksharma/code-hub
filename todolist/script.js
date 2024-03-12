function addTask() {
    let input = document.getElementById("taskInput");
    let taskText = input.value.trim();
    let taskList = document.getElementById("taskList");
    let taskCount = taskList.getElementsByTagName("li").length;

    if (taskCount >= 5) {
        alert("Itna kaam acha nahi, pehle purana khatam kar!");
        return; // Stop execution if task count exceeds 10
    }

    if (taskText !== "") {
        let li = document.createElement("li");
        li.textContent = taskText;
        
        // Create delete button
        let deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "&times;"; // Use "x" as the delete icon
        deleteBtn.className = "delete-btn";
        deleteBtn.onclick = function() {
            li.remove(); // Remove the task when the delete button is clicked
        };

        li.appendChild(deleteBtn);
        taskList.appendChild(li);
        input.value = "";
    } else {
        alert("Please enter a task!");
    }
}

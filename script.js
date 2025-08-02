document.addEventListener('DOMContentLoaded', function() {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage when page loads
    loadTasks();

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        storedTasks.forEach(taskText => {
            createTaskElement(taskText, false); // false means don't save to Local Storage again
        });
    }

    // Function to create a task element (separated for reusability)
    function createTaskElement(taskText, saveToStorage = true) {
        // Create new list item
        const listItem = document.createElement('li');
        listItem.dataset.taskText = taskText; // Store task text in data attribute
        
        // Create task text span
        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;
        
        // Create remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';
        
        // Add click event to remove button
        removeButton.addEventListener('click', function() {
            removeTaskFromStorage(taskText);
            taskList.removeChild(listItem);
        });
        
        // Append elements to list item
        listItem.appendChild(taskSpan);
        listItem.appendChild(removeButton);
        
        // Add list item to task list
        taskList.appendChild(listItem);
        
        // Save to Local Storage if needed
        if (saveToStorage) {
            saveTaskToStorage(taskText);
        }
    }

    // Function to save a task to Local Storage
    function saveTaskToStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        if (!storedTasks.includes(taskText)) {
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }
    }

    // Function to remove a task from Local Storage
    function removeTaskFromStorage(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        storedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Function to add a new task
    function addTask() {
        // Get and trim the task text
        const taskText = taskInput.value.trim();
        
        // Check if input is empty
        if (taskText === '') {
            alert('Please enter a task!');
            return;
        }
        
        // Create the task element and save to storage
        createTaskElement(taskText);
        
        // Clear input field
        taskInput.value = '';
        
        // Focus back on input for next task
        taskInput.focus();
    }

    // Event listener for add button click
    addButton.addEventListener('click', addTask);

    // Event listener for Enter key press in input field
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
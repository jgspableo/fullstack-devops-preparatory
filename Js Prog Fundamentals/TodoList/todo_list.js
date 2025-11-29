//Comments by gemini; verified.

// Function to add a new task
function addTask() {
    let taskInput = document.getElementById('taskInput');
    
    // Validation: Check if input is empty
    if (taskInput.value.trim() === '') {
        alert('Please enter a task.');
        return;
    }

    displayTask();

    // Helper function to build the HTML for the task
    function displayTask() {
        const taskList = document.getElementById('taskList');
        
        // Create elements
        const li = document.createElement('li');
        const checkSpan = document.createElement('span');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';

        // 1. Add the list item to the UL
        taskList.appendChild(li);
        
        // 2. Set the text (This clears any existing children of the li, so we do this before adding the checkbox)
        li.textContent = taskInput.value;

        // 3. Assemble the checkbox inside the span
        checkSpan.appendChild(checkbox);
        
        // 4. Insert the checkbox span BEFORE the text content using prepend
        li.prepend(checkSpan);
        
        // Clear input field
        taskInput.value = '';
    }
}

// Function to clear ONLY checked items (Completed tasks)
function clearTask() {
    const listItems = document.querySelectorAll('#taskList li');
    
    listItems.forEach(item => {
        // Find the checkbox strictly inside this specific list item
        const checkbox = item.querySelector('input[type="checkbox"]');
        
        // Conditional Check: Only remove if the box is ticked
        if (checkbox.checked) {
            item.remove();
        }
    });
}

// Function to clear ALL items (Reset the list)
function clearAll() {
    // Select all list items regardless of their state
    const listItems = document.querySelectorAll('#taskList li');
    
    // Remove all list items
    document.getElementById('taskList').innerHTML = '';
}
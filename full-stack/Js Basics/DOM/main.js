//Comments by Gemini

function taskManager() {
    // --- 1. SETUP & CAPTURE ---
    // Get the input box and the main list container (<ul>) from the HTML
    let inputField = document.getElementById("taskInput");
    let list = document.getElementById("todoList");
    
    // Get the text the user typed and remove extra spaces from start/end
    let task = inputField.value.trim();

    // SAFETY CHECK: If the input is empty, stop the function here.
    if (task === "") return; 

    // --- 2. CREATE THE ROW ---
    // Create the main list item (<li>) that will hold everything
    let newTask = document.createElement("li");

    // --- 3. CREATE THE TEXT SAFEGUARD (The Span) ---
    // We put text in a <span> so it is separate from the buttons.
    // This solves the "Edit" issue where buttons might get deleted.
    let textSpan = document.createElement("span");
    textSpan.textContent = task;

    // --- 4. CREATE THE EDIT BUTTON ---
    let editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.className = "edit-btn"; // For CSS styling
    
    // Define what happens when Edit is clicked
    editButton.onclick = () => {
        // Show a popup box. Prefill it with the current text from the span.
        let newTextSpan = prompt("Edit task:", textSpan.textContent);
        
        // Validation: Ensure user didn't click Cancel (null) or type nothing
        if (newTextSpan !== null && newTextSpan.trim() !== "") {
            // Update ONLY the span text. The buttons remain untouched!
            textSpan.textContent = newTextSpan.trim();
        }
    };

    // --- 5. CREATE THE DELETE BUTTON ---
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-btn";
    
    // CLOSURE MAGIC: This function 'remembers' the specific 'newTask' variable
    // created in step 2 and removes only that one from the DOM.
    deleteButton.onclick = () => newTask.remove();

    // --- 6. ASSEMBLY (Putting it all together) ---
    // Add the new empty row to the main list
    list.appendChild(newTask);
    
    // Fill the row with our pieces in specific order: Text, then Edit, then Delete
    newTask.appendChild(textSpan);
    newTask.appendChild(editButton);
    newTask.appendChild(deleteButton);

    // --- 7. CLEANUP ---
    // Clear the input box so the user is ready to type the next task
    inputField.value = "";
}
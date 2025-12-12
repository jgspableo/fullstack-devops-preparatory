// Comments by Gemini AI to explain the code

const employees = [
      { id: 1, name: 'John Doe', age: 30, department: 'IT', salary: 50000, specialization: 'JavaScript' },
      { id: 2, name: 'Alice Smith', age: 28, department: 'HR', salary: 45000, specialization: 'Recruitment' },
      { id: 3, name: 'Bob Johnson', age: 35, department: 'Finance', salary: 60000, specialization: 'Accounting' },
      //... More employee records can be added here
    ];

// Define a function named 'displayEmployees' to show the list of all workers
function displayEmployees() {
    // Create a variable 'totalEmployees' to store the final HTML string
    const totalEmployees = employees
        // Use .map() to iterate over every employee object and transform it into a string
        // The template literal (` `) inserts the ID, Name, Department, and Salary into a paragraph <p> tag
        .map(employee => `<p>${employee.id}: ${employee.name} - ${employee.department} - $${employee.salary}</p>`)
        // Use .join('') to merge the array of strings into one single string, removing the default commas
        .join('');
    
    // specific HTML element with ID 'employeesDetails' and overwrite its content with the new HTML string
    document.getElementById('employeesDetails').innerHTML = totalEmployees;
}

// Define a function to sum up all salary numbers
function calculateTotalSalaries() {
    // Use .reduce() to iterate through the array and accumulate a single value
    // 'acc' is the running total, starting at 0. We add the current employee's salary to it.
    const totalSalaries = employees.reduce((acc, employee) => acc + employee.salary, 0);
    
    // Trigger a browser popup (alert) displaying the final calculated total
    alert(`Total Salaries: $${totalSalaries}`);
}

// Define a function to show only employees working in HR
function displayHREmployees() {
    // Use .filter() to create a new array containing only objects where the department is strictly 'HR'
    const hrEmployees = employees.filter(employee => employee.department === 'HR');
    
    // Map the filtered HR array to HTML strings. 
    // Note: This line puts ${employee.name} twice, so the output will show the name repeated (e.g., "Alice: Alice")
    const hrEmployeesDisplay = hrEmployees.map((employee, index) => `<p>${employee.id}: ${employee.name}: ${employee.name} - ${employee.department} - $${employee.salary}</p>`).join('');
    
    // Locate the 'employeesDetails' div and overwrite its content with the HR list
    document.getElementById('employeesDetails').innerHTML = hrEmployeesDisplay;
}

// Define a function that accepts an ID number to find a specific person
function findEmployeeById(employeeId) {
    // Use .find() to search for the *first* object where the ID matches the passed 'employeeId'
    const foundEmployee = employees.find(employee => employee.id === employeeId);
    
    // Check if foundEmployee is "truthy" (meaning a matching object was successfully found)
    if (foundEmployee) {
        // If found, overwrite the HTML div with that specific employee's details (Names are repeated here too)
        document.getElementById('employeesDetails').innerHTML =`<p>${foundEmployee.id}: ${foundEmployee.name}: ${foundEmployee.name} - ${foundEmployee.department} - $${foundEmployee.salary}</p>`;
        }
    // If foundEmployee is "undefined" (meaning no ID matched), execute this block
    else {
        // Overwrite the HTML div with a plain text error message
        document.getElementById('employeesDetails').innerHTML = 'no employee has been found with this ID';
        }
}

// Define a function that accepts a specialization string to find a specific person
function findEmployeeBySpec(specialization) {
    // Use .find() to search for the *first* object where the specialization matches the passed string
    const foundEmployee = employees.find(employee => employee.specialization === specialization);
    
    // Check if a matching employee object was found
    if (foundEmployee) {
        // If found, display their details in the HTML div (Names are repeated here too)
        document.getElementById('employeesDetails').innerHTML =`<p>${foundEmployee.id}: ${foundEmployee.name}: ${foundEmployee.name} - ${foundEmployee.department} - $${foundEmployee.salary}</p>`;
        }
    // If no match was found
    else {
        // Display a plain text error message in the HTML div
        document.getElementById('employeesDetails').innerHTML = 'no employee has been found with this Specialization';
        }
}
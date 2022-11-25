document.addEventListener('DOMContentLoaded', () => {
    
    // Selectors
    const submit = document.querySelector('#submit');
    const newTask = document.querySelector('#newTask');
    const tellJoke = document.querySelector('#tellJoke')
    
    const taskNumber = document.querySelector('#taskNumber')

    !localStorage.getItem('taskList') ?
    localStorage.setItem('taskList', document.querySelector('#taskList')):

    !localStorage.getItem('taskCount') ? 
    localStorage.setItem('taskCount', 0):
    

    // Set initial taskNumber
    changeTaskCount(0);

    function changeTaskCount(change) {
        let taskCount = Number(localStorage.getItem('taskCount'))
        taskCount += change;
        taskNumber.innerHTML = taskCount;
        localStorage.setItem('taskCount', taskCount);
        console.log(taskCount);
    }
    
    // Submit disabled until something is typed
    submit.disabled = true;

    // Listen for input to be typed in input field
    // If there is input enable button else don't
    newTask.onkeyup = () => {
        newTask.value.length > 0 ? submit.disabled = false:
        submit.disabled = true;
    }


    submit.onclick = addTask;
    
    function addTask() {
        // Find the task the user JUST submitted
        // Note 3
        const task = newTask.value;

        // Create a list item for the new task and add task to it

        const li = makeLi(task);
        
        // Create a delete button
        const removeTask = makeRemove(li);

        // Adds an input to start of list element
        makeCheck(li);

        // Add 1 to taskCount
        changeTaskCount(1);

        // Stop form from submitting
        // Note 4
        return false;
    }


    // AddTask's helper functions

    function makeLi(task) {
        // Disable submit button
        submit.disabled = true;

        // Create a list item for the new task and add task to it
        const li = document.createElement('li');
        li.innerHTML = task;

        // Add the newly created element to unordered list
        taskList.append(li);

        // Clears out input field
        newTask.value = '';

        // Tell console task is made
        console.log('Task Created');

        // Note 1
        return li;
    }

    function makeRemove(li) {
        // Create a delete button
        // Note 2
        const removeTask = document.createElement('button');

        // Puts button inside li at end of list of items in li
        removeTask.innerHTML = 'X';
        li.append(removeTask);

        // When button inside li is clicked this will remove li
        li.querySelector('button').onclick = () => {
            console.log('Delete Clicked');
            li.remove();
            changeTaskCount(-1);
        }

        return removeTask;
    }

    function makeCheck(li) {
        // Create an input element
        const done = document.createElement('input');

        // Make it a checkbox
        done.setAttribute('type', 'checkbox');

        // Add it inside li to the front 
        li.prepend(done);

        // Check state of done using ternary operator
        done.onclick = () => done.checked?console.log('Task Done Set: true'):console.log('Task Done Set: false');
    }


    tellJoke.onclick = joke;

    function joke() {
        fetch('https://v2.jokeapi.dev/joke/Misc,Programming?format=json&safe-mode&type=single')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const theJoke = data.joke;
            alert(theJoke);
        });
        
        return false;
    }
});



// Log (For working through things systematically)
/*
Computational Thinking = 
4 Parts of Computational Thinking

    Decomposition. The first step in computational thinking is decomposition. ...
    Pattern Recognition. Part of computational thinking is also pattern recognition. ...
    Abstraction. Abstraction is the process of extracting the most relevant information from each decomposed problem. ...
    Algorithmic Thinking.


    Making a delete functionality

    Decomp: 
    figure out if delete button clicked
    if clicked pass the 


    Oh it was a run time problem, the code would run once but then
    because the elements weren't created yet the delete function
    had nothing to act on and once they were made it didn't
    get called again

    It needs to be inside the addTask function
*/

/* Notes

1: Otherwise text just stays there

2: Wouldn't let me name it delete

3: This must be in the add task function
    and not outside with the selectors
    or it will get the value from when page
    first loads which is empty string rather 
    than getting the 
    newly typed value for NewTask

4: This must be here or the default action
    of button will activate and page will reload or if
    an action is specified button 
    will take u to different page
    both of which mean my hard written code gets reset
    UNLESS I save it in Local Storage

*/
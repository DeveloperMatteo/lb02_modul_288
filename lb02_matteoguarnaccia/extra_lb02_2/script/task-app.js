'use strict'

//get task list as JSON-object format
let tasks = getSavedTasks();


const filters = {
    searchText: '',
    hideCompleted: false
}


renderTasks(tasks, filters);



document.querySelector('#search-text')
    .addEventListener('input', (e) => {

        filters.searchText = e.target.value;

        renderTasks(tasks, filters);
    })



document.querySelector('#new-task')
    .addEventListener('submit', (e) => {
        e.preventDefault()

        //add new task with push-method into JSON-object
        tasks.push({
            id: uuidv4(),
            text: e.target.elements.text.value,
            completed: false
        });


        saveTasks(tasks);

        renderTasks(tasks, filters);
        e.target.elements.text.value = '';
    })

document.querySelector('#hide-completed')
    .addEventListener('change', (e) => {

        filters.hideCompleted = e.target.checked;

        renderTasks(tasks, filters);
    })
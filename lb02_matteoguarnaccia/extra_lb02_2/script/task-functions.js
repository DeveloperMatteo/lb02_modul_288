'use strict'

// Fetch existing tasks from localStorage
const getSavedTasks = () => {
    //read from browser storage
    const tasksJSON = localStorage.getItem('tasks');

    try {
        if (tasksJSON) {
            return JSON.parse(tasksJSON);
        } else {
            return [];
        }
    } catch (e) {
        return [];
    }
}

// Save tasks to localStorage
const saveTasks = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove task by id
const removeTask = (id) => {
    const taskIndex = tasks
        .findIndex((task) => task.id === id);

    if (taskIndex > -1) {
        tasks.splice(taskIndex, 1);
    }
}

// Toggle the completed value for a given task
const toggleTask = (id) => {
    const task = tasks
        .find((task) => task.id === id);

    if (task) {
        task.completed = !task.completed;
    }
}

// Render application tasks based on filters
const renderTasks = (tasks, filters) => {
    const filteredTasks = tasks.filter((task) => {
        const searchTextMatch = task.text
            .toLowerCase()
            .includes(filters.searchText.toLowerCase());

        const hideCompletedMatch = !filters.hideCompleted || !task.completed;
        return searchTextMatch && hideCompletedMatch;
    })

    const incompleteTasks = filteredTasks
        .filter((task) => !task.completed);

    document.querySelector('#tasks').innerHTML = '';
    document.querySelector('#tasks')
        .appendChild(generateSummaryDOM(incompleteTasks));

    filteredTasks.forEach((task) => {
        document.querySelector('#tasks')
            .appendChild(generateTaskDOM(task));
    })
}

// Get the DOM elements for an individual note
const generateTaskDOM = (task) => {
    const taskEl = document.createElement('div');
    const checkbox = document.createElement('input');
    const taskText = document.createElement('span');
    const removeButton = document.createElement('button');

    checkbox.setAttribute('type', 'checkbox')
    checkbox.checked = task.completed;
    taskEl.appendChild(checkbox);
    checkbox.addEventListener('change', () => {
        toggleTask(task.id);
        saveTasks(tasks);
        renderTasks(tasks, filters);
    })

    // Setup the task text
    taskText.textContent = task.text;
    taskEl.appendChild(taskText);

    // Setup the remove button
    removeButton.innerHTML = '<img src="img/delete_button.png" >';
    taskEl.appendChild(removeButton);
    removeButton.addEventListener('click', () => {
        removeTask(task.id);
        saveTasks(tasks);
        renderTasks(tasks, filters);
    });

    return taskEl;
}



// Get the DOM elements for list summary
const generateSummaryDOM = (incompleteTasks) => {
    const summary = document.createElement('h2');
    summary.textContent = `Du hast noch ${incompleteTasks.length} Aufgaben übrig.`;
    return summary;
}

        showTasks();

        const form = document.getElementById('add-task-form');

        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const taskInputElement = document.getElementById('task-input');
            const taskInputValue = taskInputElement.value;
            const error = document.getElementById('error-form');

            taskInputElement.classList.remove('invalid-input');
            error.innerText = '';

            if (taskInputValue == '' || taskInputValue === undefined) {
                taskInputElement.classList.add('invalid-input');
                error.innerText = 'The task input field is empty';
            } else {
                taskInputElement.value = '';
                let localTasks = JSON.parse(localStorage.getItem('tasks'));
                let tasksList = [];
// console.log(localTasks);
                if (localTasks) {
                    tasksList = localTasks;
                } else {
                    tasksList = [];
                }

                tasksList.push(taskInputValue);

                localStorage.setItem('tasks', JSON.stringify(tasksList));

                showTasks();

            }

        });

        function showTasks() {
            const tasksContainer = document.getElementById('tasks-container');
            let localTasks = JSON.parse(localStorage.getItem('tasks'));
            let taskOutputElement = '';

            if (localTasks) {
                localTasks.forEach(function (value, index) {
                    taskOutputElement += `<div class="input-group rounded" id="task-${index}" style="border: 1px solid #ccc;">
                    <input type="text" class="form-control fs-2" id="input-${index}" value="${value}"readonly>
                    <button class="btn btn-outline-info" onclick="editTask(${index})" id="edit-${index}">Edit</button>
                    <button class="btn btn-outline-danger mx-auto" onclick="deleteTask(${index})" id="delete-${index}">Delete</button></div>
                    <p id="error-tasks-${index}"></p>`;
                });

                tasksContainer.innerHTML = taskOutputElement;
            }
        }

        function editTask(index) {

            const inputElement = document.getElementById('input-' + index);
            const btnEditElement = document.getElementById('edit-' + index);

            if (btnEditElement.innerText.toLowerCase() == 'edit') {
                inputElement.removeAttribute('readonly');
                inputElement.style.border = '1px solid #ccc';
                btnEditElement.innerText = 'Save';
                errorTasks = document.getElementById('error-tasks-' + index);


            } else {
                errorTasks.classList.remove('invalid-input');
                errorTasks.innerText = "";

            
                if (inputElement.value == '' || inputElement.value === undefined) {
                    inputElement.style.border = '1px solid red';
                    errorTasks.innerText = "Empty!"
                    errorTasks.classList.add('invalid-input');
                } else {
                    inputElement.setAttribute('readonly', 'readonly');
                    inputElement.style.border = 'none';
                    btnEditElement.innerText = 'Edit';
                }
            }

            let localTasks = JSON.parse(localStorage.getItem('tasks'));
            localTasks[index] = inputElement.value;
            localStorage.setItem('tasks', JSON.stringify(localTasks));
        }

        function deleteTask(index) {

            let localTasks = JSON.parse(localStorage.getItem('tasks'));
            localTasks.splice(index, 1);
            if (localTasks.length != 0) {
                localStorage.setItem('tasks', JSON.stringify(localTasks));
            } else {
                localStorage.removeItem('tasks');
            }


            showTasks();
        }
    
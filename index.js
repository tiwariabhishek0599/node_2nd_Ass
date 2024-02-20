const fs = require('fs');
const path = require('path');
const readline = require('readline');

const FILE_PATH = path.join(__dirname, 'tasks.txt');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function addTask(task) {
  fs.appendFileSync(FILE_PATH, ` ${task}\n`);
}

function viewTasks() {
  const tasks = fs.readFileSync(FILE_PATH, 'utf8').split('\n').filter(Boolean);
  console.log('Tasks:');
  tasks.forEach((task, index) => console.log(`${index+1}.${task}`));
}

function markTaskComplete(index) {
  const tasks = fs.readFileSync(FILE_PATH, 'utf8').split('\n').filter(Boolean);
  if (index >= 1 && index <= tasks.length) {
    tasks[index - 1] += ' - Completed';
    fs.writeFileSync(FILE_PATH, tasks.join('\n'));
    console.log('Task marked as complete.');
  } else {
    console.log('Invalid task index.');
  }
}

function removeTask(index) {
  const tasks = fs.readFileSync(FILE_PATH, 'utf8').split('\n').filter(Boolean);
  if (index >= 1 && index <= tasks.length) {
    tasks.splice(index - 1, 1);
    fs.writeFileSync(FILE_PATH, tasks.join('\n'));
    console.log('Task removed successfully.');
  } else {
    console.log('Invalid task index.');
  }
}

rl.question('Select an operation:\n1. Add a new task\n2. View tasks\n3. Mark a task as complete\n4. Remove a task\n', (answer) => {
  switch (answer) {
    case '1':
      rl.question('Enter the task: ', (task) => {
        addTask(task);
        console.log('Task added successfully.');
        rl.close();
      });
      break;
    case '2':
      viewTasks();
      rl.close();
      break;
    case '3':
      rl.question('Enter the index of the task to mark as complete: ', (index) => {
        markTaskComplete(parseInt(index));
        rl.close();
      });
      break;
    case '4':
      rl.question('Enter the index of the task to remove: ', (index) => {
        removeTask(parseInt(index));
        rl.close();
      });
      break;
    default:
      console.log('Invalid operation.');
      rl.close();
  }
});
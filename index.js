const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let tasklist = [];

const addTask = (tasklist, description) => {
    tasklist.push({
        done: false,
        description: description
    });
}

const printTasklist = (tasklist) => {
    for (let i = 0; i < tasklist.length; i++) {
        if (tasklist[i].done) {
            console.log(`${i+1}. [X] ${tasklist[i].description}`);
        } else {
            console.log(`${i + 1}. [ ] ${tasklist[i].description}`);
        }
    }
}

const removeTask = (tasklist, index) => {
    if (index >= 0 && index < tasklist.length) {
        tasklist.splice(index, 1);
    } else {
        console.log('Invalid Task Number');
    }
}

// Add tasks to the tasklist
const add = (tasklist) => {
    if (tasklist.length === 0) {
        console.log("There's no tasks yet.");
    } else {
        console.log('The actual tasklist is: ');
        printTasklist(tasklist);
    }

    rl.question('Add a new task: (Type "Help" in order to see instructions) ', (description) => {
        description = description.toUpperCase().slice(0, 1) + description.toLocaleLowerCase().slice(1);

        switch (description) {
            case 'Help':
                console.log(`Instructions:
                1. To review the tasklist type "Review"; 
                2. To start checking done tasks type "Finish".
                3. To start over the list from scratch type "Remake".
                4. To remove a task from the list type "Remove".
                5. To exit the program type "Exit".
                
                NOTE: The program is not case-sensitive, so you can type as you please! ☺`);
                add(tasklist);
                break;
            case 'Review':
                add(tasklist);
                break;
            case 'Finish':
                if (tasklist.length === 0) {
                    add(tasklist);
                } else {
                    console.log('Switching mode to "check mode"...');
                    check(tasklist);
                }
                break;
            case 'Remake':
                if (tasklist.length === 0) {
                    add(tasklist);
                } else {
                    printTasklist(tasklist);
                    rl.question('Are you sure deleting the entire list content? (Y/N) ', (option) => {
                        option = option.toUpperCase();
                        switch (option) {
                            case 'Y':
                                tasklist = [];
                                add(tasklist);
                                break;
                            case 'N':
                                console.log('Returning to the tasklist view...');
                                add(tasklist);
                                break;
                            default:
                                console.log('Invalid Option');
                                add(tasklist);
                        }
                    });
                }
                break;
            case 'Remove':
                if (tasklist.length === 0) {
                    add(tasklist);
                } else {
                    printTasklist(tasklist);
                    rl.question('Type the number of the task you want to remove: ', (description) => {
                        rl.question('Are you sure removing the task? (Y/N) ', (option) => {
                            option = option.toUpperCase();
                            switch (option) {
                                case 'Y':
                                    checkTaskDone(tasklist, description - 1);
                                    masrkAsDone(tasklist, description - 1);
                                    if (checkAllDone(tasklist)) {
                                        console.log('Congrats! All tasks are done. Good job! ☺');
                                        rl.close();
                                    } else {
                                        add(tasklist);
                                    }
                                    break;
                                case 'N':
                                    console.log('Returning to the tasklist view...');
                                    add(tasklist);
                                    break;
                                default:
                                    console.log('Invalid Option');
                                    add(tasklist);
                            }
                        });
                    });
                }
                break;
            case 'Exit':
                console.log('Bye bye! ☺');
                rl.close();
                break;
            default:
                addTask(tasklist, description);
                add(tasklist);
        }
    });
}

const masrkAsDone = (tasklist, index) => {
    if (index >= 0 && index < tasklist.length) {
        tasklist[index].done = true;
    } else {
        console.log('Invalid Task Number');
    }
}

const checkTaskDone = (tasklist, index) => {
    if (index >= 0 && index < tasklist.length) {
        if (!tasklist[index].done) {
            removeTask(tasklist, index);
        } else {
            console.log('You cannot remove a task when is done.');
            add(tasklist);
        }
    } else {
        console.log('Invalid Task Number');
    }
}

const checkAllDone = (tasklist) => {
    for (let task of tasklist) {
        if (!task.done) return false;
    }
    return true;
}

//Check tasks as done to the tasklist
const check = (tasklist) => {
    console.log('The actual tasklist is: ');
    printTasklist(tasklist);
    rl.question('Check the task already done: (Type "Help" in order to see instructions) ', (option) => {
        option = option.toUpperCase().slice(0, 1) + option.toLocaleLowerCase().slice(1);

        switch (option) {
            case 'Help':
                console.log(`Instructions:
                1. To review the tasklist type "Review";
                2. To add more tasks type "Finish".
                2. To start over the list from scratch type "Remake".
                5. To exit the program type "Exit".
                
                NOTE: The program is not case-sensitive, so you can type as you please! ☺`);
                check(tasklist);
                break;
            case 'Review':
                check(tasklist);
                break;
            case 'Finish':
                console.log('Switching mode to "add mode"...');
                add(tasklist);
                break;
            case 'Remake':
                if (tasklist.length === 0) {
                    check(tasklist);
                } else {
                    printTasklist(tasklist);
                    rl.question('Are you sure deleting the entire list content? (Y/N) ', (option) => {
                        option = option.toUpperCase();
                        switch (option) {
                            case 'Y':
                                tasklist = [];
                                check(tasklist);
                                break;
                            case 'N':
                                console.log('Returning to the tasklist view...');
                                check(tasklist);
                                break;
                            default:
                                console.log('Invalid Option');
                                check(tasklist);
                        }
                    });
                }
            case 'Exit':
                console.log('Bye bye! ☺');
                rl.close();
                break;
            default:
                masrkAsDone(tasklist, option - 1);
                if (checkAllDone(tasklist)) {
                    console.log('Congrats! All tasks are done. Good job! ☺');
                    rl.close();
                } else {
                    check(tasklist);
                }
        }
    });
}

add(tasklist);
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let team = [];

getInfo()

function getInfo() {
    inquirer.prompt([
        {
            type: "list",
            name: "role",
            message: "Select employee role",
            choices: ["Intern", "Engineer", "Manager"]
        },
        {
            type: "input",
            name: "name",
            message: `Employee's name:`
        },
        {
            type: "input",
            name: "id",
            message: "Employee's ID#:"
        },
        {
            type: "input",
            name: "email",
            message: "Employee's email address:"
        },
        {
            type: "input",
            name: "school",
            message: "Name of intern's school:",
            when: (answers) => { return answers.role === "Intern" }
        },
        {
            type: "input",
            name: "github",
            message: "Engineer's GitHub username:",
            when: (answers) => { return answers.role === "Engineer" }
        },
        {
            type: "input",
            name: "officeNumber",
            message: "Manager's office number:",
            when: (answers) => { return answers.role === "Manager" }
        },
        {
            type: "confirm",
            name: "newEmployee",
            message: "Add another employee?"
        }
    ]).then((answers) => {
        // Add employee to team
        const newEmployee = createObjFromClass(answers)
        team.push(newEmployee);

        // Handle add'l employees
        if (answers.newEmployee) getInfo();
        else {
            // If team has manager, render html & write file
            const managers = team.filter(obj => { return obj.getRole() === "Manager" });
            if (managers[0]) {
                const teamHTML = render(team);
                fs.writeFile(outputPath, teamHTML, (err) => { if (err) throw err })
            } else {
                console.log("ERROR: Team must include a manager! Please add one now.");
                getInfo()
            };
        }
    })
}

function createObjFromClass(obj) {
    let newEmployee;
    if (obj.role === "Manager") {
        newEmployee = new Manager(obj.name, obj.id, obj.email, obj.officeNumber)
    } else if (obj.role === "Engineer") {
        newEmployee = new Engineer(obj.name, obj.id, obj.email, obj.github)
    } else if (obj.role === "Intern") {
        newEmployee = new Intern(obj.name, obj.id, obj.email, obj.school)
    }
    return newEmployee;
}

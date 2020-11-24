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
let checkManager = false;

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
            message: "Name of employee's school:",
            when: (answers) => { return (answers.role === "Intern") }
        },
        {
            type: "input",
            name: "github",
            message: "Employee's GitHub username:",
            when: (answers) => { return (answers.role === "Engineer") }
        },
        {
            type: "input",
            name: "officeNumber",
            message: "Manager's office number:",
            when: (answers) => { return (answers.role === "Manager") }
        },
        {
            type: "confirm",
            name: "newEmployee",
            message: "Add another employee?"
        }
    ]).then((answers) => {

        if (answers.role === "Manager") checkManager = true;
        // Add employee to team
        team.push(answers);
        // Handle add'l employees
        if (answers.newEmployee) getInfo();
        else {
            // Check for manager & output team
            (!checkManager) ? (
                console.log("ERROR: Team must include a manager! Please add one now."),
                getInfo()
            ) : console.log(team)

            // After the user has input all employees desired, call the `render` function (required
            // above) and pass in an array containing all employee objects; the `render` function will
            // generate and return a block of HTML including templated divs for each employee!
        }
    })
}

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above to target this location.
// HINT: you may need to check if the `output` folder exists and create it if it
// does not.

// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
import Employee from "Employee";

class Manager extends Employee {
    constructor(officeNumber) {
        this.officeNumber = officeNumber
    }
    getRole() {
        return "Manager"
    }
}

export default Manager
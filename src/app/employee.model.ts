
//insead of creating this variable at multiple components (add & edit) we create it in a modal and import the model wherever it is required
export class EmployeeModal {

    id?: string 
    username?: string
    email?: string 
    status?: string
    password?:string
}
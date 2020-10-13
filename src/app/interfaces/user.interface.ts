export interface UserData{
    firstName:string,
    lastName:string,
    dof:Date,
    email:string,
    skills?:Array<any>
}

export interface UserForm{
    firstName:string,
    lastName:string,
    dof:Date,
    email:string,
    password:string,
    confirmPassword:string
}
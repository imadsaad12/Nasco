const mongoose=require('mongoose')
const employeeSchema=new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
    },
    image:{
        type:String,
    },
    jobTitle:{
        type:String,
    },
    department:{
        type:String,
    },
})

const EmployeeSchema=mongoose.model('Employees',employeeSchema)
module.exports=EmployeeSchema
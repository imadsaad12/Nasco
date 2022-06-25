const express=require('express')
const mongoose=require('mongoose')
const app=express()
const cors=require('cors')
const Employees = require('./models/Employee')
app.use(cors())
app.use(express.json())
mongoose.connect('mongodb+srv://mydb:93928@cluster0.g0he0.mongodb.net/Nasco?retryWrites=true&w=majority')
.then(()=>app.listen(4000,()=>console.log('serevr runnig on port 4000 . . ')))
.catch(err=>console.log(err))

app.get('/employee',async(req,res)=>{
    try {
        const {page,size}=req.query
        const pageNum=Number(page)
        const pageSize=Number(size)
        const totalDocs=await Employees.countDocuments()
        const totalPages=Math.ceil(totalDocs/pageSize)
        let employees=[];
        if(pageNum===1){
            employees=await Employees.find().limit(pageSize)
        }else{
            const skips=pageSize*(pageNum - 1)
            employees=await Employees.find().skip(skips).limit(pageSize)
        }
        res.json({employees,totalPages})
    } catch (error) {
        res.send("err")
    }
})
app.get('/employee/:id',async(req,res)=>{
    try {
        const id=req.params.id
        const employees=await Employees.findOne({_id:id});
        res.json(employees)
    } catch (error) {
        res.send("err")
    }
})
app.post('/employee',async(req,res)=>{
    try {
        const data=req.body
        const newEmployee=new Employees(data);
         newEmployee.save().then(r=>{
             res.send("created")
         })
         .catch(err=>{
            console.log(err)
         })
    } catch (error) {
        console.log(error)
    }
})
app.put('/employee/:id',async(req,res)=>{
    try {
        const {id}=req.params
        const data=req.body
        await Employees.findByIdAndUpdate({_id:id},{
            name:data.name,
            email:data.email,
            image:data.image,
            department:data.department,
            jobTitle:data.jobTitle
        })
        res.send("done")
    } catch (error) {
        res.send("err")
    }
})
app.delete('/employee/:id',async(req,res)=>{
    try {
        const id=req.params.id
        await Employees.findByIdAndDelete({_id:id})
        res.send("done")
    } catch (error) {
        res.send("err")
    }
})
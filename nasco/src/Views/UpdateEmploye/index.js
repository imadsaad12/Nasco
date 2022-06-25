import { TextField ,makeStyles, Button} from '@material-ui/core';
import axios from 'axios';
import React, { useState ,useEffect} from 'react';
import { useNavigate, useParams } from 'react-router';
const useStyles=makeStyles({
    root:{
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        marginTop:"5%"
    },
    inpt:{
        width:"50%",
        marginBottom:"1%"
    }
})
const Index = () => {
    const classes=useStyles()
    const [form, setform] = useState({});
    const {id}=useParams()
    const navigate=useNavigate()
    useEffect(() => {
       axios.get(`http://localhost:4000/employee/${id}`)
       .then(res=>{
        setform(res.data)
       })
       .catch(err=>{
        console.log(err)
       })
    }, []);

    const handleChange=(e)=>{
        const {name,value}=e.target
        setform({...form,[name]:value})
    }
    const handleSubmit=()=>{
        axios.put(`http://localhost:4000/employee/${form._id}`,form)
        .then(res=>{
            navigate({pathname:'/'})
        })
        .catch(err=>{
            console.log(err)
        })
    }
    return (
        <div className={classes.root}>
            <h1>Update Employe</h1>
            <TextField color='primary' value={form.name} name="name" variant='outlined' className={classes.inpt} placeholder="Name" onChange={handleChange}/>
            <TextField color='primary' value={form.email} name="email" variant='outlined' className={classes.inpt} placeholder="Email"onChange={handleChange}/>
            <TextField color='primary' value={form.image} name="image" variant='outlined' className={classes.inpt} placeholder="Image source" onChange={handleChange}/>
            <TextField color='primary' value={form.jobTitle} name="jobTitle" variant='outlined' className={classes.inpt} placeholder="job Title" onChange={handleChange}/>
            <TextField color='primary' value={form.department} name="department" variant='outlined' className={classes.inpt} placeholder="Department" onChange={handleChange}/>
          <Button color='primary' variant='contained'  onClick={handleSubmit} style={{width:"20%"}}>Update</Button>
        </div>
    );
}

export default Index;

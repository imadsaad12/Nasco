import { TextField, makeStyles, Button } from "@material-ui/core";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "5%",
  },
  inpt: {
    width: "50%",
    marginBottom: "1%",
  },
});
const INITIAL_STATE = {
  name: "",
  email: "",
  image: "",
  jobTitle: "",
  department: "",
};
const Index = () => {
  const classes = useStyles();
  const [form, setform] = useState(INITIAL_STATE);
  const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate();
  // handle all the fields in one function by refering to the field dynamically by it's name
  const handleChange = (e) => {
    const { name, value } = e.target;
    setform({ ...form, [name]: value });
  };

  //keep checking the value of the fields to change the state of button
  useEffect(() => {
    setTimeout(() => {
      const isValid = Object.values(form).every((el) => Boolean(el));
      isValid ? setDisabled(false) : setDisabled(true);
    }, 500);
  });
  // submit the form and navigate to home page when success
  const handleSubmit = () => {
    axios
      .post("http://localhost:4000/employee", form)
      .then((res) => {
        navigate({ pathname: "/" });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className={classes.root}>
      <h1>Create Employe</h1>
      <TextField
        color="primary"
        inputProps={{
          "data-testid": "name",
        }}
        name="name"
        variant="outlined"
        className={classes.inpt}
        label="Name"
        onChange={handleChange}
      />
      <TextField
        color="primary"
        name="email"
        variant="outlined"
        inputProps={{
            "data-testid": "email",
          }}
        className={classes.inpt}
        label="Email"
        onChange={handleChange}
      />
      <TextField
        color="primary"
        name="image"
        variant="outlined"
        inputProps={{
            "data-testid": "image",
          }}
        className={classes.inpt}
        label="Image source"
        onChange={handleChange}
      />
      <TextField
        color="primary"
        inputProps={{
            "data-testid": "jobTitle",
          }}
        name="jobTitle"
        variant="outlined"
        className={classes.inpt}
        label="job Title"
        onChange={handleChange}
      />
      <TextField
        color="primary"
        name="department"
        variant="outlined"
        inputProps={{
            "data-testid": "department",
          }}
        className={classes.inpt}
        label="Department"
        onChange={handleChange}
      />
      <Button
        color="primary"
        variant="contained"
        disabled={disabled}
        onClick={handleSubmit}
        style={{ width: "20%" }}
      >
        Create
      </Button>
    </div>
  );
};

export default Index;

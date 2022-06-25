import React,{useState} from "react";
import { makeStyles, TextField, Button } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
  },
  inpt: {
    width: "300px",
  },
  search:{
    marginTop:"6%",
    marginLeft:"2%"
  }
});
const Index = ({setSearch}) => {
  const classes = useStyles();
  // handle the input change
  const handleChange=(e)=>{
    const {value}=e.target;
    setSearch(value)
  }
  return (
    <div className={classes.root}>
      
      <TextField
        className={classes.inpt}
        variant={"outlined"}
        color={"primary"}
        onChange={handleChange}
        placeholder="search by Name, Dep, Email . . ."
      />
        <SearchIcon className={classes.search} />
    </div>
  );
};

export default Index;

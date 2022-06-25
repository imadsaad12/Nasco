import React, { useEffect, useState } from "react";
import { makeStyles, Button, CircularProgress } from "@material-ui/core";
import Search from "./Search/index";
import EmployeTable from "./Table/index";
import axios from "axios";
import { useNavigate } from "react-router";
const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "5%",
  },
  spinner: {
    marginTop: "10%",
    marginBottom: "10%",
  },
});

const Index = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [employees, setemployees] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setloading] = useState(false);
  const [isDeleteing, setIsDeleting] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setsearch] = useState("");

  //fetching 5 employees per page
  useEffect(() => {
    setloading(true);
    axios
      .get(`http://localhost:4000/employee/?size=4&page=${page}`)
      .then((res) => {
        setemployees(res.data.employees);
        setTotalPages(res.data.totalPages);
        setloading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [page, isDeleteing]);

  // search as you type with 0.5 sec delay for better performance
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      axios
        .get("http://localhost:4000/employee")
        .then((res) => {
          // filter target fields and check if they matchs the search text
          const result = res.data.employees.filter(
            (i) =>
              i.name.toLowerCase().startsWith(search.toLowerCase()) ||
              i.email.toLowerCase().startsWith(search.toLowerCase()) ||
              i.department.toLowerCase().startsWith(search.toLowerCase()) ||
              i.jobTitle.toLowerCase().startsWith(search.toLowerCase())
          );
          setemployees(result);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 0.5);
    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  return (
    <div className={classes.root}>
      <Search setSearch={setsearch} />
      {loading ? (
        <CircularProgress
          color="primary"
          size={90}
          className={classes.spinner}
        />
      ) : (
        <EmployeTable
          data={employees}
          setPage={setPage}
          page={page}
          isDeleteing={isDeleteing}
          setIsDeleting={setIsDeleting}
          totalPages={totalPages}
        />
      )}
      <Button
        color="primary"
        variant="contained"
        onClick={() => navigate({ pathname: "/create" })}
      >
        Create
      </Button>
    </div>
  );
};

export default Index;

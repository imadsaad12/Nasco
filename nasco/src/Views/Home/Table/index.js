import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  makeStyles,
  TableFooter,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import axios from "axios";
import { useNavigate } from "react-router";
const useStyles = makeStyles({
  root: {
    marginTop: "5%",
    width: "60%",
  },
  pagination: {
    marginTop: "3%",
  },
  spinner: {
    marginTop: "10%",
    marginBottom: "10%",
  },
});

const Index = ({ data, page, setPage, setIsDeleting, isDeleting, totalPages }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    //send delete request and show loading spinner until it finish
    try {
      setIsDeleting(true);
      await axios.delete(`http://localhost:4000/employee/${id}`);
      setIsDeleting(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={classes.root}>
      {isDeleting ? (
       <CircularProgress
       color="primary"
       size={90}
       className={classes.spinner}
     />
      ) : (
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Picture</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Operations</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((i, index) => {
              return (
                <TableRow key={index}>
                  <TableCell align="center">
                    <img
                      src={i.image}
                      style={{ width: "80px", height: "80px" }}
                    />
                  </TableCell>
                  <TableCell align="right">{i.name}</TableCell>

                  <TableCell align="right">{i.email}</TableCell>
                  <TableCell align="right">
                    <Button
                      color="secondary"
                      variant="contained"
                      onClick={() => handleDelete(i._id)}
                    >
                      Delete
                    </Button>
                    <Button
                      color="default"
                      variant="contained"
                      onClick={() =>{ navigate({ pathname: `/employee/${i._id}` })}}
                    >
                      Update
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <div className={classes.pagination}>
                <Pagination
                  page={page}
                  onChange={(e, pageNb) => setPage(pageNb)}
                  count={totalPages}
                  color={"primary"}
                />
              </div>
            </TableRow>
          </TableFooter>
        </Table>
      )}
    </div>
  );
};

export default Index;

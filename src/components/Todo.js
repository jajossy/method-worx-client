import React, { useEffect, useState } from "react";
import useStateContext from "../hooks/useStateContext";
import { Box, Fab, Paper, TextField } from "@mui/material";
import { NoteAddOutlined } from "@mui/icons-material";
import TodoItem from "./TodoItem";
import useForm from "../hooks/useForm";
import { ENDPOINTS, createAPIEndpoint } from "../api";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const todoModel = () => ({
  description: "",
  todoDate: new Date(),
  userId: "",
});

export default function Todo() {
  const { context, setContext } = useStateContext();

  const [editValue, setEditValue] = useState(false);
  const [value, setValue] = useState(dayjs(new Date()));

  //const [addItem, setItem] = useState("");
  //const {itemsAdded, displayItem} = useState([]);

  // const enterItem =(event) => {
  //     // the value changed in textfield
  //     setItem(event.target.value)
  //     console.log(addItem)
  // }
  // const display = () => {
  //     // now when we click the button, you need to insert the item
  //     // displayItem((olditems) => {
  //     //     return [...olditems,addItem]
  //     // })
  //     // setItem("")
  //     console.log(values)
  // }

  const editItem = (todo) => {
    console.log(todo);
    // createAPIEndpoint(ENDPOINTS.todo)
    //   .put(todo)
    //   .then((res) => {
    //     getTodo();
    //     setEditValue(false);
    //   })
    //   .catch((err) => console.log(err));
  };

  const deleteItem = (id) => {
    createAPIEndpoint(ENDPOINTS.todo)
      .delete(id)
      .then((res) => {
        getTodo();
      });
  };

  const [data, setData] = useState([]);

  const getTodo = () => {
    // if (localStorage.getItem("userId") == undefined) {
    //   localStorage.setItem("userId", context.userId);
    // }

    // createAPIEndpoint(ENDPOINTS.todo)
    //   .fetch()
    //   .then((res) => {
    //     //console.log(res);
    //     setData(res.data);
    //     console.log(context);
    //   });
    createAPIEndpoint(ENDPOINTS.todo)
      .fetchById(context.userId)
      .then((res) => {
        //console.log(res);
        setData(res.data);
        console.log(context);
      });
  };

  const addTodo = (e) => {
    values.todoDate = value.$d;
    values.userId = context.userId;
    e.preventDefault();
    //if(validate())
    createAPIEndpoint(ENDPOINTS.todo)
      .post(values)
      .then((res) => {
        console.log(res);
        getTodo();
        values.description = "";
      })
      .catch((err) => console.log(err));
  };

  const { values, setValues, errors, setErrors, handleInputChange } =
    useForm(todoModel);

  const validate = () => {
    let temp = {};
    temp.description = values.description != "" ? "" : "This field is required";
    //temp.todoDate = values.todoDate != ""?"":"This field is required"
    setErrors(temp);
    return Object.values(temp).every((x) => x == "");
  };

  useEffect(() => {
    getTodo();
  }, []);

  //console.log(values);

  return (
    <>
      <Paper
        elevation={7}
        style={{
          padding: "20px",
          paddingTop: "1px",
          minHeight: "100vh",
          margin: "0px",
        }}
      >
        <h1
          style={{
            backgroundColor: "#7e57c2",
            color: "white",
            fontSize: "30px",
            textAlign: "center",
            padding: "20px",
            fontFamily: "sans-serif",
          }}
        >
          Todo List
        </h1>
        <br />
        <Box display="flex" justifyContent="center">
          <form noValidate autoComplete="off">
            <TextField
              style={{ marginRight: "5px" }}
              label="Enter Note"
              name="description"
              onChange={handleInputChange}
              value={values.description}
              variant="outlined"
              {...(errors.description && {
                error: true,
                helperText: errors.description,
              })}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Todo date"
                value={value}
                onChange={(newValue) => setValue(newValue)}
              />
            </LocalizationProvider>
            &nbsp;&nbsp;
            <Fab
              style={{ backgroundColor: "#7e57c2", color: "white" }}
              aria-label="add"
              onClick={addTodo}
            >
              <NoteAddOutlined />
            </Fab>
          </form>
        </Box>
        <br />
        <ol>
          {data.map((addedItem, index) => (
            <TodoItem
              key={index}
              id={index}
              onDelete={deleteItem}
              editItem={editItem}
              addedItem={addedItem}
              values={values}
              getTodo={getTodo}
            />
          ))}
        </ol>
      </Paper>
    </>
  );
}

import {
  CheckOutlined,
  DeleteForeverOutlined,
  EditOutlined,
  SaveAsOutlined,
} from "@mui/icons-material";
import { Box, Fab, Paper, TextField } from "@mui/material";
import React, { useState } from "react";
import useForm from "../hooks/useForm";
import moment from "moment";
import { ENDPOINTS, createAPIEndpoint } from "../api";

const todoModel = () => ({
  description: "",
  todoDate: new Date(),
});

const TodoItem = ({ valuesField, addedItem, onDelete, getTodo }) => {
  const [updatedValue, setUpdatedValue] = useState(addedItem.description);
  //const [updatedValue2, setUpdatedValue2] = useState("", "");
  const [editValue, setEditValue] = useState(false);
  const [editBool, setEditBool] = useState(false);
  const [line, setLine] = useState(false);

  const [editParam, setEditParam] = useState({
    description: "",
    todoId: addedItem.todoId,
  });

  const onLine = () => {
    setLine(true);
  };

  const onEdit = () => {
    setEditBool(true);
  };

  const editItem = (todo) => {
    editParam.description = todo;
    setEditValue(false);
    //if (validate())
    createAPIEndpoint(ENDPOINTS.todo)
      .put(editParam)
      .then((res) => {
        getTodo();
        setEditValue(false);
      })
      .catch((err) => console.log(err));
  };

  const doneItem = () => {
    console.log(addedItem.todoId);
    //if (validate())
    createAPIEndpoint(ENDPOINTS.todo)
      .putById(addedItem.todoId)
      .then((res) => {
        getTodo();
        setEditValue(false);
      })
      .catch((err) => console.log(err));
  };

  const { values, setValues, errors, setErrors, handleInputChange } =
    useForm(todoModel);

  return (
    <>
      <Paper
        display="flex"
        elevation={7}
        style={{
          padding: "30px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        {/* <form noValidate autoComplete="off">
          <TextField
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
        </form> */}
        {editValue ? (
          <form noValidate autoComplete="off">
            <TextField
              style={{ width: "150%" }}
              label="Edit Note"
              name="description"
              onChange={(e) => setUpdatedValue(e.target.value)}
              value={updatedValue}
              variant="outlined"
              {...(errors.description && {
                error: true,
                helperText: errors.description,
              })}
            />
          </form>
        ) : (
          <Box p={1}>
            <span
              contentEditable={editBool}
              style={{
                textDecoration: addedItem.isDone ? "line-through" : "none",
                fontSize: "20px",
                padding: "10px",
              }}
            >
              {addedItem.description} -{" "}
              {moment(addedItem.todoDate).format("DD/MM/YYYY")}
            </span>
          </Box>
        )}

        <Box style={{ display: "flex" }}>
          {editValue ? (
            <Box style={{ display: "flex" }}>
              <Box p={1}>
                <Fab
                  color="success"
                  aria-label="complete"
                  onClick={() => {
                    editItem(updatedValue);
                  }}
                  style={{ backgroundColor: "#5cb85c", color: "white" }}
                >
                  <SaveAsOutlined />
                </Fab>
              </Box>
            </Box>
          ) : (
            <Box style={{ display: "flex" }}>
              <Box p={1}>
                <Fab
                  color="success"
                  aria-label="complete"
                  onClick={() => {
                    doneItem();
                  }}
                  style={{ backgroundColor: "#5cb85c", color: "white" }}
                >
                  <CheckOutlined />
                </Fab>
              </Box>

              {/* <Box p={1}>
                <Fab
                  color="success"
                  aria-label="complete"
                  onClick={() => {
                    console.log(addedItem);
                    editItem(addedItem);
                  }}
                  style={{ backgroundColor: "#5cb85c", color: "white" }}
                >
                  <SaveAsOutlined />
                </Fab>
              </Box> */}

              <Box p={1}>
                <Fab
                  color="success"
                  aria-label="complete"
                  // onClick={onEdit}
                  onClick={() => {
                    setEditValue(!editValue);
                  }}
                  style={{ backgroundColor: "#5cb85c", color: "white" }}
                >
                  <EditOutlined />
                </Fab>
              </Box>

              <Box p={1}>
                <Fab
                  color="secondary"
                  aria-label="delete"
                  onClick={() => {
                    onDelete(addedItem.todoId);
                  }}
                  style={{ marginLeft: "5px" }}
                >
                  <DeleteForeverOutlined />
                </Fab>
              </Box>
            </Box>
          )}
        </Box>
      </Paper>
    </>
  );
};

export default TodoItem;

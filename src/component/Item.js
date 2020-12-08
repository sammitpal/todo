import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import { useStateValue } from "../StateProvider";
import { db } from "./firebase";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateIcon from "@material-ui/icons/Create";
import "./Item.css";
function Item(props) {
  const [{ user }, dispatch] = useStateValue();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateTodo = () => {
    db.collection("users")
      .doc(user?.uid)
      .collection("todos")
      .doc(props.todo.id)
      .set(
        {
          todo: input,
        },
        { merge: true }
      );
    setOpen(false);
    setInput("");
  };
  console.log(props);
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Update Todo"
            placeholder={props.todo.todo}
            type="text"
            fullWidth
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={updateTodo} color="primary" disabled={!input}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
      <List className="list_todo" style={{ margin: "10px 0" }}>
        <ListItem>
          <ListItemText primary={props.todo.todo} secondary="" />
          <Button color="primary" onClick={handleClickOpen}>
            <CreateIcon />
          </Button>
          <Button
            onClick={(e) =>
              db
                .collection("users")
                .doc(user?.uid)
                .collection("todos")
                .doc(props.todo.id)
                .delete()
            }
          >
            <DeleteIcon />
          </Button>
        </ListItem>
      </List>
    </>
  );
}

export default Item;

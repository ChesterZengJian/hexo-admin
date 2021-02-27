import React from "react";
import {
  Button,
  Edit,
  ListButton,
  SimpleForm,
  TextInput,
  TopToolbar,
  Toolbar,
  SaveButton,
  DateInput,
  ArrayInput,
  SimpleFormIterator,
} from "react-admin";
import PostTitle from "./PostTitle";
import MdEditor from "../common/MdEditor";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

const PostEditBasicInfoActions = (props) => {
  const [open, setOpen] = React.useState(false);
  console.log(props);
  return (
    <Toolbar {...props}>
      <SaveButton label="Save" submitOnEnter={true} />
      <SaveButton
        label="Cancel"
        redirect={false}
        submitOnEnter={false}
        variant="text"
        onClick={() => {
          setOpen(false);
        }}
      />
    </Toolbar>
  );
};

const PostEditActions = (props) => {
  const [open, setOpen] = React.useState(false);
  return (
    <TopToolbar>
      <Button
        label="Basic Info"
        onClick={() => {
          setOpen(true);
        }}
      />
      <ListButton
        basePath={props.basePath}
        label="Back"
        icon={<ChevronLeft />}
      />
      <Dialog
        onClose={() => {
          setOpen(false);
        }}
        aria-labelledby="simple-dialog-title"
        open={open}
      >
        <DialogTitle id="simple-dialog-title">
          Edit Basic Infomation
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <Edit title={<span></span>} {...props}>
            <SimpleForm redirect={false}>
              <TextInput source="title" />
              <TextInput source="author" />
              {/* <TextInput source="categories" /> */}
              <ArrayInput source="categories">
                <SimpleFormIterator>
                  <TextInput />
                </SimpleFormIterator>
              </ArrayInput>
              <ArrayInput source="tags">
                <SimpleFormIterator>
                  <TextInput />
                </SimpleFormIterator>
              </ArrayInput>
              <DateInput source="date" />
            </SimpleForm>
          </Edit>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </TopToolbar>
  );
};

const PostEdit = (props) => {
  return (
    <Edit
      title={<PostTitle source="title" />}
      actions={<PostEditActions {...props} />}
      {...props}
    >
      <SimpleForm>
        <MdEditor source="_content" />
      </SimpleForm>
    </Edit>
  );
};

export default PostEdit;

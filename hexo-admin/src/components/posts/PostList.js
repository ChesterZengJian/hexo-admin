import React from "react";
import {
  List,
  Datagrid,
  TextField,
  ArrayField,
  SingleFieldList,
  DateField,
  DeleteButton,
  EditButton,
  CreateButton,
} from "react-admin";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { Drawer } from "@material-ui/core";
import { Route } from "react-router";

import PostCreate from "./PostCreate";
import PostPanel from "./PostPanel";
import CategoryTag from "../Categories/CategoryTag";

const postRowClick = (id, basePath, record) => `/posts/${id}/info`;

const handleClose = (props) => {
  console.log("handle close");
  console.log(props);
  // props.location.pathname = "/posts";
  // props.push("/posts");
  // props.push("/posts");
};

const PostsListActions = ({ basePath }) => <CreateButton basePath={basePath} />;

const PostList = (props) => {
  console.log(props);
  return (
    <React.Fragment>
      <List actions={<PostsListActions />} bulkActionButtons={false} {...props}>
        <Datagrid
          rowClick={postRowClick}
          expand={<PostPanel source="excerpt" emptyinfo="No excerpt!" />}
        >
          <TextField source="title" />
          <ArrayField source="categories">
            <SingleFieldList>
              <CategoryTag size="small" />
            </SingleFieldList>
          </ArrayField>
          <ArrayField source="tags">
            <SingleFieldList>
              <CategoryTag size="small" />
            </SingleFieldList>
          </ArrayField>
          <TextField source="author" />
          <DateField label="Created Date" source="date" />
          <EditButton />
          <DeleteButton />
        </Datagrid>
      </List>
      <Route path="/posts/create">
        {({ match }) => {
          return (
            <Drawer
              open={!!match}
              anchor="right"
              onClose={(props) => handleClose(props)}
            >
              <PostCreate {...props} />
            </Drawer>
          );
        }}
      </Route>
      <Route path="/posts/:id/info">
        <div>Hello</div>
      </Route>
    </React.Fragment>
  );
};

export default connect(undefined, { push })(PostList);

import * as React from "react";
import { Datagrid, List, TextField } from "react-admin";

export const Posts = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="title" />
    </Datagrid>
  </List>
);

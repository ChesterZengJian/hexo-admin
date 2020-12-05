import * as React from "react";
import {
  BooleanField,
  Create,
  Datagrid,
  DateField,
  Edit,
  List,
  SimpleForm,
  TextField,
  TextInput,
} from "react-admin";

import MdEditor from "./MdEditor";

export const Posts = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="title" />
      <TextField source="categories" />
      <BooleanField source="isDraft" />
      <BooleanField source="isDiscarded" />
      <DateField source="updated" />
      <DateField source="date" />
    </Datagrid>
  </List>
);

export const PostCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="title" />
    </SimpleForm>
  </Create>
);

export const PostEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextField source="title" />
      <MdEditor source="_content" />
    </SimpleForm>
  </Edit>
);

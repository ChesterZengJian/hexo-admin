import * as React from "react";
import {
  BooleanField,
  Datagrid,
  DateField,
  Edit,
  List,
  SimpleForm,
  TextField,
  TextInput,
} from "react-admin";

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

export const PostEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextField source="title" />
      <TextInput source="content" />
    </SimpleForm>
  </Edit>
);

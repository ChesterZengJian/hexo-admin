import * as React from "react";
import {
  ArrayField,
  BooleanField,
  Create,
  Datagrid,
  DateField,
  Edit,
  List,
  SimpleForm,
  SingleFieldList,
  TextField,
  TextInput,
} from "react-admin";

import MdEditor from "./MdEditor";
import { CategoryTag } from "./Categories";

const PostTitle = ({ record, source }) => {
  return <span>{record ? `${record[source]}` : ""}</span>;
};

const PostPanel = ({ record, source, emptyInfo }) => {
  if (!record) return <div>{emptyInfo}</div>;

  return record[source] ? (
    <div dangerouslySetInnerHTML={{ __html: record[source] }} />
  ) : (
    <div>{emptyInfo}</div>
  );
};

export const Posts = (props) => (
  <List bulkActionButtons={false} {...props}>
    <Datagrid
      rowClick="edit"
      expand={<PostPanel source="excerpt" emptyInfo="No excerpt!" />}
    >
      <TextField source="title" />
      <ArrayField source="categories">
        <SingleFieldList>
          <CategoryTag size="small" />
        </SingleFieldList>
      </ArrayField>
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
  <Edit title={<PostTitle source="title" />} {...props}>
    <SimpleForm>
      <MdEditor source="_content" />
    </SimpleForm>
  </Edit>
);

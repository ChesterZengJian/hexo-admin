import {
  List,
  Datagrid,
  TextField,
  ArrayField,
  SingleFieldList,
  DateField,
  DeleteButton,
  EditButton,
} from "react-admin";

import PostPanel from "./PostPanel";
import CategoryTag from "../Categories/CategoryTag";

const PostList = (props) => (
  <List bulkActionButtons={false} {...props}>
    <Datagrid
      rowClick="edit"
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
);

export default PostList;

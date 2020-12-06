import {
  List,
  Datagrid,
  TextField,
  ArrayField,
  SingleFieldList,
  BooleanField,
  DateField,
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
      <BooleanField source="isDraft" />
      <BooleanField source="isDiscarded" />
      <DateField source="updated" />
      <DateField source="date" />
    </Datagrid>
  </List>
);

export default PostList;

import { Edit, SimpleForm } from "react-admin";
import PostTitle from "./PostTitle";
import MdEditor from "../common/MdEditor";

const PostEdit = (props) => (
  <Edit title={<PostTitle source="title" />} {...props}>
    <SimpleForm>
      <MdEditor source="_content" />
    </SimpleForm>
  </Edit>
);

export default PostEdit;

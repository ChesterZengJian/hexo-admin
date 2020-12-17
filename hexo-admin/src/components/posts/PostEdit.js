import { Edit, ListButton, SimpleForm, TopToolbar } from "react-admin";
import PostTitle from "./PostTitle";
import MdEditor from "../common/MdEditor";
import ChevronLeft from "@material-ui/icons/ChevronLeft";

const PostEditActions = ({ basePath, data }) => (
  <TopToolbar>
    <ListButton basePath={basePath} label="Back" icon={<ChevronLeft />} />
  </TopToolbar>
);

const PostEdit = (props) => (
  <Edit
    title={<PostTitle source="title" />}
    actions={<PostEditActions />}
    {...props}
  >
    <SimpleForm>
      <MdEditor source="_content" />
    </SimpleForm>
  </Edit>
);

export default PostEdit;

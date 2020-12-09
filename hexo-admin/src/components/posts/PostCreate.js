import {
  Create,
  SimpleForm,
  TextInput,
  translate,
  Toolbar,
  SaveButton,
  Link,
} from "react-admin";
import Button from "@material-ui/core/Button";

const PostsCreateToolbar = translate(({ onCancel, translate, ...props }) => {
  return (
    <Toolbar {...props}>
      <SaveButton />
      <Button>
        <Link to="/posts">Cancel</Link>
      </Button>
      {/* <Button onClick={onCancel}>{translate("ra.action.cancel")}</Button> */}
    </Toolbar>
  );
});

const PostCreate = ({ ...props }) => {
  console.log("PostCreate:");
  console.log(props);
  return (
    <Create {...props}>
      <SimpleForm toolbar={<PostsCreateToolbar />}>
        <TextInput source="title" />
      </SimpleForm>
    </Create>
  );
};

export default PostCreate;

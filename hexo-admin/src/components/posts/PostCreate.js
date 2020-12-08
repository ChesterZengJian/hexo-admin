import { Create, SimpleForm, TextInput } from "react-admin";

const PostCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="title" />
    </SimpleForm>
  </Create>
);

export default PostCreate;

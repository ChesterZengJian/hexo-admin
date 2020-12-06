import { Create, SimpleForm, TextInput } from "react-admin";

export const PostCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="title" />
    </SimpleForm>
  </Create>
);

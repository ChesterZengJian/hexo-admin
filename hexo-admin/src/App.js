import * as React from "react";
import { Admin, Resource } from "react-admin";
import { PostList, PostEdit, PostCreate } from "./components/Posts";
import { hexoDataProvider } from "./apis/hexoDataProvider";

function App() {
  return (
    <Admin dataProvider={hexoDataProvider}>
      <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} />
    </Admin>
  );
}

export default App;

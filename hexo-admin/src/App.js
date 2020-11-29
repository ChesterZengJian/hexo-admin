import * as React from "react";
import { Admin, Resource } from "react-admin";
import { Posts, PostEdit } from "./components/Posts";
import { hexoDataProvider } from "./apis/hexoDataProvider";

function App() {
  return (
    <Admin dataProvider={hexoDataProvider}>
      <Resource name="posts" list={Posts} edit={PostEdit} />
    </Admin>
  );
}

export default App;

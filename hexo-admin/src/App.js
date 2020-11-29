import * as React from "react";
import { Admin, Resource } from "react-admin";
import { Posts } from "./components/Posts";
import { hexoDataProvider } from "./apis/hexoDataProvider";

function App() {
  return (
    <Admin dataProvider={hexoDataProvider}>
      <Resource name="posts" list={Posts} />
    </Admin>
  );
}

export default App;

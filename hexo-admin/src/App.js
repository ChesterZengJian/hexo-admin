import * as React from "react";
import { Admin, Resource } from "react-admin";
import Posts from "./components/posts";
import { hexoDataProvider } from "./apis/hexoDataProvider";

function App() {
  return (
    <Admin dataProvider={hexoDataProvider}>
      <Resource name="posts" {...Posts} />
    </Admin>
  );
}

export default App;

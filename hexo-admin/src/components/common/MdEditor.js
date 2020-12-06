import * as React from "react";
import { useField } from "react-final-form";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const MdEditor = ({ source }) => {
  const {
    input: { value, onChange },
  } = useField(source);

  return (
    <SimpleMDE
      onChange={onChange}
      options={{
        initialValue: value,
      }}
    />
  );
};

export default MdEditor;

import * as React from "react";
import { useField } from "react-final-form";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

import { hexoDataProvider } from "../../apis/hexoDataProvider";

const MdEditor = ({ source }) => {
  const {
    input: { value, onChange },
  } = useField(source);

  const imageUploadFunction = function (data) {
    console.log(data instanceof File);
    console.log("imageUploadFunction");
    hexoDataProvider.upload(data).then((data) => {
      console.log(data);
    });
  };

  return (
    <SimpleMDE
      onChange={onChange}
      options={{
        initialValue: value,
        uploadImage: true,
        imageUploadFunction: imageUploadFunction,
      }}
    />
  );
};

export default MdEditor;

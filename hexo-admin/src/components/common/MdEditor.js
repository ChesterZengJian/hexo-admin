import * as React from "react";
import { useField } from "react-final-form";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

import {    hexoDataProvider } from "../../apis/hexoDataProvider";

const MdEditor = ({ source }) => {
  const {
    input: { value, onChange },
  } = useField(source);

  const imageUploadFunction = function (data, onSuccess, onError) {
    console.log(data instanceof File);
    console.log("imageUploadFunction");
    hexoDataProvider.upload(data).then((data) => {
      console.log("data:");
      console.log(data);
      if (data.src) {
        data.src = data.src.replace(/\\/g, "/");
        data.src = data.src.substr(1, data.src.length - 2);
        onSuccess(data.src);
      } else {
        onError(data);
      }
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

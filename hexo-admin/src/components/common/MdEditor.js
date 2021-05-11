import * as React from "react";
import { useField } from "react-final-form";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

import { hexoDataProvider } from "../../apis/hexoDataProvider";

const MdEditor = ({ id,source }) => {
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
        data.src = data.src.substr(1, data.src.length - 1);
        console.log("Upload image successfully:" + data.src);
        onSuccess("/" + data.src);
      } else {
        onError(data);
      }
    });
  };

  const extraKeys = () => {
    return {
      "Shift-Ctrl-`": function (cm) {
        var selection = cm.getSelection();
        cm.replaceSelection("`" + selection + "`");
        if (!selection) {
          var currentCursor = cm.getCursor();
          currentCursor.ch = currentCursor.ch - 1;
          cm.setCursor(currentCursor);
        }
      },
    };
  };

  const shortcuts = {
    drawTable: "Cmd-Alt-T",
  };

  return (
    <SimpleMDE
      onChange={onChange}
      extraKeys={extraKeys()}
      options={{
        autofocus: true,
        autosave: {
          enabled: true,
          uniqueId: id,
          delay:300
        },
        initialValue: value,
        uploadImage: true,
        imageUploadFunction: imageUploadFunction,
        shortcuts,
      }}
    />
  );
};

export default MdEditor;

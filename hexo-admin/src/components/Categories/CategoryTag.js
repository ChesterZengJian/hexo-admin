import * as React from "react";
import Chip from "@material-ui/core/Chip";

const CategoryTag = ({ record, size }) => {
  return <Chip label={record} size={size} />;
};

export default CategoryTag;
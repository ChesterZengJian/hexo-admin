const PostTitle = ({ record, source }) => {
  return <span>{record ? `${record[source]}` : ""}</span>;
};

export default PostTitle;

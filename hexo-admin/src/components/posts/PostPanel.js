import { Show, SimpleShowLayout, RichTextField } from "react-admin";

const PostPanel = (props) => {
  if (!props.record) return <div>{props.emptyinfo}</div>;

  return props.record[props.source] ? (
    <Show actions={null} {...props}>
      <SimpleShowLayout>
        <RichTextField addLabel={false} source={props.source} />
      </SimpleShowLayout>
    </Show>
  ) : (
    <div>{props.emptyinfo}</div>
  );
};

export default PostPanel;
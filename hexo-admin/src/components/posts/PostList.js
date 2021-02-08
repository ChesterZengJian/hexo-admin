import React, { cloneElement, useState, useEffect } from "react";
import {
  List,
  Datagrid,
  TextField,
  ArrayField,
  SingleFieldList,
  DateField,
  DeleteButton,
  CreateButton,
  Filter,
  TextInput,
  useListContext,
  TopToolbar,
  sanitizeListRestProps,
  Button,
  useMutation,
} from "react-admin";

import PostPanel from "./PostPanel";
import CategoryTag from "../Categories/CategoryTag";
import { hexoDataProvider } from "../../apis/hexoDataProvider";

const PostsListActions = (props) => {
  const { className, filters, maxResults, ...rest } = props;
  const {
    currentSort,
    resource,
    displayedFilters,
    filterValues,
    hasCreate,
    basePath,
    selectedIds,
    showFilter,
    total,
  } = useListContext();

  return (
    <React.Fragment>
      <TopToolbar className={className} {...sanitizeListRestProps(rest)}>
        {filters &&
          cloneElement(filters, {
            resource,
            showFilter,
            displayedFilters,
            filterValues,
            context: "button",
          })}
        <CreateButton basePath={basePath} />
      </TopToolbar>
    </React.Fragment>
  );
};

const PostListFilter = (props) => {
  return (
    <Filter {...props}>
      <TextInput label="Search Title" source="title" alwaysOn />
    </Filter>
  );
};

const PublishButton = ({record,resource}) => {
  const [publish, { loading }] = useMutation({
    type: "publish",
    resource: resource,
    payload: { id: record.id, data: { published: true, isDraft: false } },
  });

  return (
    <Button
      label="Publish"
      disabled={!record.isDraft && record.published}
      onClick={(e) => {
        publish();
        // dataProvider
        //   .publish(props.resource, { id: props.record.id })
        //   .then(({ data }) => {
        //     console.log(data)
        //     setPost(data);
        //   })
        //   .catch((error) => {
        //     setError(error);
        //   });

        // hexoDataProvider
        //   .publish(props.resource, { id: props.record.id })
        //   .then(({ data }) => {
        //     console.log(data)
        //   });
        e.preventDefault();
        e.stopPropagation();
      }}
    />
  );
};

const PostList = (props) => {
  return (
    <React.Fragment>
      <List
        actions={<PostsListActions {...props} />}
        filters={<PostListFilter />}
        filterDefaultValues={{
          isDiscarded: false,
        }}
        sort={{ field: "date", order: "DESC" }}
        {...props}
        bulkActionButtons={false}
      >
        <Datagrid
          rowClick="edit"
          expand={<PostPanel source="excerpt" emptyinfo="No excerpt!" />}
        >
          <TextField source="title" />
          <ArrayField source="categories">
            <SingleFieldList>
              <CategoryTag size="small" />
            </SingleFieldList>
          </ArrayField>
          <ArrayField source="tags">
            <SingleFieldList>
              <CategoryTag size="small" />
            </SingleFieldList>
          </ArrayField>
          <TextField source="author" />
          <DateField label="Created Date" source="date" />
          <PublishButton />
          <DeleteButton />
        </Datagrid>
      </List>
    </React.Fragment>
  );
};

export default PostList;

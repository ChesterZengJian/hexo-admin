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
  useDelete,
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

const PublishButton = ({ record, resource }) => {
  const [publishPost, { loading, error }] = useMutation({
    type: "update",
    resource: resource,
    payload: {
      id: record ? record.id : "",
      data: { published: true },
    },
  });

  if (error) {
    return <p>ERROR</p>;
  }

  return (
    <Button
      label="Publish"
      disabled={(record && !record.isDraft && record.published) || loading}
      onClick={(e) => {
        publishPost();
        e.preventDefault();
        e.stopPropagation();
      }}
    />
  );
};

const CustomDeleteButton = ({ record }) => {
  const [deleteOne, { loading, error }] = useDelete("posts", record.id);
  if (error) {
    return <p>ERROR</p>;
  }
  return (
    <button
      disabled={loading}
      onClick={(e) => {
        deleteOne();
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      Delete
    </button>
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
          {/* <CustomDeleteButton /> */}
          <DeleteButton />
        </Datagrid>
      </List>
    </React.Fragment>
  );
};

export default PostList;

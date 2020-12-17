import React, { cloneElement } from "react";
import {
  List,
  Datagrid,
  TextField,
  ArrayField,
  SingleFieldList,
  DateField,
  DeleteButton,
  EditButton,
  CreateButton,
  Filter,
  TextInput,
  useListContext,
  TopToolbar,
  sanitizeListRestProps,
} from "react-admin";
import { Drawer } from "@material-ui/core";
import { Route } from "react-router";

import PostCreate from "./PostCreate";
import PostPanel from "./PostPanel";
import CategoryTag from "../Categories/CategoryTag";

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

const PostList = (props) => {
  return (
    <React.Fragment>
      <List
        actions={<PostsListActions />}
        filters={<PostListFilter />}
        filterDefaultValues={{
          published: true,
          isDraft: false,
          isDiscarded: false,
        }}
        sort={{ field: "date", order: "DESC" }}
        {...props}
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
          <DeleteButton />
        </Datagrid>
      </List>
    </React.Fragment>
  );
};

export default PostList;

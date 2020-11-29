/* eslint-disable array-callback-return */
import { fetchUtils } from "react-admin";

const httpClient = fetchUtils.fetchJson;

var hexoDataProvider = {
  getList: (resource, params) => {
    return httpClient(`/${resource}/list`).then(({ headers, json }) => {
      console.log(json);
      json.map(function (obj, index) {
        obj.id = obj._id;
      });
      return {
        data: json,
        total: json.length,
      };
    });
  },

  getOne: (resource, params) =>
    httpClient(`/${resource}/${params.id}`).then(({ json }) => {
      console.log(json);
      json.id = json._id;
      return {
        data: json,
      };
    }),

  // getMany: (resource, params) => {
  //   const query = {
  //     filter: JSON.stringify({ id: params.ids }),
  //   };
  //   const url = `${apiUrl}/${resource}?${stringify(query)}`;
  //   return httpClient(url).then(({ json }) => ({ data: json }));
  // },

  // getManyReference: (resource, params) => {
  //   const { page, perPage } = params.pagination;
  //   const { field, order } = params.sort;
  //   const query = {
  //     sort: JSON.stringify([field, order]),
  //     range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
  //     filter: JSON.stringify({
  //       ...params.filter,
  //       [params.target]: params.id,
  //     }),
  //   };
  //   const url = `${apiUrl}/${resource}?${stringify(query)}`;

  //   return httpClient(url).then(({ headers, json }) => ({
  //     data: json,
  //     total: parseInt(headers.get("content-range").split("/").pop(), 10),
  //   }));
  // },

  update: (resource, params) => {
    return httpClient(`/${resource}/${params.id}`, {
      method: "POST",
      body: JSON.stringify({ _content: params.data._content }),
    }).then(({ json }) => {
      json.post.id = json.post._id;
      return { data: json.post };
    });
  },

  // updateMany: (resource, params) => {
  //   const query = {
  //     filter: JSON.stringify({ id: params.ids }),
  //   };
  //   return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
  //     method: "PUT",
  //     body: JSON.stringify(params.data),
  //   }).then(({ json }) => ({ data: json }));
  // },

  create: (resource, params) => {
    console.log("params");
    console.log(params);
    return httpClient(`/${resource}/new`, {
      method: "POST",
      body: JSON.stringify(params.data),
    }).then(({ json }) => {
      return {
        data: { ...params.data, id: json._id },
      };
    });
  },

  // delete: (resource, params) =>
  //   httpClient(`${apiUrl}/${resource}/${params.id}`, {
  //     method: "DELETE",
  //   }).then(({ json }) => ({ data: json })),

  // deleteMany: (resource, params) => {
  //   const query = {
  //     filter: JSON.stringify({ id: params.ids }),
  //   };
  //   return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
  //     method: "DELETE",
  //     body: JSON.stringify(params.data),
  //   }).then(({ json }) => ({ data: json }));
  // },
};

export { hexoDataProvider };

/* eslint-disable array-callback-return */
import { fetchUtils } from "react-admin";

const httpClient = fetchUtils.fetchJson;

const pagingData = (pageIndex, pageSize, array) => {
  var offset = (pageIndex - 1) * pageSize;
  return offset + pageSize >= array.length
    ? array.slice(offset, array.length)
    : array.slice(offset, offset + pageSize);
};

const sortBy = (field, order, parse) => {
  let rev = order === "ASC" ? 1 : -1;
  return function (a, b) {
    a = a[field];
    b = b[field];
    if (typeof parse !== "undefined") {
      a = parse(a);
      b = parse(b);
    }
    if (a < b) {
      return rev * -1;
    }
    if (a > b) {
      return rev * 1;
    }
    return 1;
  };
};

const filterBy = (array, condition) => {
  return array.filter((obj) => {
    for (let key in condition) {
      if (obj[key] !== condition[key]) return false;
    }
    return true;
  });
};

const convertFileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

var hexoDataProvider = {
  getList: (resource, params) => {
    console.log("params");
    console.log(params);

    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const filter = params.filter;
    return httpClient(`/${resource}/list`).then(({ headers, json }) => {
      console.log(json);
      json.map(function (obj, index) {
        obj.id = obj._id;
      });

      let data = json;
      let total = json.length;
      if (filter) {
        data = filterBy(data, filter);
        total = data.length;
      }

      data.sort(sortBy(field, order));
      data = pagingData(page, perPage, data);
      return {
        data: data,
        total: total,
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

  delete: (resource, params) => {
    return httpClient(`/${resource}/${params.id}/remove`, {
      method: "POST",
    }).then(({ json }) => ({ data: json }));
  },

  // deleteMany: (resource, params) => {
  //   const query = {
  //     filter: JSON.stringify({ id: params.ids }),
  //   };
  //   return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
  //     method: "DELETE",
  //     body: JSON.stringify(params.data),
  //   }).then(({ json }) => ({ data: json }));
  // },

  upload: (params) => {
    console.log("params:");
    console.log(params);
    const newPic = params;
    const url = `/images/upload`;

    return convertFileToBase64(newPic).then((res) => {
      return httpClient(url, {
        method: "POST",
        body: JSON.stringify({
          data: res,
          filename: "f1",
        }),
      }).then(({ json }) => {
        console.log(json);
      });
    });
  },
};

export { hexoDataProvider };

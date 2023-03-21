import useSWR from "swr";
import axios from "axios";
import getAccessToken from "../helper/getAccessToken";
export const fetcher = async (url) =>
  fetch("https://sms-twox.onrender.com/api" + url, {
    headers: {
      Authorization: await getAccessToken(),
    },
  }).then((res) => res.json());

// export const BaseUrl = "https://res.cloudinary.com/";
export const api = axios.create({
  baseURL: "https://sms-twox.onrender.com/api",
  // headers: {
  //   Authorization: getAccessToken() || null,
  // },
});

export const useGetMe = () => {
  const { data, error, isLoading, mutate } = useSWR("/auth/users/me", fetcher);
  return {
    mutate,
    data: data ?? {},
    isLoading: !error && !data,
    isError: error,
  };
};
// export const useBlog = () => {
//   const { data, error, mutate } = useSWR("/api/blogs?populate=*", fetcher);

//   return {
//     mutate,
//     blogs: data?.data ?? [],
//     isLoading: !error && !data,
//     isError: error,
//   };
// };

// export const useBlogById = (id) => {
//   const { data, error, mutate } = useSWR(
//     `/api/blogs/${id}?populate=*`,
//     fetcher
//   );

//   return {
//     mutate,
//     blog: data?.data ?? {},
//     isLoading: !error && !data,
//     isError: error,
//   };
// };

// export const useCategory = () => {
//   const { data, error, mutate } = useSWR(`/api/categories`, fetcher);
//   return {
//     mutate,
//     categories: data?.data ?? [],
//     isLoading: !error && !data,
//     isError: error,
//   };
// };

// export const useCategoryBlog = (name) => {
//   const { data, error, mutate } = useSWR(
//     `/api/blogs?filters[category][name][$contains]=${name}&populate=*`,
//     fetcher
//   );
//   return {
//     mutate,
//     blogs: data?.data ?? [],
//     isLoading: !error && !data,
//     isError: error,
//   };
// };

// export const useHomeBanner = () => {
//   const { data, error, mutate } = useSWR(
//     `/api/home-banner?populate=*`,
//     fetcher
//   );

//   return {
//     mutate,
//     homeBanner: data ?? {},
//     isLoading: !error && !data,
//     isError: error,
//   };
// };

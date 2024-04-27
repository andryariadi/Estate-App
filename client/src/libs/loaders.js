import { defer } from "react-router-dom";
import apiRequest from "./apiRequest";

export const singlePageLoader = async ({ request, params }) => {
  const res = await apiRequest("/posts/" + params.id);
  return res.data;
};

export const listPageLoader = async ({ request, params }) => {
  console.log({ request, params }, "<----dilistPageLoader");
  const query = request.url.split("?")[1];
  const postPromise = apiRequest("/posts?" + query);
  return defer({ postResponse: postPromise });
};

export const profilePageLoader = async () => {
  const postPromise = apiRequest("/user/profilePosts");
  const chatPromise = apiRequest("/chats");
  return defer({
    postResponse: postPromise,
    chatResponse: chatPromise,
  });
};

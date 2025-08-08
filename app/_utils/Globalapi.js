import { gql, request } from "graphql-request";

const MASTER_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
const HYGRAPH_TOKEN = process.env.NEXT_PUBLIC_HYGRAPH_TOKEN;

if (!MASTER_URL) {
    console.error("NEXT_PUBLIC_BACKEND_API_URL is not defined.");
  }
  
  if (!HYGRAPH_TOKEN) {
    console.error("NEXT_PUBLIC_HYGRAPH_TOKEN is not defined.");
  }
const getAllEvents = gql`
  query Events {
    events {
      eventname
      about
      id
      image {
        url
      }
    }
  }
`;

const GlobalApi = {
  getAllEvents: async () => request(MASTER_URL, getAllEvents),
};

export default GlobalApi;
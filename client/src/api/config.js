const config = {
  API_SERVER_URL: "https://teachers-pet-server.onrender.com",
  API_LOCAL_URL: "http://localhost:3000",
};

export const BASE_API_URL = config.API_SERVER_URL || config.API_LOCAL_URL;

// const config = {
//   API_SERVER_URL: "https://teachers-pet-h.onrender.com",
//   API_LOCAL_URL: "http://localhost:3000",
// };

// export const BASE_API_URL =
//   process.env.NODE_ENV === "production"
//     ? config.API_SERVER_URL
//     : config.API_LOCAL_URL;

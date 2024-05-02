import axios from "axios";

const api = (token?: string) => {
  let connection;

  if (token) {
    return (connection = axios.create({
      baseURL: "https://api.josuecarvalho.cloud/",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }));
  }

  connection = axios.create({
    baseURL: "https://api.josuecarvalho.cloud/",
  });

  return connection;
};

export { api };

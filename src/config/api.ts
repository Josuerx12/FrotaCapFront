import axios from "axios";

const api = (token?: string) => {
  let connection;

  if (token) {
    return (connection = axios.create({
      baseURL: "https://frota-cap.vercel.app/",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }));
  }

  connection = axios.create({
    baseURL: "https://frota-cap.vercel.app/",
  });

  return connection;
};

export { api };

import axios from 'axios';

const instance = axios.create({
  // baseURL: 'http://mylifecompanyapp.amagumolabs.io/api/public/api/v1/',
  // headers: {
  //   'Authorization': 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xOTIuMTY4LjY0LjJcL2FwaVwvcHVibGljXC9hcGlcL3YxXC9hdXRoXC9sb2dpbiIsImlhdCI6MTUzMTc5OTY0MSwiZXhwIjoxNjg3MzE5NjQxLCJuYmYiOjE1MzE3OTk2NDEsImp0aSI6IlBLSHgyekxlbHRyb2ZaOUkiLCJzdWIiOjEyLCJwcnYiOiI4N2UwYWYxZWY5ZmQxNTgxMmZkZWM5NzE1M2ExNGUwYjA0NzU0NmFhIn0.gk_DXYXhsuDMdTzTSGHbYmpH9dBrXF2jIYvLcGPkFps'
  // }

  baseURL: 'http://localhost:8000/api/v1',
  // headers: {
  //   // 'Authorization': 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC92MVwvYXV0aFwvbG9naW4iLCJpYXQiOjE1MzM2OTUyMTEsImV4cCI6MTY4OTIxNTIxMSwibmJmIjoxNTMzNjk1MjExLCJqdGkiOiJMTFl3U25mckdLd05GQnloIiwic3ViIjoyLCJwcnYiOiI4N2UwYWYxZWY5ZmQxNTgxMmZkZWM5NzE1M2ExNGUwYjA0NzU0NmFhIn0.E0Mbc5ljLrhXEO00jDac5JYVt-963paeQAK_5_HqLY4'
  //   'Authorization': 'bearer ' + localStorage.getItem('tokenVan')
  // }
});

instance.interceptors.request.use(
  config => {
    config.headers.authorization = 'bearer ' + localStorage.getItem("tokenVan");
    return config;
  },
  error => Promise.reject(error)
);


export default instance;
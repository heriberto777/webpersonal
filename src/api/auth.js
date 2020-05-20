import { basePath, apiVersion } from "./config";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../utils/constants";
import jwtDecode from "jwt-decode";

export function getAccessTokenApi() {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  if (!accessToken || accessToken === "null") {
    return null;
  }

  return willExpireToken(accessToken) ? null : accessToken;
}

export function getRefreshTokenApi() {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN);

  if (!refreshToken || refreshToken === "null") {
    return null;
  }

  return willExpireToken(refreshToken) ? null : refreshToken;
}

export function refreshAccessTokenApi(refreshToken) {
  const url = `${basePath}/${apiVersion}/refresh-access=token`;
  const bodyObj = {
    refreshToken: refreshToken,
  };

  const params = {
    method: "POST",
    body: JSON.stringify(bodyObj),
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetch(url, params)
    .then((response) => {
      if (response.status !== 200) {
        return null;
      }
      return response.json();
    })
    .then((result) => {
      if (!result) {
        // TO DO: delogear usuario
      } else {
        const { accessToken, refreshToken } = result;
        localStorage.setItem(ACCESS_TOKEN, accessToken);
        localStorage.setItem(REFRESH_TOKEN, refreshToken);
      }
    });
  // .catch((err) => {
  //   return {
  //     ok: false,
  //     message: err.message,
  //   };
  // });
}

export function logout() {
  // const accessToken = localStorage.getItem(ACCESS_TOKEN);
  // if(!accessToken){
  //   return
  // }
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
}

function willExpireToken(token) {
  const seconds = 60;
  const metaToken = jwtDecode(token);

  const { exp } = metaToken;
  const now = (Date.now() + seconds) / 1000;
  return now > exp;
}

function logOut() {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
}

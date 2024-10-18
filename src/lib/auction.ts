import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { BASE_URL, createAxiosInstance } from "./axios";

export const auctionInstance = createAxiosInstance(`${BASE_URL}/auction`);

const requestInterceptor = (config: InternalAxiosRequestConfig) => {
  console.log("경매 API 요청 인터셉터:", config);
  return config;
};

const responseInterceptor = (response: AxiosResponse) => {
  console.log("경매 API 응답 인터셉터:", response);

  return response;
};

const errorInterceptor = (error: AxiosError) => {
  console.error("경매 API 응답 인터셉터 에러:", error);

  return Promise.reject(error.response);
};

// 요청 인터셉터
auctionInstance.interceptors.request.use(requestInterceptor, Promise.reject);
// 응답 인터셉터
auctionInstance.interceptors.response.use(
  responseInterceptor,
  errorInterceptor
);

export const auctionAPI = {
  search: (query: string) => auctionInstance.get(`/list${query}`),
  history: (query: string) => auctionInstance.get(`/history${query}`),
};

export const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
// utils/apiPaths.j
export const API_PATHS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/signup",
    LOGOUT: "/auth/logout",
    GET_USER: "/auth/me",
    UPDATE_IMAGE: "/auth/updateImage",
  },

  CARS: {
    GET_ALL: "/cars",
    GET_ONE: (id) => `/cars/${id}`,
    SEARCH: "/cars/search",
    ADD: "/cars",
    UPDATE: (id) => `/cars/${id}`,
    DELETE: (id) => `/cars/${id}`,
    MY_CARS: "/cars/my-cars",
  },

  BOOKINGS: {
    CREATE: "/bookings",
    GET_MY_BOOKINGS: "/bookings/my-bookings",
    GET_MY_OWNER_BOOKINGS: "/bookings/owner-bookings",
    GET_ALL: "/bookings",
    GET_ONE: (id) => `/bookings/${id}`,
    UPDATE: (id) => `/bookings/${id}`,
    SEARCH: "/bookings/search",
    DELETE: (id) => `/bookings/${id}`,
    APPROVE: (id) => `/bookings/approve/${id}`,
  },
};

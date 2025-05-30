const BASE_URL = import.meta.env.VITE_APP_BACKEND_URL || 'http://localhost:8000';

export const API_PATHS = {
  // Auth endpoints
  AUTH: {
    SIGNUP: `${BASE_URL}/api/auth/register`,
    LOGIN: `${BASE_URL}/api/auth/login`,
    LOGOUT: `${BASE_URL}/api/auth/logout`,
    PROFILE: `${BASE_URL}/api/auth/profile`,
  },
  // User endpoints
  USER: {
    PROFILE: `${BASE_URL}/api/auth/profile`,
    UPDATE_PROFILE: `${BASE_URL}/api/auth/profile`,
    UPLOAD_AVATAR: `${BASE_URL}/api/auth/upload-image`,
  },
  // Question endpoints
  QUESTION: {
    ADD_TO_SESSION: `${BASE_URL}/api/question/add`,
    PIN: (id) => `${BASE_URL}/api/question/${id}/pin`,
    UPDATE_NOTE: (id) => `${BASE_URL}/api/question/${id}/note`,
  },
  // AI endpoints
  AI: {
    GENERATE_QUESTIONS: `${BASE_URL}/api/ai/generate-question`,
    GENERATE_EXPLANATION: `${BASE_URL}/api/ai/concept-explanation`,
  },
  // Session endpoints
  SESSION: {
    CREATE: `${BASE_URL}/api/session/create`,
    GET_ALL: `${BASE_URL}/api/session/my-sessions`,
    GET_ONE: (id) => `${BASE_URL}/api/session/${id}`,
    DELETE: (id) => `${BASE_URL}/api/session/${id}`,
  },
}; 
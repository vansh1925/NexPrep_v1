export const BASE_URL = "http://localhost:8000";

export const API_PATHS = {
    AUTH: {
        REGISTER: "/api/auth/register",
        LOGIN: "/api/auth/login",
        GET_PROFILE: "/api/auth/profile",

    },
    IMAGE: {
        UPLOAD_IMAGE: "/api/auth/upload-image",
    },

    QUESTION: {
        ADD_TO_SESSION: "/api/question/add",
        PIN: (id) => `/api/question/${id}/pin`,
        UPDATE_NOTE: (id) => `/api/question/${id}/note`,

    },

    AI: {
        GENERATE_QUESTIONS: "api/ai/generate-question",
        GENERATE_EXPLANATION: "api/ai/concept-explanation",
    },

    SESSION: {
        CREATE: "/api/session/create",
        GET_ALL: "/api/session/my-sessions",
        GET_ONE: (id) => `/api/session/${id}`,
        DELETE: (id) => `/api/session/${id}`,
    }
};


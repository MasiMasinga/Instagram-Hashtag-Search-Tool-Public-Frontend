import api from "./api";

const isBrowser = typeof window !== `undefined`;

export const createPost = async (data) => {
    if (!isBrowser) return false;

    return await api
        .post(`/api/posts/`, data)
        .then(function (response) {
            if (response.status === 201) {
                return {
                    status: true,
                };
            }
        })
        .catch(function (error) {
            return {
                status: false,
                data: error.response.data,
            };
        });
};

export const searchHashtag = async (query) => {
    if (!isBrowser) return false;

    let url = `/api/posts/search/`;

    if (query) {
        url += `?hashtag=${query}`;
    }

    return await api
        .get(url)
        .then(function (response) {
            if (response.status === 200) {
                return {
                    status: true,
                    data: response.data,
                };
            }
        })
        .catch(function (error) {
            return {
                status: false,
                data: error.response.data,
            };
        });
};

export const getPosts = async () => {
    if (!isBrowser) return false;

    return await api
        .get(`/api/posts/`)
        .then(function (response) {
            if (response.status === 200) {
                return {
                    status: true,
                    data: response.data,
                };
            }
        })
        .catch(function (error) {
            return {
                status: false,
                data: error.response.data,
            };
        });
};

const SearchService = {
    createPost,
    searchHashtag,
    getPosts,
};

export default SearchService;

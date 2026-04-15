export const API_BASE_URL = "http://localhost:3001";

const API_PREFIX = "/api";

export const getApiUrl = (path: string): string => {
	const normalizedPath = path.startsWith("/") ? path : `/${path}`;
	return `${API_BASE_URL}${API_PREFIX}${normalizedPath}`;
};
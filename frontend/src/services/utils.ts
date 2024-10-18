const getAuthHeader = (authToken: string) => ({ headers: { Authorization: `Token ${authToken}` } });

export default getAuthHeader;

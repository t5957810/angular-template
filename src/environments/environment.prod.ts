const projName = 'csr';
const host = location.origin;
const projApi = 'csr-api';

export const environment = {
  production: true,
  local: false,
  contentPath: host + '/' + projApi,
  baseUrl: '/' + projName + '/',
  envAreaName: '',
};

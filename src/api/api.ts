import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { requestsConfig } from '../../config/config';
import { logFetch } from '../helpers/dev/log';
import subscribeMockRequests from './apiMock';


if (process.env.NODE_ENV !== 'production') {
  if (requestsConfig.USE_MOCK) {
    subscribeMockRequests(new MockAdapter(axios, { delayResponse: 1000 }));
  }
}

const api = (url: string, data: any, method: 'post' | 'get', params?: any) => {

  const config = {
    method,
    baseURL: requestsConfig.API_URL,
    url,
  };

  if (data !== null) {
    config['data'] = data;
  }

  if (params) {
    config['params'] = params;
  }

  return axios(config);
};

export const fetch = process.env.NODE_ENV !== 'production'
  ? logFetch(api, requestsConfig.USE_MOCK, requestsConfig.COLLAPSED_LOG_REQUESTS)
  : api;

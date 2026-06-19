const BASE_URL = 'https://localhost:7200/api';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface RequestOptions {
  method: HttpMethod;
  body?: unknown;
  headers?: Record<string, string>;
   // Add a generic record type for query parameters
  params?: Record<string, string | number | boolean | undefined>;
}

// The generic core requester
async function request<T>(endpoint: string, options: RequestOptions): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;
  
  const headers = {
    'Content-Type': 'application/json', // Default to JSON payloads
    ...options.headers,
  };

  const config: RequestInit = {
    method: options.method,
    headers,
  };

  if (options.body) {
    config.body = JSON.stringify(options.body);
  }

  const response = await fetch(url, config);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  // Return parsed data matching type T
  return response.json() as Promise<T>;
}

// Export specialized generic methods for your app
export const api = {
  /*get: <T>(endpoint: string, headers?: Record<string, string>) => 
    request<T>(endpoint, { method: 'GET', headers }),*/

  get: <T>(
    endpoint: string, 
    params?: Record<string, string | number | boolean | undefined>, 
    headers?: Record<string, string>
  ) => request<T>(endpoint, { method: 'GET', params, headers }),
    
  post: <T>(endpoint: string, body: unknown, headers?: Record<string, string>) => 
    request<T>(endpoint, { method: 'POST', body, headers }),
    
  put: <T>(endpoint: string, body: unknown, headers?: Record<string, string>) => 
    request<T>(endpoint, { method: 'PUT', body, headers }),
    
  delete: <T>(endpoint: string, headers?: Record<string, string>) => 
    request<T>(endpoint, { method: 'DELETE', headers }),
};

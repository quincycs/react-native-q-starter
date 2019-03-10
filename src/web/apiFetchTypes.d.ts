interface ApiFetchOptions {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  url: string;
  data?: {};
  headers?: Dictionary<string>;
}

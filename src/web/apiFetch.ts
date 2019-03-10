import axios, { AxiosResponse, CancelTokenSource } from 'axios';

const AxiosCancelToken = axios.CancelToken;

export interface ApiResult<T, E> {
  model: T | null;
  error: E | null;
}

export interface ErrorWithResponse<E> {
  response?: AxiosResponse<E>;
  name: string;
  message: string;
  stack?: string;
}

export interface ErrorResult {
  /**
   * unique identifer for error type.
   */
  code: ClientErrorCode | FireErrorMessage;
  /**
   * Whether the error was clientside.
   * If true, then usually a network connectivity issue or
   * the server is not able to give a response.
   */
  isClientSide: boolean;
  /**
   * User friendly message
   */
  message: string;
}

const defaultHeaders: Dictionary<string> = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'Content-Encoding': 'gzip',
};

export class ApiFetchCancellation {
  public constructor() {
    this.tokenSrc = AxiosCancelToken.source();
  }

  public tokenSrc: CancelTokenSource;

  public cancel() {
    this.tokenSrc.cancel();
  }
}

export class RequestCancelledError<E> extends Error
  implements ErrorWithResponse<E> {}

async function apiFetch<T, E>(
  options: ApiFetchOptions,
  cancel?: ApiFetchCancellation
): Promise<ApiResult<T, ErrorWithResponse<E>>> {
  const { method, url, data, headers } = options;

  const request = axios.request<T>({
    method,
    url,
    data,
    headers: {
      ...defaultHeaders,
      ...headers,
    },
    cancelToken: cancel && cancel.tokenSrc.token,
  });

  try {
    const response = await request;
    const model = response.data;

    return {
      model,
      error: null,
    };
  } catch (error) {
    if (axios.isCancel(error)) {
      return {
        model: null,
        error: new RequestCancelledError(),
      };
    }
    if (error.response) {
      const response: AxiosResponse = error.response;
      console.log(
        `apiFetch ERR:${url} ${response.status} ${response.data &&
          JSON.stringify(response.data)}`
      );
    }
    return {
      model: null,
      error,
    };
  }
}

export { apiFetch };

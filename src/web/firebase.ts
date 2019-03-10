import { Constants } from 'expo';

import {
  apiFetch,
  ApiResult,
  ErrorWithResponse,
  ErrorResult,
  ApiFetchCancellation,
  RequestCancelledError,
} from './apiFetch';
import AppStorage from '../utils/AppStorage';
import Strings from '../strings';

/**
 * Firebase auth token
 */
export interface AuthToken {
  idToken: string;
  refreshToken: string;
}

export interface FireErrorResponse {
  error: FireError;
}

interface FireError {
  code: number;
  message: FireErrorMessage;
}

function errorWithResponseToErrorResult(
  errorWithResponse: ErrorWithResponse<FireErrorResponse>
): ErrorResult {
  let errorModel: ErrorResult;
  const serverErrorResponse = errorWithResponse && errorWithResponse.response;
  if (serverErrorResponse) {
    const { error } = serverErrorResponse.data;
    let message = Strings.t('defaultServerError');
    switch (error.message) {
      case 'EMAIL_NOT_FOUND':
        message = Strings.t('authEmailNotFound');
        break;
      case 'INVALID_PASSWORD':
        message = Strings.t('authBadPassword');
        break;
      case 'USER_DISABLED':
        message = Strings.t('authUserDisabled');
        break;
    }
    errorModel = {
      isClientSide: false,
      code: error.message,
      message,
    };
  } else if (errorWithResponse instanceof RequestCancelledError) {
    const message = Strings.t('defaultClientError');
    errorModel = {
      isClientSide: true,
      code: 'CANCEL',
      message,
    };
  } else {
    const message = Strings.t('defaultClientError');
    errorModel = {
      isClientSide: true,
      code: 'NETWORK',
      message,
    };
  }
  return errorModel;
}

export async function fireFetch<T>(
  options: ApiFetchOptions,
  cancel?: ApiFetchCancellation
): Promise<ApiResult<T, ErrorResult>> {
  const token = AppStorage.getAuthToken();
  if (token) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token.idToken}`,
    };
  }
  const result = await apiFetch<T, FireErrorResponse>(options, cancel);
  const model = result.model;
  const error = result.error
    ? errorWithResponseToErrorResult(result.error)
    : null;
  return {
    model,
    error: error,
  };
}

let FireAuthApiKey = 'NOTSET';
const { extra } = Constants.manifest;
if (extra && extra.fireAuthApiKey) {
  FireAuthApiKey = extra.fireAuthApiKey;
}
export { FireAuthApiKey };

import { fireFetch, FireAuthApiKey } from './firebase';
import { ApiResult, ErrorResult, ApiFetchCancellation } from './apiFetch';

export interface SignInApiModel {
  /**
   * idToken is the BearerToken for future REST calls.
   *    WARNING: Token automatically expires after a certain time or after an admin revokes access.
   */
  idToken: string;
  /**
   * refreshToken is used to get a new idToken.
   *    WARNING: Token may expire due to an admin revoking access.
   */
  refreshToken: string;
  /**
   * The uid of the authenticated user.
   */
  localId: string;
  /**
   * Whether the email is for an existing account.
   */
  registered: boolean;
}

/**
 * https://firebase.google.com/docs/reference/rest/auth/#section-sign-in-email-password
 */
export async function signInApi(
  email: string,
  password: string,
  cancel?: ApiFetchCancellation
): Promise<ApiResult<SignInApiModel, ErrorResult>> {
  const endpoint = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${FireAuthApiKey}`;
  const body = {
    email,
    password,
    returnSecureToken: true,
  };
  const result = await fireFetch<SignInApiModel>(
    {
      method: 'POST',
      url: endpoint,
      data: body,
    },
    cancel
  );
  return result;
}

import CacheStorage from './CacheStorage';

class AppStorage {
  private unsafeCache: CacheStorage;
  private securedCache: CacheStorage;

  public constructor(unsafeCache: CacheStorage, securedCache: CacheStorage) {
    this.unsafeCache = unsafeCache;
    this.securedCache = securedCache;
  }

  public async loadAsync() {
    await Promise.all([
      this.unsafeCache.loadAsync(),
      this.securedCache.loadAsync(),
    ]);
  }

  public async saveAsync() {
    await Promise.all([
      this.unsafeCache.saveAsync(),
      this.securedCache.saveAsync(),
    ]);
  }

  public async clearAsync() {
    await Promise.all([
      this.unsafeCache.clearAsync(),
      this.securedCache.clearAsync(),
    ]);
  }

  public getIsLoggedIn(): boolean {
    return this.getAuthToken() !== null;
  }

  public getAuthToken(): AuthToken | null {
    return this.securedCache.getItem('authToken', null);
  }

  public setAuthToken(token: AuthToken) {
    this.securedCache.setItem('authToken', token);
  }
}

const unsafeCache = new CacheStorage('unsafeAppCache', false);
const securedCache = new CacheStorage('secureAppCache', true);
const appStorage = new AppStorage(unsafeCache, securedCache);

export default appStorage;

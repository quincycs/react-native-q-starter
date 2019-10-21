import { AsyncStorage } from 'react-native';
import * as SecureStore from 'expo-secure-store';

/**
 * Async storage which loads into memory for fast subsequent reads.
 *
 * Must call saveAsync() in order for setItems to be persisted.
 */
export default class CacheStorage {
  private key: string;
  private isSecure: boolean;
  private cache: Dictionary<any> = {}; // eslint-disable-line @typescript-eslint/no-explicit-any

  public constructor(key: string, isSecure: boolean) {
    this.key = key;
    this.isSecure = isSecure;
  }

  public async loadAsync() {
    let strData = null;
    if (this.isSecure) {
      strData = await SecureStore.getItemAsync(this.key);
    } else {
      strData = await AsyncStorage.getItem(this.key);
    }
    if (strData) {
      this.cache = JSON.parse(strData);
    }
  }

  public async saveAsync() {
    const strData = JSON.stringify(this.cache);
    if (this.isSecure) {
      await SecureStore.setItemAsync(this.key, strData, {
        keychainAccessible: SecureStore.ALWAYS_THIS_DEVICE_ONLY,
      });
    } else {
      await AsyncStorage.setItem(this.key, strData);
    }
  }

  public getItem<T>(key: string, defaultValue: T): T {
    const value = this.cache[key] as T;
    if (value === undefined) {
      return defaultValue;
    } else {
      return value;
    }
  }

  public setItem<T>(key: string, value: T) {
    this.cache[key] = value;
  }

  public async clearAsync() {
    this.cache = {};
    await this.saveAsync();
  }
}

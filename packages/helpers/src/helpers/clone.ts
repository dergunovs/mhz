import { toRaw } from 'vue';

export function clone<T>(obj: T) {
  return structuredClone(toRaw(obj));
}

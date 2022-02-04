import {
  isArray, isPlainObject
} from 'lodash';

export const copyObjectShallowNoClientSideProperties = <T>(obj: T): T => {
  const objCopy = {} as T;

  for (const property in obj) {
    if (property.startsWith('$')) continue; // skips to the next property if the current one is a client-side only property

    const val = obj[property];

    if (isPlainObject(val)) {
      objCopy[property] = copyObjectShallowNoClientSideProperties(val);

    } else if (isArray(val)) {
      // TODO: add support for array of arrays (see 'containsDeep' in 'useArrayFilter' for when to use 'for...in' and 'for...of')o
      objCopy[property] = val.map(item => isPlainObject(item) ? copyObjectShallowNoClientSideProperties(item) : item) as unknown as T[Extract<keyof T, string>];

    } else {
      objCopy[property] = val;
    }
  }

  return objCopy;
};

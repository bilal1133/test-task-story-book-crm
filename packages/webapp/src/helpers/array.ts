import { Sort } from '@app/types';
import { orderBy } from 'lodash';

const sortCollator =
  Intl.Collator(Intl.DateTimeFormat().resolvedOptions().locale ?? 'en-GB', {
    caseFirst: 'false',
    ignorePunctuation: true,
    numeric: true,
    sensitivity: 'base',
    usage: 'sort'
  });
export const sortAlphabeticallyArr = <T>({
  arr, sortKey
}: { arr: Array<T>, sortKey?: keyof T }): Array<T> => arr.sort((a, b) => {
    const valA = sortKey ? a[sortKey] : a;
    const valB = sortKey ? b[sortKey] : b;
    if (typeof valA === 'string' && typeof valB === 'string') {
      return sortCollator.compare(valA, valB);
    } else {
      if (valA < valB) return -1;
      if (valA > valB) return 1;
      return 0;
    }
  });

export const searchStringArray = (arr: Array<string>, searchText: string): Array<string> => arr.filter(val => val.toLowerCase().includes(searchText.toLowerCase()));

const hasEmptyValue = <T>(item: T, key: keyof T) => item[key] === undefined || item[key] === null;
export const orderObjectArray = <T>({
  array,
  sort,
  sortOrder
}: {
  array: Array<T>;
  sort?: Sort<T>;
  sortOrder?: 'empty-first' | 'empty-last'; // 'sortOrder' MUST be used with 'sort', else is ignored
}): {
  emptyValues: Array<T>;
  nonEmptyValues: Array<T>;
  ordered: Array<T>;
} => {
  console.log('------ sort', sort?.sortKey);
  const sorted = sort
    ? orderBy(
      array,
      [
        sort.sortKey
      ],
      [
        sort.sortDirection
      ]
    )
    : array;
  const emptyValues = sort
    ? sorted.filter(item => hasEmptyValue<T>(item, sort.sortKey))
    : [];
  const nonEmptyValues = sort
    ? sorted.filter(item => !hasEmptyValue<T>(item, sort.sortKey))
    : sorted;
  const ordered = (
    sortOrder === 'empty-first'
      ? [
        ...emptyValues,
        ...nonEmptyValues
      ]
      : (
        sortOrder === 'empty-last'
          ? [
            ...nonEmptyValues,
            ...emptyValues
          ]
          : sorted
      ));
  return {
    emptyValues,
    nonEmptyValues,
    ordered
  };
};

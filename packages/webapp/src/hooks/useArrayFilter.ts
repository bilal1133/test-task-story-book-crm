import { orderObjectArray } from '@app/helpers';
import { Sort } from '@app/types';
import {
  isArray, isPlainObject
} from 'lodash';
import {
  useMemo, useState
} from 'react';

const emptyArray: Array<unknown> = []; // BEWARE: make sure this reference is not modified, else it will NOT be empty anymore

const containsDeep = <T>({
  val,
  searchText
}: {
  val: T;
  searchText: string;
}): boolean => {
  const _searchText = searchText.trim().toLowerCase();

  let found = false;

  if (typeof val === 'string') {
    found = val.trim().toLowerCase().includes(_searchText);

  } else if (typeof val === 'number' && Number.isFinite(val)) {
    found = val.toString().trim().toLowerCase().includes(_searchText);

  } else if (isArray(val)) {
    for (const item of val) {
      found = containsDeep({
        val: item,
        searchText: _searchText
      });
      if (found) break;
    }

  } else if (isPlainObject(val)) {
    for (const property in val) {
      if (property.endsWith('Id') || property.endsWith('Ids')) continue; // prevent searching through fields such as 'accountId' or 'tagIds'
      found = containsDeep({
        val: val[property],
        searchText: _searchText
      });
      if (found) break;
    }
  }

  return found;
};

export const useArrayFilter = <T>({
  array,
  searchText,
  sort
}: {
  array: Array<T> | undefined;
  searchText?: string;
  sort?: Sort<T>;
}): {
  filtered: Array<T>;
  searchText: typeof _searchText;
  setSearchText: typeof setSearchText;
} => {

  const [
    _searchText,
    setSearchText
  ] = useState<string>(searchText ?? '');

  const filtered = useMemo(
    () => {
      const unfiltered = array ?? (emptyArray as Array<T>);
      const result = !!unfiltered.length && !!_searchText.length
        ? unfiltered.filter(val => containsDeep({
          val,
          searchText: _searchText
        }))
        : unfiltered;
      const { ordered } = orderObjectArray({
        array: result,
        sort,
        sortOrder: 'empty-last'
      });
      return ordered;
    },
    [
      _searchText,
      array,
      sort
    ]
  );

  console.group('useArrayFilter');
  console.log('_searchText', _searchText);
  console.log('filtered.length', filtered.length);
  console.groupEnd();

  const _return = useMemo(
    () => ({
      filtered,
      searchText: _searchText,
      setSearchText
    }),
    [
      _searchText,
      filtered
    ]
  );

  return _return;
};

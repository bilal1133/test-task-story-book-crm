import { ParsedUrlQuery } from 'querystring';

export interface RouterQueryPageContacts extends ParsedUrlQuery {
  contactEntity: 'businesses' | 'people';
  contactType: 'all' | 'clients' | 'suppliers';
}

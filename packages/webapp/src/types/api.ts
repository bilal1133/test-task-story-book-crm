import { auth as firebaseAdminAuth } from 'firebase-admin';

export type firebaseAdminAuthDecodedIdToken = firebaseAdminAuth.DecodedIdToken & CustomClaims;

export enum HTTPRequestMethod {
  Connect = 'CONNECT',
  Delete = 'DELETE',
  Get = 'GET',
  Head = 'HEAD',
  Options = 'OPTIONS',
  Patch = 'PATCH',
  Post = 'POST',
  Put = 'PUT',
  Trace = 'TRACE'
}

export interface ApiBody<T> {
  raw: Buffer;
  unparsed: string;
  parsed?: T;
}

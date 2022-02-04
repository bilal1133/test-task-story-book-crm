export type DBUser = firebase.default.User;

export interface Timestamp {
  // all fields are in ISO FORMAT, TIMEZONE UTC -> .toISOString()
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string; // for soft-delete
}

export interface DBDocument extends Timestamp {
  _id: firebase.default.firestore.DocumentReference['id'];
  _path: firebase.default.firestore.DocumentReference['path'];
  _owner?: DBUser['uid'];
  _team?: Array<DBUser['uid']>;
  // _teamPermissions?: Array<{ user: DBUser['uid']; flags: Array<AppFlag> }>;
}

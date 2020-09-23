const firebaseDoc = {
  delete: jest.fn(),
  get: jest.fn().mockReturnValue({
    data: jest.fn(),
  }),
  set: jest.fn(),
  update: jest.fn(),
};

const firebaseDocRef = jest.fn().mockReturnValue(firebaseDoc);

const firebaseCollection = jest.fn().mockReturnValue({
  docs: [],
});

const firebaseWhere = jest.fn().mockReturnValue({
  get: firebaseCollection,
  where: jest.fn(),
});

const firebaseCollectionRef = jest.fn().mockReturnValue({
  add: jest.fn(),
  doc: firebaseDocRef,
  get: firebaseCollection,
  listDocuments: jest.fn().mockReturnValue([firebaseDoc]),
  where: firebaseWhere,
});

const initializeApp = jest.fn();

const auth = jest.fn().mockReturnValue({
  setCustomUserClaims: jest.fn(),
  updateUser: jest.fn(),
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const firestore: any = jest.fn().mockReturnValue({
  batch: jest.fn().mockReturnValue({
    commit: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
    set: jest.fn(),
    update: jest.fn(),
  }),
  collection: firebaseCollectionRef,
  collectionGroup: jest.fn().mockReturnValue({
    where: firebaseWhere,
  }),
  doc: firebaseDocRef,
});

firestore.FieldValue = {
  arrayUnion: jest.fn(value => `added: ${value}`),
  arrayRemove: jest.fn(value => `removed: ${value}`),
  delete: jest.fn().mockReturnValue("deleted"),
  increment: jest.fn(value => value),
  serverTimestamp: jest.fn().mockReturnValue("timestamp"),
};

firestore.Timestamp = {
  fromDate: jest.fn(value => value),
};

export {auth, initializeApp, firestore};

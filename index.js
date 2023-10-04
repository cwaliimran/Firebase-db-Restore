const admin = require('firebase-admin');
const serviceAccount = require('./credentials.json');

// Initialize Firebase Admin SDK with your service account credentials
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Read data from your JSON file
const jsonData = require('./backup.json'); // Replace with the path to your JSON file

// Define collections and documents
const collections = {
  birds: db.collection('birds'),
  breeds: db.collection('breeds'),
  customers: db.collection('customers'),
  egg_reduction_types: db.collection('egg_reduction_types'),
  expense_categories: db.collection('expense_categories'),
  flock_batches: db.collection('flock_batches'),
  flock_source: db.collection('flock_source'),
  income_categories: db.collection('income_categories'),
  users: db.collection('users'),
  vaccination_types: db.collection('vaccination_types'),
  vendors: db.collection('vendors'),
};

// Add data to Firestore
const batch = db.batch();

Object.keys(jsonData).forEach((collectionName) => {
  const collection = collections[collectionName];
  const documents = jsonData[collectionName];

  Object.keys(documents).forEach((docId) => {
    const docData = documents[docId];
    const docRef = collection.doc(docId);
    batch.set(docRef, docData);
  });
});

batch
  .commit()
  .then(() => {
    console.log('Data imported successfully.');
  })
  .catch((error) => {
    console.error('Error importing data:', error);
  });

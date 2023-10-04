const admin = require('firebase-admin');
const serviceAccount = require('./credentials.json');

// Initialize Firebase Admin SDK with your service account credentials
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const collections = [
    'medication_types'
    // 'birds',
    // 'breeds',
    // 'customers',
    // 'egg_reduction_types',
    // 'expense_categories',
    // 'flock_batches',
    // 'flock_source',
    // 'income_categories',
    // 'users',
    // 'vaccination_types',
    // 'vendors',
    // 'egg_types', // Added
    // 'eggs_additions', // Added
    // 'eggs_reductions', // Added
    // 'feed_additions', // Added
    // 'feed_reductions', // Added
    // 'feed_types', // Added
    // 'feedings', // Added
    // 'finance_expenses', // Added
    // 'finance_income', // Added
    // 'flock_reductions', // Added
    // 'health_medications', // Added
    // 'health_vaccinations', // Added
    // 'medication_types' // Added
  ];
  

async function deleteCollections() {
  try {
    for (const collectionName of collections) {
      const collectionRef = db.collection(collectionName);
      const querySnapshot = await collectionRef.get();

      querySnapshot.forEach((doc) => {
        doc.ref.delete();
      });

      console.log(`Deleted all documents in collection: ${collectionName}`);
    }
  } catch (error) {
    console.error('Error deleting collections:', error);
  }
}

// Call the function to delete collections
deleteCollections()
  .then(() => {
    console.log('All collections deleted successfully.');
    process.exit(0); // Exit the script
  })
  .catch((error) => {
    console.error('Error deleting collections:', error);
    process.exit(1); // Exit the script with an error code
  });
import { db } from '../firebaseConfig';
import { Task, User, Category } from '../types';

// Type assertion for Firebase SDK loaded from window
const { collection, onSnapshot, addDoc, doc, deleteDoc, updateDoc, writeBatch, getDocs, query, where } = (window as any).firebase.firestore;

type CollectionName = 'tasks' | 'users' | 'categories';
type AnyDocument = Task | User | Category;

/**
 * Sets up a real-time listener for a Firestore collection.
 * @param collectionName The name of the collection ('tasks', 'users', 'categories').
 * @param callback The function to call with the updated data.
 * @returns A function to unsubscribe from the listener.
 */
export const onCollectionUpdate = <T extends { id: string }>(
  collectionName: CollectionName,
  callback: (data: T[]) => void
): (() => void) => {
  const q = collection(db, collectionName);
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const data: T[] = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() } as T);
    });
    callback(data);
  }, (error) => {
    console.error(`Error listening to ${collectionName} collection:`, error);
  });
  return unsubscribe;
};

/**
 * Adds a new document to a specified collection.
 * @param collectionName The name of the collection.
 * @param docData The document data to add (without an id).
 * @returns The newly created document with its Firestore-generated id.
 */
export const addDocument = async <T extends AnyDocument>(collectionName: CollectionName, docData: Omit<T, 'id'>): Promise<T> => {
    const docRef = await addDoc(collection(db, collectionName), docData);
    return { id: docRef.id, ...docData } as T;
};

/**
 * Deletes a document from a collection by its id.
 * @param collectionName The name of the collection.
 * @param id The id of the document to delete.
 */
export const deleteDocument = async (collectionName: CollectionName, id: string): Promise<void> => {
    await deleteDoc(doc(db, collectionName, id));
};

/**
 * Updates a document in a collection.
 * @param collectionName The name of the collection.
 * @param id The id of the document to update.
 * @param updates An object with the fields to update.
 */
export const updateDocument = async <T extends AnyDocument>(collectionName: CollectionName, id: string, updates: Partial<Omit<T, 'id'>>): Promise<void> => {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, updates);
};

/**
 * Updates all tasks where a specific field matches an old value.
 * Uses a batch write for efficiency.
 * @param field The field to match ('user' or 'category').
 * @param oldName The old name to find.
 * @param newName The new name to set.
 */
export const updateTasksByField = async (field: 'user' | 'category', oldName: string, newName: string): Promise<void> => {
    const tasksRef = collection(db, 'tasks');
    const q = query(tasksRef, where(field, "==", oldName));
    
    try {
        const querySnapshot = await getDocs(q);
        const batch = writeBatch(db);
        
        querySnapshot.forEach((document) => {
            const docRef = doc(db, 'tasks', document.id);
            batch.update(docRef, { [field]: newName });
        });
        
        await batch.commit();
        console.log(`Batch update successful for field "${field}" from "${oldName}" to "${newName}".`);
    } catch (error) {
        console.error("Error performing batch update: ", error);
    }
}

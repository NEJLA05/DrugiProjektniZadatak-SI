import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDUMsAconGNvWryRP6TSkA_AcfZn4Kanxk",
  authDomain: "to-do-list-2ba66.firebaseapp.com",
  projectId: "to-do-list-2ba66",
  storageBucket: "to-do-list-2ba66.firebasestorage.app",
  messagingSenderId: "630858683476",
  appId: "1:630858683476:web:30c4894207c994517ec9c1",
  measurementId: "G-TM3GKC90NJ",
};

const app = initializeApp(firebaseConfig);

//Firestore connection
const db = getFirestore(app);

export async function getTasksFromFirestore() {
  try {
    const querySnapshot = await getDocs(collection(db, "to-do-list"));
    const tasks = [];
    querySnapshot.forEach((doc) => {
      tasks.push({ id: doc.id, ...doc.data() });
    });

    return tasks;
  } catch (e) {
    console.error("Error getting documents: ", e);
  }
}

export async function addTaskToFirestore(task) {
  try {
    await addDoc(collection(db, "to-do-list"), {
      description: task.description,
      statusId: task.statusId,
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function deleteTaskFromFirestore(id) {
  try {
    await deleteDoc(doc(db, "to-do-list", `${id}`));
  } catch (e) {
    console.error("Error deleting document: ", e);
  }
}

export async function updateTaskInFirestore(updatedData) {
  try {
    await updateDoc(doc(db, "to-do-list", `${updatedData.id}`), {
      statusId: updatedData.statusId,
    });
  } catch (e) {
    console.error("Error updating document: ", e);
  }
}

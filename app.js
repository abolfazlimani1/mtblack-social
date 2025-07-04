
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCoEvvXwrOebVwLo-PNkWLx1lrOPrrrQ48",
  authDomain: "mtblack-411f7.firebaseapp.com",
  projectId: "mtblack-411f7",
  storageBucket: "mtblack-411f7.appspot.com",
  messagingSenderId: "767715193540",
  appId: "1:767715193540:web:2023c944850ff06cc28f91",
  measurementId: "G-4SPVSGSJG0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

window.register = async function() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    await createUserWithEmailAndPassword(auth, email, password);
    alert("Registered successfully!");
}

window.login = async function() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    await signInWithEmailAndPassword(auth, email, password);
    alert("Logged in successfully!");
    loadPosts();
}

window.uploadPost = async function() {
    const text = document.getElementById("postText").value;
    await addDoc(collection(db, "posts"), { text });
    alert("Post uploaded!");
    loadPosts();
}

async function loadPosts() {
    const postsContainer = document.getElementById("posts");
    postsContainer.innerHTML = "";
    const querySnapshot = await getDocs(collection(db, "posts"));
    querySnapshot.forEach((doc) => {
        const post = document.createElement("div");
        post.textContent = doc.data().text;
        postsContainer.appendChild(post);
    });
}


const firebaseConfig = {
    apiKey: "AIzaSyCcQRSbI18O4xkvcrOApjtAj4EbR1J4dDo",
    authDomain: "mtblack-630c5.firebaseapp.com",
    projectId: "mtblack-630c5",
    storageBucket: "mtblack-630c5.appspot.com",
    messagingSenderId: "689920201467",
    appId: "1:689920201467:web:a13f864568e508f495565e"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const storage = firebase.storage();
const db = firebase.firestore();

auth.onAuthStateChanged(user => {
    if (user) {
        document.getElementById("auth").style.display = "none";
        document.getElementById("postArea").style.display = "block";
        loadPosts();
    }
});

function login() {
    const email = document.getElementById("email").value;
    const pass = document.getElementById("password").value;
    auth.signInWithEmailAndPassword(email, pass).catch(alert);
}

function signup() {
    const email = document.getElementById("email").value;
    const pass = document.getElementById("password").value;
    auth.createUserWithEmailAndPassword(email, pass).catch(alert);
}

function uploadPost() {
    const file = document.getElementById("postImage").files[0];
    const username = document.getElementById("username").value || "unknown";
    if (!file) return alert("No file selected!");

    const ref = storage.ref("posts/" + Date.now() + "-" + file.name);
    ref.put(file).then(snapshot => {
        snapshot.ref.getDownloadURL().then(url => {
            db.collection("posts").add({
                url,
                username,
                createdAt: Date.now()
            });
            alert("Posted!");
            loadPosts();
        });
    });
}

function loadPosts() {
    const feed = document.getElementById("feed");
    feed.innerHTML = "";
    db.collection("posts").orderBy("createdAt", "desc").get().then(snapshot => {
        snapshot.forEach(doc => {
            const post = doc.data();
            const div = document.createElement("div");
            div.innerHTML = `<b>${post.username}${post.username === "Abolfazl_imani1" ? " ✅" : ""}</b><br><img src="${post.url}" /><br><a href="${post.url}" download>Download</a>`;
            feed.appendChild(div);
        });
    });
}

document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            alert('ورود موفق!');
            window.location.href = 'profile.html';
        })
        .catch((error) => {
            alert('خطا: ' + error.message);
        });
});
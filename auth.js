function showLogin() {
    document.getElementById('login').classList.add('active');
    document.getElementById('signup').classList.remove('active');
}

function showSignup() {
    document.getElementById('signup').classList.add('active');
    document.getElementById('login').classList.remove('active');
}

function login(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Store user data in localStorage
    localStorage.setItem('currentUser', JSON.stringify({
        email: email,
        name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    }));
    
    alert(`Welcome back! Logged in as ${email}`);
    window.location.href = 'index.html';
}

function signup(event) {
    event.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    
    // Store user data in localStorage
    localStorage.setItem('currentUser', JSON.stringify({
        email: email,
        name: name
    }));
    
    alert(`Account created successfully for ${name}!`);
    showLogin();
}
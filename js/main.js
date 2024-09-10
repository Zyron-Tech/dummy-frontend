// Function to save the username to local storage
function saveUsernameToLocalStorage(username) {
    localStorage.setItem('username', username);
}

// Function to display messages to the user
function showMessage(message) {
    alert(message);
}

// Function to handle signup
document.getElementById('signupBtn')?.addEventListener('click', function () {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('https://dummy-backend-gyc3.onrender.com/public/signup.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `username=${encodeURIComponent(username)}&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                saveUsernameToLocalStorage(username);
                showMessage(data.message);
                // Redirect to OTP verification page
                document.getElementById('otpVerification').style.display = 'block';
            } else {
                showMessage(data.message);
            }
        })
        .catch(error => console.error('Error:', error));
});

// Function to handle OTP verification
document.getElementById('verifyOtpBtn')?.addEventListener('click', function () {
    const email = localStorage.getItem('email'); // Assuming email was saved during signup
    const otp = document.getElementById('otp').value;

    fetch('https://dummy-backend-gyc3.onrender.com/public/verify-otp.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `email=${encodeURIComponent(email)}&otp=${encodeURIComponent(otp)}`,
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                showMessage(data.message);
                // Redirect to the dashboard
                window.location.href = 'dashboard.html';
            } else {
                showMessage(data.message);
            }
        })
        .catch(error => console.error('Error:', error));
});

// Function to handle login
document.getElementById('loginBtn')?.addEventListener('click', function () {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('https://dummy-backend-gyc3.onrender.com/public/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                const username = data.username; // Ensure backend sends username in response
                saveUsernameToLocalStorage(username);
                localStorage.setItem('email', email); // Save email to use for OTP verification
                showMessage(data.message);
                // Redirect to dashboard
                window.location.href = 'dashboard.html';
            } else {
                showMessage(data.message);
            }
        })
        .catch(error => console.error('Error:', error));
});

// Display username on the dashboard
window.addEventListener('DOMContentLoaded', function () {
    const username = localStorage.getItem('username');
    if (username) {
        document.getElementById('displayUsername').textContent = username;
    } else {
        document.getElementById('displayUsername').textContent = 'User';
    }
});

// Function to handle account deletion
document.getElementById('deleteAccountBtn')?.addEventListener('click', function () {
    const email = localStorage.getItem('email');

    fetch('https://dummy-backend-gyc3.onrender.com/public/delete_account.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `email=${encodeURIComponent(email)}`,
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                showMessage(data.message);
                localStorage.clear(); // Clear local storage on successful deletion
                window.location.href = 'index.html'; // Redirect to homepage
            } else {
                showMessage(data.message);
            }
        })
        .catch(error => console.error('Error:', error));
});

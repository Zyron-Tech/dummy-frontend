// main.js

// Base URL for the backend
const BASE_URL = 'https://dummy-backend-gyc3.onrender.com/public';

// Sign Up Form Submission
document.getElementById('signupForm')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Send data to backend for sign-up
    fetch(`${BASE_URL}/signup.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `username=${username}&email=${email}&password=${password}`,
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                // Show OTP popup
                document.getElementById('otpPopup').style.display = 'flex';
            } else {
                alert(data.message);
            }
        })
        .catch(error => console.error('Error:', error));
});

// OTP Verification
document.getElementById('verifyOtpBtn')?.addEventListener('click', function () {
    const otp = document.getElementById('otp').value;

    // Send OTP to backend for verification
    fetch(`${BASE_URL}/verify_otp.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `otp=${otp}`,
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                window.location.href = 'dashboard.html'; // Redirect to dashboard
            } else {
                alert(data.message);
            }
        })
        .catch(error => console.error('Error:', error));
});

// Login Form Submission
document.getElementById('loginForm')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Send login request to backend
    fetch(`${BASE_URL}/login.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `email=${email}&password=${password}`,
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                localStorage.setItem('username', data.username); // Store username
                window.location.href = 'dashboard.html'; // Redirect to dashboard
            } else {
                alert(data.message);
            }
        })
        .catch(error => console.error('Error:', error));
});

// Display Username on Dashboard
document.addEventListener('DOMContentLoaded', function () {
    const username = localStorage.getItem('username');
    if (username) {
        document.getElementById('usernameDisplay').textContent = username;
    }
});

// Delete Account
document.getElementById('deleteAccountBtn')?.addEventListener('click', function () {
    const email = localStorage.getItem('email'); // Assuming email is stored in localStorage
    const password = prompt('Enter your password to confirm deletion:');

    fetch(`${BASE_URL}/delete_account.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `email=${email}&password=${password}`,
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                alert('Account deleted successfully.');
                localStorage.clear();
                window.location.href = 'index.html'; // Redirect to sign-up page
            } else {
                alert(data.message);
            }
        })
        .catch(error => console.error('Error:', error));
});

// Function to save the username to local storage
function saveUsernameToLocalStorage(username) {
    localStorage.setItem('username', username);
}

// Function to save the email to local storage
function saveEmailToLocalStorage(email) {
    localStorage.setItem('email', email);
}

// Function to display messages to the user
function showMessage(message) {
    const messageContainer = document.createElement('div');
    messageContainer.style.position = 'fixed';
    messageContainer.style.bottom = '20px';
    messageContainer.style.left = '50%';
    messageContainer.style.transform = 'translateX(-50%)';
    messageContainer.style.backgroundColor = '#333';
    messageContainer.style.color = '#fff';
    messageContainer.style.padding = '10px 20px';
    messageContainer.style.borderRadius = '5px';
    messageContainer.style.zIndex = '1000';
    messageContainer.textContent = message;
    
    document.body.appendChild(messageContainer);
    
    setTimeout(() => {
        document.body.removeChild(messageContainer);
    }, 3000);
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
            if (data?.status === 'success') {
                saveUsernameToLocalStorage(username);
                saveEmailToLocalStorage(email); // Save email to use for OTP verification
                showMessage(data.message);
                // Display the OTP verification popup
                document.getElementById('otpPopup').style.display = 'block';
            } else {
                showMessage(data.message || 'Signup failed. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showMessage('An error occurred. Please try again.');
        });
});

// Function to handle OTP verification
document.getElementById('verifyOtpBtn')?.addEventListener('click', function () {
    const email = localStorage.getItem('email'); // Assuming email was saved during signup
    const otp = document.getElementById('otpCode').value;

    fetch('https://dummy-backend-gyc3.onrender.com/public/verify-otp.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `email=${encodeURIComponent(email)}&otp=${encodeURIComponent(otp)}`,
    })
        .then(response => response.json())
        .then(data => {
            if (data?.status === 'success') {
                showMessage(data.message);
                // Redirect to the dashboard
                window.location.href = 'dashboard.html';
            } else {
                showMessage(data.message || 'OTP verification failed. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showMessage('An error occurred during OTP verification.');
        });
});

// Function to handle login
document.getElementById('loginBtn')?.addEventListener('click', function () {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    fetch('https://dummy-backend-gyc3.onrender.com/public/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
    })
        .then(response => response.json())
        .then(data => {
            if (data?.status === 'success') {
                const username = data.username; // Ensure backend sends username in response
                saveUsernameToLocalStorage(username);
                saveEmailToLocalStorage(email); // Save email to use for OTP verification
                showMessage(data.message);
                // Redirect to dashboard
                window.location.href = 'dashboard.html';
            } else {
                showMessage(data.message || 'Login failed. Please check your credentials.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showMessage('An error occurred during login.');
        });
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
            if (data?.status === 'success') {
                showMessage(data.message);
                localStorage.clear(); // Clear local storage on successful deletion
                window.location.href = 'index.html'; // Redirect to homepage
            } else {
                showMessage(data.message || 'Failed to delete account.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showMessage('An error occurred during account deletion.');
        });

// Toggle sign-in and sign-up forms
const signInBtn = document.querySelector("#sign-in-btn");
const signUpBtn = document.querySelector("#sign-up-btn");
const goToSignInLink = document.querySelector("#go-to-signin");
const goToSignUpLink = document.querySelector("#go-to-signup");
const container = document.querySelector(".container");

signUpBtn.addEventListener('click', () => {
    container.classList.add("sign-up-mode");
});

signInBtn.addEventListener('click', () => {
    container.classList.remove("sign-up-mode");
});

goToSignInLink.addEventListener('click', (event) => {
    event.preventDefault();
    container.classList.remove("sign-up-mode");
});

goToSignUpLink.addEventListener('click', (event) => {
    event.preventDefault();
    container.classList.add("sign-up-mode");
});


let isLoggedIn = false;
const MOCK_CREDENTIALS = {
    username: "S1002345", 
    password: "password"
};
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());   
}


function displayTimeBasedGreeting() {
    const greetingElement = document.getElementById('dynamic-greeting');
    if (!greetingElement) return;

    const date = new Date();
    const hour = date.getHours();
    let greeting;

    if (hour < 12) {
        greeting = "Good Morning ☀️";
    } else if (hour < 18) {
        greeting = "Good Afternoon 🌤️";
    } else {
        greeting = "Good Evening 🌙";
    }

    
    greetingElement.textContent = greeting;
}




function handleLogin(event) {
   
    event.preventDefault(); 

    const usernameInput = document.getElementById('regUsername').value;
    const passwordInput = document.getElementById('loginPassword').value;
    
    
    if (usernameInput === MOCK_CREDENTIALS.username && passwordInput === MOCK_CREDENTIALS.password) {
        isLoggedIn = true;
        updateProfileView();
        alert("Login Successful! Welcome to your Profile Portal.");
    } else {
        alert("Login Failed: Invalid Registration Number or Password. (Hint: Use S1002345/password)");
    }
}

function handleLogout() {
    isLoggedIn = false;
    updateProfileView();
    alert("You have been successfully logged out.");
}

function updateProfileView() {
    
    const profileView = document.getElementById('profile-details-view');
    const loginForm = document.getElementById('login-form');
    const logoutMsg = document.getElementById('logout-message');

    if (isLoggedIn) {
        profileView.style.display = 'block';
        loginForm.style.display = 'none';
        logoutMsg.style.display = 'block';
    } else {
        profileView.style.display = 'none';
        loginForm.style.display = 'block';
        logoutMsg.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    

    const loginForm = document.getElementById('login-form');
    const logoutButton = document.getElementById('logout-button');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
        
        if (logoutButton) {
            logoutButton.addEventListener('click', handleLogout);
        }
        
        updateProfileView(); 
    }
    
    
    const editButton = document.getElementById('edit-button');
    if (editButton) {
        
    }
    
});

function toggleEditMode() {
    const profileContainer = document.getElementById('profile-container');
    const editButton = document.getElementById('edit-button');

    if (profileContainer.classList.contains('editing')) {
        const saved = saveProfileDetails();
        if (saved) {
            profileContainer.classList.remove('editing');
            editButton.textContent = 'Edit Details';
            editButton.style.backgroundColor = '#007bff';
        }
        
    } else {
        const details = ['fullName', 'regNumber', 'programYear', 'email'];

        details.forEach(field => {
            const displaySpan = document.getElementById(`display-${field}`);
            const currentValue = displaySpan.textContent.trim();
            displaySpan.innerHTML = `<input type="${field === 'email' ? 'email' : 'text'}" id="input-${field}" value="${currentValue}" class="profile-input">`;
        });

        profileContainer.classList.add('editing');
        editButton.textContent = 'Save Changes';
        editButton.style.backgroundColor = '#28a745'; 
    }
}

function saveProfileDetails() {
    const detailsToSave = ['fullName', 'regNumber', 'programYear', 'email'];
    let allValid = true;
    let newValues = {};

    detailsToSave.forEach(field => {
        const inputElement = document.getElementById(`input-${field}`);
        
        if (inputElement) {
            let newValue = inputElement.value.trim();

            if (newValue === '') {
                alert(`Error: ${field} cannot be empty.`);
                allValid = false;
            } else if (field === 'email' && !validateEmail(newValue)) {
                alert('Error: Please enter a valid email address.');
                allValid = false;
            }
            newValues[field] = newValue;
        }
    });

    if (allValid) {
        detailsToSave.forEach(field => {
            const displayElement = document.getElementById(`display-${field}`);
            displayElement.innerHTML = newValues[field]; 
        });
        alert('Profile updated successfully!');
        return true;
    }
    return false;
}

function calculateTotalCredits() {
    const creditCells = document.querySelectorAll('.credits');
    let totalCredits = 0;

    creditCells.forEach(cell => {
        const creditValue = parseInt(cell.textContent);
        if (!isNaN(creditValue)) {
            totalCredits += creditValue;
        }
    });

    const displayElement = document.getElementById('total-credits-display');
    displayElement.textContent = `Total Registered Credits: ${totalCredits}`;
}

function validateContactForm(event) {
    event.preventDefault(); 
    
    const fullName = document.getElementById('fullName');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    const validationMessage = document.getElementById('validation-message');

    let isValid = true;
    let errors = [];

    validationMessage.textContent = '';
    validationMessage.className = 'message';
    [fullName, email, message].forEach(el => el.style.borderColor = '#ccc');


    if (fullName.value.trim() === '') {
        errors.push('Full Name is required.');
        fullName.style.borderColor = 'red';
        isValid = false;
    }

    if (!validateEmail(email.value.trim())) {
        errors.push('A valid Email Address is required.');
        email.style.borderColor = 'red';
        isValid = false;
    }

    if (message.value.trim().length < 10) {
        errors.push('Message must be at least 10 characters long.');
        message.style.borderColor = 'red';
        isValid = false;
    }

    if (isValid) {
        validationMessage.textContent = '✅ Message successfully submitted! We will contact you soon.';
        validationMessage.classList.add('success');
        document.getElementById('contact-form').reset(); 
    } else {
        validationMessage.innerHTML = '❌ Please correct the following errors:<br>' + errors.join('<br>');
        validationMessage.classList.add('error');
    }

    return isValid; 
}

document.addEventListener('DOMContentLoaded', () => {
    displayTimeBasedGreeting();

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', validateContactForm);
    }
    const editButton = document.getElementById('edit-button');
    if (editButton) {
        editButton.addEventListener('click', toggleEditMode);
    }
    const calculateButton = document.getElementById('calculate-button');
    if (calculateButton) {
        calculateButton.addEventListener('click', calculateTotalCredits);
    }
});
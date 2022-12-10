const registerForm = document.getElementById('register-form');

registerForm.addEventListener('submit', (e) => {
	e.preventDefault();
	const username = document.getElementById('username').value;
	const email = document.getElementById('email').value;
	const password = document.getElementById('password').value;
	const confirmPassword = document.getElementById('confirm-password').value;

	if (!validateUsername(username)) return;
	if (!validateEmail(email)) return;
	if (!validatePassword(password)) return;
	if (!validateConfirmPass(password, confirmPassword)) return;

	localStorage.setItem('user-email', email);

	registerUser({
		username,
		email,
		password,
		password_confirmation: confirmPassword,
	});
});

function validateUsername(username) {
	const usernameAlert = document.getElementById('username-alert');
	usernameAlert.style.display = 'block';
	if (!username) {
		usernameAlert.innerHTML = 'Username is required.';
		return false;
	}

	if (username.length < 5 || username.length > 15) {
		usernameAlert.innerHTML = 'Username must be between 5 and 15 characters.';
		return false;
	}

	const regex = /^[a-z]([a-z0-9])*[a-z]$/i;
	if (!regex.test(username)) {
		usernameAlert.innerHTML =
			'Username must contain only letters and numbers with no numbers at start or end.';
		return false;
	}

	usernameAlert.style.display = 'none';
	return true;
}

function validateEmail(email) {
	const emailAlert = document.getElementById('email-alert');
	emailAlert.style.display = 'block';

	if (!email) {
		emailAlert.innerHTML = 'Email is required.';
		return false;
	}

	const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if (!regex.test(email)) {
		emailAlert.innerHTML = 'Email must be a valid email address.';
		return false;
	}

	emailAlert.style.display = 'none';
	return true;
}

function validatePassword(password) {
	const passwordAlert = document.getElementById('password-alert');
	passwordAlert.style.display = 'block';

	if (!password) {
		passwordAlert.innerHTML = 'Password is required.';
		return false;
	}

	if (password.length < 8) {
		passwordAlert.innerHTML = 'Password must be at least 8 characters.';
		return false;
	}

	passwordAlert.style.display = 'none';
	return true;
}

function validateConfirmPass(password, confirmpass) {
	const confirmpassAlert = document.getElementById('confirmpass-alert');
	confirmpassAlert.style.display = 'block';

	if (!confirmpass) {
		confirmpassAlert.innerHTML = 'Password is required.';
		return false;
	}

	if (confirmpass.length < 8) {
		confirmpassAlert.innerHTML = 'Password must be at least 8 characters.';
		return false;
	}

	if (password !== confirmpass) {
		confirmpassAlert.innerHTML = 'Password and Confirm Password must match.';
		return false;
	}

	confirmpassAlert.style.display = 'none';
	return true;
}

function registerUser(user) {
	const url = 'https://goldblv.com/api/hiring/tasks/register';

	fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(user),
	})
		.then((response) => {
			if (response.status === 200) {
				clearForm();
				location.href = './login.html';
			}
		})
		.catch((error) => {
			console.error('Error:', error);
		});
}

function clearForm() {
	document.getElementById('username').value = '';
	document.getElementById('email').value = '';
	document.getElementById('password').value = '';
	document.getElementById('confirm-password').value = '';
}

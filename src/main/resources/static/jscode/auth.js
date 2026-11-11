export function initAuth() {
    const accountBtn = document.getElementById('accountBtn');
    const authModalOverlay = document.getElementById('authModalOverlay');
    const closeAuthBtn = document.getElementById('closeAuthBtn');
    const switchToRegister = document.getElementById('switchToRegister');
    const switchToLogin = document.getElementById('switchToLogin');
    const loginFormContainer = document.getElementById('loginFormContainer');
    const registerFormContainer = document.getElementById('registerFormContainer');

    if (accountBtn && authModalOverlay) {
        accountBtn.addEventListener('click', () => {
            authModalOverlay.classList.add('open');
        });
    }

    if (closeAuthBtn && authModalOverlay) {
        closeAuthBtn.addEventListener('click', () => {
            authModalOverlay.classList.remove('open');
        });
    }

    if (authModalOverlay) {
        authModalOverlay.addEventListener('click', (e) => {
            if (e.target === authModalOverlay) {
                authModalOverlay.classList.remove('open');
            }
        });
    }

    if (switchToRegister) {
        switchToRegister.addEventListener('click', (e) => {
            e.preventDefault();
            loginFormContainer.style.display = 'none';
            registerFormContainer.style.display = 'block';
        });
    }

    if (switchToLogin) {
        switchToLogin.addEventListener('click', (e) => {
            e.preventDefault();
            registerFormContainer.style.display = 'none';
            loginFormContainer.style.display = 'block';
        });
    }
}
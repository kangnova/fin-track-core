
const register = async () => {
    try {
        const response = await fetch('http://127.0.0.1:3000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: `test${Date.now()}@example.com`,
                password: 'password123',
                name: 'Test User'
            })
        });
        const data = await response.json();
        console.log('Register Response:', response.status, data);
        return data;
    } catch (error) {
        console.error('Register Error:', error);
    }
};

const login = async (email: string) => {
    try {
        const response = await fetch('http://127.0.0.1:3000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                password: 'password123'
            })
        });
        const data = await response.json();
        console.log('Login Response:', response.status, data);
        return data.data?.token;
    } catch (error) {
        console.error('Login Error:', error);
    }
};

const getProfile = async (token: string) => {
    try {
        const response = await fetch('http://127.0.0.1:3000/api/auth/me', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log('Profile Response:', response.status, data);
    } catch (error) {
        console.error('Profile Error:', error);
    }
};

const run = async () => {
    console.log('--- Starting Auth Verification ---');
    const regData = await register();
    if (regData && regData.success) {
        const email = regData.data.user.email;
        const token = await login(email);
        if (token) {
            await getProfile(token);
        }
    }
    console.log('--- Verification Complete ---');
};

run();

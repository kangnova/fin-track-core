
const BASE_URL = 'http://127.0.0.1:3000/api';

const registerAndLogin = async () => {
    const timestamp = Date.now();
    const email = `test${timestamp}@example.com`;

    try {
        // Register
        await fetch(`${BASE_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password: 'password123', name: 'Test User' })
        });

        // Login
        const res = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password: 'password123' })
        });

        const data = await res.json();
        return data.data.token;
    } catch (err) {
        console.error('Auth Error:', err);
    }
};

const run = async () => {
    console.log('--- Starting Core verification (JS) ---');
    try {
        const token = await registerAndLogin();
        if (!token) {
            console.error('Failed to get token');
            return;
        }
        console.log('Auth successful.');

        // 1. Create Category
        console.log('Creating Category...');
        const catRes = await fetch(`${BASE_URL}/categories`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: 'Salary', type: 'INCOME' })
        });
        const catData = await catRes.json();
        console.log('Create Category Status:', catRes.status, catData);

        if (catRes.status !== 200) {
            console.error('Failed to create category');
            return;
        }
        const categoryId = catData.data.id;

        // 2. Create Transaction
        console.log('Creating Transaction...');
        const transRes = await fetch(`${BASE_URL}/transactions`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                categoryId,
                amount: 5000000,
                date: new Date().toISOString(),
                note: 'February Salary'
            })
        });
        const transData = await transRes.json();
        console.log('Create Transaction Status:', transRes.status, transData);

        // 3. Get Transactions
        console.log('Getting Transactions...');
        const getTransRes = await fetch(`${BASE_URL}/transactions`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const getTransData = await getTransRes.json();
        console.log('Get Transactions Status:', getTransRes.status);
        console.log('Transaction Count:', getTransData.data ? getTransData.data.length : 0);
        console.log('Transaction Data:', getTransData.data);

    } catch (error) {
        console.error('Verification Error:', error);
    }
    console.log('--- Verification Complete ---');
};

run();

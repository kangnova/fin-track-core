
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
        if (!data || !data.data || !data.data.token) {
            console.error('Login Failed. Response:', JSON.stringify(data, null, 2));
            return null;
        }
        return data.data.token;
    } catch (err) {
        console.error('Auth Error:', err);
    }
};

const run = async () => {
    console.log('--- Starting Dashboard verification (JS) ---');
    try {
        const token = await registerAndLogin();
        if (!token) return console.error('Failed to get token');
        console.log('Auth successful.');

        // 1. Create Categories
        const incomeCatRes = await fetch(`${BASE_URL}/categories`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: 'Salary', type: 'INCOME' })
        });
        const incomeCat = (await incomeCatRes.json()).data;

        const expenseCatRes1 = await fetch(`${BASE_URL}/categories`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: 'Food', type: 'EXPENSE' })
        });
        const expenseCat1 = (await expenseCatRes1.json()).data;

        const expenseCatRes2 = await fetch(`${BASE_URL}/categories`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: 'Transport', type: 'EXPENSE' })
        });
        const expenseCat2 = (await expenseCatRes2.json()).data;

        console.log('Categories created.');

        // 2. Create Transactions
        // Income: +10,000,000
        await fetch(`${BASE_URL}/transactions`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ categoryId: incomeCat.id, amount: 10000000, date: new Date().toISOString() })
        });

        // Expense: -50,000 (Food)
        await fetch(`${BASE_URL}/transactions`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ categoryId: expenseCat1.id, amount: 50000, date: new Date().toISOString() })
        });

        // Expense: -20,000 (Transport)
        await fetch(`${BASE_URL}/transactions`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ categoryId: expenseCat2.id, amount: 20000, date: new Date().toISOString() })
        });

        console.log('Transactions created.');

        // 3. Verify Summary
        console.log('Verifying Summary...');
        const summaryRes = await fetch(`${BASE_URL}/dashboard/summary`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const summary = (await summaryRes.json()).data;
        console.log('Summary:', summary);

        // Expected: Income 10,000,000, Expense 70,000, Balance 9,930,000
        if (summary.totalIncome === 10000000 && summary.totalExpense === 70000 && summary.totalBalance === 9930000) {
            console.log('✅ Summary Correct');
        } else {
            console.error('❌ Summary Incorrect');
        }

        // 4. Verify Stats
        console.log('Verifying Stats...');
        const statsRes = await fetch(`${BASE_URL}/dashboard/stats`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const stats = (await statsRes.json()).data;
        console.log('Stats:', stats);

        if (stats.length === 2) {
            console.log('✅ Stats Correct (2 categories)');
        } else {
            console.error('❌ Stats Incorrect');
        }

    } catch (error) {
        console.error('Verification Error:', error);
    }
    console.log('--- Verification Complete ---');
};

run();

const API_URL = "http://localhost:3000";
let token = "";

async function signup() {
    const username = document.getElementById("signup-username").value;
    const password = document.getElementById("signup-password").value;

    try {
        const res = await axios.post(`${API_URL}/signup`, { username, password });
        alert(res.data.message);
    } catch (err) {
        alert(err.response.data.message);
    }
}

async function login() {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    try {
        const res = await axios.post(`${API_URL}/login`, { username, password });
        token = res.data.token;
        alert(res.data.message);
    } catch (err) {
        alert(err.response.data.message);
    }
}

async function getDashboard() {
    try {
        const res = await axios.get(`${API_URL}/dashboard`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        document.getElementById("dashboard-result").innerText = res.data.message;
    } catch (err) {
        alert(err.response.data.message);
    }
}

function logout() {
    token = "";

    document.getElementById("logout-result").innerText = "You have been logged out!";
}

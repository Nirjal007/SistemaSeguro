document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("http://localhost:7001/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.status === 200) {
            if (data.twoFAEnabled) {
                document.getElementById("2faInput").style.display = "block";
            } else {
                redirectToDashboard(data.role); // This function now handles frontend redirection
            }
        } else {
            alert(data.message);
        }
    } catch (error) {
        alert("Login failed: " + error.message);
    }
});

// Handle OTP verification
document.getElementById("enable2FA").addEventListener("click", async function () {
    const email = document.getElementById("email").value;
    const otp = document.getElementById("twoFACode").value;

    if (!otp) {
        alert("Please enter the 6-digit OTP");
        return;
    }

    try {
        const response = await fetch("http://localhost:7001/api/auth/verify-otp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, otp }),
        });

        const data = await response.json();

        if (response.status === 200) {
            alert("Login Successful!");
            redirectToDashboard(data.role); // Redirect to the dashboard based on the role
        } else {
            alert(data.message);
        }
    } catch (error) {
        alert("OTP verification failed: " + error.message);
    }
});

// Redirect user based on role after login or OTP verification
function redirectToDashboard(role) {
    switch (role) {
        case "Admin":
            window.location.href = "/admin/dashboard.html";
            break;
        case "Supplier":
            window.location.href = "/Supplier/dashboard.html";
            break;
        case "Manufacturer":
            window.location.href = "/Manufacturer/dashboard.html";
            break;
        case "Distributor":
            window.location.href = "/Distributor/dashboard.html";
            break;
        case "Retailer":
            window.location.href = "/Retailer/dashboard.html";
            break;
        default:
            window.location.href = "/"; // Redirect to home if role is unknown
    }
}


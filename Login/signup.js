document.getElementById("signupForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    // Get form input values
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const selectedRole = document.getElementById("role").value; // Single selected role
    const companyName = document.getElementById("companyName").value;
    const storeName = document.getElementById("storeName").value;
    const number = document.getElementById("contactNumber").value;

    try {
        // Send POST request to backend API for user registration
        const response = await fetch("http://localhost:7001/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ 
                email, 
                password, 
                roles: [selectedRole], // Send as an array to ensure the backend can handle it correctly
                companyName, 
                storeName, 
                number 
            })
        });

        // Parse response from server
        const data = await response.json();

        if (response.ok) {
            alert("Signup successful! Redirecting to login...");
            window.location.href = "login.html"; // Redirect to login page
        } else {
            alert(`Signup failed: ${data.message}`);
        }

    } catch (error) {
        console.error("Error:", error);
        alert(" Something went wrong. Please try again later.");
    }
});

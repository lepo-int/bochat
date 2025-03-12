const API_BASE_URL = "http://localhost:5000/api";

export const loginUser = async (data) => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        // if (!response.ok) {
        //     throw new Error("Login failed! Please check your credentials.");
        // }
        return await response.json();
    } catch (error) {
        console.error("API Error:", error.message);
        throw error;
    }
};


export const signupUser = async (data) => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        // if (!response.ok) {
        //     throw new Error("Signup failed! Please check the details and try again.");
        // }
        return await response.json();
    } catch (error) {
        console.error("API Error:", error.message);
        throw error;
    }
};


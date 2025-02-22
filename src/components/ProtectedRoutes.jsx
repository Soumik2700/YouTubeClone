import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

function ProtectedRoutes({ children }) {
    const navigate = useNavigate();
    const [isVerified, setIsVerified] = useState(false);

    useEffect(() => {
        const checkTokenValidity = async () => {
            const authToken = localStorage.getItem("authToken");
            if (!authToken) {
                console.log("No token found. Redirecting to login...");
                navigate("/signIn");
                return;
            }

            try {
                const response = await axios.get("http://localhost:3000/user/verify", {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });

                console.log("Token Verified:", response.data);
                setIsVerified(true);
            } catch (err) {
                console.error("Token validation failed:", err.response?.data?.message || err.message);
                localStorage.removeItem("authToken");
                localStorage.removeItem("user");
                navigate("/signIn"); // Redirect to login if token is invalid
            }
        };

        checkTokenValidity();
    }, [navigate]);

    return <>{isVerified && <Outlet/>}</>; // Render protected content if token is valid
}

export default ProtectedRoutes;

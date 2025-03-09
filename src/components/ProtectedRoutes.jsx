import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Outlet } from "react-router-dom";

function ProtectedRoutes() {
    const navigate = useNavigate();
    const [isVerified, setIsVerified] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkTokenValidity = async () => {
            const authToken = localStorage.getItem("authToken");
            if (!authToken) {
                console.log("No token found. Redirecting to login...");
                navigate("/signIn");
                return;
            }

            try {
                const response = await axios.get("https://youtubeclone-j6jr.onrender.com/user/verify", {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });
                
                setIsVerified(true);
            } catch (err) {
                console.error("Token validation failed:", err.response?.data?.message || err.message);
                localStorage.removeItem("authToken");
                localStorage.removeItem("user");
                navigate("/signIn");
                window.location.reload();
            } finally {
                setLoading(false);
            }
        };

        checkTokenValidity();
    }, [navigate]);

    if (loading) return <p>Loading...</p>; // Prevents rendering during token validation

    return isVerified && <Outlet />;
}

export default ProtectedRoutes;
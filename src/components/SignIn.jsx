import { useEffect, useState } from "react";
import "./SignIn.css";
import axios from "axios";
import { useNavigate, useOutletContext } from "react-router-dom";

function SignIn() {
    const [isSignUp, setIsSignUp] = useState(true); // Toggle between Sign Up & Login
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { isLogin, setIsLogin } = useOutletContext();
    const [messageText, setMessageText] = useState("")
   

    async function handelSubmit(event) {
        event.preventDefault();

        if (isSignUp) {
            if (!firstName || !lastName || !email || !password) {
                return alert("All fields are required!");
            }
        } else if (!email || !password) {
            return alert("Email and password both required!");
        }

        const userData = isSignUp ? { firstName, lastName, email, password } : { email, password };

        try {
            const response = await axios.post(`https://youtubeclone-j6jr.onrender.com/api/${isSignUp ? "signup" : "login"}`, userData);

            if (response.data.message){
                return alert(response.data.message);
            }

            if (response?.statusText) {
                setMessageText(response?.statusText);

                // Hide the message after 3 seconds
                setTimeout(() => {
                    setMessageText("");
                }, 3000);
            }

            const { userId ,email, username, channels, avatar } = response.data;
            const user = [userId, username, email, channels, avatar];

            if (response.data.token) {
                localStorage.setItem("authToken", response.data.token);
                localStorage.setItem("user", JSON.stringify(user));
                setIsLogin(true);
                navigate("/");
            }

        } catch (err) {
            alert(err.response?.data?.message || "Something went wrong!");
        }
    }


    return (
        <main className="SignIn flex-col justify-center items-center relative">
            {
                messageText === "Created" && <h1 className="messageBox">Registration Sucessful</h1>
            }

            <div className="form-container p-6 rounded-lg shadow-lg bg-gray-800">
                <h2 className="text-white text-2xl font-bold mb-4 text-center">
                    {isSignUp ? "Sign Up" : "Login"}
                </h2>

                <form className="flex flex-col space-y-3" onSubmit={handelSubmit}>
                    {isSignUp && (
                        <>
                            <label htmlFor="firstname" className="text-gray-300">First Name</label>
                            <input className="input-field" type="text" placeholder="Enter first name" onChange={isSignUp && ((e) => setFirstName(e.target.value.trim()))} />

                            <label htmlFor="lastname" className="text-gray-300">Last Name</label>
                            <input className="input-field" type="text" placeholder="Enter last name" onChange={isSignUp && ((e) => setLastName(e.target.value.trim()))} />
                        </>
                    )}

                    <label htmlFor="email" className="text-gray-300">Email</label>
                    <input
                        className="input-field"
                        type="email"
                        placeholder="Enter email"
                        onChange={((e) => setEmail(e.target.value.trim()))}
                    />

                    <label htmlFor="password" className="text-gray-300">Password</label>
                    <input
                        className="input-field"
                        type="password"
                        placeholder="Enter password"
                        onChange={(e) => setPassword(e.target.value.trim())}
                    />

                    <button className="submit-button" type="submit">
                        {isSignUp ? "Sign Up" : "Login"}
                    </button>
                </form>

                <p className="text-gray-400 text-sm text-center mt-4">
                    {isSignUp ? "Already have an account?" : "Don't have an account?"}
                    <span
                        className="text-blue-400 cursor-pointer ml-1 hover:underline"
                        onClick={() => setIsSignUp(!isSignUp)}
                    >
                        {isSignUp ? "Login" : "Sign Up"}
                    </span>
                </p>
            </div>
        </main>
    );
}

export default SignIn;

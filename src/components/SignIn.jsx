import { useEffect, useState } from "react";
import "./SignIn.css";

function SignIn() {
    const [isSignUp, setIsSignUp] = useState(true); // Toggle between Sign Up & Login
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        fetch("http://localhost:3000/api/signup").then(response => response.json()).then(data => {
            console.log(data);
        }).catch(err => console.log(err));
    }, [])

    function handelSubmit() {
        if (isSignUp) {
            if (!firstName || lastName || email || password) {
                alert("All fields are required!");
            }
        } else if (!email || !password) {
            alert("Email and password both required!");
        }
    }

    return (
        <main className="SignIn flex justify-center items-center">
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

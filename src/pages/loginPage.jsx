import { Link } from "react-router-dom";
import { useState } from "react"
import axios from "axios"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    function handleLogin() {
        console.log("Email:", email)
        console.log("Password:", password)
        //backend localhost:3000/users/login

        axios.post("http://localhost:3000/api/users/login", {
            email: email,
            password: password
        }).then((response) => {
            console.log("Login successful: ",response.data.token)
        }).catch((error) => {
            console.log("Login failed: ", error)
        })

    }

    return (
        <div className="w-full h-screen text-5xl flex items-center justify-center bg-[url('/login-bg.jpg')] bg-center bg-cover bg-no-repeat">
            <div className="w-1/2  h-full">

            </div>
            <div className="w-1/2 h-full flex justify-center items-center">
                <div className="w-[400px] h-[500px] backdrop-blur-lg rounded-xl shadow-2xl flex flex-col justify-center items-center">
                    <h1 className="text-4xl text-secondary font-bold mb-10">Sign In</h1>
                    <input onChange={(e)=>{setEmail(e.target.value)}} value={email} type="email" placeholder="Email" className="w-3/4 h-12 mb-5 rounded-lg px-4 text-lg focus:outline-none border border-gray-400 focus:ring-2 focus:ring-accent" />
                    <input onChange={(e)=>{setPassword(e.target.value)}} value={password} type="password" placeholder="Password" className="w-3/4 h-12 mb-2 rounded-lg px-4 text-lg focus:outline-none border border-gray-400 focus:ring-2 focus:ring-accent" />
                    <p className="w-3/4 text-right text-sm text-white mb-6">Forgot password? <Link to="/forgot-password" className="text-accent underline">Click here</Link></p>
                    <button onClick={handleLogin} className="w-3/4 h-12 bg-accent text-white rounded-lg text-lg font-semibold">Sign In</button>
                    <p className="text-sm text-white mt-6">Don't have an account? <Link to="/register" className="text-accent underline">Register</Link></p>
                </div>
            </div>
        </div>
    )
}
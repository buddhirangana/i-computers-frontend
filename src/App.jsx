import { Route, Routes } from "react-router-dom";
import "./App.css";
import AdminPage from "./pages/adminPage";
import HomePage from "./pages/homePage";
import TestPage from "./pages/test";
import LoginPage from "./pages/loginPage";
import { Toaster } from "react-hot-toast";
import RegisterPage from "./pages/registerPage";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ForgetPassword from "./pages/forgetPassword";
//716762410389-aj6869tdov6m97gtnjh7e8pffncvn0qe.apps.googleusercontent.com

function App() {
	return (
		<GoogleOAuthProvider clientId="716762410389-aj6869tdov6m97gtnjh7e8pffncvn0qe.apps.googleusercontent.com">			
			<div className="w-full h-screen flex justify-center items-center bg-primary text-secondary">
				<Toaster position="top-right" />
				<Routes>
					<Route path="/*" element={<HomePage />} />
					<Route path="/admin/*" element={<AdminPage />} />
					<Route path="/test" element={<TestPage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />
					<Route path="/forgot-password" element={<ForgetPassword />} />
				</Routes>
			</div>
		</GoogleOAuthProvider>
	);
}

export default App;
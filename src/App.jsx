import { Route, Routes } from "react-router-dom";
import "./App.css";
import AdminPage from "./pages/adminPage";
import HomePage from "./pages/homePage";
import LoginPage from "./pages/loginPage";
import { Toaster } from "react-hot-toast";
import RegisterPage from "./pages/registerPage";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ForgetPassword from "./pages/forgetPassword";

function App() {
	return (
		<GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>			
			<div className="w-full h-screen bg-primary text-secondary">
				<Toaster position="top-right" />
				<Routes>
					<Route path="/*" element={<HomePage />} />
					<Route path="/admin/*" element={<AdminPage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />
					<Route path="/forgot-password" element={<ForgetPassword />} />
				</Routes>
			</div>
		</GoogleOAuthProvider>
	);
}

export default App;
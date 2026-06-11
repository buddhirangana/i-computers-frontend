import { Route, Routes } from "react-router-dom";
import Header from "../components/header";
import ProductsPage from "./productsPage";
import ProductOverviewPage from "./productOverviewPage";
import CartPage from "./cart";
import CheckoutPage from "./checkout";
import CustomerOrdersPage from "./customerMyOrdersPage";
import SettingsPage from "./settings";
import BottomNavigationBar from "../components/bottomNavigationBar";
import NotFoundPage from "./notFoundPage";
import LandingPage from "./landingPage";
import AboutUsPage from "./aboutUsPage";
import ContactUsPage from "./contactUsPage";
import Footer from "../components/footer";
import PrivacyPolicy from "./privacyPolicy";
import TermsOfUse from "./termsOfUse";
import ReturnsRefunds from "./returnsRefunds";
import Warranty from "./warranty";
import FAQ from "./faq";

export default function HomePage(){
    return(
        <div className="w-full h-screen flex flex-col  ">
            <Header/>
            <div className="w-full min-h-[calc(100%-80px)] overflow-y-scroll">
                <Routes>
                    <Route path="/" element={<LandingPage/>} />
                    <Route path="/products" element={<ProductsPage/>} />
                    <Route path="/about-us" element={<AboutUsPage/>} />
                    <Route path="/contact-us" element={<ContactUsPage/>} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy/>} />
                    <Route path="/terms-of-use" element={<TermsOfUse/>} />
                    <Route path="/returns-refunds" element={<ReturnsRefunds/>} />
                    <Route path="/warranty" element={<Warranty/>} />
                    <Route path="/faq" element={<FAQ/>} />
                    <Route path="/overview/:productId" element={<ProductOverviewPage/>} />
                    <Route path="/cart" element={<CartPage/>} />
                    <Route path="/my-orders" element={<CustomerOrdersPage/>} />
                    <Route path="/settings" element={<SettingsPage/>} />
                    <Route path="/checkout" element={<CheckoutPage/>} />
                    <Route path="/*" element={<NotFoundPage/>} />
                </Routes>
                <Footer />
                <BottomNavigationBar/>
            </div>
        </div>
    )
}

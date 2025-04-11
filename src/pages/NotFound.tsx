// ==============================
// File: pages/NotFound.tsx
// ==============================
// 404 Page Component
// Displays a user-friendly message when a route is not found
// Logs the attempted invalid route to the console for debugging
// ==============================

import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
    // Get current location object from react-router
    const location = useLocation();

    // Log the attempted path to console for debugging
    useEffect(() => {
        console.error(
            "404 Error: User attempted to access non-existent route:",
            location.pathname
        );
    }, [location.pathname]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center">
                {/* Large Error Code */}
                <h1 className="text-4xl font-bold mb-4">404</h1>

                {/* Friendly message for the user */}
                <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>

                {/* Link back to home page */}
                <a href="/" className="text-blue-500 hover:text-blue-700 underline">
                    Return to Home
                </a>
            </div>
        </div>
    );
};

export default NotFound;
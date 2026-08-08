import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/common/ProtectedRoute";

function App() {

    return (

            <Routes>

                {/* Public route */}
                <Route
                    path="/login"
                    element={<Login />}
                />

                {/* Protected route */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

            </Routes>
    

    );
}

export default App;
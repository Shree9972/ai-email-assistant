import useAuth from "./hooks/useAuth";
import ProtectedRoute from "./components/ProtectedRoute";

function App() 
{
    const { user, setUser, loading , checkAuth } = useAuth();

    if(loading) 
    {
        return <h1>Loading...</h1>;
    }

    console.log(user);

    return (
        
        <ProtectedRoute />
    );
}

export default App;
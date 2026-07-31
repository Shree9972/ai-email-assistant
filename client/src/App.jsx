import useAuth from "./hooks/useAuth";

function App() {

    const { user } = useAuth();

    console.log(user);

    return (
        <h1>AI Email Assistant</h1>
    );
}

export default App;
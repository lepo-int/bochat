import { BrowserRouter as Router } from "react-router-dom";
import AuthProvider from "./Hooks/authProvider";
import AppRoutes from "./Routers";
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Router>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;

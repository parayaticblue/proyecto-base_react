
import { useNavigate, useLocation } from 'react-router';
import { useAuth } from '../../../context/Auth/AuthContext';



const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (e) => {
    e.preventDefault();
    login();
    const from = location.state?.from?.pathname || "/";
    navigate(from, { replace: true });
  };

  return (
    <div className="container mx-auto px-4 mt-20 max-w-md ">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Login de prueba</h2>
      <form onSubmit={handleLogin} className="space-y-6">
        <div className="space-y-2">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
          />
        </div>
        <div className="space-y-2">
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
        >
          Login
        </button>
        <div className="flex items-center justify-between mt-4">
          <a href="/register" className="text-blue-600 hover:text-blue-500">Registro de cuenta</a>
          <a href="/forgot-password" className="text-blue-600 hover:text-blue-500">Olvido su Password</a>
        </div>
        <div className="flex items-center justify-center mt-4">
          <span className="text-gray-500">or</span>
        </div>
        <div className="flex items-center justify-center mt-4">
          <button className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200">
            Login with Google
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
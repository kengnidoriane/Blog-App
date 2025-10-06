import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { authService } from '../services/api';
import { loginSchema } from '../lib/validations';
import secure from '../assets/secure.png';
import Logo from '../assets/logo1.png';

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm({
    resolver: zodResolver(loginSchema),
  });
  
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await authService.login(data);
      console.log('Response login:', response.data);
      login(response.data);
      navigate('/');
    } catch (err) {
      setError('root', {
        message: err.response?.data?.message || 'Une erreur est survenue'
      });
    }
  };
  

  return (
    <div className="flex h-screen">
      <div className="hidden md:flex w-1/2 items-center justify-center">
        <img src={secure} alt="Connexion Image" className="max-w-md" />
      </div>
      <div className="flex w-full md:w-1/2 flex-col items-center justify-center bg-green-50 p-8">
        <div className="mb-8">
          <img src={Logo} alt="Logo" className="w-24 rounded-lg" />
        </div>
        <div className="w-full max-w-md space-y-6">
          <h1 className="text-3xl font-bold text-center">Log In</h1>
          {errors.root && (
            <div className="bg-red-100 text-red-700 p-3 rounded">
              {errors.root.message}
            </div>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <input
                {...register('email')}
                type="email"
                placeholder="Email"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>
            <div>
              <input
                {...register('password')}
                type="password"
                placeholder="Password"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-green-700 text-white p-3 rounded-md hover:bg-green-800 disabled:opacity-50"
            >
              {isSubmitting ? 'Connexion...' : 'Log in'}
            </button>
          </form>
          <p className="text-center">
            Dont have an account yet? <Link to="/signup" className="text-blue-500 underline">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
 
  );
};

export default LoginPage;

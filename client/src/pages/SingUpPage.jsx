import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import AuthService from '../services/AuthService';
import { signupSchema } from '../lib/validations';
import Logo from '../assets/logo1.png';
import signup from '../assets/signUpImage.png';
import { uploadImage } from '../config/uploadImage';

const SignupPage = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm({
    resolver: zodResolver(signupSchema),
  });
  
  const [image, setImage] = useState(null);
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const onSubmit = async (data) => {
    try {
      let imageUrl = null;
      
      if (image) {
        try {
          imageUrl = await uploadImage(image, 'profileImages');
        } catch (uploadError) {
          console.warn('Erreur upload image, inscription sans image:', uploadError);
        }
      }

      const response = await AuthService.signUp({
        ...data,
        image: imageUrl
      });
      
      login({
        user: response.user,
        token: response.token
      });
      
      navigate('/');
    } catch (err) {
      setError('root', {
        message: err.response?.data?.message || 'Une erreur est survenue lors de l\'inscription'
      });
    }
  };

  return (
    <div className="flex h-screen">
      <div className="hidden md:flex w-1/2 items-center justify-center">
        <img src={signup} alt="Inscription Image" className="max-w-md" />
      </div>
      <div className="flex w-full md:w-1/2 flex-col items-center justify-center bg-green-50 p-8">
        <div className="mb-8">
          <img src={Logo} alt="Logo" className="w-24 rounded-lg" />
        </div>
        <div className="w-full max-w-md space-y-6">
          <h1 className="text-3xl font-bold text-center">Create your account</h1>
          {errors.root && (
            <div className="bg-red-100 text-red-700 p-3 rounded">
              {errors.root.message}
            </div>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <p className="text-sm text-gray-500 mt-1">Photo de profil (optionnel)</p>
            </div>
            <div>
              <input
                {...register('name')}
                placeholder="Name"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>
            <div>
              <input
                {...register('username')}
                placeholder="Username"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
              )}
            </div>
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
            <div>
              <input
                {...register('confirmPassword')}
                type="password"
                placeholder="Confirm Password"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-green-700 text-white p-3 rounded-md hover:bg-green-800 disabled:opacity-50"
            >
              {isSubmitting ? 'Inscription...' : 'Sign Up'}
            </button>
          </form>
          <p className="text-center">
            Already have an account? <Link to='/login' className='text-blue-500 underline'>Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;


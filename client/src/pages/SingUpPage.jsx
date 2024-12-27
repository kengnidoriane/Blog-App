

import  { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
import AuthService from '../services/AuthService';
import { validateEmail, validatePassword, validateName } from '../utils/validators';
import { Stack, Box, TextField, Button, Typography, CircularProgress } from '@mui/material';
import Logo from '../assets/logo1.png';
import signup from '../assets/signUpImage.png';
import { uploadImage } from '../config/uploadImage';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // const { signUp } = useAuth();
  const navigate = useNavigate();
  
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    // Validation
    if (!validateName(formData.name)) {
      setError('Nom invalide');
      setIsLoading(false);
      return;
    }
    if (!validateEmail(formData.email)) {
      setError('Email invalide');
      setIsLoading(false);
      return;
    }
    if (!validatePassword(formData.password)) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      setIsLoading(false);
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      setIsLoading(false);
      return;
    }

    try {
      let imageUrl = null;
      if (image) {
        imageUrl = await uploadImage(image, 'profileImages');
      }

      await AuthService.signUp({formData, imageUrl});
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Une erreur est survenue lors de l\'inscription');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Stack
      direction={'row'}
      alignItems={'center'}
      justifyContent={'center'}
      height={'100vh'}
      width={'100vw'}
    >
      <Box className='hidden md:flex h-full w-1/2 flex-col gap-4 items-center justify-center'>
        <img src={signup} alt="Connexion Image" />
      </Box>
      <Stack className='h-full w-full md:w-1/2 flex flex-col gap-4 items-center justify-center bg-[#def3df]'>
        <Box className='flex justify-center align-center' >
          <img src={Logo} alt="" className='w-2/5 bg-center rounded-lg'/>
        </Box>
        <Stack
          width={'60%'}
          gap={5}
          className='h-4/5 w-96'
        >
          <Typography variant='h4' textAlign={'center'} className='mb-8 text-center'>Create your account</Typography>
          <form onSubmit={handleSubmit}>
            <Stack direction={"column"} gap={4}>
              {error && <Typography color="error">{error}</Typography>}
              <TextField 
                type="file" 
                inputProps={{ accept: 'image/*' }} 
                onChange={handleImageUpload}
              />
              <TextField 
                name="name"
                label="Name" 
                variant="outlined" 
                value={formData.name}
                onChange={handleChange}
                required 
              />
              <TextField 
                name="username"
                label="Username" 
                variant="outlined" 
                value={formData.username}
                onChange={handleChange}
                required 
              />
              <TextField 
                name="email"
                label="Email" 
                variant="outlined" 
                type='email' 
                value={formData.email}
                onChange={handleChange}
                required 
              />
              <TextField 
                name="password"
                label="Password" 
                variant="outlined" 
                type='password'  
                value={formData.password}
                onChange={handleChange}
                required 
              />
              <TextField 
                name="confirmPassword"
                label="Confirm Password" 
                variant="outlined" 
                type='password'  
                value={formData.confirmPassword}
                onChange={handleChange}
                required 
              />
              <Button   
                style={{
                  backgroundColor: "#007b2d",
                  padding: "12px 36px",
                  fontSize: "18px"
                }} 
                variant="contained" 
                type='submit' 
                className='connexion__button'
                disabled={isLoading}
              >
                {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
              </Button>
            </Stack>
          </form>
        </Stack> 
        <p>Already have an account? <Link to='/login' className='text-blue-500 underline font-medium'>Log In</Link></p>
      </Stack>
    </Stack>
  );
};

export default SignupPage;


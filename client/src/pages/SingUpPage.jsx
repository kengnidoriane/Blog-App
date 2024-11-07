import  { useState } from 'react';
import {  useNavigate, Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth';
import { validateEmail, validatePassword,validateName } from '../utils/validators';
import { Stack, Box, TextField, Button, Typography } from '@mui/material';
import Logo from '../assets/logo1.png'
import signup from '../assets/signUpImage.png'
import { uploadImage } from '../config/uploadImage';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signUp } = useAuth()
  const navigate = useNavigate()
  
  const [image, setImage] = useState(null);


  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    setImage(file);

    if (file) {
      try {
        const imageUrl = await uploadImage(file, 'profileImages');
        console.log('image telecharger avec success:', imageUrl);
        
      } catch (error) {
        console.error('Erreur lors du telechagement de l\'image de profil', error);
        return;
        
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!validateName(name)) {
      setError('Nom invalide')
      return;
    };

    if (!validateEmail(email)) {
      setError('Invalid Email')
      return;
    };

    if (!validatePassword(password)) {
      setError('Password must contain at least 6 caracters')
    }
    try {
      
      let imageUrl = null;

      if (image) {
        imageUrl = await uploadImage(image, 'profileImages');
      }

      await signUp(name, userName, email, password, imageUrl);
      navigate('/dashboard');

    } catch (err) {
      setError(err.message || 'Une erreur est survenue lors de l\'inscription')
    
      
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
          className='h-4/5 w-96 '
        >
        <Typography variant='h4' textAlign={'center'} className='mb-8 text-center'>Create your account</Typography>
        <form action="post" onSubmit={handleSubmit}>
        <Stack direction={"column"} gap={4}>
          {error && <p>{error}</p>}
          <TextField 
            type="file" 
            inputProps={{ accept: 'image/*' }} 
            onChange={handleImageUpload}
          />
          <TextField 
            id="outlined-basic" 
            label="Name" 
            variant="outlined" 
            type='text' 
            onChange={(e) => setName(e.target.value)}
            required 
          />
          
          <TextField 
            label="Username" 
            variant="outlined" 
            type='text' 
            onChange={(e) => setUserName(e.target.value)}
            required 
          />
          <TextField 
             
            label="Email" 
            variant="outlined" 
            type='email' 
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
          <TextField 
            label="Password" 
            variant="outlined" 
            type='password'  
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
          <TextField 
            label="Password Confirmation" 
            variant="outlined" 
            type='password'  
            required 
          />
          <Button   style={{
            backgroundColor: "#007b2d",
            padding: "12px 36px",
            fontSize: "18px"
            }} 
            variant="contained" 
            type='submit' 
            className='connexion__button'
          >Sign Up
          </Button>
        </Stack>
        </form>
      </Stack> 
     <p className=''>Already have an account <Link to='/login' className='text-blue-500 underline font-medium'>Log In</Link></p>

    </Stack>
   </Stack>
   
  );
};

export default SignupPage;

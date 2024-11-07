import { useState, } from 'react';
import { useNavigate, Link  } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { validateEmail, validatePassword } from '../utils/validators';
import { Box, Stack, TextField, Button, Typography } from '@mui/material';
import secure from '../assets/secure.png'
import Logo from '../assets/logo1.png'


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } =  useAuth();
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (validateEmail(email)) {
      setError('Email invalide');
      return;
    }

    if (validatePassword(password)) {
      setError('Le mot de passe doit obtenir au moins 6 caracteres')
    }
    console.log({email, password});

    try {
      await login(email, password);
      navigate('/dashboard')
    } catch (err) {
      setError(err.message || 'Une erreur est survenue lors de la connexion')
    }
    // await axios.post('http://localhost:5000/api/')
  };
  

  return (
    <Stack 
    direction={'row'}
  
    alignItems={'center'}
    justifyContent={'center'}
    height={'100vh'}
    width={'100vw'}
     >
      <Box  className='hidden md:flex h-full w-1/2 flex-col gap-4 items-center justify-center'>
          <img src={secure} alt="Connexion Image" />
      </Box>
      <Stack className='h-full w-full md:w-1/2 flex flex-col gap-8 items-center justify-evenly bg-[#def3df]'>
        <Box >
          <img src={Logo} alt="" className='w-24 rounded-lg mb-3'/>
        </Box>
        <Stack
          width={'60%'}
          gap={10}
          className='h-2/5 w-96 border '
        >
        <Typography variant='h4' textAlign={'center'} className='mb-8 sm:mb-4 text-center'>Log In</Typography>
        <form action="post" onSubmit={handleSubmit}>
        <Stack direction={"column"} gap={4}>
          {error && <p>{error}</p>}
          <TextField 
                     id="outlined-basic" 
                     label="Email" 
                     variant="outlined" 
                     type='email' 
                     onChange={(e)=> setEmail(e.target.value)}
                     required />
          <TextField id="outlined-basic" 
                     label="Password" 
                     variant="outlined" 
                     type='password'  
                     onChange={(e)=> setPassword(e.target.value)}
                     required />
          <Button   style={{
            backgroundColor: "#007b2d",
            padding: "12px 36px",
            fontSize: "18px"
            }} 
            variant="contained" 
            type='submit' 
            className='connexion__button'>Log in</Button>
        </Stack>
        </form>
      </Stack> 
      <p className='text-md mt-4'>Dont have an account yet please <Link to="/signup" className='text-blue-500 underline font-medium'>Sign Up</Link> </p>
    </Stack>
     
   </Stack>
 
  );
};

export default LoginPage;

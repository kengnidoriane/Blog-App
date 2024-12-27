import { useState, } from 'react';
import { useNavigate, Link  } from 'react-router-dom';
import {useAuth} from '../context/AuthContext';
import { authService } from '../services/api'
// import { validateEmail, validatePassword } from '../utils/validators';
import { Box, Stack, TextField, Button, Typography } from '@mui/material';
import secure from '../assets/secure.png'
import Logo from '../assets/logo1.png'


const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const { dispatch } =  useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await authService.login(formData);
      dispatch({
        type: 'LOGIN',
        payload: {
          user: response.user,
          token: response.token
        }
      });
      navigate('/');
    }
    catch (err) {
      setError(err.response?.data?.message || 'Une errreur est survenue')
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
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded">{error}</div>
        )}
        <form action="post" onSubmit={handleSubmit}>
        <Stack direction={"column"} gap={4}>
          <TextField 
                     id="outlined-basic" 
                     label="Email" 
                     variant="outlined" 
                     type='email' 
                     onChange={handleChange}
                     required />
          <TextField id="outlined-basic" 
                     label="Password" 
                     variant="outlined" 
                     type='password'  
                     onChange={handleChange}
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

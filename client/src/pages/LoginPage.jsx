import { useState, } from 'react';
import axios from 'axios'
import { Box, Stack, TextField, Button, Typography } from '@mui/material';
import secure from '../assets/secure.png'
import Logo from '../assets/logo1.png'
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/')
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
      <Stack className='h-full w-full md:w-1/2 flex flex-col gap-4 items-center justify-around bg-[#def3df]'>
        <Box >
          <img src={Logo} alt="" className='w-24 rounded-lg mb-3'/>
        </Box>
        <Stack
          width={'60%'}
          gap={10}
          className='h-4/5 w-96 border '
        >
        <Typography variant='h4' textAlign={'center'} className='mb-8 text-center'>Log In</Typography>
        <form action="post" onSubmit={handleSubmit}>
        <Stack direction={"column"} gap={4}>
          
          <TextField id="outlined-basic" label="Email" variant="outlined" type='email' required />
          <TextField id="outlined-basic" label="Password" variant="outlined" type='password'  required />
          <Button   style={{
            backgroundColor: "#007b2d",
            padding: "12px 36px",
            fontSize: "18px"
            }} 
            variant="contained" type='submit' className='connexion__button'>Log in</Button>
        </Stack>
        </form>
      </Stack> 
    </Stack>
     
   </Stack>
    // <Container>
    //   <Typography variant="h4" gutterBottom>Connexion</Typography>
    //   <form onSubmit={handleSubmit}>
    //     <TextField
    //       fullWidth
    //       label="Email"
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //       margin="normal"
    //     />
    //     <TextField
    //       fullWidth
    //       label="Mot de passe"
    //       type="password"
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //       margin="normal"
    //     />
    //     <Button variant="contained" color="primary" type="submit">Se connecter</Button>
    //   </form>
    // </Container>
  );
};

export default LoginPage;

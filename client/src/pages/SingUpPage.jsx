import  { useState, useNavigate } from 'react';
import axios from 'axios';
import { Stack, Box, TextField, Button, Typography } from '@mui/material';
import Logo from '../assets/logo1.png'
import signup from '../assets/signUpImage.png'
import { uploadImage } from '../config/uploadImage';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
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
   
    try {
      
      let imageUrl = null;

      if (image) {
        imageUrl = await uploadImage(image, 'profileImages');
      }

      const userData = {
        name,
        username: userName,
        email,
        password,
        image: imageUrl
      };

      console.log('Données envoyées:', userData); // Pour le débogage

      const response = await axios.post('http://localhost:5000/api/user/register', userData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Réponse du serveur:', response.data);
      console.log('utilisateur enregistre:', response.data);
      
      
    } catch (error) {
      console.error('Erreur détaillée:', error);
    
      if (error.response) {
        // Le serveur a répondu avec un status code en dehors de 2xx
        console.error('Erreur serveur:', error.response.data);
        alert(error.response.data.message || 'Erreur lors de l\'inscription');
      } else if (error.request) {
        // La requête a été faite mais pas de réponse
        console.error('Pas de réponse du serveur');
        alert('Impossible de contacter le serveur');
      } else {
        // Erreur lors de la configuration de la requête
        console.error('Erreur:', error.message);
        alert('Erreur lors de l\'inscription');
      }
    }

    // ****************
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
        <Box >
          <img src={Logo} alt="" className='w-24 rounded-lg'/>
        </Box>
        <Stack
          width={'60%'}
          gap={5}
          className='h-4/5 w-96 border '
        >
        <Typography variant='h4' textAlign={'center'} className='mb-8 text-center'>Create your account</Typography>
        <form action="post" onSubmit={handleSubmit}>
        <Stack direction={"column"} gap={4}>
          
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
            id="outlined-basic" 
            label="Username" 
            variant="outlined" 
            type='text' 
            onChange={(e) => setUserName(e.target.value)}
            required 
          />
          <TextField 
            id="outlined-basic" 
            label="Email" 
            variant="outlined" 
            type='email' 
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
          <TextField 
            id="outlined-basic" 
            label="Password" 
            variant="outlined" 
            type='password'  
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
          <TextField 
            id="outlined-basic" 
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
    </Stack>
     
   </Stack>
    // <Container>
    //   <Typography variant="h4" gutterBottom>Inscription</Typography>
    //   <form onSubmit={handleSubmit}>
    //     <TextField
    //       fullWidth
    //       label="Nom"
    //       value={name}
    //       onChange={(e) => setName(e.target.value)}
    //       margin="normal"
    //     />
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
    //     <Button variant="contained" color="primary" type="submit">Sinscrire</Button>
    //   </form>
    // </Container>
  );
};

export default SignupPage;

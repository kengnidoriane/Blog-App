import { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Link,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Hidden,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from '../assets/logo1.png';
import '../index.css'

const Navbar = () => {
  const [connected, setConnected] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{  backgroundColor: 'white' }} className='w-full'>
      <Toolbar  sx={{display: 'flex', justifyContent: 'space-between'}}>
        <Link href='/'>
          <Box
            component='img'
            sx={{
              maxWidth: '100px',
              maxHeight: '40px',
              borderRadius: '20%',
              margin: '0 20px'
            }}
            src={Logo}
          />
        </Link>
        
        <Box sx={{ display: { xs: 'none', md: 'flex' }}}>
          <Box sx={{ display: 'flex', border: '.1px solid black', borderRadius: '10px', padding: '0 10px', width: '100%' }}>
            <IconButton type="submit" aria-label="search">
              <SearchIcon />
            </IconButton>
            <InputBase
              placeholder="Rechercher..."
              inputProps={{ 'aria-label': 'search' }}
              
            />
          </Box>
        </Box>
        {/* bouton a mettre sur petit ecran */}
        <Hidden mdUp>
          <IconButton
            size="large"
            aria-label="menu"
            onClick={handleMenuOpen}
            sx={{ color: '#007b2d' }}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
          {(!connected) ? (
            <>
              <Link href='login' className=" no-underline text-black" sx={{ '&:hover': { backgroundColor: '#def3df' }, color: '#007b2d' }}>
                Log in
              </Link>
              <Link href='/signup' className="link-navbar  ml-3 p-2 rounded" sx={{ '&:hover': { backgroundColor: '#def3df' }, border: '1px solid #007b2d', color: '#007b2d', marginLeft: '12px' }}>
                Create Account
              </Link>
            </>
          ) : (
            <>
              <Link href='/create-post' className="text-black" sx={{ '&:hover': { backgroundColor: '#def3df' }, border: '1px solid #007b2d', color: '#007b2d', marginRight: '12px' }}>
                Create post
              </Link>
              <img src={Logo} alt="" className='w-10 rounded' />
            </>
          )}
        </Box>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          
        >
          {(connected) ? (
            <>
              <MenuItem onClick={handleMenuClose} component={Link} href='/login'>Log in</MenuItem>
              <MenuItem onClick={handleMenuClose} component={Link} href='/signup'>Create Account</MenuItem>
            </>
          ) : (
            <>
              <MenuItem onClick={handleMenuClose} component={Link} href='/create-post'>Create post</MenuItem>
              <MenuItem onClick={handleMenuClose} component={Link} href='/user-profile'>Profile</MenuItem>
              <MenuItem onclick={handleMenuClose} component={Link} href='/login'>SignOut</MenuItem>
            </>
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;



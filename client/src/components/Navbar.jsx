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
  Button,
  Avatar
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from '../assets/logo1.png';
import '../index.css'
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, user,  dispatch } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMobileMenuAnchor(null);
  };

  const handleLogout = async () => {
    dispatch({ type: 'LOGOUT'})
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'white' }} className='w-full'>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Link href='/' sx={{ textDecoration: 'none' }}>
          <Box
            component='img'
            sx={{
              maxWidth: '100px',
              maxHeight: '40px',
              borderRadius: '20%',
              margin: '0 20px'
            }}
            src={Logo}
            alt="Logo"
          />
        </Link>

        {/* Barre de recherche */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 1, mx: 2 }}>
          <Box sx={{ 
            display: 'flex', 
            border: '1px solid #ddd', 
            borderRadius: '10px', 
            padding: '0 10px',
            width: '100%',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            <IconButton type="submit" aria-label="search">
              <SearchIcon />
            </IconButton>
            <InputBase
              fullWidth
              placeholder="Rechercher..."
              inputProps={{ 'aria-label': 'search' }}
            />
          </Box>
        </Box>

        {/* Menu Desktop */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
          {isAuthenticated ? (
            <>
              <Button
                href='/create-post'
                variant="outlined"
                sx={{ 
                  mr: 2,
                  color: '#007b2d',
                  borderColor: '#007b2d',
                  '&:hover': { backgroundColor: '#def3df' }
                }}
              >
                Create Post
              </Button>
              <IconButton
                onClick={handleMenuOpen}
                sx={{ p: 0 }}
              >
                <Avatar
                  alt={user?.name}
                  src={user?.profileImage}
                  sx={{ width: 40, height: 40 }}
                />
              </IconButton>
            </>
          ) : (
            <>
              <Button
                href='/login'
                sx={{ color: '#007b2d', mr: 1 }}
              >
                Log in
              </Button>
              <Button
                href='/signup'
                variant="outlined"
                sx={{ 
                  color: '#007b2d',
                  borderColor: '#007b2d',
                  '&:hover': { backgroundColor: '#def3df' }
                }}
              >
                Create Account
              </Button>
            </>
          )}
        </Box>

        {/* Menu Mobile */}
        <IconButton
          sx={{ display: { xs: 'flex', md: 'none' }, color: '#007b2d' }}
          onClick={handleMobileMenuOpen}
        >
          <MenuIcon />
        </IconButton>

        {/* Menus déroulants */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          {isAuthenticated && (
            <>
              <MenuItem onClick={handleMenuClose} component={Link} href="/profile">
                Profile
              </MenuItem>
              <MenuItem onClick={handleMenuClose} component={Link} href="/settings">
                Settings
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                Logout
              </MenuItem>
            </>
          )}
        </Menu>

        <Menu
          anchorEl={mobileMenuAnchor}
          open={Boolean(mobileMenuAnchor)}
          onClose={handleMenuClose}
        >
          {isAuthenticated ? (
            <>
              <MenuItem onClick={handleMenuClose} component={Link} href="/create-post">
                Create Post
              </MenuItem>
              <MenuItem onClick={handleMenuClose} component={Link} href="/profile">
                Profile
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                Logout
              </MenuItem>
            </>
          ) : (
            <>
              <MenuItem onClick={handleMenuClose} component={Link} href="/login">
                Log in
              </MenuItem>
              <MenuItem onClick={handleMenuClose} component={Link} href="/signup">
                Create Account
              </MenuItem>
            </>
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

// const Navbar = () => {
//   const [connected, setConnected] = useState(false);
//   const [anchorEl, setAnchorEl] = useState(null);

//   const handleMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <AppBar position="static" sx={{  backgroundColor: 'white' }} className='w-full'>
//       <Toolbar  sx={{display: 'flex', justifyContent: 'space-between'}}>
//         <Link href='/'>
//           <Box
//             component='img'
//             sx={{
//               maxWidth: '100px',
//               maxHeight: '40px',
//               borderRadius: '20%',
//               margin: '0 20px'
//             }}
//             src={Logo}
//           />
//         </Link>
        
//         <Box sx={{ display: { xs: 'none', md: 'flex' }}}>
//           <Box sx={{ display: 'flex', border: '.1px solid black', borderRadius: '10px', padding: '0 10px', width: '100%' }}>
//             <IconButton type="submit" aria-label="search">
//               <SearchIcon />
//             </IconButton>
//             <InputBase
//               placeholder="Rechercher..."
//               inputProps={{ 'aria-label': 'search' }}
              
//             />
//           </Box>
//         </Box>
//         {/* bouton a mettre sur petit ecran */}
//         <Hidden mdUp>
//           <IconButton
//             size="large"
//             aria-label="menu"
//             onClick={handleMenuOpen}
//             sx={{ color: '#007b2d' }}
//           >
//             <MenuIcon />
//           </IconButton>
//         </Hidden>
//         <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
//           {(!connected) ? (
//             <div>
//               <Link href='login' className=" no-underline text-black" sx={{ '&:hover': { backgroundColor: '#def3df' }, color: '#007b2d' }}>
//                 Log in
//               </Link>
//               <Link href='/signup' className="link-navbar  ml-3 p-2 rounded" sx={{ '&:hover': { backgroundColor: '#def3df' }, border: '1px solid #007b2d', color: '#007b2d', marginLeft: '12px' }}>
//                 Create Account
//               </Link>
//             </div>
//           ) : (
//             <div>
//               <Link href='/create-post' className="text-black" sx={{ '&:hover': { backgroundColor: '#def3df' }, border: '1px solid #007b2d', color: '#007b2d', marginRight: '12px' }}>
//                 Create post
//               </Link>
//               <img src={Logo} alt="" className='w-10 rounded' />
//             </div>
//           )}
//         </Box>
//         <Menu
//           anchorEl={anchorEl}
//           open={Boolean(anchorEl)}
//           onClose={handleMenuClose}
          
//         >
//           {(connected) ? (
//             <div>
//               <MenuItem onClick={handleMenuClose} component={Link} href='/login'>Log in</MenuItem>
//               <MenuItem onClick={handleMenuClose} component={Link} href='/signup'>Create Account</MenuItem>
//             </div>
//           ) : (
//             <div>
//               <MenuItem onClick={handleMenuClose} component={Link} href='/create-post'>Create post</MenuItem>
//               <MenuItem onClick={handleMenuClose} component={Link} href='/user-profile'>Profile</MenuItem>
//               <MenuItem onclick={handleMenuClose} component={Link} href='/login'>SignOut</MenuItem>
//             </div>
//           )}
//         </Menu>
//       </Toolbar>
//     </AppBar>
//   );
// }

// export default Navbar;



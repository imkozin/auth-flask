import { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import MenuIcon from '@mui/icons-material/Menu'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

const drawerWidth = 240

function Navbar(props) {
  const { window } = props
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    console.log('Token:', token)
    token ? setIsLoggedIn(true) : setIsLoggedIn(false)
  }, [location])

  const handleLogout = () => {
    localStorage.removeItem('access_token')
    setIsLoggedIn(false)
    navigate('/login')
  }



  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState)
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        IvanTech
      </Typography>
      <Divider />
      <List>
        {isLoggedIn ? (
          <>
            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }}>
                <Link
                  to={'/orgs'}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <ListItemText primary="Organization" />
                </Link>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }}>
                <Link
                  to={'/users'}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <ListItemText primary="Team" />
                </Link>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }}>
                <Link
                  onClick={handleLogout}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <ListItemText primary="Logout" />
                </Link>
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <>
            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }}>
                <Link
                  to={'/'}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <ListItemText primary="Home" />
                </Link>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }}>
                <Link
                  to={'/login'}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <ListItemText primary="Login" />
                </Link>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }}>
                <Link
                  to={'/register'}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <ListItemText primary="Register" />
                </Link>
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
    </Box>
  )

  const container =
    window !== undefined ? () => window().document.body : undefined

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            IvanTech
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {isLoggedIn ? (
              <>
                <Button component={Link} to={'/orgs'} sx={{ color: '#fff' }}>
                  Organization
                </Button>
                <Button component={Link} to={'/users'} sx={{ color: '#fff' }}>
                  Team
                </Button>
                <Button onClick={handleLogout} sx={{ color: '#fff' }}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button component={Link} to={'/'} sx={{ color: '#fff' }}>
                  Home
                </Button>
                <Button component={Link} to={'/login'} sx={{ color: '#fff' }}>
                  Login
                </Button>
                <Button
                  component={Link}
                  to={'/register'}
                  sx={{ color: '#fff' }}
                >
                  Register
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  )
}

export default Navbar;

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
const tabs = [
  { name: 'Team', path: '/users', authRequired: true },
  { name: 'Logout', authRequired: true},
  { name: 'Login', path: '/login', authRequired: false },
  { name: 'Register', path: '/register', authRequired: false },
]

function Navbar(props) {
  const { window } = props
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const token = sessionStorage.getItem('access_token')
    token ? setIsLoggedIn(true) : setIsLoggedIn(false)
  }, [location])

  const handleLogout = () => {
    sessionStorage.removeItem('access_token')
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
        {tabs.map((tab, id) => {
          if (
            (tab.authRequired && isLoggedIn) ||
            (!tab.authRequired && !isLoggedIn)
          ) {
            return (
              <ListItem key={id} disablePadding>
                <ListItemButton sx={{ textAlign: 'center' }}>
                  <Link
                    to={tab.path}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <ListItemText primary={tab.name} />
                  </Link>
                </ListItemButton>
              </ListItem>
            )
          }
          return null // Hide the tab
        })}
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
            {tabs.map((tab, id) => {
              if (
                (tab.authRequired && isLoggedIn) ||
                (!tab.authRequired && !isLoggedIn)
              ) {
                return (
                  <Button key={id} sx={{ color: '#fff' }}>
                    {tab.path ? (
                      <Link to={tab.path}>{tab.name}</Link>
                    ) : (
                      <Button onClick={handleLogout}>{tab.label}</Button>
                    )}
                  </Button>
                )
              }
              return null // Hide the tab
            })}
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

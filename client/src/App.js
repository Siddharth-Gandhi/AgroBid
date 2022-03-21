import { useState } from 'react'
import './index.css'
import { Switch, Route, useLocation, Link } from 'react-router-dom'
import HomePage from './Pages/Home';
import SignInPage from './Pages/Signin';
import SignupPage from './Pages/Signup';
// import Login from './Pages/Login/Login'
import Auction from './Pages/Auction/Auction'
// import Dashboard from './Pages/Dashboard/Dashboard'
import BidPage from './Pages/Auction/BidPage'
import Admin from './Pages/Admin/Admin'
// import Leaderboard from './components/Auction/Leaderboard'
import FarmerForm from './Pages/FarmerForm/FarmerForm'
// import ProfilePage from './Pages/ProfilePage/ProfilePage'
import ProfilePage from './Pages/Profile'
import SuggestionPage from './Pages/tools/SuggestionPage'
import PredictPage from './Pages/tools/PredictPage'
import ResponsiveDrawer from './Components/Drawer';

import { Box, Button, Container, Typography } from "@mui/material"

const drawerWidth = 240;

const App = () => {
  const [user, setUser] = useState(localStorage.getItem("profile") ? JSON.parse(localStorage.getItem("profile")) : null);
  // eslint-disable-next-line no-unused-vars
  const [username, setUsername] = useState(localStorage.getItem("profile") ? JSON.parse(localStorage.getItem("profile")).username : "");

  // console.log("starting of the app username is", username)

  const location = useLocation();

  // if (!user) {
  //   return (
  //     // <Router>
  //     <Login setUser={setUser} />
  //     // </Router>
  //   );
  // }

  // console.log("user value in app.js is ", user);

  return (
    <>
      <ResponsiveDrawer setUser={setUser} />
      <Box
        component="main"
        sx={{ width: { sm: !(['/', '/login', '/signup'].includes(location.pathname)) ? `calc(100% - ${drawerWidth}px)` : '100%' }, ml: { sm: !(['/', '/login', '/signup'].includes(location.pathname)) && `${drawerWidth}px` }, mt: 4, pt: 4 }}
      >
        {/* {user && <Dashboard setUser={setUser} />} */}
        {/* <Route path="/marketplace" exact component={MarketPlacePage} />
          <Route path="/marketplace/:farmerID/:cropID" exact component={CropDetailsPage} /> */}
        {!user && <Switch>
          {/* <Route path="/" exact  /> */}
          <Route path="/" exact component={HomePage} />
          <Route path="/login" exact><SignInPage setUser={setUser} setUsername={setUsername} /></Route>
          <Route path="/signup" exact component={SignupPage} />
          <Route path="*" component={NoMatch} />
        </Switch>}
        {user && <Switch>
          {/* <Route path="/profile" exact component={ProfilePage} /></> */}
          <Route path="/" exact component={HomePage} />
          <Route path='/auction' exact><Auction /></Route>
          <Route path='/bidpage/:id' exact><BidPage /></Route>
          <Route path='/admin' exact><Admin /></Route>
          {/* <Route path='/leaderboard'><Leaderboard/></Route> */}
          <Route path='/createauction' exact><FarmerForm username={username} user={user}></FarmerForm></Route>
          <Route path='/profile' exact><ProfilePage user={user}></ProfilePage></Route>
          <Route path='/suggest' exact><SuggestionPage user={user}></SuggestionPage></Route>
          <Route path='/predict' exact><PredictPage></PredictPage></Route>
          <Route path="*" component={NoMatch} />
        </Switch>
        }
      </Box>
      {/* <Switch>
        <Route path='/auction'> <Auction /></Route>
        <Route path='/bidpage/:id' ><BidPage /></Route>
        <Route path='/admin'><Admin /></Route>
        <Route path='/leaderboard'><Leaderboard/></Route>
      <Route path='/createauction'><FarmerForm username={username} user={user}></FarmerForm></Route>
      <Route path='/profile'><ProfilePage user={user}></ProfilePage></Route>
      <Route path='/suggest'><SuggestionPage user={user}></SuggestionPage></Route>
      <Route path='/predict'><PredictPage></PredictPage></Route> 
    </Switch> */}
    </>
  );
}
function NoMatch() {
  let location = useLocation();

  return (
    <Container>
      <Typography component="h3" variant="h5" color="error" sx={{ mt: 3 }}>
        No match for <code>{location.pathname}</code>
      </Typography>
      <Button component={Link} variant="text" color="info" to="/">Back Home</Button>
    </Container>
  );
}

export default App;

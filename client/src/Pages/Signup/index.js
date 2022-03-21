import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link as RouterLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import axios from "axios";
import { Snackbar, Alert } from "@mui/material"
// import { useHistory } from 'react-router-dom';
import { LinearProgress } from '@mui/material';

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" component={RouterLink} to="/">
        AgroBid.com
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// const theme = createTheme();

const SignupPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('farmer');
  const [agree, setAgree] = useState(true);
  const [open, setOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // let history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(false);
    setErrorMsg('');
    setAlertMsg('');
    setOpen(false);

    const values = {
      firstName,
      lastName,
      email,
      username,
      password,
      confirmPassword,
      roles: [role],
      // agree,
    };

    try {
      const suc = await axios.post("http://localhost:8080/api/auth/signup", values);
      // console.log(suc);
      setAlertMsg("Successfully Registered! Please check email to confirm!");
      setOpen(true);
    } catch (error) {
      setError(true);
      setErrorMsg(error.response?.data.message || "Something went wrong!");
    }

    // console.log(values);
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setRole('farmer');
    setAgree(true);
    setLoading(false);
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        border: { sm: 1 },
        borderColor: { sm: 'grey.500' },
        borderRadius: 5,
        marginTop: { xs: '10px', sm: '50px' },
        marginBottom: '50px',
        padding: '30px',
      }}
    // style={{ borderColor: 'red' }}
    >
      <CssBaseline />
      <Snackbar open={open} autoHideDuration={6000} onClose={() => {
        setOpen(false);
        setAlertMsg('');
      }}>
        <Alert onClose={() => {
          setOpen(false);
          setAlertMsg('');
        }} severity="info" sx={{ width: '100%' }}>
          {alertMsg}
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={6000} onClose={() => {
        setError(false);
        setErrorMsg('');
      }}>
        <Alert onClose={() => {
          setError(false);
          setErrorMsg('');
        }} severity="error" sx={{ width: '100%' }}>
          {errorMsg}
        </Alert>
      </Snackbar>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {loading && <Box sx={{ width: '100%' }}>
          <LinearProgress color="secondary" />
        </Box>}
        <Link to="/" style={{ display: 'flex' }} component={RouterLink}>
          <HomeIcon />
          Go to Home Page
        </Link>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xxs={12} sm={6}>
              <TextField
                // autoComplete="firstName"
                name="firstName"
                required={true}
                fullWidth
                id="firstName"
                label="First Name"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                autoFocus
              />
            </Grid>
            <Grid item xxs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                name="lastName"
              // autoComplete="lastName"
              />
            </Grid>
            <Grid item xxs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                name="email"
                type="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xxs={12}>
              <TextField
                required
                fullWidth
                id="username"
                label="Username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                name="username"
                type="text"
              // autoComplete="username"
              />
            </Grid>
            <Grid item xxs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                id="password"
              // autoComplete="new-password"
              />
            </Grid>
            <Grid item xxs={12}>
              <TextField
                required
                fullWidth
                name="confirm_password"
                label="Confirm Password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                type="password"
                id="confirm_password"
              // autoComplete="new-password"
              />
            </Grid>
            <Grid item xxs={12}>
              <FormControl fullWidth>
                <InputLabel id="role-select-label">Role</InputLabel>
                <Select
                  name="role"
                  required
                  labelId="role"
                  id="role"
                  value={role}
                  label="Role"
                  onChange={(e) => setRole(e.target.value)}
                >
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="farmer">Farmer</MenuItem>
                  <MenuItem value="buyer">Buyer</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xxs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="agree"
                    value="agree"
                    checked={agree}
                    required
                    color="primary"
                    onChange={() => setAgree((prev) => !prev)}
                  />
                }
                label="Agree to terms and conditions."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/login" component={RouterLink} variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
};

export default SignupPage;

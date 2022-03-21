/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";
import {
  Grid,
  TextField,
  Button,
  Paper,
  Typography,
  Container,
  Alert,
  Collapse,
  IconButton
} from "@mui/material";
// import useStyles from "./styles";
import { Close as CloseIcon } from '@mui/icons-material/';

const Admin = () => {
  const accessToken = JSON.parse(localStorage.getItem("profile")).accessToken;
  const [cropName, setCropName] = useState("");
  const [username, setUsername] = useState("");
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState("");
  const [open, setOpen] = useState(false);
  const [alertmsg, setAlertMsg] = useState("");
  const [error, setError] = useState(false);

  // const classes = useStyles();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(cropName, username, rating, image);
    try {
      const res = await axios.post(
        "http://localhost:8080/api/admin/addcrop",
        {
          cropName,
          username,
          rating,
          image,
        },
        {
          headers: {
            "x-access-token": accessToken,
          },
        }
      );
      setOpen(true)
      setAlertMsg("Successfully added new Crop!")
      setCropName("")
      setUsername("")
      setError(false)
    } catch (e) {
      setOpen(true)
      setAlertMsg("Failed to add new crop!")
      setError(true)
    }

    // console.log(res);
  };

  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: "100px" }}>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography
          sx={{
            color: '#1B5E20',
            fontFamily: 'Merriweather',
            margin: '20px auto'
          }}
          variant="h3"
          component="h2"
        >
          Add a Crop
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xxs={12}>
              <Collapse in={open}>
                <Alert
                  action={<IconButton onClick={() => {
                    setOpen(false);
                  }}><CloseIcon /></IconButton>}
                  // action={
                  //   <IconButton
                  //     aria-label="close"
                  //     color="inherit"
                  //     size="small"
                  //     onClick={() => {
                  //       setOpen(false);
                  //     }}
                  //   >
                  //     <CloseIcon fontSize="inherit" />
                  //   </IconButton>
                  // }
                  severity={error ? "error" : "success"}
                >
                  {alertmsg}
                  {/* "Hello" */}
                </Alert>
              </Collapse>
            </Grid>
            <Grid item xxs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="Crop name"
                name="cropname"
                onChange={(e) => setCropName(e.target.value)}
              ></TextField>
            </Grid>
            <Grid item xxs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="Farmer Username"
                name="username"
                onChange={(e) => setUsername(e.target.value)}
              ></TextField>
            </Grid>
            {/* <Grid item xs={12} sm={12}>
                <NumericInput
                  onChange={(val) => setRating(val)}
                  className="form-control"
                />
              </Grid> */}
            {/* <Grid item xs={12} sm={12}>
                <FileBase
                  type="file"
                  multiple={false}
                  onDone={(file) => setImage(file)}
                />
              </Grid> */}
            <Grid item xxs={12}>
              <Button fullWidth variant="contained" color="secondary" type="submit">
                Submit
              </Button>
            </Grid>

          </Grid>
        </form>
      </Paper>
    </Container >
  );
};

export default Admin;

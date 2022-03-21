import { useState, useEffect } from "react";
import {
  Paper,
  Grid,
  Button,
  TextField,
  Container,
  Typography,
  IconButton,
  Collapse,
  Card, CardActions, CardMedia, Pagination, Divider, List, ListItem, ListItemText, ListItemButton, InputAdornment
} from "@mui/material";
import { useParams, useLocation } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";
import axios from "axios";
// import User from "./User";
// import LocationOnIcon from '@mui/icons-material/LocationOn';
import wheatImg from "../../Images/wheat.jpg"

const BidPage = () => {
  const accessToken = JSON.parse(localStorage.getItem("profile")).accessToken;
  const role = JSON.parse(localStorage.getItem("profile"))?.roles[0];
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [alertmsg, setAlertMsg] = useState("");
  const [error, setError] = useState(false);
  const { id } = useParams();
  const [bid, setBid] = useState(0);

  const location = useLocation()

  const getData = async () => {
    const res = await axios.get(`http://localhost:8080/api/${id}/leaderboard`, {
      headers: {
        "x-access-token": accessToken,
      },
    });
    //console.log(res.data)
    setData(res.data);
  };

  useEffect(() => {
    getData()
    const dataInt = setInterval(() => {
      getData();
    }, 10000);
    return () => {
      clearInterval(dataInt);
    }
  }, []);

  const calculateTimeLeft = (startdate, duration) => {
    let now = new Date().getTime() / 1000;
    let end = new Date(startdate + duration * 60).getTime();
    let timeLeft = end - now;
    let days = Math.floor(timeLeft / (60 * 60 * 24));
    let hours = Math.floor(
      (timeLeft % (60 * 60 * 24)) / (60 * 60)
    );
    let minutes = Math.floor((timeLeft % (60 * 60)) / (60));
    let seconds = Math.floor((timeLeft % (60)));
    return { days, hours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(location.state.cropDetails.startdate, location.state.cropDetails.duration));

  useEffect(() => {
    let interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(location.state.cropDetails.startdate, location.state.cropDetails.duration));
    }, 1000);
    return () => clearInterval(interval);
  }, [location.state.cropDetails.startdate, location.state.cropDetails.duration]);

  // const handleChange = (e) => {
  //   setBid(e.target.value);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(bid);
    if (role !== "farmer") {
      if (bid <= 0 || !bid) {
        setAlertMsg("Invalid bid!")
        setOpen(true);
        setError(true)
        return;
      }
      try {
        const result = await axios.get(`http://localhost:8080/api/auction/${id}`);
        // console.log(result.data._id);
        const posres = await axios.post(
          "http://localhost:8080/api/buyer/bid",
          {
            auctionid: result.data._id,
            bidprice: bid,
            time: Math.floor(Date.now() / 1000),
          },
          {
            headers: {
              "x-access-token": accessToken,
            },
          }
        );
        // console.log(posres);
        setAlertMsg("Bid placed successfully!")
        setOpen(true);
        setError(false)
        setBid(0)
      } catch (e) {
        setAlertMsg("Not Allowed!");
        setError(true)
        setOpen(true);
        console.log({ ...e });
      }
    } else {
      setAlertMsg("You can't bid as you are a farmer!");
      setOpen(true);
      setError(true)
    }
  };

  return (
    <>
      <Container sx={{ marginBottom: '20px' }}>
        <Typography
          sx={{
            color: '#1B5E20',
            fontFamily: 'Merriweather',
            margin: '20px auto'
          }}
          variant="h3"
          component="h2"
        >
          {location.state?.cropDetails.description}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardMedia component="img"
                // height="194"
                image={wheatImg}
                alt="Paella dish" />
              <CardActions sx={{ justifyContent: 'center' }}>
                <Pagination count={1} variant="outlined" />
              </CardActions>
            </Card>
            <Paper sx={{ marginTop: '15px', padding: '10px', }}>
              <Button size="large" color="secondary" fullWidth sx={{ textTransform: 'none', cursor: 'default', color: 'secondary.dark' }} variant="outlined">
                Current Bid: &#8377;{data[0]?.bidprice}
              </Button>
              <Button color="primary" sx={{ textTransform: 'none', cursor: 'default', color: 'primary.dark', mt: 2 }} variant="outlined" fullWidth>
                Time Left: {timeLeft.days} days {timeLeft.hours} hours{" "}
                {timeLeft.minutes} minutes {timeLeft.seconds} seconds
              </Button>
              {/* <Typography variant="body1">
                {timeLeft.days} days {timeLeft.hours} hours{" "}
                {timeLeft.minutes} minutes {timeLeft.seconds} seconds
              </Typography> */}
              {/* <Button>Refresh Bids</Button> */}
            </Paper>
          </Grid>
          <Grid item xxs={12} md={6}>
            <Paper >
              <div style={{ padding: '10px' }}>
                <Typography sx={{
                  fontFamily: 'Merriweather',
                  marginBottom: '10px'
                }} component="h3" variant="h4">Details</Typography>
                <Typography component="p" sx={{ margin: '5px 0' }}>
                  Sold By: <b>{`${location.state?.cropDetails.owner?.firstname} ${location.state?.cropDetails.owner?.lastname}`}</b>
                </Typography>
                {/* <Typography component="p" sx={{ display: 'flex', alignItems: 'center', margin: '5px 0' }}>
                  Farmer Rating:
                  <Rating readOnly value={4.4} precision={0.1} />
                  (<b>4.4</b>)
                </Typography>
                <Typography component="p" sx={{ display: 'flex', alignItems: 'center', margin: '5px 0' }}>
                  <LocationOnIcon /> <b>Delhi</b>
                </Typography> */}
              </div>
              <Divider />
              <div style={{ padding: '10px', display: 'flex', justifyContent: 'space-between' }}>
                <Button color="secondary" sx={{ textTransform: 'none', cursor: 'default', color: 'secondary.dark' }} variant="outlined">
                  List Price: &#8377;{location.state?.cropDetails.startprice}
                </Button>
                <Button color="primary" sx={{ textTransform: 'none', cursor: 'default', color: 'primary.dark' }} variant="outlined">
                  Quantity: {location.state?.cropDetails.quantity}KG
                </Button>
              </div>
              <Divider />
              {/* <div style={{ padding: '10px' }}> */}
              <Collapse in={open}>
                <Alert
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setOpen(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                  severity={error ? "error" : "success"}
                >
                  {alertmsg}
                </Alert>
              </Collapse>
              <form onSubmit={handleSubmit} style={{ padding: '10px' }}>
                {/* <Grid item style={{ margin: "10px 0px" }}> */}
                <TextField fullWidth variant="outlined" value={bid} label="Bid Amount" onChange={(e) => setBid(e.target.value)} InputProps={{
                  startAdornment: <InputAdornment position="start">&#8377;</InputAdornment>,
                }} />
                <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                  fullWidth
                  // style={{ width: "40%" }}
                  style={{ margin: "10px auto" }}
                >
                  Place Bid
                </Button>
                {/* </Grid> */}
                {/* <Grid item>
                  </Grid> */}
              </form>
              {/* </div> */}
            </Paper>
            <Paper>
              <div style={{ padding: '10px' }}>
                <Typography sx={{
                  fontFamily: 'Merriweather',
                  marginBottom: '10px'
                }} component="h3" variant="h4">Last 10 Bids</Typography>
              </div>
              <List disablePadding spacing={2}>
                {data.map((user) => (
                  <>
                    <ListItem key={`${user.username}${user.bidprice}${user.time}`}>
                      <ListItemButton sx={{ justifyContent: 'space-between' }}>
                        <ListItemText primary={`By "${user.username}"`} secondary={`Rs.${user.bidprice} @ ${new Date(user.time * 1000).toLocaleDateString()} ${new Date(user.time * 1000).toLocaleTimeString()}`} />
                        {/* <Typography variant="span">
                          {user.username}
                        </Typography>
                        <Typography variant="span">
                          &#8377; {user.bidprice}
                        </Typography>
                        <Typography variant="span">
                          {`${new Date(user.time * 1000).toLocaleDateString()} ${new Date(user.time * 1000).toLocaleTimeString()}`}
                        </Typography> */}
                      </ListItemButton>
                    </ListItem>
                    <Divider />
                  </>
                ))}
              </List>

            </Paper>
          </Grid>
          <Grid item xs={6}>

          </Grid>
        </Grid>
      </Container>
      <Container
        component="main"
        maxWidth="md"
        sx={{ textAlign: "center", mt: 3 }}
      >
        {/* <Collapse in={open}>
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            {alertmsg}
          </Alert>
        </Collapse> */}
        {/* <Paper
          elevation={6}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5" style={{ margin: "50px 10px" }}>
            Just do the bidding freely
          </Typography>
          <Grid Container>
            <form style={{ margin: "10px 20px" }} onSubmit={handleSubmit}>
              <Grid item style={{ margin: "10px 0px" }}>
                <TextField fullWidth variant="outlined" onChange={handleChange} />
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                  style={{ margin: "5px auto" }}
                >
                  Bid
                </Button>
              </Grid>
            </form>
          </Grid>
          <Typography component="h1" variant="h5" style={{ margin: "10px" }}>
            LeaderBoard
          </Typography>
          {data.map((user) => (
            <User user={user} />
          ))}
        </Paper> */}
      </Container>
    </>
  );
};

export default BidPage;

import { useState, useEffect } from "react";
import React from "react";
import { Snackbar } from "@mui/material";
import {
  Container,
  Grid,
  Typography,
  IconButton,
  Collapse,
  Alert
} from "@mui/material";
import { Card } from "@mui/material";
import { CardContent, Button, CardMedia, CardHeader, Avatar, Box, LinearProgress } from "@mui/material";
import { useHistory } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import axios from "axios";
// import Tile from "./Tile";
//enqueSnackbar("hello", "success");
import { useSnackbar } from 'notistack';
import { useLocation } from 'react-router-dom'
// import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import wheatImg from "../../Images/wheat.jpg"

const Auction = () => {
  const accessToken = JSON.parse(localStorage.getItem("profile"))?.accessToken;
  const [open, setOpen] = useState(false);
  const [alertmsg, setAlertMsg] = useState(
    "you can not bid because this ia future auction"
  );
  const [drop1, setDrop1] = useState(true);
  const [drop2, setDrop2] = useState(true);
  const [drop3, setDrop3] = useState(true);
  const [pastauction, setPastAuction] = useState([]);
  const [presentauction, setPresentAuction] = useState([]);
  const [futureauction, setFutureAuction] = useState([]);

  // const [loading, setLoading] = useState(false)

  const [loading, setLoading] = useState(false);

  const location = useLocation();
  // console.log(location);
  useEffect(() => {
    // console.log("AUCTION USEFFECT CALLED");
    const fetchActions = async () => {
      setLoading(true);
      // console.log("AUCTION fetchActions USEFFECT CALLED");
      const result1 = await axios.get(
        "http://localhost:8080/api/getpresentauction",
        {
          headers: {
            "x-access-token": accessToken,
          },
        }
      );
      setPresentAuction(result1.data);
      // console.log(result1.data)
      const result2 = await axios.get(
        "http://localhost:8080/api/getfutureauction",
        {
          headers: {
            "x-access-token": accessToken,
          },
        }
      );
      setFutureAuction(result2.data);
      // console.log(result2.data)
      const result3 = await axios.get(
        "http://localhost:8080/api/getpastauction",
        {
          headers: {
            "x-access-token": accessToken,
          },
        }
      );
      setPastAuction(result3.data);
      // console.log(result3.data)
      setLoading(false);
    }
    fetchActions();
    return () => {
      setPastAuction([])
      setPresentAuction([])
      setFutureAuction([])
    }
  }, [accessToken]);

  const handleClick1 = () => {
    setDrop1((prev) => !prev);
  };

  const handleClick2 = () => {
    setDrop2((prev) => !prev);
  };

  const handleClick3 = () => {
    setDrop3((prev) => !prev);
  };

  // console.log(loading);

  return (
    <Container maxWidth="xl">
      <Typography
        sx={{
          color: '#1B5E20',
          fontFamily: 'Merriweather',
          margin: '20px auto'
        }}
        variant="h4"
        component="h2"
      >
        MarketPlace
      </Typography>
      {loading && <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>}

      {!loading && <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12}>
          <Typography
            sx={{
              color: '#1B5E20',
              fontFamily: 'Merriweather',
              margin: '20px auto'
            }}
            variant="h5"
            component="h3"
          >
            Present ongoing auctions
          </Typography>
          {/* <IconButton
            style={{ float: "right" }}
            onClick={handleClick1}
            aria-expanded={drop1}
            aria-label="show more"
          >
            {drop1 ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
          </IconButton> */}
          {/* <Collapse in={drop1} timeout="auto" unmountOnExit> */}
          <Grid container spacing={3}>
            {presentauction.length === 0 && <Grid item xxs={12}><Alert severity="info">No ongoing auctions found!</Alert></Grid>}
            {presentauction.map((auc) => (
              <Grid item key={auc.tempId} xxs={12} xs={8} sm={12} md={6} lg={4}>
                <Tile auc={auc} type={"present"} />
              </Grid>
            ))}
          </Grid>
          {/* </Collapse> */}
        </Grid>
        <Grid item xs={12}>
          <Typography
            sx={{
              color: '#1B5E20',
              fontFamily: 'Merriweather',
              margin: '20px auto'
            }}
            variant="h5"
            component="h3"
          >
            Future upcoming auctions
          </Typography>
          {/* <IconButton
            style={{ float: "right" }}
            onClick={handleClick2}
            aria-expanded={drop2}
            aria-label="show more"
          >
            {drop2 ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
          </IconButton> */}
          {/* <Collapse in={drop2} timeout="auto" unmountOnExit> */}
          <Grid container spacing={3}>
            {futureauction.length === 0 && <Grid item xxs={12}><Alert severity="info">No upcoming auctions found!</Alert></Grid>}
            {futureauction.map((auc) => (
              <Grid item key={auc.tempId} xxs={12} xs={8} sm={12} md={6} lg={4}>
                <Tile auc={auc} type={"future"} />
              </Grid>
            ))}
          </Grid>
          {/* </Collapse> */}
        </Grid>
        <Grid item xs={12}>
          <Typography
            sx={{
              color: '#1B5E20',
              fontFamily: 'Merriweather',
              margin: '20px auto'
            }}
            variant="h5"
            component="h3"
          >
            Past completed auctions
          </Typography>
          {/* <IconButton
            style={{ float: "right" }}
            onClick={handleClick3}
            aria-expanded={drop3}
            aria-label="show more"
          >
            {drop3 ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
          </IconButton> */}
          {/* <Collapse in={drop3} timeout="auto" unmountOnExit> */}
          {pastauction.length === 0 && <Grid item xxs={12}><Alert severity="info">No past auctions found!</Alert></Grid>}
          <Grid container spacing={3}>
            {pastauction.map((auc) => (
              <Grid item key={auc.tempId} xxs={12} xs={8} sm={12} md={6} lg={4}>
                <Tile auc={auc} type={"past"} />
              </Grid>
            ))}
          </Grid>
          {/* </Collapse> */}
        </Grid>
      </Grid>}

      <Snackbar
        open={location?.state?.hasOwnProperty('msg')}
        autoHideDuration={6000}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          {location?.state?.msg}
        </Alert>
      </Snackbar>

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
        message={alertmsg}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() => setOpen(false)}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </Container>
  );
}

const Tile = (props) => {
  const [open, setOpen] = useState(false);
  const [alertmsg, setAlertmsg] = useState("");
  const [type, setType] = useState(props.type);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const history = useHistory();

  const handleClick = () => {
    setOpen(true);
    if (type === "present") {
      history.push(`/bidpage/${props.auc.tempId}`, { cropDetails: props.auc });
    }
  };

  const handleTile = () => {
    if (type === "future") {
      enqueueSnackbar("You can't bid for future auction yet!", { variant: "error" });
    }
    else if (type === "past") {
      enqueueSnackbar("You can't bid for completed auction!", { variant: "error" });
    }
  }

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


  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(props.auc.startdate, props.auc.duration));

  useEffect(() => {
    let interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(props.auc.startdate, props.auc.duration));
    }, 1000);
    return () => clearInterval(interval);
  }, [props.auc.startdate, props.auc.duration]);

  const showTimer = () => {
    if (type === "present") {
      return (
        <React.Fragment>
          <Typography variant="body1">
            {timeLeft.days} days {timeLeft.hours} hours{" "}
            {timeLeft.minutes} minutes {timeLeft.seconds} seconds
          </Typography>
        </React.Fragment>
      );
    } else if (type === "future") {
      return (
        <React.Fragment>
          <Typography variant="body1">
            {timeLeft.days} days {timeLeft.hours} hours{" "}
            {timeLeft.minutes} minutes {timeLeft.seconds} seconds
          </Typography>
        </React.Fragment>
      );
    } else if (type === "past") {
      return (
        <React.Fragment>
          <Typography variant="body1">
            Completed
          </Typography>
        </React.Fragment>
      );
    }
  };

  const showButton = () => {
    if (type === "present") {
      return (
        <Button
          variant="contained"
          color="primary"
          onClick={handleClick}
          style={{ marginTop: "10px" }}
        >
          Go to leaderboard
        </Button>
      );
    }
  };

  // when timer reaches 0, 
  // if type was future, change it to present. and set timeleft to duration. 
  // if type was present, change it to past.
  useEffect(() => {
    if (timeLeft.seconds === 0 && timeLeft.minutes === 0 && timeLeft.hours === 0 && timeLeft.days === 0) {
      if (type === "future") {
        setType("present");
        setTimeLeft(calculateTimeLeft(props.auc.startdate, props.auc.duration));
      } else if (type === "present") {
        setType("past");
      }
    }
  }, [timeLeft.seconds, timeLeft.minutes, timeLeft.hours, timeLeft.days]);

  return (
    <>
      {/* <Card style={{ marginTop: "10px", width: "70vw" }} onClick={handleTile} >
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Typography variant="h6"> <span style={{ color: "darkblue" }}>Crop name: </span> {props.auc.crop?.name}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Typography variant="h6"><span style={{ color: "darkblue" }}>Farmer name: </span> {props.auc.owner?.firstname}</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={6}>
              <Typography variant="h6"> <span style={{ color: "darkblue" }}> Description: </span> {props.auc.description}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Typography variant="h6"><span style={{ color: "darkblue" }}>Start price: </span> {props.auc.startprice}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              {showTimer()}
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              {showButton()}
            </Grid>
          </Grid>
        </CardContent>
      </Card> */}
      <Card onClick={handleTile}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: 'primary.main' }} aria-label="farmer name">
              {props.auc.owner?.firstname[0]}{props.auc.owner?.lastname[0]}
            </Avatar>
          }
          title={`Posted By - ${props.auc.owner?.firstname} ${props.auc.owner?.lastname}`}
        // subheader="Location"
        />
        <CardMedia
          component="img"
          height="194"
          image={wheatImg}
          alt="Paella dish"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {/* Crop Name: {props.auc.crop?.name} */}
            Crop Name: {props.auc.description}
          </Typography>
          {/* <Typography variant="body2" color="text.secondary"> */}
          <Grid container spacing={3}>
            {/* <Grid item xs={12} sm={6} md={4} lg={3}>
                <Typography variant="h6"> <span style={{ color: "darkblue" }}>Crop name: </span> {props.auc.crop?.name}</Typography>
              </Grid> */}
            {/* <Grid item xs={12} sm={6} md={4} lg={3}>
                <Typography variant="h6"><span style={{ color: "darkblue" }}>Farmer name: </span> {props.auc.owner?.firstname}</Typography>
              </Grid> */}
            {/* <Grid item xs={12}>
                <Typography variant="body1"> <span style={{ color: "darkblue" }}> Description: </span> {props.auc.description}</Typography>
              </Grid> */}
            <Grid item xs={12}>
              <Typography variant="body1"><span style={{ color: "darkblue" }}>Start price: </span> &#8377;{props.auc.startprice}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1"><span style={{ color: "darkblue" }}>Quantity: </span> {props.auc.quantity} Kg</Typography>
            </Grid>
            <Grid item xs={12}>
              <span style={{ color: "darkblue" }}>Ends In:</span> {showTimer()}
            </Grid>
            {type === "present" && <Grid item xs={12}>
              {showButton()}
            </Grid>}
          </Grid>
          {/* </Typography> */}
        </CardContent>
        {/* <CardActions sx={{ padding: '16px', justifyContent: 'space-between' }}> */}
        {/* <Button color="secondary" sx={{ textTransform: 'none', cursor: 'default', color: 'secondary.dark' }} variant="outlined">
            Current Bid: &#8377;1000
          </Button> */}
        {/* <Button sx={{ textTransform: 'none', color: 'primary.dark' }} variant="outlined" component={RouterLink} to="/marketplace/farmer/crop">
            More Details
          </Button> */}
        {/* </CardActions> */}
      </Card>
    </>


  );

};

export default Auction;

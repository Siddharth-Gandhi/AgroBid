import { useState, useEffect } from "react"
import { Container, Typography, Paper, Box, TextField, Avatar, Button, Grid, Card, CardContent, CardMedia, CardHeader, Stack, Skeleton, Alert, CircularProgress } from "@mui/material"
import testImg from "../../Images/wheat.jpg"
import PhotoCamera from '@mui/icons-material/PhotoCamera';
// import CropCard from "../../Components/CropCard"
import axios from "axios";
// import { withRouter } from "react-router";
import wheatImg from "../../Images/wheat.jpg"

const ProfilePage = () => {
  const [user, setUser] = useState(localStorage.getItem("profile") ? JSON.parse(localStorage.getItem("profile")) : {});
  const [auctionslist, setAuctionslist] = useState([]);

  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [username, setUsername] = useState(user?.username || '');
  const [loading, setLoading] = useState(false)

  // useEffect(() => {
  //   if (!user) {
  //     return (
  //       <Router>
  //         <Login setUser={setUser} />
  //       </Router>
  //     );
  //   }
  // }, [user]);

  useEffect(() => {

    const getData = () => {
      // let auctions = [];
      user?.auctionsParticipated.forEach(async (auction) => {
        // console.log("PROFILE AUCTIONS", auction);
        setLoading(true);
        try {
          const res = await axios.get(`http://localhost:8080/api/auction/id/${auction}`);
          // console.log("PROFILE AUCTIONS", res);
          setAuctionslist((auctionslist) => ([...auctionslist, res.data]));
        } catch (err) {
          console.error("PROFILE AUCTIONS", err)
        }
        setLoading(false);
      });
      // setAuctionslist((prevAuctionslist) => [...prevAuctionslist, res.data]);
      // console.log(auctions);
      // setAuctionslist(auctions);
      // user.auctionsParticipated.map((auction, index) => {
      //   axios.get(`http://localhost:8080/api/auction/id/${auction}`).then(res => {
      //     setAuctionslist((auctionslist) => auctionslist.concat(res.data));
      //   });
      //   // console.log(auctionslist);
      // })
    };
    getData()
    return () => {
      setAuctionslist([])
    }
  }, [user?.auctionsParticipated])

  // console.log(auctionslist);
  console.log(loading);

  return (<Container sx={{ mt: 3 }}>
    <Typography
      sx={{
        color: '#1B5E20',
        fontFamily: 'Merriweather',
        margin: '20px auto'
      }}
      variant="h4"
      component="h2"
    >
      Profile
    </Typography>
    {/* <Divider /> */}
    <Paper sx={{ display: 'flex', flexDirection: { xxs: 'column', sm: 'row' } }}>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{ p: { xxs: 0, md: 2 }, width: { xxs: '100%', sm: '35%', md: '25%' }, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: { xxs: 'center', xs: 'space-evenly', sm: 'center' }, flexDirection: { xxs: 'column', xs: 'row', sm: 'column' } }}
      >
        <Avatar
          alt="Remy Sharp"
          src={testImg}
          sx={{ width: '130px', height: '130px', maxWidth: '100%' }}
        />
        {/* <label htmlFor="contained-button-file">
          <input accept="image/*" id="contained-button-file" multiple type="file" style={{ display: 'none' }} />
          <Button variant="contained" component="span" startIcon={<PhotoCamera />} sx={{ mt: 2 }}>
            Upload
          </Button>
        </label> */}
      </Box>
      {/* <Divider orientation="horizontal" /> */}
      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{ p: { xxs: 1, sm: 2 }, width: { xxs: '100%', sm: '65%', md: '75%' } }}
      >
        <Typography sx={{ mb: 2, textAlign: 'center' }} variant="h4" component="h4">Update Profile</Typography>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
          <TextField disabled type="text" label="First Name" variant="outlined" value={firstName} onChange={(e) => setFirstName(e.target.value)} sx={{ width: { xxs: '100%', xs: '45%', sm: '100%', md: '45%', lg: '35ch' }, m: { xxs: '5px auto', xs: '1' } }} />
          <TextField disabled type="text" label="Last Name" variant="outlined" value={lastName} onChange={(e) => setLastName(e.target.value)} sx={{ width: { xxs: '100%', xs: '45%', sm: '100%', md: '45%', lg: '35ch' }, m: { xxs: '5px auto', xs: '1' }, ml: { xs: '5px', sm: 'auto', md: '10px' } }} />
          <TextField disabled type="email" label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} sx={{ width: { xxs: '100%', xs: '45%', sm: '100%', md: '45%', lg: '35ch' }, m: { xxs: '5px auto', xs: '1' } }} />
          <TextField disabled type="text" label="Username" variant="outlined" value={username} onChange={(e) => setUsername(e.target.value)} sx={{ width: { xxs: '100%', xs: '45%', sm: '100%', md: '45%', lg: '35ch' }, m: { xxs: '5px auto', xs: '1' }, ml: { xs: '5px', sm: 'auto', md: '10px' } }} />
        </div>
      </Box>
    </Paper>
    {/* <div className="col-md-8"> */}
    <Typography
      sx={{
        color: '#1B5E20',
        fontFamily: 'Merriweather',
        margin: '20px auto',
        textAlign: 'center'
      }}
      variant="h5"
      component="h3"
    >
      Auctions Participated
    </Typography>
    <Grid container alignItems="center" justifyContent="center" spacing={2} sx={{ mt: 3, mb: 3 }}>
      {loading &&
        <>
          <Grid item xxs={12} xs={9} sm={9} md={6} lg={4} xl={3}>
            <Stack spacing={1}>
              <Skeleton variant="text" />
              <Skeleton variant="circular" width={40} height={40} />
              <Skeleton variant="rectangular" width={210} height={118} />
            </Stack>
          </Grid>
          <Grid item xxs={12} xs={9} sm={9} md={6} lg={4} xl={3}>
            <Stack spacing={1}>
              <Skeleton variant="text" />
              <Skeleton variant="circular" width={40} height={40} />
              <Skeleton variant="rectangular" width={210} height={118} />
            </Stack>
          </Grid>
        </>
      }
      {!loading && user.auctionsParticipated.length === 0 ?
        <Alert severity="info">You have not participated in any auction yet.</Alert>
        :
        auctionslist.map((auction, index) => {
          return <AuctionCard key={index} auction={auction} index={index} />
        })
      }

      {/* <Box sx={{ width: '100%' }}>
          <CircularProgress />
        </Box> */}
    </Grid>
    {/* </div> */}
    {/* </div> */}
  </Container>)
}

const epochToDate = epoch => {
  const date = new Date(epoch * 1000);
  console.log("epoch to date", date)
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
};

const AuctionCard = ({ user, auction, index }) => {
  console.log(`auction card ${index}`, auction);
  return (
    <Grid item xxs={12} xs={9} sm={9} md={6} lg={4} xl={3}>
      <Card>
        <CardHeader
          // avatar={
          //   <Avatar sx={{ bgcolor: 'primary.main' }} aria-label="farmer name">
          //     FN
          //   </Avatar>
          // }
          title={`Auction ${index + 1} - ${auction.crop?.name || auction.description}`}
        // subheader="Location"
        />
        <CardMedia
          component="img"
          height="194"
          image={wheatImg}
          alt="Paella dish"
        />
        <CardContent>
          {/* <h3>Auction {index + 1}</h3> */}
          {/* <p>Auction Description: {auction.description} </p> */}
          <p>Start Date: {epochToDate(Number(auction.startdate))} </p>
          <p>End Date : {epochToDate(Number(auction.startdate) + Number(auction.duration) * 60)} </p>
          <p>Duration: {`${Math.floor(Number(auction.duration) / 60)} Hours ${Number(auction.duration) % 60} Minutes`}</p>
          {/* <p>Harvest Date : {auction.harvestdate?.split("T")[0]} </p> */}
          <p>Harvest Date : {new Date(auction.harvestdate).toLocaleDateString()} </p>
          {/* <p>Crop : {auction.crop?.name} </p> */}
          <p>Quantity : {auction.quantity} KG</p>
          <p>Start Price : &#8377;{auction.startprice}</p>
        </CardContent>
        {/* <CardActions sx={{ padding: '16px', justifyContent: 'space-between' }}>
          <Button color="secondary" sx={{ textTransform: 'none', cursor: 'default', color: 'secondary.dark' }} variant="outlined">
            Current Bid: &#8377;1000
          </Button>
          <Button sx={{ textTransform: 'none', color: 'primary.dark' }} variant="outlined" component={RouterLink} to="/marketplace/farmer/crop">
            More Details
          </Button>
        </CardActions> */}
      </Card>
      {/* <div className="card" style={{ marginTop: "10px" }}>
        <div className="card-body">
          <div className="row">
            <div className="col-md-4">
              <img
                src="https://shop.jivabhumi.com/image/cache/catalog/Sonamasuri%20White%20Rice-500x350.jpeg"
                alt="Avatar"
                style={{ width: "100%" }}
              />
            </div>
            <div className="col-md-8">
              <h3>Auction {index + 1}</h3>
              <p>Auction Description: {auction.description} </p>
              <p>Start Date: {epochToDate(Number(auction.startdate))} </p>
              <p>End Date : {epochToDate(Number(auction.startdate) + Number(auction.duration) * 60)} </p>
              <p>Harvest Date : {auction.harvestdate?.split("T")[0]} </p>
              <p>Crop : {auction.crop?.name} </p>
              <p>Quantity : {auction.quantity} </p>
              <p>Start Price : {auction.startprice}</p>
            </div>
          </div>
        </div>
      </div> */}
    </Grid>
  );
};

export default ProfilePage
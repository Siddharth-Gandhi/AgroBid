import { useState, useEffect } from "react";
import { Typography, Container, FormControl, Select, InputLabel, TextField, MenuItem, Button, Box, Grid, Alert, Snackbar, InputAdornment, CircularProgress } from "@mui/material"
// import { RaisedButton, TextField } from "material-ui";
// import { MuiThemeProvider } from "material-ui/styles";
import axios from "axios";
// import BasicDateTimePicker from './DateTimePicker';
// import { styles } from "@material-ui/lab/internal/pickers/PickersArrowSwitcher";
// import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
// import DateTimePicker from '@mui/lab/DateTimePicker';
// import Stack from '@mui/material/Stack';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import { DateTimePicker, DesktopDatePicker, MobileDatePicker } from '@mui/lab';
// import { getThemeProps } from "@mui/system";
import { useHistory } from 'react-router-dom';

// create a functional component for following class based component
// it should return a form with following fields: 
// crop name as a dropdown list using croplist array
// start date and time as a react datetime picker with past datetime disabled
// a numeric field for duration in hours and minutes using a slider
// a date picker for the harvest date and time with future datetime disabled
// a numeric field for quantity in kg
// a text field for description
// a numeric field for start price in Rs with non negative value restriction
// a button to submit the form and a button to reset the form
// the state would contain : 
// crop name, start date and time, duration, harvest date and time, quantity, description, start price
// the submit button would be disabled if any of the fields are empty or if the start date and time is in the past
// use bootstrap for styling


const FarmerForm = (props) => {
  const { user, username } = props
  const accessToken = JSON.parse(localStorage.getItem("profile")).accessToken

  const [alertMsg, setAlertMsg] = useState("")
  const [open, setOpen] = useState(false)
  const [error, setError] = useState(false)
  const [cropsList, setCropsList] = useState([])

  const [startDate, setStartDate] = useState(null)
  const [hour, setHour] = useState(0)
  const [minutes, setMinutes] = useState(0)
  // const [seconds, setSeconds] = useState(0)
  const [duration, setDuration] = useState(0)
  const [harvestDate, setHarvestDate] = useState(null)
  const [quantity, setQuantity] = useState(0)
  const [description, setDescription] = useState("")
  const [startPrice, setStartPrice] = useState(0)
  const [selectedCrop, setSelectedCrop] = useState("")

  const [loading, setLoading] = useState(false)

  const history = useHistory()

  // const [state, setState] = useState({
  //   alertmsg: "",
  //   open: false,
  //   cropslist: [],
  // })

  // const [states, setStates] = useState({
  //   startdate: new Date(),
  //   // startdateday: 0,
  //   // startdatemonth: 0,
  //   // startdateyear: 0,
  //   // startdatehour: 0,
  //   // startdateminute: 0,
  //   // startdatesecond: 0,
  //   // startdate: 0,
  //   durationhour: 0,
  //   durationminute: 0,
  //   durationsecond: 0,
  //   duration: 0,
  //   harvestdate: 0,
  //   quantity: 0,
  //   description: 0,
  //   startprice: 0,
  //   selectedcrop: ""
  // })
  // constructor(props) {
  // super(props);
  // state = {
  //   alertmsg: "",
  //   open: false,
  //   cropslist: [],
  // };

  // states = {
  //   startdate: new Date(),
  //   // startdateday: 0,
  //   // startdatemonth: 0,
  //   // startdateyear: 0,
  //   // startdatehour: 0,
  //   // startdateminute: 0,
  //   // startdatesecond: 0,
  //   // startdate: 0,
  //   durationhour: 0,
  //   durationminute: 0,
  //   durationsecond: 0,
  //   duration: 0,
  //   harvestdate: 0,
  //   quantity: 0,
  //   description: 0,
  //   startprice: 0,
  //   selectedcrop: ""
  // };

  // user = props.user;
  // username = props.username

  // accessToken = JSON.parse(localStorage.getItem("profile")).accessToken;

  // }

  useEffect(() => {
    // console.log("in component did mount user is", username);
    const getCrops = async () => {
      setLoading(true)
      try {
        const response = await axios.get(
          `http://localhost:8080/api/farmer/getcrop/${props.username}`,
          {
            headers: {
              "x-access-token": accessToken,
            },
          }
        )
        console.log(response.data);
        let cropslist = response.data.crops.map(function (crop) {
          let x = {};
          x.name = crop.name;
          x.rating = crop.rating;
          x.id = crop._id;
          return x;
        })
        // setState(prevState => ({ ...prevState, cropslist: cropslist }));
        setCropsList(cropslist)
        // console.log(cropslist);
        // console.log(state.cropslist);
      } catch (error) {
        //reload page
        console.log("FARMER FORM FETCH CROPS ERROR", error);
      };
      setLoading(false)
    }
    getCrops()
  }, [])

  // var handleDateValues;
  // const handleChange = (input) => (event) => {
  //   states[input] = event.target.value;
  //   console.log(input + event.target.value);
  // };

  // if state.alertmsg is updated, then the alert will be shown
  // if state.alertmsg is not updated, then the alert will be hidden
  // useEffect(() => {
  //   if (alertMsg !== "") {
  //     alert(alertMsg);
  //     setAlertMsg("")
  //   }
  // }, [alertMsg])

  const handleSubmit = async (e) => {
    // check if any of the fields are empty
    // if any of the fields are empty, show an alert message
    // if all the fields are filled, submit the form
    setLoading(true);

    if (selectedCrop === "") {
      setAlertMsg("Please select a crop")
      setOpen(true)
      setError(true)
      // setState({ alertmsg: "Please select a crop" });
      // setState({ open: true });
    } else if (startDate === null) {
      setAlertMsg("Please select a crop")
      setOpen(true)
      setError(true)
      // setState({ alertmsg: "Please select a start date" });
      // setState({ open: true });
    } else if (duration <= 0) {
      setAlertMsg("Please select a duration")
      setOpen(true)
      setError(true)
      // setState({ alertmsg: "Please select a duration" });
      // setState({ open: true });
    } else if (harvestDate === null) {
      setAlertMsg("Please select a harvest date")
      setOpen(true)
      setError(true)
      // setState({ alertmsg: "Please select a harvest date" });
      // setState({ open: true });
    } else if (quantity === 0) {
      setAlertMsg("Please enter a valid quantity")
      setOpen(true)
      setError(true)
      // setState({ alertmsg: "Please enter a quantity" });
      // setState({ open: true });
    } else if (description === "") {
      setAlertMsg("Please enter a description")
      setOpen(true)
      setError(true)
      // setState({ alertmsg: "Please enter a description" });
      // setState({ open: true });
    } else if (startPrice <= 0) {
      setAlertMsg("Please enter a valid start price")
      setOpen(true)
      setError(true)
      // setState({ alertmsg: "Please enter a start price" });
      // setState({ open: true });
    } else {
      e.preventDefault();
      try {
        const suc = await axios.post("http://localhost:8080/api/farmer/createauction", {
          //TODO: Add address here like : "localhost:3000/api/farmer/createauction"
          startdate: startDate,
          duration: duration,
          harvestdate: harvestDate,
          quantity: quantity,
          description: description,
          startprice: startPrice,
          crop: selectedCrop,
        },
          {
            headers: {
              "x-access-token": accessToken,
            },
          });
        // console.log(suc);
        // setAlertMsg("Auction created successfully")
        // setOpen(true)
        setError(false)
        // setState({ alertmsg: "Auction created successfully" });
        // console.log("Auction Successfully Registered");
        setSelectedCrop("")
        setStartDate(null)
        setHour(0)
        setMinutes(0)
        setDescription("")
        setHarvestDate(null)
        setQuantity(0)
        setStartPrice(0)
        history.push('/auction', {
          msg: 'Auction created successfully!'
        })
      } catch (error) {
        // setState({ alertmsg: "Auction not created" });
        // console.log(error.response?.data.message);
        setAlertMsg(`Auction not created! - ${error.response?.data.message}`)
        setOpen(true)
        setError(true)
      }
    }
    // setOpen(true);
    setLoading(false);
  };


  const submit = (e) => {
    setAlertMsg('')
    setOpen(false)
    setError(false)
    // console.debug(states);
    // check if start date is in past. or harvest date is in future
    // if so, return with error 
    // if not, submit the form

    // console.log("FARMER FORM: ", new Date(duration));

    if (new Date(startDate) < new Date()) {
      setAlertMsg("Start date cannot be in the past");
      setOpen(true);
      setError(true)
    } else if (new Date(harvestDate) > new Date()) {
      setAlertMsg("Harvest date cannot be in the future");
      setOpen(true);
      setError(true)
      // setState(prevState => ({ ...prevState, alertmsg: "Harvest date cannot be in the future", open: true }));
      // setState(prevState => ({ ...prevState, open: true }));
    } else {
      // setDuration(parseInt(hour) * 60 + parseInt(minutes))
      // states["duration"] =
      //   parseInt(states["durationhour"] * 60) + parseInt(states["durationminute"]);

      // console.log(states);
      handleSubmit(e);
    }

  };

  // console.log("FARMER FORM: duration ", new Date(duration), duration);
  // console.log("FARMER FORM: start date", new Date(startDate), duration);


  // use the bootstrap classes and styles to create the following ui form
  // render() {
  return (
    <Container sx={{ mt: 3 }}>
      <Typography
        sx={{
          color: '#1B5E20',
          fontFamily: 'Merriweather',
          margin: '20px auto'
        }}
        variant="h4"
        component="h2"
      >
        New Auction
      </Typography>
      <Box component="form" onSubmit={submit} sx={{ mt: 1, mb: 3 }}>
        <Grid container spacing={2}>
          <Grid item xxs={12}>
            <FormControl fullWidth>
              <InputLabel>Crop</InputLabel>
              <Select
                value={selectedCrop}
                label="Crop"
                onChange={(e) => setSelectedCrop(e.target.value)}
              >
                {loading && <MenuItem><CircularProgress /></MenuItem>}
                {cropsList.map((crop) => (
                  <MenuItem value={crop.id} key={crop.id}>{crop.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {/* <div className="form-group p-2 ">
          <label>Crop</label>
          <select
            className="form-control"
            onChange={handleChange("selectedcrop")}
            style={{ border: "1.5px solid black" }}
          >
            <option value="">Select Crop</option>
            {state.cropslist.map((crop) => (
              <option value={crop.id} key={crop.id}>{crop.name}</option>
            ))}
          </select>
        </div> */}
          {/* <div className="form-group p-2 "> */}
          {/* <label>Start Date</label> */}
          <Grid item xxs={12} sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', alignItems: 'center' }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              {/* <Stack spacing={3}> */}
              <TextField
                id="datetime-local"
                label="Start date"
                type="datetime-local"
                // defaultValue={new Date().toLocaleDateString()}
                onChange={(e) => setStartDate(e.target.value)}
                value={startDate}
                sx={{ width: { xxs: '100%', md: '50%' }, mt: { xxs: 1 }, mb: { xxs: 1 } }}
                InputLabelProps={{
                  shrink: true,
                  min: new Date(new Date() - new Date().getTimezoneOffset() * 60 * 1000).toISOString().slice(0, -8),
                }}
              />
              {/* <DateTimePicker
                  label="Date desktop"
                  // inputFormat="DD/MM/YYYY"
                  value={startDate}
                  onChange={(newVal) => setStartDate(newVal)}
                  renderInput={(params) => <TextField {...params} />}
                /> */}
              {/* </Stack> */}
            </LocalizationProvider>
            <TextField
              type="number"
              className="form-control"
              min="0"
              max="23"
              label="Auction Hours"
              value={hour}
              sx={{ width: { xxs: '100%', xs: '49%', md: '20%' }, mt: { xxs: 1 }, mb: { xxs: 1 } }}
              InputProps={{
                endAdornment: <InputAdornment position="end">Hrs.</InputAdornment>,
              }}
              onChange={(e) => {
                setHour(e.target.value)
                setDuration(parseInt(e.target.value) * 60 + parseInt(minutes))
              }}
            />
            <TextField
              type="number"
              className="form-control"
              label="Auction Minutes"
              value={minutes}
              min="0"
              max="59"
              sx={{ width: { xxs: '100%', xs: '49%', md: '20%' }, mt: { xxs: 1 }, mb: { xxs: 1 } }}
              InputProps={{
                endAdornment: <InputAdornment position="end">Min.</InputAdornment>,
              }}
              onChange={(e) => {
                setMinutes(e.target.value)
                setDuration(parseInt(hour) * 60 + parseInt(e.target.value))
              }}
            />
          </Grid>
          {/* </div> */}
          {/* <div className="form-group p-2 "> */}
          {/* <label>Duration</label> */}
          {/* <div className="row"> */}
          {/* <div className="col-md-4"> */}
          {/* <Grid item xxs={12}>
          </Grid> */}
          {/* </div> */}
          {/* <div className="col-md-4"> */}
          {/* <Grid item xxs={12}>
          </Grid> */}
          {/* </div> */}

          {/* </div> */}
          {/* </div> */}
          {/* <div className="form-group p-2 "> */}
          {/* <label>Harvest Date</label> */}
          <Grid item xxs={12}>
            <TextField
              type="text"
              className="form-control"
              label="Description"
              value={description}
              sx={{ width: { xxs: '100%' }, mt: { xxs: 1 }, mb: { xxs: 1 } }}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>

          <Grid item xxs={12} sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', alignItems: 'center' }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              {/* <Stack spacing={3}> */}
              <TextField
                id="date-local"
                label="Harvest date"
                type="date"
                // defaultValue={new Date().toLocaleDateString()}
                onChange={(e) => setHarvestDate(e.target.value)}
                sx={{ width: { xxs: '100%', md: '50%' }, mt: { xxs: 1 }, mb: { xxs: 1 } }}
                value={harvestDate}
                InputLabelProps={{
                  shrink: true,
                  max: new Date().toISOString().split("T")[0],
                }}
              />
            </LocalizationProvider>
            <TextField
              type="number"
              className="form-control"
              label="Quantity"
              value={quantity}
              sx={{ width: { xxs: '100%', xs: '49%', md: '20%' }, mt: { xxs: 1 }, mb: { xxs: 1 } }}
              InputProps={{
                endAdornment: <InputAdornment position="end">Kg</InputAdornment>,
              }}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <TextField
              type="number"
              className="form-control"
              label="Start Price"
              value={startPrice}
              InputProps={{
                startAdornment: <InputAdornment position="start">&#8377;</InputAdornment>,
              }}
              sx={{ width: { xxs: '100%', xs: '49%', md: '20%' }, mt: { xxs: 1 }, mb: { xxs: 1 } }}
              onChange={(e) => setStartPrice(e.target.value)}
            />
          </Grid>
          <Grid item xxs={12}>
            <Button
              variant="contained"
              onClick={submit}
            >
              Submit
              {loading && <CircularProgress />}
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => {
          setOpen(prev => !prev)
          setAlertMsg("")
          setError(false)
        }}
      >
        <Alert onClose={() => {
          setOpen(prev => !prev)
          setAlertMsg("")
          setError(false)
        }} severity={error ? "error" : "success"} sx={{ width: '100%' }}>
          {alertMsg}
        </Alert>
      </Snackbar>
    </Container>
  );
  // }
};

export default FarmerForm;
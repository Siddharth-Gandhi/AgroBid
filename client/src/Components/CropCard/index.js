import { Card, CardContent, Typography, Avatar, CardHeader, CardActions, Button, CardMedia } from "@mui/material";
import { Link as RouterLink } from "react-router-dom"
import wheatImg from "../../Images/wheat.jpg"

const CropCard = () => {
  return <Card>
    <CardHeader
      avatar={
        <Avatar sx={{ bgcolor: 'primary.main' }} aria-label="farmer name">
          FN
        </Avatar>
      }
      title="Farmer Name"
      subheader="Location"
    />
    <CardMedia
      component="img"
      height="194"
      image={wheatImg}
      alt="Paella dish"
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        Crop Name
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Crop Description
      </Typography>
    </CardContent>
    <CardActions sx={{ padding: '16px', justifyContent: 'space-between' }}>
      <Button color="secondary" sx={{ textTransform: 'none', cursor: 'default', color: 'secondary.dark' }} variant="outlined">
        Current Bid: &#8377;1000
      </Button>
      <Button sx={{ textTransform: 'none', color: 'primary.dark' }} variant="outlined" component={RouterLink} to="/marketplace/farmer/crop">
        More Details
      </Button>
    </CardActions>
  </Card>
}

export default CropCard;
import MainBG from '../../Images/mainBG.jpg';
import { Typography } from '@mui/material';

const HomePage = () => {
  return (
    <>
      <div style={{ width: '100%', maxHeight: '100vh' }}>
        <Typography
          sx={{
            color: '#1B5E20',
            fontFamily: 'Merriweather',
            width: '65%',
            position: 'relative',
            top: '90px',
            pt: 4,
            marginLeft: { xxs: '20px', xs: '70px' },
            fontSize: { xxs: '2.5em', xs: '3.5em' },
            align: 'left'
          }}
          variant="h2"
          component="h1"
        >
          Empowering Farmers with Free Market
        </Typography>
        <img
          src={MainBG}
          alt="Main"
          style={{
            width: '100%',
            minHeight: '100vh',
            maxHeight: '100vh',
            position: 'absolute',
            top: '0',
            zIndex: '-1',
            objectFit: 'cover',
            objectPosition: 'right',
          }}
        />
      </div>
    </>
  );
};

export default HomePage;

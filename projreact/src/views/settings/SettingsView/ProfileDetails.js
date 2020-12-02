import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';

const states = [
  {
    value: 'alabama',
    label: 'Alabama'
  },
  {
    value: 'new-york',
    label: 'New York'
  },
  {
    value: 'san-francisco',
    label: 'San Francisco'
  }
];

const useStyles = makeStyles(() => ({
  root: {}
}));

const ProfileDetails = ({ persona, className, ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    'admin': {
      firstName: 'Amélia',
      lastName: 'Rodrigues',
      email: 'amelia.rodrigues@gostore.com',
      phone: '965235687',
      admin: true,
    },
    'employee': {
      firstName: 'Pedro',
      lastName: 'Paulo',
      email: 'pedro.paulo@gostore.com',
      phone: '923658965',
      admin: false,
    }
  });

  const user = values[persona];

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          subheader={ user.admin? "The information can be edited" : "To change this information, please ask a manager." }
          title="Profile"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="First name"
                name="firstName"
                onChange={handleChange}
                required
                value={user.firstName}
                variant="outlined"
                disabled={!user.admin}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Last name"
                name="lastName"
                onChange={handleChange}
                required
                value={user.lastName}
                variant="outlined"
                disabled={!user.admin}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={handleChange}
                required
                value={user.email}
                variant="outlined"
                disabled={!user.admin}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                onChange={handleChange}
                type="number"
                value={user.phone}
                variant="outlined"
                disabled={!user.admin}
              />
            </Grid>
          </Grid>
        </CardContent>
        {user.admin &&
          <div>
            <Divider />
            <Box
              display="flex"
              justifyContent="flex-end"
              p={2}
            >
              <Button
                color="primary"
                variant="contained"
              >
                Save details
          </Button>
            </Box>
          </div>
        }
      </Card>
    </form>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string
};

export default ProfileDetails;

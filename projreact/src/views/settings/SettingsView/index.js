import React from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import { useLocation } from "react-router-dom";
import Page from 'src/components/Page';
import Notifications from './Notifications';
import Password from './Password';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const SettingsView = () => {
  const classes = useStyles();
  const isClient = useLocation().pathname.includes("/app/client")

  return (
    <Page
      className={classes.root}
      title="Settings"
    >
      <Container maxWidth="lg">
        { !isClient &&
          <Notifications />
        }
        <Box mt={3}>
          <Password />
        </Box>
      </Container>
    </Page>
  );
};

export default SettingsView;

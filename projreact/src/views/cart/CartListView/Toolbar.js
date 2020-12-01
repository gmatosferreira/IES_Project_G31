import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  makeStyles,
  Typography
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
}));

const Toolbar = ({ className, total="00,00", ...rest }) => {
  const classes = useStyles();

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box mt={3}>
        <Typography variant="h1" style={{letterSpacing: '1px'}}>
          My Cart
        </Typography>
        <Typography>
          Total: {total}€
        </Typography>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string,
  total: PropTypes.any
};

export default Toolbar;

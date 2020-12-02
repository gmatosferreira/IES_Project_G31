import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { colors } from '@material-ui/core';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  makeStyles,
  Button
} from '@material-ui/core';
import {
  Edit,
  XCircle,
  RefreshCcw 
} from "react-feather";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex'
  },
  statsIcon: {
    marginRight: theme.spacing(1)
  },
  icon: {
    marginRight: theme.spacing(1)
  },
  title: {
    marginRight: 'auto'
  },
  description:{
    height:'100px',
    overflow: 'hidden',
  }
}));

const ProductCard = ({ persona, className, product, ...rest }) => {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Box
          display="flex"
          justifyContent="center"
          mb={3}
        >
          <Avatar
            alt="Product"
            style={{ height: '75px', width: '75px' }}
            src={product.media}
          />
        </Box>
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h4"
        >
          {product.title}
        </Typography>
        <Typography
          align="center"
          color="textPrimary"
          variant="body1"
          className={classes.description}
        >
          {product.description}
        </Typography>
        <br></br>
        <Box
        display="flex"
        justifyContent="space-around"
        mb={1}>
          <Button color={colors.common.yellow} variant="contained">
						<Edit className={classes.icon}  size="20" />
						<span className={classes.title}>Edit</span>
					</Button>
          <Button color={colors.common.yellow} variant="contained">
						<RefreshCcw className={classes.icon}  size="20" />
						<span className={classes.title}>Restock</span>
					</Button>
          <Button color={colors.common.red} variant="contained">
						<XCircle className={classes.icon} size="20" />
						<span className={classes.title}>Delete</span>
					</Button>

        </Box>
      </CardContent>
      <Box flexGrow={1} />
      <Divider />
      <Box p={2}>
        <Grid
          container
          justify="space-between"
          spacing={2}
        >
          <Grid
            className={classes.statsItem}
            item
          >
            <Typography
              color="textSecondary"
              display="inline"
              variant="body2"
            >
              {product.category}
            </Typography>
          </Grid>
          <Grid
            className={classes.statsItem}
            item
          >
            <Typography
              color="textSecondary"
              display="inline"
              variant="body2"
            >
              {product.stock}
              {' '}
              in Stock
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

ProductCard.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object.isRequired
};

export default ProductCard;

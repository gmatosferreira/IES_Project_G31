import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  makeStyles,
  Typography
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import Page from 'src/components/Page';
import Toolbar from './Toolbar';
import ProductCard from './ProductCard';
import data from './productList';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  productCard: {
    height: '50%'
  }
}));

const MyCart = () => {
  const classes = useStyles();
  const [products] = useState(data);

  return (
    <Page
      className={classes.root}
      title="My Cart"
    >
      <Container maxWidth={false}>
        <Toolbar/>
        <Box mt={3}>
          <Grid
            container
            spacing={3}
          >

            {products.map((product) => (
              <Grid
                item
                key={product.id}
                lg={12}
                md={12}
                xs={12}
              >
                <ProductCard
                  className={classes.productCard}
                  product={product}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box
          mt={3}
          display="flex"
          justifyContent="center"
        >
          <Pagination
            color="primary"
            count={3}
            size="small"
          />
        </Box>
      </Container>
    </Page>
  );
};

export default MyCart;

import React, { useState } from "react";
import { Box, Container, Grid, makeStyles } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import Page from "src/components/Page";
import Toolbar from "./Toolbar";
import CustomerCard from "./CustomerCard";
import data from "./data";

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.dark,
		minHeight: "100%",
		paddingBottom: theme.spacing(3),
		paddingTop: theme.spacing(3),
	},
	customerCard: {
		height: "100%",
	},
}));

const CustomerList = () => {
	const classes = useStyles();
  const [customers] = useState(data);
  const itemsPerPage = 6;
  const [page, setPage] = React.useState(1);
  const [noOfPages] = React.useState(
    Math.ceil(customers.length / itemsPerPage)
  );

  const handleChange = (event, value) => {
    setPage(value);
  };

	return (
		<Page className={classes.root} title="Customers in Store">
			<Container maxWidth={false}>
				<Toolbar />
				<Box mt={3}>
					<Grid container spacing={3}>
						{customers.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((customer) => (
							<Grid item key={customer.id} lg={3} md={4} xs={12}>
								<CustomerCard
									className={classes.customerCard}
									customer={customer}
								/>
							</Grid>
						))}
					</Grid>
				</Box>
				<Box mt={3} display="flex" justifyContent="center">
					<Pagination
						color="primary"
						count={noOfPages}
            page={page}
            defaultPage={1}
            showFirstButton
            showLastButton
            onChange={handleChange}
						size="small"
					/>
				</Box>
			</Container>
		</Page>
	);
};

export default CustomerList;

import React, { useState } from "react";
import { Box, Container, Grid, makeStyles } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import Page from "src/components/Page";
import Toolbar from "./Toolbar";
import CustomerCard from "./CustomerCard";
import { withStyles } from '@material-ui/core/styles';
import data from "./data";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import PerfectScrollbar from 'react-perfect-scrollbar';

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
	closeButton: {
		position: "absolute",
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500],
	},
}));

const DialogContent = withStyles((theme) => ({
	root: {
		maxHeight: '1000px',
		padding: theme.spacing(2),
	},
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
	root: {
		margin: 0,
		padding: theme.spacing(1),
	},
}))(MuiDialogActions);

const CustomerList = () => {
	const classes = useStyles();
	const [customers] = useState(data);
	const itemsPerPage = 12;
	const [page, setPage] = React.useState(1);
	const [noOfPages] = React.useState(
		Math.ceil(customers.length / itemsPerPage)
	);

	const handleChange = (event, value) => {
		setPage(value);
	};

	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	return (
		<Page className={classes.root} title="Customers in Store">
			<Container maxWidth={false}>
				<Toolbar />
				<Box mt={3}>
					<Grid container spacing={3}>
						{customers
							.slice(
								(page - 1) * itemsPerPage,
								page * itemsPerPage
							)
							.map((customer) => (
								<Grid
									item
									key={customer.id}
									lg={3}
									md={4}
									xs={12}
								>
									<CustomerCard
										className={classes.customerCard}
										customer={customer}
										onnclick={handleClickOpen}
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
			<Dialog
				onClose={handleClose}
				aria-labelledby="customized-dialog-title"
				open={open}
			>
	
				<DialogContent dividers>
				<PerfectScrollbar>
					<Typography gutterBottom>
						Cras mattis consectetur purus sit amet fermentum. Cras
						justo odio, dapibus ac facilisis in, egestas eget quam.
						Morbi leo risus, porta ac consectetur ac, vestibulum at
						eros.
					</Typography>
					<Typography gutterBottom>
						Praesent commodo cursus magna, vel scelerisque nisl
						consectetur et. Vivamus sagittis lacus vel augue laoreet
						rutrum faucibus dolor auctor.
					</Typography>
					<Typography gutterBottom>
						Aenean lacinia bibendum nulla sed consectetur. Praesent
						commodo cursus magna, vel scelerisque nisl consectetur
						et. Donec sed odio dui. Donec ullamcorper nulla non
						metus auctor fringilla.
					</Typography>
					<Box>
					<Typography gutterBottom>
						Aenean lacinia bibendum nulla sed consectetur. Praesent
						commodo cursus magna, vel scelerisque nisl consectetur
						et. Donec sed odio dui. Donec ullamcorper nulla non
						metus auctor fringilla.
						commodo cursus magna, vel scelerisque nisl consectetur
						et. Donec sed odio dui. Donec ullamcorper nulla non
						metus auctor fringilla.
						commodo cursus magna, vel scelerisque nisl consectetur
						et. Donec sed odio dui. Donec ullamcorper nulla non
						metus auctor fringilla.
						commodo cursus magna, vel scelerisque nisl consectetur
						et. Donec sed odio dui. Donec ullamcorper nulla non
						metus auctor fringilla.
					</Typography>
					</Box>
					</PerfectScrollbar>	
				</DialogContent>
				<DialogActions>
					<Button autoFocus onClick={handleClose} color="primary">
						Close
					</Button>
				</DialogActions>
			</Dialog>
		</Page>
	);
};

export default CustomerList;

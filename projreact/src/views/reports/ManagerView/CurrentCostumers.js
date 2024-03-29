import React from "react";
import { NavLink as RouterLink } from "react-router-dom";
import clsx from "clsx";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import moment from "moment";
import {
	Box,
	Button,
	Card,
	CardHeader,
	Divider,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	TableSortLabel,
	Tooltip,
	makeStyles,
} from "@material-ui/core";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

const useStyles = makeStyles(() => ({
	root: {},
	actions: {
		justifyContent: "flex-end",
	},
}));

const LatestOrders = ({ persons, className, ...rest }) => {
	const classes = useStyles();

	return (
		<Card className={clsx(classes.root, className)} {...rest}>
			<CardHeader title="Current Customers" />
			<Divider />
			<PerfectScrollbar>
				<Box minWidth={800}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Name</TableCell>
								<TableCell>Email</TableCell>
								<TableCell>
									<TableSortLabel active direction="desc">
										Last visit
									</TableSortLabel>
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{persons.map((person) => (
								<TableRow hover key={person.nif}>
									<TableCell>{person.name}</TableCell>
									<TableCell>{person.email}</TableCell>
									<TableCell>
										{moment(person.lastVisit).format(
											"DD/MM/YYYY, HH:mm:ss"
										)}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</Box>
			</PerfectScrollbar>
			<Box display="flex" justifyContent="flex-end" p={2}>
				<Button
					color="primary"
					endIcon={<ArrowRightIcon />}
					size="small"
					variant="text"
					component={RouterLink}
					to="/admin/customers/"
				>
					View all
				</Button>
			</Box>
		</Card>
	);
};

LatestOrders.propTypes = {
	className: PropTypes.string,
};

export default LatestOrders;

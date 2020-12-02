import React, { useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import {
	Avatar,
	Box,
	Divider,
	Drawer,
	Hidden,
	List,
	Typography,
	makeStyles,
} from "@material-ui/core";
import {
	BarChart as BarChartIcon,
	Settings as SettingsIcon,
	ShoppingBag as ShoppingBagIcon,
	User as UserIcon,
	Users as UsersIcon,
} from "react-feather";
import NavItem from "./NavItem";

const useStyles = makeStyles(() => ({
	mobileDrawer: {
		width: 256,
	},
	desktopDrawer: {
		width: 256,
		top: 64,
		height: "calc(100% - 64px)",
	},
	avatar: {
		cursor: "pointer",
		width: 64,
		height: 64,
	},
}));

const user = {
	avatar: "/static/images/avatars/avatar_6.png",
	jobTitle: "Senior Developer",
	name: "Katarina Smith",
};

let items = [
	{
		href: "/app/dashboard",
		icon: BarChartIcon,
		title: "Dashboard",
	},
	{
		href: "/app/customers",
		icon: UsersIcon,
		title: "Customers",
	},
	{
		href: "/app/products",
		icon: ShoppingBagIcon,
		title: "Products",
	},
	{
		href: "/app/account",
		icon: UserIcon,
		title: "Account",
	},
	{
		href: "/app/settings",
		icon: SettingsIcon,
		title: "Settings",
	},
];

const NavBar = ({ onMobileClose, openMobile }) => {
	const classes = useStyles();
	const location = useLocation();
	const isClient = location.pathname.includes("/app/client");
	const isAdmin = location.pathname.includes("/app/admin");
	const isEmployee = location.pathname.includes("/app/employee");

	useEffect(() => {
		if (openMobile && onMobileClose) {
			onMobileClose();
		}
		// eslint-disable-next-line
	}, [location.pathname]);

	if (isClient) {
		items = [
			{
				href: "/app/client",
				icon: BarChartIcon,
				title: "Dashboard",
			},
			{
				href: "/app/client/products",
				icon: ShoppingBagIcon,
				title: "Products",
			},
			{
				href: "/app/client/account",
				icon: UserIcon,
				title: "Account",
			},
			{
				href: "/app/client/settings",
				icon: SettingsIcon,
				title: "Settings",
			},
		];
		user.jobTitle = "";
	}

	if (isAdmin) {
		items = [
			{
				href: "/app/admin",
				icon: BarChartIcon,
				title: "Dashboard",
			},
			{
				href: "/app/customers",
				icon: UsersIcon,
				title: "Customers",
			},
			{
				href: "/app/admin/products",
				icon: ShoppingBagIcon,
				title: "Products",
			},
			{
				href: "/app/admin/account",
				icon: UserIcon,
				title: "Account",
			},
			{
				href: "/app/admin/settings",
				icon: SettingsIcon,
				title: "Settings",
			},
		];
		user.jobTitle = "Administrator";
	}

	if (isEmployee) {
		items = [
			{
				href: "/app/employee",
				icon: BarChartIcon,
				title: "Dashboard",
			},
			{
				href: "/app/employee/products",
				icon: ShoppingBagIcon,
				title: "Products",
			},
			{
				href: "/app/employee/account",
				icon: UserIcon,
				title: "Account",
			},
			{
				href: "/app/employee/settings",
				icon: SettingsIcon,
				title: "Settings",
			},
		];
		user.jobTitle = "Employee";
	}

	const content = (
		<Box height="100%" display="flex" flexDirection="column">
			<Box
				alignItems="center"
				display="flex"
				flexDirection="column"
				p={2}
			>
				<Avatar
					className={classes.avatar}
					src={user.avatar}
				/>
				<Typography
					className={classes.name}
					color="textPrimary"
					variant="h5"
				>
					{user.name}
				</Typography>
				<Typography color="textSecondary" variant="body2">
					{user.jobTitle}
				</Typography>
			</Box>
			<Divider />
			<Box p={2}>
				<List>
					{items.map((item) => (
						<NavItem
							href={item.href}
							key={item.title}
							title={item.title}
							icon={item.icon}
						/>
					))}
				</List>
			</Box>
			<Box flexGrow={1} />
		</Box>
	);

	return (
		<>
			<Hidden lgUp>
				<Drawer
					anchor="left"
					classes={{ paper: classes.mobileDrawer }}
					onClose={onMobileClose}
					open={openMobile}
					variant="temporary"
				>
					{content}
				</Drawer>
			</Hidden>
			<Hidden mdDown>
				<Drawer
					anchor="left"
					classes={{ paper: classes.desktopDrawer }}
					open
					variant="persistent"
				>
					{content}
				</Drawer>
			</Hidden>
		</>
	);
};

NavBar.propTypes = {
	onMobileClose: PropTypes.func,
	openMobile: PropTypes.bool,
};

NavBar.defaultProps = {
	onMobileClose: () => {},
	openMobile: false,
};

export default NavBar;

import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import LockClosedIcon from '@heroicons/react/24/solid/LockClosedIcon';
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import RectangleGroupIcon from '@heroicons/react/24/solid/RectangleStackIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import { SvgIcon } from '@mui/material';
import CheckRoundIcon from "@rsuite/icons/CheckRound";
import ProjectIcon from "@rsuite/icons/Project";
import CouponIcon from "@rsuite/icons/Coupon";

export const items = [
  {
    title: "Overview",
    path: "/",
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    ),
  },
  // {
  //   title: "Customers",
  //   path: "/customers",
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <UsersIcon />
  //     </SvgIcon>
  //   ),
  // },
  {
    title: "Orders",
    path: "/orders",
    icon: (
      <SvgIcon fontSize="small">
        <ShoppingBagIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Coupons",
    path: "/coupons",
    icon: (
      <SvgIcon fontSize="small">
        <CouponIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Brands",
    path: "/brands",
    icon: (
      <SvgIcon fontSize="small">
        <CheckRoundIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Categories",
    path: "/categories",
    icon: (
      <SvgIcon fontSize="small">
        <ProjectIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Products",
    path: "/products",
    icon: (
      <SvgIcon fontSize="small">
        <RectangleGroupIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Profile",
    path: "/profile",
    icon: (
      <SvgIcon fontSize="small">
        <UserIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Logout",
    path: "/auth/login",
    icon: (
      <SvgIcon fontSize="small">
        <LockClosedIcon />
      </SvgIcon>
    ),
  },
];

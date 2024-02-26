/* eslint-disable react/jsx-max-props-per-line */
import { useCallback, useMemo, useState } from 'react';
import Head from "next/head";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { applyPagination } from "src/utils/apply-pagination";
import { OrdersTable } from "src/sections/orders/orders-table";
import { OrdersSearch } from "src/sections/orders/orders-search";

const now = new Date();

const data = [
  {
    user: "611f2b987d048d10e4e60d53",
    cart: [],
    name: "John Doe",
    address: "123 Main Street",
    email: "johndoe@example.com",
    contact: "123-456-7890",
    city: "New York",
    country: "USA",
    zipCode: "10001",
    subTotal: 150.5,
    shippingCost: 10.0,
    discount: 5.0,
    totalAmount: 155.5,
    shippingOption: "Standard",
    cardInfo: {},
    paymentIntent: {},
    paymentMethod: "Credit Card",
    orderNote: "Please deliver during office hours",
    invoice: 123456789,
    createdAt: new Date(),
    status: "pending",
  },
  {
    user: "611f2b987d048d10e4e60d54",
    cart: [{ productId: "123", quantity: 2 }],
    name: "Jane Smith",
    address: "456 Elm Street",
    email: "janesmith@example.com",
    contact: "987-654-3210",
    city: "Los Angeles",
    country: "USA",
    zipCode: "90001",
    subTotal: 120.75,
    shippingCost: 8.5,
    discount: 0.0,
    totalAmount: 129.25,
    shippingOption: "Express",
    cardInfo: { cardNumber: "**** **** **** 1234", expiryDate: "12/24" },
    paymentIntent: {},
    paymentMethod: "Debit Card",
    orderNote: "",
    invoice: 123456790,
    createdAt: new Date(),
    status: "processing",
  },
  {
    user: "611f2b987d048d10e4e60d55",
    cart: [
      { productId: "456", quantity: 1 },
      { productId: "789", quantity: 3 },
    ],
    name: "Alice Johnson",
    address: "789 Oak Street",
    email: "alicejohnson@example.com",
    contact: "555-123-4567",
    city: "Chicago",
    country: "USA",
    zipCode: "60601",
    subTotal: 210.0,
    shippingCost: 12.0,
    discount: 15.0,
    totalAmount: 207.0,
    shippingOption: "Standard",
    cardInfo: {},
    paymentIntent: {},
    paymentMethod: "PayPal",
    orderNote: "Handle with care",
    invoice: 123456791,
    createdAt: new Date(),
    status: "delivered",
  },
  {
    user: "611f2b987d048d10e4e60d53",
    cart: [
      {
        productId: "23456",
        quantity: 3,
      },
    ],
    name: "Alice Johnson",
    address: "789 Pine Street",
    email: "alicejohnson@example.com",
    contact: "555-123-4567",
    city: "Chicago",
    country: "USA",
    zipCode: "60601",
    subTotal: 75.0,
    shippingCost: 8.0,
    discount: 2.5,
    totalAmount: 80.5,
    shippingOption: "Standard",
    cardInfo: {},
    paymentIntent: {},
    paymentMethod: "PayPal",
    orderNote: "",
    invoice: 789123456,
    createdAt: new Date(),
    status: "delivered",
  },
  {
    user: "611f2b987d048d10e4e60d53",
    cart: [],
    name: "Michael Brown",
    address: "1010 Elm Street",
    email: "michaelbrown@example.com",
    contact: "333-555-7777",
    city: "Houston",
    country: "USA",
    zipCode: "77001",
    subTotal: 50.0,
    shippingCost: 7.0,
    discount: 0.0,
    totalAmount: 57.0,
    shippingOption: "Standard",
    cardInfo: {},
    paymentIntent: {},
    paymentMethod: "Credit Card",
    orderNote: "Please deliver after 6 PM",
    invoice: 456789123,
    createdAt: new Date(),
    status: "pending",
  },
  {
    user: "611f2b987d048d10e4e60d53",
    cart: [
      {
        productId: "34567",
        quantity: 1,
      },
    ],
    name: "Emily Davis",
    address: "222 Maple Avenue",
    email: "emilydavis@example.com",
    contact: "444-222-8888",
    city: "San Francisco",
    country: "USA",
    zipCode: "94101",
    subTotal: 30.0,
    shippingCost: 5.0,
    discount: 0.0,
    totalAmount: 35.0,
    shippingOption: "Express",
    cardInfo: {},
    paymentIntent: {},
    paymentMethod: "Credit Card",
    orderNote: "Urgent delivery required",
    invoice: 987654321,
    createdAt: new Date(),
    status: "processing",
  },
  {
    user: "611f2b987d048d10e4e60d53",
    cart: [
      {
        productId: "45678",
        quantity: 2,
      },
    ],
    name: "David Wilson",
    address: "333 Oak Street",
    email: "davidwilson@example.com",
    contact: "666-999-3333",
    city: "Boston",
    country: "USA",
    zipCode: "02101",
    subTotal: 90.0,
    shippingCost: 10.0,
    discount: 5.0,
    totalAmount: 95.0,
    shippingOption: "Standard",
    cardInfo: {},
    paymentIntent: {},
    paymentMethod: "Debit Card",
    orderNote: "No contact delivery preferred",
    invoice: 123987456,
    createdAt: new Date(),
    status: "delivered",
  },
  {
    user: "611f2b987d048d10e4e60d53",
    cart: [],
    name: "Sophia Miller",
    address: "456 Cedar Street",
    email: "sophiamiller@example.com",
    contact: "777-888-9999",
    city: "Seattle",
    country: "USA",
    zipCode: "98101",
    subTotal: 20.0,
    shippingCost: 5.0,
    discount: 0.0,
    totalAmount: 25.0,
    shippingOption: "Standard",
    cardInfo: {},
    paymentIntent: {},
    paymentMethod: "Credit Card",
    orderNote: "",
    invoice: 654789321,
    createdAt: new Date(),
    status: "delivered",
  },
  {
    user: "611f2b987d048d10e4e60d53",
    cart: [
      {
        productId: "11111",
        quantity: 3,
      },
      {
        productId: "22222",
        quantity: 1,
      },
    ],
    name: "Alice Johnson",
    address: "789 Pine Street",
    email: "alicejohnson@example.com",
    contact: "555-123-4567",
    city: "Chicago",
    country: "USA",
    zipCode: "60601",
    subTotal: 120.0,
    shippingCost: 8.0,
    discount: 2.0,
    totalAmount: 126.0,
    shippingOption: "Standard",
    cardInfo: {},
    paymentIntent: {},
    paymentMethod: "Credit Card",
    orderNote: "Please handle with care",
    invoice: 9876543210,
    createdAt: new Date(),
    status: "delivered",
  },
  {
    user: "611f2b987d048d10e4e60d53",
    cart: [
      {
        productId: "33333",
        quantity: 1,
      },
    ],
    name: "Robert Miller",
    address: "101 Maple Avenue",
    email: "robertmiller@example.com",
    contact: "777-555-8888",
    city: "San Francisco",
    country: "USA",
    zipCode: "94105",
    subTotal: 50.0,
    shippingCost: 5.0,
    discount: 0.0,
    totalAmount: 55.0,
    shippingOption: "Express",
    cardInfo: {},
    paymentIntent: {},
    paymentMethod: "PayPal",
    orderNote: "",
    invoice: 123987456,
    createdAt: new Date(),
    status: "cancel",
  },
];

const useOrders = (page, rowsPerPage) => {
  return useMemo(() => {
    return applyPagination(data, page, rowsPerPage);
  }, [page, rowsPerPage]);
};

const useOrderIds = (orders) => {
  return useMemo(() => {
    return orders.map((order) => order.id);
  }, [orders]);
};

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const orders = useOrders(page, rowsPerPage);
  const ordersIds = useOrderIds(orders);
  const ordersSelection = useSelection(ordersIds);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  return (
    <>
      <Head>
        <title>Orders | Shofy jewellery</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Orders</Typography>
                <Stack alignItems="center" direction="row" spacing={1}></Stack>
              </Stack>
            </Stack>
            <OrdersSearch />
            <OrdersTable
              count={data.length}
              items={orders}
              onDeselectAll={ordersSelection.handleDeselectAll}
              onDeselectOne={ordersSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={ordersSelection.handleSelectAll}
              onSelectOne={ordersSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={ordersSelection.selected}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;

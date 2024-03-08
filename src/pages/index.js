/* eslint-disable react/jsx-max-props-per-line */
import React, { useContext } from "react";
import Head from "next/head";
import { Box, Container, Unstable_Grid2 as Grid } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { OverviewBudget } from "src/sections/overview/overview-budget";
import { OverviewLatestOrders } from "src/sections/overview/overview-latest-orders";
import { OverviewLatestProducts } from "src/sections/overview/overview-latest-products";
import { OverviewTotalCustomers } from "src/sections/overview/overview-total-customers";
import { OverviewTotalProfit } from "src/sections/overview/overview-total-profit";
import { AuthContext } from "src/contexts/auth-context";
import adminApiService from "src/services/admin-api-service";

const now = new Date();

const Page = ({ ordersUpdated = [], productsUpdated = [] }) => {
  const auth = useContext(AuthContext);

  return (
    <>
      <Head>
        <title>Overview | Shofy Jwelleries</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            <Grid xs={12} sm={6} lg={4}>
              <OverviewBudget difference={12} positive sx={{ height: "100%" }} value="$24k" />
            </Grid>
            <Grid xs={12} sm={6} lg={4}>
              <OverviewTotalCustomers
                difference={16}
                positive={false}
                sx={{ height: "100%" }}
                value="1.6k"
              />
            </Grid>
            <Grid xs={12} sm={6} lg={4}>
              <OverviewTotalProfit sx={{ height: "100%" }} value="$15k" />
            </Grid>
            <Grid xs={12} md={6} lg={4}>
              <OverviewLatestProducts products={productsUpdated} sx={{ height: "100%" }} />
            </Grid>
            <Grid xs={12} md={12} lg={8}>
              <OverviewLatestOrders orders={ordersUpdated} sx={{ height: "100%" }} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

// This gets called on every request
export async function getServerSideProps() {
  try {
    // Fetch orders and products concurrently
    const [ordersRes, productsRes] = await Promise.all([
      adminApiService.getOrders(),
      adminApiService.getProducts(),
    ]);

    // Extract data from responses
    const ordersData = ordersRes.data.data;
    const productsData = productsRes.data.data;

    // Return data as props
    return {
      props: {
        ordersUpdated: ordersData,
        productsUpdated: productsData,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error.message);
    // If an error occurs, return default values as props
    return {
      props: {
        ordersUpdated: null,
        productsUpdated: null,
      },
    };
  }
}
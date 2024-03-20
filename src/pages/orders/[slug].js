/* eslint-disable @next/next/no-css-tags */
/* eslint-disable react/jsx-max-props-per-line */
import Head from "next/head";
import { Box, Container, Stack, Button, Typography, Unstable_Grid2 as Grid } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { useRouter } from "next/router";
import { CategoryImage } from "src/sections/category-form/category-image";
import { CategoryDetails } from "src/sections/category-form/category-form";
import { OrderDetails } from "src/sections/orders/order-form";

const Page = ({ order }) => {
  const router = useRouter();
  function navigateDashboard() {
    router.push("/");
  }
  function navigateProducts() {
    router.push("/orders");
  }
  return (
    <>
      <Head>
        <title>Account | Wesellvelli </title>
        <link rel="stylesheet" href="style.css" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
        />
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3}>
            <div>
              <Typography variant="h4">{"Order: " + (order?.id ?? "Invalid order")}</Typography>
              <hr />
              <Stack direction="row" spacing={1}>
                <Button onClick={navigateDashboard}>Dashboard</Button>
                <Button onClick={navigateProducts}>Orders</Button>
              </Stack>
            </div>
            <div>
              <Grid container spacing={3}>
                <Grid xs={12} md={6} lg={12}>
                  <OrderDetails order={order} />
                </Grid>
              </Grid>
            </div>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

// This gets called on every request
export async function getServerSideProps(window) {
  console.log(window.query.slug);
  let data = null;
  try {
    const res = await fetch(``);
    data = await res.json();
  } catch (error) {}
  return { props: { order: data } };
}

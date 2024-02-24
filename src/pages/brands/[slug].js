/* eslint-disable react/jsx-max-props-per-line */
import Head from "next/head";
import { Box, Container, Stack, Button, Typography, Unstable_Grid2 as Grid } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { useRouter } from "next/router";
import { BrandImage } from "src/sections/brand-form/brand-image";
import { BrandDetails } from "src/sections/brand-form/brand-form";

const Page = ({ product }) => {
  const router = useRouter();

  let image =
    "https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png";

  function navigateDashboard() {
    router.push("/");
  }
  function navigateProducts() {
    router.push("/brands");
  }
  return (
    <>
      <Head>
        <title>Account | Shofy jewellery</title>
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
              <Typography variant="h4">{(product ? "Edit " : "Add ") + "Brand"}</Typography>
              <hr />
              <Stack direction="row" spacing={1}>
                <Button onClick={navigateDashboard}>Dashboard</Button>
                <Button onClick={navigateProducts}>Brands</Button>
                <Button disabled>{product ? product.id : "add"}</Button>
              </Stack>
            </div>
            <div>
              <Grid container spacing={3}>
                <Grid xs={12} md={6} lg={4}>
                  <BrandImage image={image} />
                </Grid>
                <Grid xs={12} md={6} lg={8}>
                  <BrandDetails productInformation={product} />
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
  return { props: { product: data } };
}

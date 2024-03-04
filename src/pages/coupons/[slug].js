/* eslint-disable @next/next/no-css-tags */
/* eslint-disable react/jsx-max-props-per-line */
import Head from "next/head";
import { Box, Container, Stack, Button, Typography, Unstable_Grid2 as Grid } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { useRouter } from "next/router";
import { CouponDetails } from "src/sections/coupon-form/coupon-form";
import adminApiService from "src/services/admin-api-service";

const Page = ({ coupon }) => {
  const router = useRouter();
  let uploadClick = false;

  function navigateDashboard() {
    router.push("/");
  }
  function navigateCoupons() {
    router.push("/coupons");
  }
  async function submitForm(updatedFormData) {
    if (!uploadClick) {
      uploadClick = true;
      try {
        if (updatedFormData.isEdit) {
          adminApiService.editCoupon(updatedFormData);
        } else {
          adminApiService.addCoupon(updatedFormData);
        }
        uploadClick = false;
        setTimeout(() => {
          navigateCoupons();
        }, 1000);
      } catch (e) {
        console.log("Error : " + e);
      }
      uploadClick = false;
    }
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
              <Typography variant="h4">{(coupon ? "Edit " : "Add ") + "Coupon"}</Typography>
              <hr />
              <Stack direction="row" spacing={1}>
                <Button onClick={navigateDashboard}>Dashboard</Button>
                <Button onClick={navigateCoupons}>Coupons</Button>
                <Button disabled>{coupon ? coupon._id : "add"}</Button>
              </Stack>
            </div>
            <div>
              <Grid container spacing={3}>
                <Grid xs={12} md={10} lg={12}>
                  <CouponDetails coupon={coupon} submitForm={submitForm} />
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
    if (window.query.slug == "add") throw "Not Found";
    const res = await adminApiService.getCouponById(window.query.slug);
    data = res.data;
    data.isEdit = true;
  } catch (error) {}
  return { props: { coupon: data } };
}

/* eslint-disable @next/next/no-css-tags */
/* eslint-disable react/jsx-max-props-per-line */
import Head from "next/head";
import { Box, Container, Stack, Button, Typography, Unstable_Grid2 as Grid } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { useRouter } from "next/router";
import { CategoryImage } from "src/sections/category-form/category-image";
import { CategoryDetails } from "src/sections/category-form/category-form";
import adminApiService from "src/services/admin-api-service";
import { useEffect, useState } from "react";

const Page = ({ category }) => {
  const router = useRouter();
  const [file, selectFile] = useState(null);
  const [image, setImage] = useState(null);

  let uploadClick = false;

  function uploadBreak() {
    setTimeout(() => {
      selectFile(null);
    }, 3000);
  }

  useEffect(() => {
    setImage(category?.img);
  }, [category]);

  function navigateDashboard() {
    router.push("/");
  }
  function navigateProducts() {
    router.push("/categories");
  }

  async function submitForm(updatedFormData) {
    if (!uploadClick) {
      uploadClick = true;
      let imageSelected = true;
      if (file == null) imageSelected = false;
      try {
        if (imageSelected) {
          uploadBreak();
          let response = await adminApiService.uploadImage(file);
          console.log(response.data.url);
          updatedFormData.img = response.data.url;
        }
        if (updatedFormData.isEdit) {
          adminApiService.editCategory(updatedFormData);
        } else {
          adminApiService.addCategory(updatedFormData);
        }
        uploadClick = false;
        setTimeout(() => {
          navigateProducts();
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
              <Typography variant="h4">{(category ? "Edit " : "Add ") + "Category"}</Typography>
              <hr />
              <Stack direction="row" spacing={1}>
                <Button onClick={navigateDashboard}>Dashboard</Button>
                <Button onClick={navigateProducts}>Categories</Button>
                <Button disabled>{category ? category._id : "add"}</Button>
              </Stack>
            </div>
            <div>
              <Grid container spacing={3}>
                <Grid xs={12} md={6} lg={4}>
                  <CategoryImage image={image} onSelect={selectFile} />
                </Grid>
                <Grid xs={12} md={6} lg={8}>
                  <CategoryDetails category={category} submitForm={submitForm} />
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
    const res = await adminApiService.getCategoryById(window.query.slug);
    data = res.data;
    data.isEdit = true;
  } catch (error) {}
  return { props: { category: data } };
}

/* eslint-disable react/jsx-max-props-per-line */
import { useCallback, useMemo, useState } from "react";
import Head from "next/head";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { applyPagination } from "src/utils/apply-pagination";
import { CategorySearch } from "src/sections/categories/category-search";
import { CategoriesTable } from "src/sections/categories/categories-table";
import { useRouter } from "next/router";

const now = new Date();

const data = [
  {
    id: "asdfghjkl",
    productType: "Type 1",
    description: "Global Brand",
    status: "ACTIVE",
  },
];

const useProducts = (page, rowsPerPage) => {
  return useMemo(() => {
    return applyPagination(data, page, rowsPerPage);
  }, [page, rowsPerPage]);
};

const useOrderIds = (category) => {
  return useMemo(() => {
    return category.map((current) => current.id);
  }, [category]);
};

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const categories = useProducts(page, rowsPerPage);
  const categoryIds = useOrderIds(categories);
  const categorySelection = useSelection(categoryIds);
  const router = useRouter();

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  return (
    <>
      <Head>
        <title>Categories | Shofy jewellery</title>
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
                <Typography variant="h4">Categories</Typography>
                <Stack alignItems="center" direction="row" spacing={1}></Stack>
              </Stack>
              <div>
                <Button
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                  onClick={() => router.push("/categories/add")}
                >
                  Add
                </Button>
              </div>
            </Stack>
            <CategorySearch />
            <CategoriesTable
              count={data.length}
              items={categories}
              onDeselectAll={categorySelection.handleDeselectAll}
              onDeselectOne={categorySelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={categorySelection.handleSelectAll}
              onSelectOne={categorySelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={categorySelection.selected}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

/* eslint-disable react/jsx-max-props-per-line */
import { useCallback, useMemo, useState } from "react";
import Head from "next/head";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { applyPagination } from "src/utils/apply-pagination";
import { useRouter } from "next/router";
import { CouponsSearch } from "src/sections/coupons/coupons-search";
import { CouponsTable } from "src/sections/coupons/coupons-table";

const now = new Date();

const data = [
  {
    title: "TEST",
    logo: null,
    couponCode: "ABCE1234",
    startTime: new Date(),
    endTime: new Date(),
    discountPercentage: 10,
    minimumAmount: 399,
    productType: "TYPE 1",
    status: "ACTIVE",
  },
];

const useCoupons = (page, rowsPerPage) => {
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
  const coupons = useCoupons(page, rowsPerPage);
  const categoryIds = useOrderIds(coupons);
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
        <title>Coupons | Shofy jewellery</title>
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
                <Typography variant="h4">Coupons</Typography>
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
            <CouponsSearch />
            <CouponsTable
              count={data.length}
              items={coupons}
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

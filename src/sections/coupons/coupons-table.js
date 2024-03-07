/* eslint-disable react/jsx-max-props-per-line */
import PropTypes from "prop-types";
import { format, parseISO } from "date-fns";
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Stack,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { CouponsIconGroup } from "./coupons-icon-group";

export const CouponsTable = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
    refresh = () => {},
  } = props;

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>NAME</TableCell>
                <TableCell>COUPON</TableCell>
                <TableCell>DISCOUNT (%)</TableCell>
                <TableCell>MIN. AMOUNT</TableCell>
                <TableCell>PRODUCT TYPE</TableCell>
                <TableCell>VALIDITY</TableCell>
                <TableCell>STATUS</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((coupon) => {
                const fromDate = format(parseISO(coupon.startTime), "dd/MM/yyyy");
                const toDate = format(parseISO(coupon.endTime), "dd/MM/yyyy");
                return (
                  <TableRow hover key={coupon.id}>
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Typography variant="subtitle2">{coupon.title}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{coupon.couponCode}</TableCell>
                    <TableCell>{coupon.discountPercentage}</TableCell>
                    <TableCell>{coupon.minimumAmount}</TableCell>
                    <TableCell>{coupon.productType}</TableCell>
                    <TableCell>{fromDate + " to " + toDate}</TableCell>
                    <TableCell>{coupon.status}</TableCell>
                    <TableCell>
                      <CouponsIconGroup id={coupon._id} refresh={refresh}></CouponsIconGroup>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[rowsPerPage]}
      />
    </Card>
  );
};

CouponsTable.propTypes = {
  img: PropTypes.string,
  productType: PropTypes.string,
  description: PropTypes.string,
  status: PropTypes.string,
};

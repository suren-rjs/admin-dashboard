/* eslint-disable react/jsx-max-props-per-line */
import PropTypes from "prop-types";
import { format } from "date-fns";
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
  ListItemAvatar,
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
              {items.map((category) => {
                const fromDate = format(category.startTime, "dd/MM/yyyy");
                const toDate = format(category.endTime, "dd/MM/yyyy");
                return (
                  <TableRow hover key={category.id}>
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Typography variant="subtitle2">{category.title}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{category.couponCode}</TableCell>
                    <TableCell>{category.discountPercentage}</TableCell>
                    <TableCell>{category.minimumAmount}</TableCell>
                    <TableCell>{category.productType}</TableCell>
                    <TableCell>{fromDate + " to " + toDate}</TableCell>
                    <TableCell>{category.status}</TableCell>
                    <TableCell>
                      <CouponsIconGroup id={category.id}></CouponsIconGroup>
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

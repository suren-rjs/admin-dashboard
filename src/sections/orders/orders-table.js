/* eslint-disable react/jsx-max-props-per-line */
import PropTypes from "prop-types";
import { format, parseISO } from "date-fns";
import {
  Box,
  Card,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Button,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { SeverityPill } from "src/components/severity-pill";
import { appCOnstants } from "src/utils/constants";
import { useRouter } from "next/router";

export const OrdersTable = (props) => {
  const router = useRouter();
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
    selected = [],
  } = props;

  function navigateToOrder(id) {
    router.push(`/orders/${id}`);
  }

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 1000 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ORDER</TableCell>
                <TableCell>CUSTOMER</TableCell>
                <TableCell>ORDER DATE</TableCell>
                <TableCell>ADDRESS</TableCell>
                <TableCell>PAYMENT MODE</TableCell>
                <TableCell>TOTAL</TableCell>
                <TableCell>STATUS</TableCell>
                <TableCell>View Order</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((order) => {
                const createdAt = format(parseISO(order.createdAt), "dd/MM/yyyy");

                return (
                  <TableRow hover key={order.id}>
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Typography variant="subtitle2">{order.name}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{order.email}</TableCell>
                    <TableCell>{createdAt}</TableCell>
                    <TableCell>{`${order.address}, ${order.city}, ${order.country}`}</TableCell>
                    <TableCell>{order.paymentMethod}</TableCell>
                    <TableCell>{`$ ${order.totalAmount}`}</TableCell>
                    <TableCell>
                      <SeverityPill color={appCOnstants.statusMap[order.status]}>
                        {order.status}
                      </SeverityPill>
                    </TableCell>
                    <TableCell>
                      <Button onClick={() => navigateToOrder(order._id)}>view order</Button>
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

OrdersTable.propTypes = {
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      user: PropTypes.string.isRequired,
      cart: PropTypes.arrayOf(PropTypes.object),
      name: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      contact: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
      zipCode: PropTypes.string.isRequired,
      subTotal: PropTypes.number.isRequired,
      shippingCost: PropTypes.number.isRequired,
      discount: PropTypes.number.isRequired,
      totalAmount: PropTypes.number.isRequired,
      shippingOption: PropTypes.string,
      cardInfo: PropTypes.object,
      paymentIntent: PropTypes.object,
      paymentMethod: PropTypes.string.isRequired,
      orderNote: PropTypes.string,
      invoice: PropTypes.number.isRequired,
      status: PropTypes.oneOf(["pending", "processing", "delivered", "cancel"]).isRequired,
    })
  ).isRequired,
};

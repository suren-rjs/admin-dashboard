/* eslint-disable react/jsx-max-props-per-line */
import { useCallback, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid,
  InputAdornment,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";

// pending", "processing", "delivered",'cancel
const Status = [
  {
    value: "pending",
    label: "Pending",
  },
  {
    value: "processing",
    label: "Processing",
  },
  {
    value: "delivered",
    label: "Delivered",
  },
  {
    value: "cancel",
    label: "Cancel",
  },
];

const Categories = [
  {
    value: "type-1",
    label: "TYPE 1",
  },
  {
    value: "type-2",
    label: "TYPE 2",
  },
  {
    value: "type-3",
    label: "TYPE 3",
  },
];

export const OrderDetails = ({ order }) => {
  const [checked, setChecked] = useState(false);
  const [information, setInformation] = useState({
    user: "611f2b987d048d10e4e60d53",
    cart: [
      {
        productId: "45678",
        quantity: 2,
      },
    ],
    name: "David Wilson",
    address: "333 Oak Street",
    email: "davidwilson@example.com",
    contact: "666-999-3333",
    city: "Boston",
    country: "USA",
    zipCode: "02101",
    subTotal: 90.0,
    shippingCost: 10.0,
    discount: 5.0,
    totalAmount: 95.0,
    shippingOption: "Standard",
    cardInfo: {},
    paymentIntent: {},
    paymentMethod: "Debit Card",
    orderNote: "No contact delivery preferred",
    invoice: 123987456,
    createdAt: new Date(),
    status: "delivered",
  });

  if (order != null) {
    setInformation(order);
  }

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    setInformation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
  }, []);

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit}>
      <Card>
        <CardHeader title="Products" />
        <div>
          <ul>
            {information.cart.map((item, index) => (
              <li key={index}>{item.productId}</li>
            ))}
          </ul>
        </div>
        <CardHeader title="Payment Information" />
        <CardContent sx={{ pt: 0 }} width={"50px"}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={4}>
                <TextField
                  fullWidth
                  label="Customer Name"
                  name="name"
                  value={information.name}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid xs={4}>
                <TextField fullWidth label="Address" name="address" value={information.address} />
              </Grid>
              <Grid xs={4}>
                <TextField fullWidth label="Zip Code" name="zipCode" value={information.zipCode} />
              </Grid>
              <Grid xs={4}>
                <TextField fullWidth label="Email" name="email" value={information.email} />
              </Grid>
              <Grid xs={4}>
                <TextField fullWidth label="Contact" name="contact" value={information.contact} />
              </Grid>
              <Grid xs={4}>
                <TextField
                  fullWidth
                  label="City, Country"
                  name="zipCode"
                  value={`${information.city}, ${information.country}`}
                />
              </Grid>
              <Grid xs={10} md={12}>
                <TextField
                  fullWidth
                  label="Order Note"
                  name="orderNote"
                  multiline
                  value={information.orderNote}
                />
              </Grid>
              <Grid xs={4}>
                <TextField
                  fullWidth
                  label="Payment Method"
                  name="pamentMethod"
                  value={information.paymentMethod}
                />
              </Grid>
              <Grid xs={4}>
                <TextField
                  fullWidth
                  label="Shipping Option"
                  name="shippingOption"
                  value={information.shippingOption}
                />
              </Grid>
              <Grid xs={4}>
                <TextField fullWidth label="Invoice" name="invoice" value={information.invoice} />
              </Grid>
              <Grid xs={4}></Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button variant="contained">Move Order</Button>
          <Button variant="contained">Cancel Order</Button>
        </CardActions>
      </Card>
    </form>
  );
};

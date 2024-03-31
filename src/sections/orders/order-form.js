/* eslint-disable react/jsx-max-props-per-line */
import { useCallback, useEffect, useState } from "react";
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
  Typography,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import adminApiService from "src/services/admin-api-service";
import { SeverityPill } from "src/components/severity-pill";
import { appCOnstants } from "src/utils/constants";

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

export const OrderDetails = ({ order }) => {
  const [checked, setChecked] = useState(false);
  const [information, setInformation] = useState(null);
  const [buttonText, setButtonText] = useState("Accept Order");
  const [orderStatus, setOrderStatus] = useState("pending");

  useEffect(() => {
    if (order != null) {
      setInformation(order);
      setOrderStatus(order?.status ?? "pending");
      if (orderStatus == "pending") {
        setButtonText("Accept Order");
      } else if (orderStatus == "processing") {
        setButtonText("Move to delivered");
      } else if (orderStatus == "delivered") {
        setButtonText("Completed");
      }
    }
  }, [order, orderStatus]);

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

  function viewInvoice(id) {
    let url = `https://shopify-eta-flame.vercel.app/order/${id}`;
    window.open(url, "_blank");
  }

  async function moveOrder(id) {
    if (orderStatus == "pending") {
      await adminApiService.acceptOrder(id);
      window.location.reload();
    } else if (orderStatus == "processing") {
      await adminApiService.deliverOrder(id);
      window.location.reload();
    }
  }

  async function cancelOrder(id) {
    await adminApiService.cancelOrder(id);
    window.location.reload();
  }

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit}>
      <Card>
        <CardHeader title="Order Details" />
        <CardContent sx={{ pt: 0 }} width={"50px"}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={4} sx={{ m: 1.5 }}>
                <Typography variant="h6">
                  Status:
                  <SeverityPill color={appCOnstants.statusMap[order.status]}>
                    {order.status}
                  </SeverityPill>
                </Typography>
              </Grid>
              <Grid xs={4}>
                <TextField
                  fullWidth
                  label="Shipping Cost"
                  name="shippingCost"
                  value={information?.shippingCost}
                />
              </Grid>
              <Grid xs={4}>
                <TextField
                  fullWidth
                  label="Sub Total"
                  name="subTotal"
                  value={information?.subTotal}
                />
              </Grid>
              <Grid xs={4}>
                <TextField
                  fullWidth
                  label="Total Amount"
                  name="totalAmount"
                  value={information?.totalAmount}
                />
              </Grid>
              <CardActions sx={{ justifyContent: "flex-end" }}>
                <Button variant="contained" onClick={() => viewInvoice(information?._id)}>
                  View Invoice
                </Button>
              </CardActions>
            </Grid>
          </Box>
        </CardContent>
        <CardHeader title="Payment Information" />
        <CardContent sx={{ pt: 0 }} width={"50px"}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={4}>
                <TextField
                  fullWidth
                  label="Customer Name"
                  name="name"
                  value={information?.name}
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
                <TextField fullWidth label="Address" name="address" value={information?.address} />
              </Grid>
              <Grid xs={4}>
                <TextField fullWidth label="Zip Code" name="zipCode" value={information?.zipCode} />
              </Grid>
              <Grid xs={4}>
                <TextField fullWidth label="Email" name="email" value={information?.email} />
              </Grid>
              <Grid xs={4}>
                <TextField fullWidth label="Contact" name="contact" value={information?.contact} />
              </Grid>
              <Grid xs={4}>
                <TextField
                  fullWidth
                  label="City, Country"
                  name="zipCode"
                  value={`${information?.city}, ${information?.country}`}
                />
              </Grid>
              <Grid xs={10} md={12}>
                <TextField
                  fullWidth
                  label="Order Note"
                  name="orderNote"
                  multiline
                  value={information?.orderNote}
                />
              </Grid>
              <Grid xs={4}>
                <TextField
                  fullWidth
                  label="Payment Method"
                  name="pamentMethod"
                  value={information?.paymentMethod}
                />
              </Grid>
              <Grid xs={4}>
                <TextField
                  fullWidth
                  label="Shipping Option"
                  name="shippingOption"
                  value={information?.shippingOption}
                />
              </Grid>
              <Grid xs={4}></Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            disabled={["cancel", "delivered"].includes(orderStatus)}
            onClick={() => moveOrder(information._id)}
          >
            {buttonText}
          </Button>
          <Button
            variant="contained"
            disabled={["cancel", "delivered"].includes(orderStatus)}
            onClick={() => cancelOrder(information._id)}
          >
            Cancel Order
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

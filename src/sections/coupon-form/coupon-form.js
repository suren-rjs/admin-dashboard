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
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TagsInputComponent } from "../common/tag-input";

const Status = [
  {
    value: "active",
    label: "ACTIVE",
  },
  {
    value: "in-active",
    label: "IN ACTIVE",
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

export const CouponDetails = ({ coupon }) => {
  const [information, setInformation] = useState({
    id: "",
    title: "",
    logo: null,
    couponCode: "",
    startTime: null,
    endTime: null,
    discountPercentage: null,
    minimumAmount: null,
    productType: null,
    status: "ACTIVE",
  });

  if (coupon != null) {
    setInformation(coupon);
  }

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    setInformation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const handleDiscount = (event) => {
    const { name, value } = event.target;
    const newValue = Math.min(parseInt(value, 10), 100);

    setInformation((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const setStartDate = (date) => {
    information.startTime = date;
    setInformation(information);
  };

  const setEndDate = (date) => {
    if (date > information.offerDate.startDate) {
      information.endTime = date;
      setInformation(information);
    }
  };

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
  }, []);

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit}>
      <Card>
        <CardHeader title="Coupon Details" />
        <CardContent sx={{ pt: 0 }} width={"50px"}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={3}>
                <TextField
                  fullWidth
                  helperText="Enter product name"
                  label="Coupon name"
                  name="title"
                  onChange={handleChange}
                  multiline
                  required
                  value={information.title}
                />
              </Grid>
              <Grid xs={12} md={3}>
                <TextField
                  fullWidth
                  helperText="Enter coupon code"
                  label="Coupon code"
                  name="couponCode"
                  onChange={handleChange}
                  multiline
                  required
                  value={information.couponCode}
                />
              </Grid>

              <Grid xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Select Category"
                  name="productType"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={information.productType}
                >
                  {Categories.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>

              <Grid xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Select Status"
                  name="status"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={information.status}
                >
                  {Status.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>

              <Grid xs={12} md={2}>
                <TextField
                  fullWidth
                  label="Discount (%)"
                  name="discountPercentage"
                  onChange={handleChange}
                  required
                  value={information.discountPercentage}
                />
              </Grid>

              <Grid xs={12} md={2}>
                <TextField
                  fullWidth
                  label="Minimum Amount"
                  name="discountPercentage"
                  onChange={handleDiscount}
                  required
                  value={information.minimumAmount}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                />
              </Grid>
              <Grid xs={12} md={4}>
                <DatePicker
                  label="Start Date"
                  onChange={setStartDate}
                  value={information.startTime}
                  slotProps={{
                    field: { clearable: true },
                  }}
                />
              </Grid>
              <Grid xs={12} md={4}>
                <DatePicker
                  label="End Date"
                  onChange={setEndDate}
                  value={information.endTime}
                  slotProps={{
                    field: { clearable: true },
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button variant="contained">Save Coupon</Button>
        </CardActions>
      </Card>
    </form>
  );
};

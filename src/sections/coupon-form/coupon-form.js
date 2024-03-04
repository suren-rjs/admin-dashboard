/* eslint-disable react/jsx-max-props-per-line */
import { useCallback, useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import { enIN } from "date-fns/locale";
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
import adminApiService from "src/services/admin-api-service";

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

export const CouponDetails = ({ coupon, submitForm }) => {
  const [init, completeInit] = useState(false);
  const [categories, setCategories] = useState([]);
  const [information, setInformation] = useState({
    id: null,
    title: null,
    logo: "",
    couponCode: null,
    startTime: null,
    endTime: null,
    discountPercentage: null,
    minimumAmount: null,
    productType: "type 1",
    status: "active",
  });

  useEffect(() => {
    if (!init) {
      fetchCategories();
      completeInit(true);
      if (coupon) {
        const startTime = parseISO(coupon.startTime);
        coupon.startTime = new Date(startTime);
        const endTime = parseISO(coupon.endTime);
        coupon.endTime = new Date(endTime);
        setInformation(coupon);
      }
    }
  }, [coupon, information, init]);

  async function fetchCategories() {
    let response = await adminApiService.getCategories();
    setCategories(response.status == 200 ? response.data.result : []);
  }

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    console.log(name, value);
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
    if (date > information?.startTime) {
      information.endTime = date;
      setInformation(information);
    }
  };

  function handleSubmit() {
    setTimeout(() => {
      submitForm(information);
    }, 500);
  }

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
                  {categories.map((option) => (
                    <option key={option.productType} value={option.productType}>
                      {option.productType}
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
                  onChange={handleDiscount}
                  required
                  value={information.discountPercentage}
                />
              </Grid>

              <Grid xs={12} md={2}>
                <TextField
                  fullWidth
                  label="Minimum Amount"
                  name="minimumAmount"
                  onChange={handleChange}
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
          <Button variant="contained" onClick={handleSubmit}>
            Save Coupon
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

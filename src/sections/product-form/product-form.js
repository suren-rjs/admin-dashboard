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
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TagsInputComponent } from "../common/tag-input";

const Status = [
  {
    value: "in-stock",
    label: "In Stock",
  },
  {
    value: "out-of-stock",
    label: "Out of Stock",
  },
  {
    value: "discontinued",
    label: "Discontinued",
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

const Brands = [
  {
    value: "brand-1",
    label: "Brand 1",
  },
  {
    value: "brand-2",
    label: "Brand 2",
  },
  {
    value: "brand-3",
    label: "Brand 3",
  },
];

export const ProductDetails = ({ productInformation }) => {
  const [checked, setChecked] = useState(false);
  const [information, setInformation] = useState({
    img: "",
    title: "",
    slug: "",
    unit: 0,
    imageURLs: [],
    parent: "",
    children: "",
    price: 0,
    discount: 0,
    quantity: 0,
    brand: {},
    category: {},
    status: "in-stock",
    productType: "",
    description: "",
    videoId: "",
    tags: [],
    sizes: [],
    offerDate: {
      startDate: null,
      endDate: null,
    },
    featured: false,
    sellCount: 0,
  });

  if (productInformation != null) {
    setInformation(productInformation);
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
    information.offerDate = {
      startDate: date,
      endDate: date,
    };
    setInformation(information);
  };

  const setEndDate = (date) => {
    if (date > information.offerDate.startDate) {
      information.offerDate = {
        startDate: information.offerDate.startDate,
        endDate: date,
      };
      setInformation(information);
    }
  };

  const tagsChange = (tags) => {
    information.tags = tags;
    setInformation(information);
  };

  const sizesChange = (tags) => {
    information.tags = tags;
    setInformation(information);
  };

  const handleCheckBox = (event) => {
    setChecked(event.target.checked);
  };
  const handleSubmit = useCallback((event) => {
    event.preventDefault();
  }, []);

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit}>
      <Card>
        <CardHeader subheader="The information can be edited" title="Product Information" />
        <CardContent sx={{ pt: 0 }} width={"50px"}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12}>
                <TextField
                  fullWidth
                  helperText="please enter product name"
                  label="Product name"
                  name="title"
                  onChange={handleChange}
                  multiline
                  required
                  value={information.title}
                />
              </Grid>
              <Grid xs={10} md={12}>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  multiline
                  onChange={handleChange}
                  value={information.description}
                  required
                />
              </Grid>

              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Select Brand"
                  name="status"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={information.brand}
                >
                  {Brands.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>

              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Select Category"
                  name="status"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={information.category}
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
                  label="Price"
                  name="price"
                  onChange={handleChange}
                  required
                  value={information.price}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                />
              </Grid>
              <Grid xs={6} md={2}>
                <TextField
                  fullWidth
                  label="Discount"
                  name="discount"
                  onChange={handleDiscount}
                  type="number"
                  value={information.discount}
                />
              </Grid>
              <Grid xs={6} md={2}>
                <TextField
                  fullWidth
                  label="Quantity"
                  name="quantity"
                  onChange={handleChange}
                  type="number"
                  required
                  value={information.quantity}
                />
              </Grid>
              <Grid xs={12} md={5}>
                <TextField
                  fullWidth
                  label="Select Status"
                  name="status"
                  onChange={handleChange}
                  defaultValue={"in-stock"}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={information.state}
                >
                  {Status.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid xs={12} md={6}>
                <DatePicker
                  label="Offer From"
                  onChange={setStartDate}
                  value={information.offerDate.startDate}
                  slotProps={{
                    field: { clearable: true },
                  }}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <DatePicker
                  label="Offer To"
                  onChange={setEndDate}
                  value={information.offerDate.endDate}
                  slotProps={{
                    field: { clearable: true },
                  }}
                />
              </Grid>

              <Grid xs={10} md={12}>
                <TagsInputComponent
                  tags={information.sizes}
                  onTagsChange={sizesChange}
                  placeholder={"Add Size"}
                  max={15}
                />
              </Grid>

              <Grid xs={10} md={12}>
                <TagsInputComponent
                  tags={information.tags}
                  onTagsChange={tagsChange}
                  placeholder={"Add a Tag"}
                  max={25}
                />
              </Grid>

              <Grid xs={10} md={6}>
                <FormControlLabel
                  value={information.featured}
                  control={
                    <Checkbox
                      checked={checked}
                      onChange={handleCheckBox}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  }
                  label="Featured Product"
                  labelPlacement="end"
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button variant="contained">Save details</Button>
        </CardActions>
      </Card>
    </form>
  );
};

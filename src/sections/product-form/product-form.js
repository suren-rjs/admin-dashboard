/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-max-props-per-line */
import { useCallback, useState, useEffect } from "react";
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
import adminApiService from "src/services/admin-api-service";

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

export const ProductDetails = ({ product, submitForm }) => {
  const [init, completeInit] = useState(false);
  const [checked, setChecked] = useState(true);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [tags, setTags] = useState([]);
  const [brand, setBrand] = useState(null);
  const [information, setInformation] = useState({
    img: null,
    title: null,
    slug: null,
    unit: 0,
    imageURLs: [],
    parent: "/",
    children: "/",
    price: 0,
    discount: 0,
    quantity: 0,
    brand: {},
    category: {},
    status: "in-stock",
    productType: null,
    description: null,
    videoId: null,
    tags: [],
    sizes: [],
    offerDate: {
      startDate: null,
      endDate: null,
    },
    featured: checked,
    sellCount: 0,
  });

  useEffect(() => {
    if (!init) {
      fetchCategories();
      fetchBrands();
      completeInit(true);
      if (product) {
        (product.offerDate = {
          startDate: null,
          endDate: null,
        }),
          setSizes(product?.sizes ?? []);
        setTags(product?.tags ?? []);
        setBrand(product?.brand ?? null);
        setInformation(product);
      }
    }
  }, [product, information, init]);

  async function fetchCategories() {
    let response = await adminApiService.getCategories();
    setCategories(response.status == 200 ? response.data.result : []);
  }
  async function fetchBrands() {
    let response = await adminApiService.getBrands();
    setBrands(response.status == 200 ? response.data.result : []);
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
    setInformation((prevState) => ({
      ...prevState,
      offerDate: {
        ...prevState.offerDate,
        startDate: date,
      },
    }));
  };

  const setEndDate = (date) => {
    if (date > information.offerDate.startDate) {
      setInformation((prevState) => ({
        ...prevState,
        offerDate: {
          ...prevState.offerDate,
          endDate: date,
        },
      }));
    }
  };

  const selectBrand = useCallback((event) => {
    const { value } = event.target;
    setBrand(value);
  }, []);

  const handleCheckBox = (event) => {
    setChecked(event.target.checked);
    setInformation((prevState) => ({
      ...prevState,
      featured: !checked,
    }));
  };

  function handleSubmit() {
    const selectedCategory = categories.find(
      (option) => option.productType == information.productType
    );
    const selectedBrand = brands.find((option) => option.name == brand);
    const updatedData = {
      ...information,
      tags: tags,
      sizes: sizes,
      category: {
        id: selectedCategory._id,
        name: selectedCategory.productType,
      },
      brand: {
        id: selectedBrand._id,
        name: selectedBrand.name,
      },
    };

    setTimeout(() => {
      // console.log(updatedData);
      submitForm(updatedData);
    }, 500);
  }

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

              <Grid xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Select Brand"
                  name="brand"
                  onChange={selectBrand}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={brand}
                >
                  {brands.map((option) => (
                    <option key={option._id} value={option.name}>
                      {option.name}
                    </option>
                  ))}
                </TextField>
              </Grid>

              <Grid xs={12} md={4}>
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
                    <option key={option._id} value={option.productType}>
                      {option.productType}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Parent"
                  name="parent"
                  onChange={handleChange}
                  value={information.parent}
                  required
                />
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
                  tags={sizes}
                  onTagsChange={setSizes}
                  placeholder={"Add Size"}
                  max={15}
                />
              </Grid>

              <Grid xs={10} md={12}>
                <TagsInputComponent
                  tags={tags}
                  onTagsChange={setTags}
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
          <Button variant="contained" onClick={handleSubmit}>
            Save details
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

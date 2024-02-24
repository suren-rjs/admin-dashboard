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

export const CategoryDetails = ({ category }) => {
  const [checked, setChecked] = useState(false);
  const [information, setInformation] = useState({
    id: "",
    img: "",
    parent: "",
    productType: "",
    description: "",
    status: "",
  });

  if (category != null) {
    setInformation(category);
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
        <CardHeader title="Category Information" />
        <CardContent sx={{ pt: 0 }} width={"50px"}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12}>
                <TextField
                  fullWidth
                  label="Category name"
                  name="productType"
                  onChange={handleChange}
                  required
                  value={information.productType}
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
                  label="Select Parent"
                  name="parent"
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

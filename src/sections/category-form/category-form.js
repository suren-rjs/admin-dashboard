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
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TagsInputComponent } from "../common/tag-input";

const Status = [
  {
    value: "Show",
    label: "SHOW",
  },
  {
    value: "Hide",
    label: "HIDE",
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

export const CategoryDetails = ({ category, submitForm }) => {
  const [init, completeInit] = useState(false);
  const [information, setInformation] = useState({
    id: null,
    img: null,
    parent: "/",
    productType: null,
    description: null,
    status: "Show",
  });

  useEffect(() => {
    if (category != null && !init) {
      completeInit(true);
      setInformation(category);
    }
  }, [category, information, init]);

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    setInformation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  function handleSubmit() {
    setTimeout(() => {
      submitForm(information);
    }, 500);
  }
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
                  label="Parent"
                  name="parent"
                  multiline
                  onChange={handleChange}
                  value={information.parent}
                  required
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

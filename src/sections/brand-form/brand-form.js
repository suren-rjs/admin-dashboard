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

export const BrandDetails = ({ productInformation }) => {
  const [information, setInformation] = useState({
    id: "asdfghjkl",
    logo: "https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png",
    name: "Google",
    location: "USA",
    description: "Global Brand",
    email: "info@google.com",
    website: "www.google.com",
    status: "ACTIVE",
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

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
  }, []);

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit}>
      <Card>
        <CardHeader title="Brand Information" />
        <CardContent sx={{ pt: 0 }} width={"50px"}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  helperText="please enter product name"
                  label="Brand name"
                  name="name"
                  onChange={handleChange}
                  required
                  value={information.name}
                />
              </Grid>
              <Grid xs={10} md={6}>
                <TextField
                  fullWidth
                  label="Location"
                  name="location"
                  placeholder="USA"
                  onChange={handleChange}
                  value={information.location}
                  required
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
              <Grid xs={10} md={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="example@email.com"
                  onChange={handleChange}
                  value={information.email}
                  required
                />
              </Grid>
              <Grid xs={10} md={6}>
                <TextField
                  fullWidth
                  label="Website URL"
                  name="website"
                  placeholder="www.example.com"
                  onChange={handleChange}
                  value={information.website}
                  required
                />
              </Grid>
              <Grid xs={12} md={6}>
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

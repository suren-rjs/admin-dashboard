import { Typography, Card, CardActions, Divider, Container } from "@mui/material";
import { useState } from "react";

export const ProductImage = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
  };
  return (
    <Card>
      <br />
      <div>
        <Typography variant="h5">Product Image</Typography>
      </div>
      <CardActions>
        <input
          accept="image/*"
          style={{ display: "none" }}
          id="image-upload"
          type="file"
          onChange={handleImageChange}
        ></input>
        <label htmlFor="image-upload">
          <Container maxWidth="md" sx={{ boxShadow: 12, p: 8 }}>
            {selectedImage && <img src={selectedImage} alt="updated" width="280" height="250" />}
            {!selectedImage && (
              <img src="/assets/images/select.svg" class="img-thumbnail" width="280" height="250" />
            )}
          </Container>
        </label>
      </CardActions>
    </Card>
  );
};

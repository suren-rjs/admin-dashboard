import { Button, Card, CardActions, Divider, Container } from "@mui/material";
import { useState } from "react";

export const ProductImage = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
  };
  return (
    <Card>
      <Container maxWidth="md" sx={{ boxShadow: 12, p: 8 }}>
        <p>{selectedImage && <img src={selectedImage} alt="updated" width="250" height="200" />}</p>
      </Container>
      <Divider />
      <CardActions>
        <input
          accept="image/*"
          style={{ display: "none" }}
          id="image-upload"
          type="file"
          onChange={handleImageChange}
        />
        <label htmlFor="image-upload">
          <Button
            variant="contained"
            color="primary"
            component="span"
            startIcon={
              <i className="material-icons">{(selectedImage ? "Change" : "Select") + "  Image"}</i>
            }
          ></Button>
        </label>
      </CardActions>
    </Card>
  );
};

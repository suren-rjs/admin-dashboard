/* eslint-disable react/jsx-max-props-per-line */
import React from "react";
import EditIcon from "@rsuite/icons/Edit";
import TrashIcon from "@rsuite/icons/Trash";
import ImageIcon from "@rsuite/icons/Image";
// Import the default CSS
import "rsuite/dist/rsuite.min.css";
import { CallBackIconButton } from "../common/callback-icon-button";
import { Stack } from "@mui/material";
import { useRouter } from "next/router";

export const ProductIconGroup = ({ id }) => {
  const router = useRouter();
  function editProduct() {
    router.push(`/products/${id}`);
  }
  function deleteProduct() {
    router.push(`/products`);
  }
  return (
    <div className="App" style={{ textAlign: "center" }}>
      <Stack alignItems="center" direction="row" spacing={2}>
        <CallBackIconButton
          Icon={<ImageIcon />}
          callback={() => console.log("IMage Button Click")}
          color={"green"}
        ></CallBackIconButton>
        <CallBackIconButton
          Icon={<EditIcon />}
          callback={editProduct}
          color={"violet"}
        ></CallBackIconButton>
        <CallBackIconButton
          Icon={<TrashIcon />}
          callback={deleteProduct}
          color={"red"}
        ></CallBackIconButton>
      </Stack>
    </div>
  );
};

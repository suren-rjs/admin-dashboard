import { useTheme } from '@mui/material/styles';
import Image from "next/image";

export const Logo = () => {
  const theme = useTheme();
  const fillColor = theme.palette.primary.main;

  return (
    <Image
      className="logo-light"
      width={200}
      height={75}
      src={"/assets/logos/logo-white.svg"}
      alt="logo"
    />
  );
};

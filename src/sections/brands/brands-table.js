/* eslint-disable react/jsx-max-props-per-line */
import PropTypes from "prop-types";
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  ListItemAvatar,
  Stack,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { BrandsIconGroup } from "./brands-icon-group";

export const BrandsTable = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
    refresh = () => {},
  } = props;

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>BRAND</TableCell>
                <TableCell>DESCRIPTION</TableCell>
                <TableCell>EMAIL</TableCell>
                <TableCell>WEBSITE</TableCell>
                <TableCell>STATUS</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((brand) => {
                return (
                  <TableRow hover key={brand.id}>
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <ListItemAvatar>
                          {brand.logo ? (
                            <Box
                              component="img"
                              src={brand.logo}
                              sx={{
                                borderRadius: 1,
                                height: 48,
                                width: 48,
                              }}
                            />
                          ) : (
                            <Box
                              sx={{
                                borderRadius: 1,
                                backgroundColor: "neutral.200",
                                height: 48,
                                width: 48,
                              }}
                            />
                          )}
                        </ListItemAvatar>
                        <Typography variant="subtitle1">{brand.name}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{brand.description}</TableCell>
                    <TableCell>{brand.email}</TableCell>
                    <TableCell>
                      <a
                        href={
                          brand.website.startsWith("http")
                            ? brand.website
                            : `https://${brand.website}`
                        }
                        target="_blank"
                      >
                        {brand.website}
                      </a>
                    </TableCell>
                    <TableCell>{brand.status}</TableCell>
                    <TableCell>
                      <BrandsIconGroup id={brand._id} refresh={refresh}></BrandsIconGroup>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[rowsPerPage]}
      />
    </Card>
  );
};

BrandsTable.propTypes = {
  logo: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  email: PropTypes.string,
  website: PropTypes.string,
  location: PropTypes.string,
  status: PropTypes.string,
};

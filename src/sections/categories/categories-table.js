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
  Stack,
  ListItemAvatar,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { CategiesIconGroup } from "./category-icon-group";

export const CategoriesTable = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
  } = props;

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>TYPE</TableCell>
                <TableCell>DESCRIPTION</TableCell>
                <TableCell>STATUS</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((category) => {
                return (
                  <TableRow hover key={category.id}>
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <ListItemAvatar>
                          {category.logo ? (
                            <Box
                              component="img"
                              src={category.logo}
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
                        <Typography variant="subtitle2">{category.productType}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{category.description}</TableCell>
                    <TableCell>{category.status}</TableCell>
                    <TableCell>
                      <CategiesIconGroup id={category.id}></CategiesIconGroup>
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
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

CategoriesTable.propTypes = {
  img: PropTypes.string,
  productType: PropTypes.string,
  description: PropTypes.string,
  status: PropTypes.string,
};

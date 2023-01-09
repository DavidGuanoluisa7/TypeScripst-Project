import {
  Box,
  Button,
  Fab,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Popover,
  Rating,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import logo from "./assets/logo.png";
import image from "./assets/image.png";
import Stack from "@mui/material/Stack/Stack";
import "@fontsource/nunito-sans";
import { getCourses, getCoursesOther } from "./helpers/getCourses";
import { courses } from "./data/courses";

export interface ICourse {
  courseName: string;
  provider: string;
  rate: number;
  takenBefore: boolean;
}

const providers: string[] = [
  "All",
  "Edx",
  "Skillshare",
  "Coursera",
  "Udemy",
  "Other",
];

const App = () => {
  const [filterCourses, setFilterCourses] = useState<ICourse[]>(courses);

  const [providerSelected, setProviderSelected] = useState<string>("");

  const selectProvider = (provider: string): void => {
    setProviderSelected(provider);

    if (provider === "All") {
      setFilterCourses(courses);
      return;
    }
    if (provider === "Other") {
      setFilterCourses(getCoursesOther());
      return;
    }
    const course: ICourse[] = getCourses(provider);
    setFilterCourses(course);
  };

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Box sx={{ flexGrow: 1, height: "100vh" }}>
      <Stack direction={"column"}>
        <Box
          style={{ height: "80px" }}
          display="flex"
          alignItems="center"
          paddingLeft="26px"
        >
          <img src={logo} />
        </Box>

        <Stack direction={"row"}>
          <Box style={{ height: "calc(100vh - 84px)" }}>
            <img
              src={image}
              style={{ objectFit: "contain", height: "calc(100vh - 84px)" }}
            />
          </Box>
          <Box sx={{ padding: "32px 48px", flexGrow: 1 }}>
            <Typography
              sx={{
                fontSize: "32px",
                fontWeight: "700",
                marginBottom: "32px",
              }}
            >
              My courses
            </Typography>

            <Stack direction="row" columnGap="16px" marginBottom="24px">
              <TextField
                id="outlined-basic"
                variant="outlined"
                size="small"
                placeholder="Search"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  width: "490px",
                  ".MuiInputBase-root": { borderRadius: "16px" },
                }}
              />

              <Button
                aria-describedby={id}
                variant="contained"
                onClick={handleClick}
                endIcon={
                  open ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />
                }
                size="small"
                sx={{
                  textTransform: "capitalize",
                  "&.MuiButton-root": {
                    backgroundColor: "#EBF0F3",
                    color: "#1E3646",
                    borderRadius: "16px",
                  },
                }}
              >
                Providers: {providerSelected}
              </Button>

              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                sx={{
                  marginTop: "10px",
                  ".MuiPopover-paper": { borderRadius: "16px" },
                }}
              >
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  placeholder="Providers"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    ".MuiInputBase-root": { borderRadius: "16px" },
                  }}
                />

                <List>
                  {providers.map((provider) => (
                    <ListItem
                      key={provider}
                      disablePadding
                      onClick={() => selectProvider(provider)}
                    >
                      <ListItemButton>
                        <ListItemText primary={provider} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Popover>
            </Stack>

            <TableContainer>
              <Table sx={{ minWidth: 650 }} size="small">
                <TableHead>
                  <TableRow
                    sx={{ ".MuiTableCell-root": { borderWidth: "2px" } }}
                  >
                    <TableCell align="left">Course name</TableCell>
                    <TableCell align="left">Rate</TableCell>
                    <TableCell align="left">Taken before</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {filterCourses.map((course, index) => (
                    <TableRow
                      sx={{ ".MuiTableCell-root": { borderWidth: "0px" } }}
                      key={`${course.courseName}-${index.toString()}`}
                    >
                      <TableCell align="left">
                        <Typography sx={{ fontSize: "14px" }}>
                          {course.courseName}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Rating value={course.rate} />
                      </TableCell>
                      <TableCell align="left">
                        <Switch checked={course.takenBefore} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Box position="absolute" right="20px" bottom="20px">
              <Tooltip title="Add course" placement="left">
                <Fab color="primary" aria-label="add">
                  <AddIcon />
                </Fab>
              </Tooltip>
            </Box>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};

export default App;

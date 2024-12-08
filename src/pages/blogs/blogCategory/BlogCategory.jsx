import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { endPoints } from "../../../api/endPoints";
import toast from "react-hot-toast";
import axiosInstance from "../../../api/axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid2";
import CardActions from "@mui/material/CardActions";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

const drawerWidth = 140;

export default function BlogList() {
  const [list, setList] = useState([]);
  const [post, setPost] = useState([]);
  const fetchList = async () => {
    try {
      const response = await axiosInstance.get(endPoints.pages.category);
      if (response.status === 200) {
        setList(response.data.data);
        toast.success("Categories fetched successfully");
      }
    } catch (error) {
      toast.error(error);
    }
  };
  const fetchPosts = async (id) => {
    try {
      const response = await axiosInstance.get(endPoints.pages.post + id);
      if (response.status === 200) {
        setPost(response.data.data);
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchList();
  }, []);
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            zIndex: 0,
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            <Typography
              variant="h6"
              component="div"
              style={{
                textAlign: "left",
                paddingLeft: "15px",
                fontWeight: "bold",
              }}
            >
              Filter <FilterAltIcon sx={{ fontSize: "medium" }} />
            </Typography>
            {list?.map((item) => (
              <ListItem key={item._id} disablePadding>
                <ListItemButton>
                  <ListItemText
                    primary={item.category}
                    onClick={() => fetchPosts(item._id)}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3}}>
        <Toolbar />
        <Typography sx={{ marginBottom: 2 }} variant="h4">
          Category Posts
        </Typography>
        <Grid container rowSpacing={3} columnSpacing={3}>
          {post.map((item, index) => {
            return (
              <Grid size={4} key={index}>
                <Card sx={{ maxWidth: 345,  bgcolor: "#29303E" , color:"white" }}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {item.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "white" }}
                      dangerouslySetInnerHTML={{
                        __html: `${item.postText}`.slice(0, 300).concat("..."),
                      }}
                    ></Typography>
                  </CardContent>
                  <CardActions>
                    <Link to={`/details/${item._id}`}>
                      <Button size="small">Learn More</Button>
                    </Link>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
}

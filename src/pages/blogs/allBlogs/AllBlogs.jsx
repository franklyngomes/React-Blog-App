import { useState, useEffect } from "react";
import axiosInstance from "../../../api/axios";
import { endPoints } from "../../../api/endPoints";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const token = localStorage.getItem('token')
  useEffect(() => {
    try {
      axiosInstance.get(endPoints.pages.blogs, {
        header: {
          Authorization: `Bearer ${token}`
        }
      }).then((data) => {
        setBlogs(data.data.data);
        console.log(data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
  console.log(blogs);
  return (
    <div className="default-container">
      <h2>Blogs</h2>
      <Box sx={{ width: "100%" }}>
        <Grid container rowSpacing={3} columnSpacing={3}>
          {blogs.map((item, index) => {
            return (
              <Grid size={4} key={index}>
                <Card sx={{ maxWidth: 345, bgcolor: "#29303E" , color:"white"  }}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {item.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "white" }}
                      dangerouslySetInnerHTML={{ __html: `${item.postText}`.slice(0, 300).concat("...") }}
                    ></Typography>
                  </CardContent>
                  <CardActions>
                    <Link to={`/details/${item._id}`}><Button size="small">Learn More</Button></Link>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </div>
  );
};

export default AllBlogs;

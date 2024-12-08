import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import axiosInstance from "../../../api/axios";
import { endPoints } from "../../../api/endPoints";

const BlogDetails = () => {
  const [list, setList] = useState(null);
  let { id } = useParams();
  console.log(id, "id");
  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(
        endPoints.pages.details + id
      );
      if (response.status === 200) {
        setList(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [id]);
  return (
    <div>
      <h2>Blog Details</h2>
      <Box sx={{ width: "100%" }}>
        <Card sx={{ maxWidth: 345 }}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {list?.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                      dangerouslySetInnerHTML={{ __html: `${list?.postText}`.slice(0, 300).concat("...") }}
                    ></Typography>
                  </CardContent>
                </Card>
      </Box>
    </div>
  );
};

export default BlogDetails;

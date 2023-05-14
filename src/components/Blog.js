import React from 'react'

import { Avatar,CardContent,CardHeader,CardMedia,Typography,Card, Box, IconButton } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { useNavigate } from 'react-router-dom';
import axios from "axios";



const Blog = ({title,description,imageURL,username,isUser,id}) => {
    const navigate = useNavigate()
    const handleEdit = () => {
        navigate(`/myBlogs/${id}`)
    };

    const deleteRequest = async () => {
        const res = await axios
            .delete(`http://localhost:5000/api/blog/${id}`)
            .catch((err) => console.log(err));
        const data = await res.data;
        return data;
    };
    const handleDelete = () => {
        deleteRequest()
            .then(() => navigate("/"))
            .then(() => navigate("/blogs"));
    };

  return (
    <div>
      
          <Card sx={{ width: "45%" , margin: "auto" , mt:2, padding: 2, boxShadow: "5px 5px 10px #ccc",
              ":hover": { boxShadow: "10px 10px 20px #ccc" }
        }}>
              
              {
                isUser && (
                    <Box display="flex">
                        <IconButton onClick={handleDelete} sx={{ml : "auto"}}  >
                              <DeleteForeverIcon color='warning' /> 
                        </IconButton>
                          <IconButton onClick={handleEdit}>
                              <EditNoteIcon color='error' />
                          </IconButton>
                    </Box>
                )
              }

              <CardHeader
                  avatar={
                      <Avatar sx={{ bgcolor: 'Red' }} aria-label="recipe">

                         {username[0]}
                      </Avatar>
                  }
                 
                  title={title}
                  subheader="September 14, 2016"
              />
              <CardMedia
                  component="img"
                  height="194"
                  image={imageURL}
                  alt="Paella dish"
              />
              <CardContent>
                <hr />
                <br />
                  <Typography variant="body2" color="text.secondary">
                   <b>{username}</b> {":"} {description}
                  </Typography>
              </CardContent>
             
          </Card>



    </div>
  )
}

export default Blog

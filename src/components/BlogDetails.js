import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { Box, Typography, InputLabel, TextField, Button } from '@mui/material'
const labelStyle = { mb: 1, mt: 2, fontSize: '24px', fontWeight: 'bold' };

const BlogDetails = () => {
  const navigate= useNavigate()
  const [blog,setBlog]= useState();
  const id=useParams().id
  console.log(id);
  const [inputs, setInputs] = useState({})
  const fetchDetails= async()=>{
    const res= await axios.get(`http://localhost:5000/api/blog/${id}`).catch(err=>console.log(err))
    const data = await res.data;
    console.log(data)
    return data;
  
  };
  

  useEffect(() => {
    fetchDetails().then((data) => {
      setBlog(data.blog);
      setInputs({
        title: data.blog.title,
        description: data.blog.description,
        imageURL: data.blog.image
      });
    });
  }, [id]);


  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
  const sendRequest = async()=>{
    const res= await axios.put(`http://localhost:5000/api/blog/update/${id}`,{
      title:inputs.title,
      description:inputs.description,
      image:inputs.imageURL
    }).catch(err=>console.log(err))
    const data= await res.data;
    return data;
  }
 

 
console.log(blog)
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(inputs);
    sendRequest().then((data) => console.log(data)).then(()=>navigate("/myBlogs"))

  }

 
  
 console.log(blog)
  return (
    <div>
     {inputs && <form onSubmit={handleSubmit} >
        <Box
          display="flex"
          flexDirection="column"
          margin="auto"
          marginTop={5}
          height={'50vh'}
          padding={3}
          border={3}
          borderColor=" linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(48,30,90,0.8689558098630077) 35%, rgba(0,212,255,1) 100%)"
          borderRadius={10}
          boxShadow="10px 10px 20px #ccc"
          width="80%"

        >
          <Typography fontWeight={'bold'} padding={3} color={'grey'} variant='h3'
            textAlign={'center'}
          >Post Your Blog </Typography>
          <InputLabel sx={labelStyle}>Title</InputLabel>
          <TextField name='title' onChange={handleChange} value={inputs.title}
            margin='auto' variant='outlined' />
          <InputLabel
            sx={labelStyle}>Description</InputLabel>
          <TextField name='description' onChange={handleChange} value={inputs.description}
            margin='auto' variant='outlined' />
          <InputLabel sx={labelStyle} >ImageURL</InputLabel>
          <TextField name='imageURL' onChange={handleChange} value={inputs.imageURL}
            margin='auto' variant='outlined' />
          <Button
            sx={{ mt: 2, borderRadius: 4 }}
            variant="contained"
            color="warning"
            type="submit"
          >
            Submit
          </Button>

        </Box>


      </form>
}
    </div>
  )
}

export default BlogDetails

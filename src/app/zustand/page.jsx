"use client"
import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, IconButton, Menu, MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import GetStore from '../../store/ZustandStore/async';
import Image from 'next/image';
import { Toaster } from 'react-hot-toast';
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography
} from '@mui/material';

export default function Async() {
  const [anchorEls, setAnchorEls] = useState({});
  const [open, setOpen] = useState(false)
  const [openAdd, setOpenAdd] = useState(false)
  const [openAddImages, setopenAddImages] = useState(false)
  const [editName, seteditName] = useState("")
  const [editDescription, seteditDescription] = useState("")
  const [editSattus, seteditSattus] = useState("")
  const [idx, setidx] = useState(null)
  const [image, setImage] = useState([])
  const [addName, setaddName] = useState("")
  const [addDescription, setaddDescription] = useState("")
  const [imagesAdd, setimagesAdd] = useState(null)
  const [idxAddImages, setidxAddImages] = useState(null)

  const { data, fetchData, deleteUser, editUser, addUser, editStatus, deleteImages, addImages } = GetStore()

  const formAddImages = new FormData()
  if (imagesAdd) {
    for (let i = 0; i < imagesAdd.length; i++) {
      formAddImages.append("Images", imagesAdd[i]); 
    }
  }

  const form = new FormData()
  form.append("Images", image)
  form.append("Name", addName)
  form.append("Description", addDescription)

  const handleClick = (event, rowId) => {
    setAnchorEls(prev => ({ ...prev, [rowId]: event.currentTarget }));
  };

  const handleClose = (rowId) => {
    setAnchorEls(prev => ({ ...prev, [rowId]: null }));
  };

  function openModalEdit(e) {
    setOpen(true)
    seteditName(e.name)
    seteditDescription(e.description)
    seteditSattus(e.isCompleted)
    setidx(e.id)
  }

  async function closeModal() {
    let obj = {
      name: editName,
      description: editDescription,
      id: idx
    }
    await editUser(obj)
    setOpen(false)
  }

  async function closeAddModal() {
    await addUser(form)
    setOpenAdd(false)
    setaddName("")
    setaddDescription("")
    setImage([])
  }

  async function imagesDelete(id) {
    await deleteImages(id)
  }

  function openModalAddImages(id) {
    setidxAddImages(id)
    setopenAddImages(true)
  }

  async function addImage() {
    await addImages({ formAddImages, idxAddImages })
    setopenAddImages(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className='pt-[100px] px-4 max-w-5xl mx-auto '>
      <Button variant='contained' className='w-[150px]' onClick={() => setOpenAdd(true)} >+ Add</Button>
      <TableContainer component={Paper} className='mt-[40px] ' >
        <Modal open={open} onClose={() => setOpen(false)}>
          <Box sx={{
            width: 400,
            p: 4,
            bgcolor: 'background.paper',
            borderRadius: 3,
            boxShadow: 24,
            mx: 'auto',
            my: '20vh',
          }}>
            <Typography variant="h6" mb={2}>Edit User</Typography>

            <TextField
              fullWidth
              label="Name"
              name="name"
              value={editName}
              onChange={(e) => seteditName(e.target.value)}
              margin="normal"
            />

            <TextField
              fullWidth
              label="Description"
              name="description"
              value={editDescription}
              onChange={(e) => seteditDescription(e.target.value)}
              margin="normal"
            />

            <FormControl fullWidth margin="normal">
              <InputLabel>Status</InputLabel>
              <Select
                value={editSattus}
                label="Status"
                onChange={(e) => seteditSattus(e.target.value)}
              >
                <MenuItem value="true">Active</MenuItem>
                <MenuItem value="false">Inactive</MenuItem>
              </Select>
            </FormControl>
            <Box mt={3} display="flex" justifyContent="space-between">
              <Button onClick={() => setOpen(false)} variant="outlined" >Cancel</Button>
              <Button variant="contained" onClick={closeModal} >Save</Button>
            </Box>
          </Box>
        </Modal>
        <Modal open={openAdd} onClose={() => setOpenAdd(false)}>
          <Box sx={{
            width: 400,
            p: 4,
            bgcolor: 'background.paper',
            borderRadius: 3,
            boxShadow: 24,
            mx: 'auto',
            my: '20vh',
          }}>
            <Typography variant="h6" mb={2}>Add User</Typography>
            <Button
              variant="outlined"
              component="label"
              fullWidth
              sx={{ mt: 2 }}
            >
              Add Image
              <input
                type="file"
                hidden
                onChange={(e) => setImage(e.target.files[0])}
              />
            </Button>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={addName}
              onChange={(e) => setaddName(e.target.value)}
              margin="normal"
            />

            <TextField
              fullWidth
              label="Description"
              name="description"
              value={addDescription}
              onChange={(e) => setaddDescription(e.target.value)}
              margin="normal"
            />
            <Box mt={3} display="flex" justifyContent="space-between">
              <Button onClick={() => setOpenAdd(false)} variant="outlined">Cancel</Button>
              <Button variant="contained" onClick={closeAddModal}>Save</Button>
            </Box>
          </Box>
        </Modal>
        <Modal open={openAddImages} onClose={() => setopenAddImages(false)}>
          <Box sx={{
            width: 400,
            p: 4,
            bgcolor: 'background.paper',
            borderRadius: 3,
            boxShadow: 24,
            mx: 'auto',
            my: '20vh',
          }}>
            <Button
              variant="outlined"
              component="label"
              fullWidth
              sx={{ mt: 2 }}
            >
              Add Image
              <input
                type="file"
                hidden
                multiple
                onChange={(e) => setimagesAdd(e.target.files)}
              />
            </Button>
            <Box mt={3} display="flex" justifyContent="space-between">
              <Button onClick={() => setopenAddImages(false)} variant="outlined">Cancel</Button>
              <Button variant="contained" onClick={addImage}>Save</Button>
            </Box>
          </Box>
        </Modal>
        <Toaster />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.data && data.data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.images && row.images.map((e) => {
                  return (
                    <div key={e.id}>
                      <Image src={`https://to-dos-api.softclub.tj/images/${e.imageName}`} width={70} className='rounded-[50%] ' height={60} alt='photo' />
                    </div>
                  )
                })}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>
                  <button
                    style={{
                      backgroundColor: row.isCompleted ? "blue" : "red",
                      color: "white",
                      padding: "8px 16px",
                      borderRadius: "8px",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    {row.isCompleted ? "Activ" : "Inactiv"}
                  </button>
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={(e) => handleClick(e, row.id)}>
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEls[row.id]}
                    open={Boolean(anchorEls[row.id])}
                    onClose={() => handleClose(row.id)}
                    PaperProps={{
                      sx: {
                        backgroundColor: "rgba(255, 255, 255, 0.7)",
                        boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
                        backdropFilter: "blur(10px)",
                        borderRadius: 2,
                        border: "1px solid #e0e0e0",
                        minWidth: 140,
                        p: 1
                      },
                    }}
                  >
                    <MenuItem
                      onClick={() => { openModalEdit(row); handleClose(row.id); }}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        px: 2,
                        py: 1,
                        borderRadius: 1.5,
                        transition: "0.2s",
                        "&:hover": {
                          backgroundColor: "#e3f2fd",
                          color: "#1976d2",
                        },
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="w-4 h-4" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13.5l6-6m-3 3l-6 6H3v-3l6-6z" />
                      </svg>
                      <span>Edit</span>
                    </MenuItem>
                    <MenuItem
                      onClick={() => { deleteUser(row.id); handleClose(row.id); }}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        px: 2,
                        py: 1,
                        borderRadius: 1.5,
                        transition: "0.2s",
                        color: "#d32f2f",
                        "&:hover": {
                          backgroundColor: "#ffebee",
                          color: "#b71c1c",
                        },
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span>Delete</span>
                    </MenuItem>
                    <MenuItem
                      onClick={() => { editStatus(row.id); handleClose(row.id); }}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        px: 2,
                        py: 1,
                        borderRadius: 1.5,
                        transition: "0.2s",
                        color: "#388e3c",
                        "&:hover": {
                          backgroundColor: "#e8f5e9",
                          color: "#2e7d32",
                        },
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="w-4 h-4" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13.5l6-6m-3 3l-6 6H3v-3l6-6z" />
                      </svg>
                      <span>status</span>
                    </MenuItem>
                    <MenuItem
                      onClick={() => { { row.images && row.images.map((e) => imagesDelete(e.id)) }; handleClose(row.id); }}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        px: 2,
                        py: 1,
                        borderRadius: 1.5,
                        transition: "0.2s",
                        color: "#d32f2f",
                        "&:hover": {
                          backgroundColor: "#ffebee",
                          color: "#b71c1c",
                        },
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span>Delete Iamages</span>
                    </MenuItem>
                    <MenuItem
                      onClick={() => { openModalAddImages(row.id); handleClose(row.id); }}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        px: 2,
                        py: 1,
                        borderRadius: 1.5,
                        transition: "0.2s",
                        color: "#388e3c",
                        "&:hover": {
                          backgroundColor: "#e8f5e9",
                          color: "#2e7d32",
                        },
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="w-4 h-4" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13.5l6-6m-3 3l-6 6H3v-3l6-6z" />
                      </svg>
                      <span>Add Images</span>
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

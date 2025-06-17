"use client";
import todoStoreSync from '@/store/mobx/sync/sync';
import { Box, Button, IconButton, Menu, MenuItem, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { observer } from 'mobx-react';
import Image from 'next/image';
import React, { useState } from 'react';

const MobxSync = () => {
  const data = todoStoreSync.data;
  console.log(data);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const [addName, setAddName] = useState("");
  const [addDesc, setAddDesc] = useState("");
  const [addImage, setAddImage] = useState(null);

  const handleMenuOpen = (event, todo) => {
    setAnchorEl(event.currentTarget);
    setSelectedTodo(todo);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedTodo(null);
  };

  const handleAddTodo = async () => {
    if (!addName || !addDesc || !addImage) {
      alert("Please fill all fields and upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", addName);
    formData.append("description", addDesc);
    formData.append("image", addImage); // Бисёр муҳим!

    try {
      await todoStoreSync.addTodo(formData); // фиристодани FormData
      setAddName("");
      setAddDesc("");
      setAddImage(null);
      setOpenModal(false);
    } catch (error) {
      console.error("Add todo error:", error);
      alert("Failed to add todo. Check the console for more info.");
    }
  };
  
  return (
    <div className='pt-[100px] px-4 max-w-5xl mx-auto'>
      <Button variant='contained' className='w-[150px]' onClick={() => setOpenModal(true)}>+ Add</Button>
      {
        <TableContainer className='mt-[30px] ' component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Images</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((e) => (
                <TableRow key={e.id}>
                  <TableCell>
                    {e.image && (
                      <Image src={e.image} alt="Todo Image" width={100} height={100} />
                    )}
                  </TableCell>
                  <TableCell>{e.name}</TableCell>
                  <TableCell>{e.description}</TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      variant="contained"
                      color={e.status ? "success" : "error"}
                      onClick={() => todoStore.updateStatus(e.id)}
                    >
                      {e.status ? "Active" : "Inactive"}
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton onClick={(event) => handleMenuOpen(event, e)}>
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      }
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={() => {
            todoStoreSync.deleteUser(selectedTodo.id);
            handleMenuClose();
          }}
          sx={{ color: "error.main" }}
        >
          Delete
        </MenuItem>
        <MenuItem
          onClick={() => {
            todoStoreSync.editUser(selectedTodo);
            handleMenuClose();
          }}
        >
          Toggle Status
        </MenuItem>
      </Menu>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography variant="h6">Add Todo</Typography>
          <TextField
            label="Name"
            value={addName}
            onChange={(e) => setAddName(e.target.value)}
            fullWidth
          />
          <TextField
            label="Description"
            value={addDesc}
            onChange={(e) => setAddDesc(e.target.value)}
            fullWidth
            multiline
          />
          <input
            type="file"
            onChange={(e) => setAddImage(e.target.files[0])}
          />
          <Button
            variant="contained"
            onClick={handleAddTodo}
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default observer(MobxSync); 

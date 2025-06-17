"use client";
import React, { useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, IconButton, Menu, MenuItem,
  Select, FormControl, InputLabel, Modal, Box,
  TextField, Button, Typography
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import useStore from "@/store/ZustandStore/syncn";

export default function Sync() {
  const [anchorEls, setAnchorEls] = useState({});
  const [open, setOpen] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);

  const [editName, seteditName] = useState("");
  const [editDescription, seteditDescription] = useState("");
  const [editStatus, seteditStatus] = useState(true);
  const [idx, setidx] = useState(null);

  const [AddImage, setAddImage] = useState(null);
  const [AddImageFile, setAddImageFile] = useState(null);

  const [addName, setaddName] = useState("");
  const [addDescription, setaddDescription] = useState("");
  const [addStatus, setaddStatus] = useState(true);

  const { data, editStatus: toggleStatus, deleteUser, editUser, addUser } = useStore();

  const handleClick = (event, rowId) => {
    setAnchorEls(prev => ({ ...prev, [rowId]: event.currentTarget }));
  };

  const handleClose = (rowId) => {
    setAnchorEls(prev => ({ ...prev, [rowId]: null }));
  };

  function openModalEdit(e) {
    setOpen(true);
    seteditName(e.name);
    seteditDescription(e.description);
    seteditStatus(e.status);
    setidx(e.id);
  }

  async function closeModal() {
    const obj = {
      name: editName,
      description: editDescription,
      status: editStatus,
      id: idx,
    };
    await editUser(obj);
    toast.success('Successfully toasted!')
    setOpen(false);
  }

  const handleAddImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAddImageFile(file);
      setAddImage(URL.createObjectURL(file));
    } else {
      setAddImageFile(null);
      setAddImage(null);
    }
  };

  async function closeAddModal() {
    if (!addName.trim()) {
      toast.error("nomro pur kuned!")
      return;
    }
    if (!addDescription.trim()) {
      toast.error("description pur kuned")
      return;
    }
    const newUser = {
      id: Date.now(),
      name: addName,
      description: addDescription,
      status: addStatus == "true",
      image: AddImage || "",
    };

    await addUser(newUser);
    toast.success('Successfully toasted!')
    setAddImage(null);
    setAddImageFile(null);
    setOpenAdd(false);
    setaddName("");
    setaddDescription("");
  }

  return (
    <div className="pt-[100px] px-4 max-w-5xl mx-auto">
      <Button variant="contained" className="w-[150px]" onClick={() => setOpenAdd(true)}>
        + Add
      </Button>

      <TableContainer component={Paper} className="mt-[40px]">
        <Modal open={open} onClose={() => setOpen(false)}>
          <Box sx={{
            width: 400, p: 4, bgcolor: 'background.paper', borderRadius: 3,
            boxShadow: 24, mx: 'auto', my: '20vh',
          }}>
            <Typography variant="h6" mb={2}>Edit User</Typography>

            <TextField fullWidth label="Name" value={editName}
              onChange={(e) => seteditName(e.target.value)} margin="normal" />
            <TextField fullWidth label="Description" value={editDescription}
              onChange={(e) => seteditDescription(e.target.value)} margin="normal" />
            <FormControl fullWidth margin="normal">
              <InputLabel>Status</InputLabel>
              <Select value={editStatus} label="Status"
                onChange={(e) => seteditStatus(e.target.value === "true")}>
                <MenuItem value="true">Active</MenuItem>
                <MenuItem value="false">Inactive</MenuItem>
              </Select>
            </FormControl>

            <Box mt={3} display="flex" justifyContent="space-between">
              <Button onClick={() => setOpen(false)} variant="outlined">Cancel</Button>
              <Button variant="contained" onClick={closeModal}>Save</Button>
            </Box>
          </Box>
        </Modal>

        <Modal open={openAdd} onClose={() => setOpenAdd(false)}>
          <Box sx={{
            width: 400, p: 4, bgcolor: 'background.paper', borderRadius: 3,
            boxShadow: 24, mx: 'auto', my: '20vh',
          }}>
            <Typography variant="h6" mb={2}>Add User</Typography>

            <Button variant="outlined" component="label" fullWidth sx={{ mt: 2 }}>
              Add Image
              <input type="file" hidden accept="image/*" onChange={handleAddImageChange} />
            </Button>

            {AddImage && (
              <img
                src={AddImage}
                alt="Preview"
                style={{ width: 60, height: 50, borderRadius: "50%", marginTop: 10, objectFit: "cover" }}
              />
            )}

            <TextField fullWidth label="Name" value={addName}
              onChange={(e) => setaddName(e.target.value)} margin="normal" />
            <TextField fullWidth label="Description" value={addDescription}
              onChange={(e) => setaddDescription(e.target.value)} margin="normal" />
            <FormControl fullWidth margin="normal">
              <InputLabel>Status</InputLabel>
              <Select value={addStatus} label="Status"
                onChange={(e) => setaddStatus(e.target.value === "true")}>
                <MenuItem value={true}>Active</MenuItem>
                <MenuItem value={false}>Inactive</MenuItem>
              </Select>
            </FormControl>

            <Box mt={3} display="flex" justifyContent="space-between">
              <Button onClick={() => setOpenAdd(false)} variant="outlined">Cancel</Button>
              <Button variant="contained" onClick={closeAddModal}>Save</Button>
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
            {data && data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  {row.image ? (
                    <Image src={row.image} width={50} height={50} alt="photo" className="rounded-full" />
                  ) : (
                    <Box
                      sx={{
                        width: 60, height: 50, bgcolor: "#ccc",
                        borderRadius: "50%", display: "inline-block"
                      }}
                    />
                  )}
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>
                  <button
                    style={{
                      backgroundColor: row.status ? "blue" : "red",
                      color: "white", padding: "8px 16px", borderRadius: "8px",
                      border: "none", cursor: "pointer"
                    }}>
                    {row.status ? "Active" : "Inactive"}
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
                        backdropFilter: "blur(10px)", borderRadius: 2,
                        border: "1px solid #e0e0e0", minWidth: 140, p: 1
                      }
                    }}
                  >
                    <MenuItem onClick={() => { openModalEdit(row); handleClose(row.id); }}>
                      ✏️ Edit
                    </MenuItem>
                    <MenuItem onClick={() => { deleteUser(row.id); handleClose(row.id); }}
                      sx={{ color: "#d32f2f", "&:hover": { backgroundColor: "#ffebee" } }}>
                      🗑️ Delete
                    </MenuItem>
                    <MenuItem onClick={() => { toggleStatus(row.id); handleClose(row.id); }}
                      sx={{ color: "#388e3c", "&:hover": { backgroundColor: "#e8f5e9" } }}>
                      🔁 Edit Status
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
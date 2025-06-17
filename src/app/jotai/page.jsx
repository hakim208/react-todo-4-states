"use client"
import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { useSetAtom } from 'jotai';
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, IconButton, Menu, MenuItem,
    Select,
    FormControl,
    InputLabel,
    Modal,
    Box,
    TextField,
    Button,
    Typography
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Image from 'next/image';
import { Toaster } from 'react-hot-toast';

import {
    dataAtom,
    fetchDataAtom,
    deleteUserAtom,
    addUserAtom,
    editUserAtom,
    editStatusAtom,
    deleteImageAtom,
    addImageAtom
} from '../../state/asyncTodo/todoAtom';
import "swiper/css"
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules"

export default function Async() {
    const [anchorEls, setAnchorEls] = useState({});
    const [open, setOpen] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);

    const [editName, setEditName] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [editStatus, setEditStatus] = useState(false);
    const [idx, setIdx] = useState(null);

    const [image, setImage] = useState(null);
    const [addName, setAddName] = useState("");
    const [addDescription, setAddDescription] = useState("");

    const [imagesAdd, setimagesAdd] = useState(null)
    const [idxAddImages, setidxAddImages] = useState(null)
    const [openAddImages, setopenAddImages] = useState(false)

    const [data] = useAtom(dataAtom);
    const [, fetchData] = useAtom(fetchDataAtom);

    const addImage = useSetAtom(addImageAtom);
    const EditStatus = useSetAtom(editStatusAtom);
    const deleteImage = useSetAtom(deleteImageAtom);
    const deleteUser = useSetAtom(deleteUserAtom);
    const addUser = useSetAtom(addUserAtom);
    const editUser = useSetAtom(editUserAtom);

    const form = new FormData();
    if (image) form.append("Images", image);
    form.append("Name", addName);
    form.append("Description", addDescription);

    const handleClick = (event, rowId) => {
        setAnchorEls(prev => ({ ...prev, [rowId]: event.currentTarget }));
    };

    const handleClose = (rowId) => {
        setAnchorEls(prev => ({ ...prev, [rowId]: null }));
    };

    function openModalEdit(e) {
        setOpen(true);
        setEditName(e.name);
        setEditDescription(e.description);
        setEditStatus(e.isCompleted);
        setIdx(e.id);
    }

    const formAddImages = new FormData()
    if (imagesAdd) {
        for (let i = 0; i < imagesAdd.length; i++) {
            formAddImages.append("Images", imagesAdd[i]);
        }
    }

    async function closeModal() {
        await editUser({
            id: idx,
            name: editName,
            description: editDescription,
            isCompleted: editStatus,
        });
        setOpen(false);
    }

    async function closeAddModal() {
        await addUser(form);
        setOpenAdd(false);
        setAddName("");
        setAddDescription("");
        setImage(null);
    }

    async function addImageFun() {
        await addImage({ formAddImages, idxAddImages })
        setopenAddImages(false)
    }

    function openModalAddImages(id) {
        setidxAddImages(id)
        setopenAddImages(true)
    }


    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <div className='pt-[100px] px-4 max-w-5xl mx-auto'>
            <Button variant='contained' className='w-[150px]' onClick={() => setOpenAdd(true)}>+ Add</Button>
            <TableContainer component={Paper} className='mt-[40px]'>
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
                            <Button variant="contained" onClick={addImageFun}>Save</Button>
                        </Box>
                    </Box>
                </Modal>
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
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Description"
                            value={editDescription}
                            onChange={(e) => setEditDescription(e.target.value)}
                            margin="normal"
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Status</InputLabel>
                            <Select
                                value={editStatus.toString()}
                                label="Status"
                                onChange={(e) => setEditStatus(e.target.value === 'true')}
                            >
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
                            value={addName}
                            onChange={(e) => setAddName(e.target.value)}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Description"
                            value={addDescription}
                            onChange={(e) => setAddDescription(e.target.value)}
                            margin="normal"
                        />
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
                                    <Box sx={{ width: 100, overflow: 'hidden' }}>
                                        <Swiper
                                            modules={[Autoplay]}
                                            spaceBetween={10}
                                            slidesPerView={1}
                                            autoplay={{
                                                delay: 2500,
                                                disableOnInteraction: false,
                                            }}
                                            loop={true}
                                        >
                                            {row.images && row.images.map((e) => (
                                                <SwiperSlide key={e.id}>
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            width: 50,
                                                            height: 50,
                                                            mx: 'auto',
                                                            overflow: 'hidden',
                                                            borderRadius: '50%',
                                                        }}
                                                    >
                                                        <Image
                                                            src={`https://to-dos-api.softclub.tj/images/${e.imageName}`}
                                                            width={50}
                                                            height={50}
                                                            alt="photo"
                                                            style={{ objectFit: 'cover' }}
                                                        />
                                                    </Box>
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                    </Box>
                                </TableCell>
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
                                        {row.isCompleted ? "Active" : "Inactive"}
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
                                        <MenuItem onClick={() => { openModalEdit(row); handleClose(row.id); }}>
                                            Edit
                                        </MenuItem>
                                        <MenuItem onClick={() => { EditStatus(row.id); handleClose(row.id); }}>
                                            Edit Status
                                        </MenuItem>
                                        <MenuItem onClick={() => { row.images && row.images.map((e) => deleteImage(e.id)) }}>
                                            delete Image
                                        </MenuItem>
                                        <MenuItem onClick={() => { openModalAddImages(row.id); handleClose(row.id); }}>
                                            add Image
                                        </MenuItem>
                                        <MenuItem
                                            onClick={() => { deleteUser(row.id); handleClose(row.id); }}
                                            sx={{ color: 'red' }}
                                        >
                                            Delete
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
"use client";
import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import todoStore from "@/store/mobx/async/todoStore";
import {
    Container, Typography, Box, Button, TextField, Modal,
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, IconButton, Menu, MenuItem
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Image from "next/image";

const MobxProfessional = () => {
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
        formData.append("Images", addImage);

        try {
            await todoStore.addTodo(formData);
            setAddName("");
            setAddDesc("");
            setAddImage(null);
            setOpenModal(false);
        } catch (error) {
            console.error("Add todo error:", error);
            alert("Failed to add todo. Check the console for more info.");
        }
    };
    
    useEffect(() => {
        todoStore.getTodo();
    }, []);

    return (
        <Container maxWidth="lg" className="pt-[70px]" sx={{ mt: 5 }}>
            <Button
                variant="contained"
                color="primary"
                sx={{ mb: 2 }}
                className="pb-[30px]"
                onClick={() => setOpenModal(true)}
            >
                Add New Todo
            </Button>

            <TableContainer component={Paper}>
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
                        {todoStore.todo.map((e) => (
                            <TableRow key={e.id}>
                                <TableCell>
                                    <Box sx={{ width: 100 }}>
                                        <Swiper
                                            modules={[Autoplay]}
                                            spaceBetween={10}
                                            slidesPerView={1}
                                            autoplay={{ delay: 2500 }}
                                            loop
                                        >
                                            {e.images?.map((img) => (
                                                <SwiperSlide key={img.id}>
                                                    <Box
                                                        sx={{
                                                            width: 50,
                                                            height: 50,
                                                            mx: "auto",
                                                            overflow: "hidden",
                                                            borderRadius: "50%",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                        }}
                                                    >
                                                        <Image
                                                            src={`https://to-dos-api.softclub.tj/images/${img.imageName}`}
                                                            width={50}
                                                            height={50}
                                                            alt="img"
                                                            style={{ objectFit: "cover" }}
                                                        />
                                                    </Box>
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                    </Box>
                                </TableCell>
                                <TableCell>{e.name}</TableCell>
                                <TableCell>{e.description}</TableCell>
                                <TableCell>
                                    <Button
                                        size="small"
                                        variant="contained"
                                        color={e.isCompleted ? "success" : "error"}
                                        onClick={() => todoStore.updateStatus(e.id)}
                                    >
                                        {e.isCompleted ? "Active" : "Inactive"}
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

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem
                    onClick={() => {
                        todoStore.deleteUser(selectedTodo.id);
                        handleMenuClose();
                    }}
                    sx={{ color: "error.main" }}
                >
                    Delete
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        todoStore.updateStatus(selectedTodo.id);
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
        </Container>
    );
};

export default observer(MobxProfessional);
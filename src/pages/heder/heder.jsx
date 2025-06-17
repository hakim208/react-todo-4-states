"use client"
import { Button, Menu, MenuItem } from '@mui/material';
import React, { useState, useRef } from 'react';

const links = {
    Zustand: {
        async: "/zustand",
        sync: "/zustand/sync"
    },
    "Redux Toolkit": {
        async: "/reduxToolkit",
        sync: "/reduxToolkit/sync"
    },
    Jotai: {
        async: "/jotai",
        sync: "/jotai/sync"
    },
    MobX: {
        async: "/mobx",
        sync: "/mobx/sync"
    }
};

const HoverMenu = ({ label, menuLinks }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const closeTimerRef = useRef(null);

    const handleMouseEnter = (event) => {
        clearTimeout(closeTimerRef.current);
        setAnchorEl(event.currentTarget);
    };

    const handleMouseLeave = () => {
        closeTimerRef.current = setTimeout(() => {
            setAnchorEl(null);
        }, 200);
    };

    const handleMenuMouseEnter = () => {
        clearTimeout(closeTimerRef.current);
    };

    const handleMenuMouseLeave = () => {
        setAnchorEl(null);
    };

    return (
        <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ display: "inline-block", marginRight: "20px" }}
        >
            <Button
                variant='outlined'
                aria-controls={open ? "hover-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
            >
                {label}
            </Button>
            <Menu
                id="hover-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={() => setAnchorEl(null)}
                MenuListProps={{
                    onMouseEnter: handleMenuMouseEnter,
                    onMouseLeave: handleMenuMouseLeave,
                }}
            >
                <MenuItem component="a" href={menuLinks.async}>Asynchronous</MenuItem>
                <MenuItem component="a" href={menuLinks.sync}>Synchronous</MenuItem>
            </Menu>
        </div>
    );
};

const Heder = () => {
    return (
        <div className='flex absolute  items-center gap-[20px] w-full justify-center m-[20px_0px] '>
            <HoverMenu label="Zustand" menuLinks={links.Zustand} />
            <HoverMenu label="Redux Toolkit" menuLinks={links["Redux Toolkit"]} />
            <HoverMenu label="Jotai" menuLinks={links.Jotai} />
            <HoverMenu label="MobX" menuLinks={links.MobX} />
        </div>
    );
};

export default Heder;

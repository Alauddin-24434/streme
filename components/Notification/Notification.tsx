"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Menu,
  MenuItem,
  Divider,
  Typography,
  Tooltip,
  Badge,
  IconButton,
} from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import NotifyMessage from "./NotifyMessage";

const NotificationMenu = () => {
  const user = useSelector(selectCurrentUser);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [openNotification, setOpenNotification] = useState<any[]>([]);
  const [readNotification, setReadNotification] = useState<any[]>([]);
  const [refreshCounter, setRefreshCounter] = useState(0);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);

    axios
      .patch(`https://endgame-team-server.vercel.app/notifications/openNotify?email=${user?.email}`)
      .then((res) => {
        if (res.data) {
          setRefreshCounter((prev) => prev + 1);
        }
      });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotifyRead = (id: string) => {
    axios
      .patch(`https://endgame-team-server.vercel.app/notifications/completeRead/${id}?email=${user?.email}`)
      .then((res) => {
        if (res.data) {
          setRefreshCounter((prev) => prev + 1);
        }
      });
  };

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`https://endgame-team-server.vercel.app/notifications?email=${user?.email}`)
        .then((res) => {
          setOpenNotification(res.data);
        });
    }
  }, [user?.email, refreshCounter]);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`https://endgame-team-server.vercel.app/notifications/read?email=${user?.email}`)
        .then((res) => {
          setReadNotification(res.data);
        });
    }
  }, [user?.email, refreshCounter]);

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Tooltip title="Notifications">
        <IconButton onClick={handleOpen} sx={{ color: "white" }}>
          <Badge
            badgeContent={openNotification.length > 9 ? "9+" : openNotification.length}
            color="error"
          >
            <NotificationsNoneIcon />
          </Badge>
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 3,
          sx: {
            backgroundColor: "#1b2743",
            color: "white",
            width: { xs: 320, sm: 440 },
            height: 500,
            mt: 1.5,
            overflowY: "auto",
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "#1b2743",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem sx={{ fontSize: 15, fontWeight: 600 }}>
          <NotificationsNoneIcon sx={{ marginRight: 2 }} /> Notifications ({readNotification.length})
        </MenuItem>
        <Divider />
        {readNotification.length === 0 ? (
          <Typography textAlign="center" mt={2}>
            No notifications
          </Typography>
        ) : (
          readNotification.map((notify: any) => (
            <NotifyMessage
              key={notify._id}
              notify={notify}
              handleNotifyRead={handleNotifyRead}
            
            />
          ))
        )}
      </Menu>
    </Box>
  );
};

export default NotificationMenu;

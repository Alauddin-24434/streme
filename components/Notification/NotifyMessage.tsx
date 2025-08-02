"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import Image from "next/image";
import EmailIcon from "@mui/icons-material/Email";
import DraftsIcon from "@mui/icons-material/Drafts";
import Link from "next/link";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";

interface NotifyMessageProps {
  notify: {
    _id: string;
    notifyPostTime: string;
    notifyTitle: string;
    notifyText?: string;
    notifyImg?: string | null;
    type?: string;
    videoId?: string;
    readeNotify?: string[]; // array of emails who read it
  };
  handleNotifyRead: (id: string) => void;
}

const NotifyMessage: React.FC<NotifyMessageProps> = ({ notify, handleNotifyRead }) => {
  const userInfo = useSelector(selectCurrentUser);

  // Calculate relative time ago
  const timeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 7) {
      return date.toLocaleDateString(); // full date
    } else if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else {
      return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
    }
  };

  const date = new Date(notify.notifyPostTime);
  const notifyDate = timeAgo(date);

  // Check if this user has read this notification
  const readData = notify.readeNotify?.includes(userInfo?.email ?? "");

  return (
    <Link
      href={
        notify.type === "video"
          ? `https://streme-eight.vercel.app/movies/${notify.videoId}`
          : "#"
      }
      onClick={() => handleNotifyRead(notify._id)}
      style={{ textDecoration: "none" }}
      passHref
    >
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        paddingLeft={2}
        paddingY={1}
        marginY={"2px"}
        gap={3}
        paddingRight={2}
        bgcolor={readData ? "#24314f" : "#203a25"}
        sx={{
          cursor: "pointer",
          "&:hover": {
            backgroundColor: readData ? "#38476a" : "#395c40",
          },
        }}
      >
        <Box display={"flex"} alignItems="center">
          <NotificationsNoneIcon
            sx={{
              fontSize: 28,
              padding: 1,
              height: { xs: "30px", sm: "50px" },
              width: { xs: "30px", sm: "50px" },
              borderRadius: "50px",
              backgroundColor: "#353535",
              marginRight: "8px",
              color: readData ? "#ffffff" : "#8ceaa4",
            }}
          />

          <Box>
            <Typography fontSize={15} fontWeight={700} sx={{ maxWidth: { xs: 160, sm: 260 } }}>
              {notify.notifyTitle}:
              <Typography fontSize={13} component="span" display="block" mt={0.5}>
                {notify.notifyText?.slice(0, 90)}
                {notify.notifyText && notify.notifyText.length > 90 && "..."}
              </Typography>
              <Typography fontSize={10} mt={0.5}>
                {notifyDate}
              </Typography>
            </Typography>
          </Box>
        </Box>

        <Box display="flex" alignItems="center">
          {notify.type === "video" ? (
            <Image
              src={
                notify.notifyImg === null
                  ? "https://i.ibb.co/jypVvJz/Screenshot-2024-02-07-031511-removebg-preview.png"
                  : notify.notifyImg || ""
              }
              height={30}
              width={50}
              alt="notification image"
              style={{ objectFit: "cover", borderRadius: 4 }}
            />
          ) : readData ? (
            <DraftsIcon sx={{ color: "white" }} />
          ) : (
            <EmailIcon sx={{ color: "white" }} />
          )}
        </Box>
      </Box>
    </Link>
  );
};

export default NotifyMessage;

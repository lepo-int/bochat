import React, { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Badge,
  Drawer,
  useTheme,
  useMediaQuery
} from "@mui/material";
import { styled } from "@mui/system";
import { IoSend, IoMenu } from "react-icons/io5";
import { BsCheck2All } from "react-icons/bs";
import { RiRadioButtonLine } from "react-icons/ri";

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  height: "100vh",
  backgroundColor: "#f5f5f5"
}));

const Sidebar = styled(Box)(({ theme }) => ({
  width: 320,
  backgroundColor: "#fff",
  borderRight: "1px solid rgba(0, 0, 0, 0.12)",
  [theme.breakpoints.down("md")]: {
    display: "none"
  }
}));

const ChatArea = styled(Box)({
  flex: 1,
  display: "flex",
  flexDirection: "column"
});

const MessageContainer = styled(Box)({
  flex: 1,
  padding: "20px",
  overflowY: "auto"
});

const Message = styled(Box)(({ sent }) => ({
  display: "flex",
  justifyContent: sent ? "flex-end" : "flex-start",
  marginBottom: "10px"
}));

const MessageBubble = styled(Paper)(({ sent }) => ({
  padding: "10px 15px",
  maxWidth: "70%",
  backgroundColor: sent ? "#1976d2" : "#fff",
  color: sent ? "#fff" : "inherit",
  borderRadius: "15px",
  position: "relative"
}));

const ChatHeader = styled(Box)({
  padding: "15px",
  backgroundColor: "#fff",
  borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
  display: "flex",
  alignItems: "center",
  gap: "15px"
});

const InputArea = styled(Box)({
  padding: "20px",
  backgroundColor: "#fff",
  borderTop: "1px solid rgba(0, 0, 0, 0.12)",
  display: "flex",
  gap: "10px"
});

const ChatUI = () => {
  const [message, setMessage] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const contacts = [
    {
      id: 1,
      name: "John Doe",
      avatar: "images.unsplash.com/photo-1599566150163-29194dcaad36",
      lastMessage: "Hey, how are you?",
      online: true
    },
    {
      id: 2,
      name: "Jane Smith",
      avatar: "images.unsplash.com/photo-1494790108377-be9c29b29330",
      lastMessage: "See you tomorrow!",
      online: false
    }
  ];

  const messages = [
    {
      id: 1,
      text: "Hi there!",
      sent: false,
      time: "10:00 AM"
    },
    {
      id: 2,
      text: "Hello! How are you?",
      sent: true,
      time: "10:02 AM"
    }
  ];

  const handleSend = () => {
    if (message.trim()) {
      // Handle sending message
      setMessage("");
    }
  };

  const ContactList = () => (
    <List>
      {contacts.map((contact) => (
        <ListItem button key={contact.id}>
          <ListItemAvatar>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
              color={contact.online ? "success" : "error"}
            >
              <Avatar src={`https://${contact.avatar}`} alt={contact.name} />
            </Badge>
          </ListItemAvatar>
          <ListItemText
            primary={contact.name}
            secondary={contact.lastMessage}
            primaryTypographyProps={{
              style: { fontWeight: 500 }
            }}
          />
        </ListItem>
      ))}
    </List>
  );

  return (
    <Container>
      {isMobile && (
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          <Box width={320}>
            <ContactList />
          </Box>
        </Drawer>
      )}
      <Sidebar component="aside">
        <ContactList />
      </Sidebar>
      <ChatArea>
        <ChatHeader>
          {isMobile && (
            <IconButton
              onClick={() => setDrawerOpen(true)}
              aria-label="open contacts"
            >
              <IoMenu />
            </IconButton>
          )}
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
            color="success"
          >
            <Avatar
              src={`https://${contacts[0].avatar}`}
              alt={contacts[0].name}
            />
          </Badge>
          <Box>
            <Typography variant="h6">{contacts[0].name}</Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              style={{ display: "flex", alignItems: "center", gap: 4 }}
            >
              <RiRadioButtonLine
                color={contacts[0].online ? "#4caf50" : "#f44336"}
              />
              {contacts[0].online ? "Online" : "Offline"}
            </Typography>
          </Box>
        </ChatHeader>

        <MessageContainer>
          {messages.map((msg) => (
            <Message key={msg.id} sent={msg.sent}>
              <MessageBubble sent={msg.sent} elevation={1}>
                <Typography>{msg.text}</Typography>
                <Typography
                  variant="caption"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    opacity: 0.7,
                    marginTop: 4
                  }}
                >
                  {msg.time}
                  {msg.sent && <BsCheck2All />}
                </Typography>
              </MessageBubble>
            </Message>
          ))}
        </MessageContainer>

        <InputArea component="form" onSubmit={(e) => e.preventDefault()}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            size="small"
            aria-label="message input"
          />
          <IconButton
            color="primary"
            onClick={handleSend}
            aria-label="send message"
          >
            <IoSend />
          </IconButton>
        </InputArea>
      </ChatArea>
    </Container>
  );
};

export default ChatUI;
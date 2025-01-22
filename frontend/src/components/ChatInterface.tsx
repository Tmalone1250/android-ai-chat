import React, { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { Paper, TextField, IconButton, Box } from '@mui/material';
import { Send, Mic, VolumeUp } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const Container = styled(Paper)`
  width: 100%;
  max-width: 600px;
  height: 90vh;
  margin: auto;
  display: flex;
  flex-direction: column;
  background: linear-gradient(145deg, #1a1a1a, #2d2d2d);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ChatArea = styled(Box)`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const InputArea = styled(Box)`
  padding: 20px;
  display: flex;
  gap: 10px;
  align-items: center;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(4px);
`;

const Message = styled(motion.div)<{ isUser: boolean }>`
  max-width: 80%;
  padding: 12px 16px;
  border-radius: 16px;
  align-self: ${props => props.isUser ? 'flex-end' : 'flex-start'};
  background: ${props => props.isUser ? '#4CAF50' : '#2196F3'};
  color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const StyledTextField = styled(TextField)`
  flex: 1;
  .MuiInputBase-root {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    color: white;
  }
  .MuiOutlinedInput-notchedOutline {
    border-color: rgba(255, 255, 255, 0.1);
  }
`;

const ActionButton = styled(IconButton)`
  color: #4CAF50;
  background: rgba(255, 255, 255, 0.05);
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

interface ChatMessage {
  text: string;
  isUser: boolean;
  id: number;
}

export const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const chatEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      text: input,
      isUser: true,
      id: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      
      const botMessage: ChatMessage = {
        text: data.response,
        isUser: false,
        id: Date.now() + 1
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    // Implement speech-to-text functionality
  };

  const speakMessage = (text: string) => {
    // Implement text-to-speech functionality
  };

  return (
    <Container elevation={3}>
      <ChatArea>
        <AnimatePresence>
          {messages.map((message) => (
            <Message
              key={message.id}
              isUser={message.isUser}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              {message.text}
            </Message>
          ))}
        </AnimatePresence>
        <div ref={chatEndRef} />
      </ChatArea>
      <InputArea>
        <ActionButton onClick={toggleListening} color={isListening ? "error" : "primary"}>
          <Mic />
        </ActionButton>
        <StyledTextField
          fullWidth
          variant="outlined"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <ActionButton onClick={handleSend}>
          <Send />
        </ActionButton>
      </InputArea>
    </Container>
  );
};

export default ChatInterface;

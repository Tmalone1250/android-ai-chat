import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import styled from '@emotion/styled';
import ChatInterface from './components/ChatInterface';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#4CAF50',
    },
    secondary: {
      main: '#2196F3',
    },
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
  },
});

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%);
`;

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AppContainer>
        <ChatInterface />
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;

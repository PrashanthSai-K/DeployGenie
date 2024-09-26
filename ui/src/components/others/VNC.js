import React, { useRef, useEffect, useState, useCallback } from 'react'
import useWebSocket from "react-use-websocket";
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css'; // Ensure you have xterm CSS for proper styling



function VNC() {

  const { sendMessage, lastMessage } = useWebSocket('ws://localhost:4500/conne', {
    onOpen: () => console.log('WebSocket connection established'),
    onClose: () => console.log('WebSocket connection closed'),
  });

  // useEffect(() => {

  //   instance?.onData((data) => {
  //     if(data === "\r"){
  //       sendMessage(JSON.stringify({ method: 'command', command: inputBuffer.trim() }));
  //       setInputBuffer("");
  //     }else{
  //       console.log(data);

  //       setInputBuffer((prev)=>prev + data)
  //     }
  //   });


  //   if (lastMessage !== null && instance) {
  //     const message = JSON.parse(lastMessage.data);
  //     instance?.writeln(message.data)
  //   }
  // }, [sendMessage, lastMessage]);

  const terminalRef = useRef(null); // Ref to hold the terminal DOM element
  const xterm = useRef(null); // Ref to hold the Terminal instance

  useEffect(() => {
    // Initialize the Xterm instance
    xterm.current = new Terminal({
      cursorBlink: true, // Enable cursor blinking
      rows: 30, // Default number of rows
      cols: 80, // Default number of columns
      theme: {
        background: '#000000', // Terminal background color
        foreground: '#FFFFFF', // Text color
      },
    });

    // Attach the terminal to the div
    if (terminalRef.current) {
      xterm.current.open(terminalRef.current); // Open the terminal in the specified div
    }

    // Write an initial message
    xterm.current.write('Welcome to Xterm.js in React!\r\n');

    // Simulate receiving data from an external source
    // setTimeout(() => {
      xterm.current.write('Simulated external data...\r\n');
    // }, 3000);

    // Clean up on component unmount
    return () => {
      xterm.current.dispose();
    };
  }, [lastMessage, sendMessage]);

  // Function to handle input data (user typing in terminal)
  const handleData = (data) => {
    // Echo input to the terminal
    xterm.current.write(data);
  };

  return (
    <div style={{ height: '100vh', width: '100vw', backgroundColor: '#000' }}>
      hii
      <div ref={terminalRef} style={{ width: '100%', height: '100%' }}></div>
    </div>
  );
};



export default VNC
import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3001');

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [name, setName] = useState('');

    useEffect(() => {
        socket.on('chatMessage', (msg) => {
            setMessages((prev) => [...prev, msg]);
        });

        return () => {
            socket.off('chatMessage');
        };
    }, []);

    const sendMessage = (e) => {
        e.preventDefault();
        if (name && message) {
            const msgObj = { name, text: message };
            socket.emit('chatMessage', msgObj);
            setMessage('');
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '50px auto', fontFamily: 'Arial' }}>
            <h2>Real-Time Chat</h2>
            <div style={{ border: '1px solid #ccc', padding: '10px', height: '300px', overflowY: 'scroll' }}>
                {messages.map((msg, idx) => (
                    <div key={idx}>
                        <strong>{msg.name}:</strong> {msg.text}
                    </div>
                ))}
            </div>
            <form onSubmit={sendMessage} style={{ marginTop: '10px' }}>
                <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    style={{ padding: '5px', marginRight: '5px' }}
                />
                <input
                    type="text"
                    placeholder="Type a message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    style={{ padding: '5px', marginRight: '5px', width: '300px' }}
                />
                <button type="submit" style={{ padding: '5px 10px' }}>Send</button>
            </form>
        </div>
    );
};

export default Chat;

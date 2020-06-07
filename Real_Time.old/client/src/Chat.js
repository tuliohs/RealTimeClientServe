import React, { useState, useEffect } from 'react';
import io from 'socket.io-client'
//O uuid serve para saber se a mensagem é do usuario atual ou de outro socket
import { v4 as uuidv4 } from 'uuid';
import './index.css';

const myId = uuidv4();
//conectando ao client -- a funcao io precisa receber uma url de onde esta o servidor client
const socket = io('http://localhost:8080')

//conectando com a função ON (se inscrevendo no connect)
socket.on('connect', () => console.log(
    '[IO] Connect => New Connection'));

const Chat = () => {

    const [message, updateMessage] = useState('');
    const [messages, updateMessages] = useState([]);

    useEffect(() =>
        socket.on('previousMessages', data => {
            updateMessages(data);
        }), []);

    useEffect(() => {
        const handleNewMessage = newMessage => // declara o evento
            updateMessages([...messages, newMessage])
        socket.on('chat.message', handleNewMessage) //se inscreve no evento
        console.log('handleNewMessage');
        return () => socket.off('chat.message', handleNewMessage) //abandona o evento
    }, [messages])
    //como o array é vazio, a função só é disparada uma vez

    //função handle para o input -- recebe o event e atualiza o estado da mensagem
    const handleInputChange = event =>
        updateMessage(event.target.value);

    //pega o estado de mensage que foi atualizado pelo handleInputChange 
    const handleFormSubmit = event => {
        event.preventDefault();
        if (message.trim()) {
            //a função emit é a interação entre front e back
            socket.emit('chat.message', {
                id: myId,
                message
            })
            updateMessage('');
        }
    }

    return (
        <main className="container">
            <ul className="list">
                {messages.map((m, index) => (
                    <li className={`list__item list__item--${m.id === myId ? 'mine' : 'other'}`}
                        key={index}>
                        <span className={`message message--${m.id === myId ? 'mine' : 'other'}`}>
                            {m.message}
                        </span>
                    </li>
                ))}
            </ul>
            <form className="form" onSubmit={handleFormSubmit}>
                <input className="form__field"
                    onChange={handleInputChange}
                    placeholder="Type a new message here"
                    type="text"
                    value={message} />
            </form>
        </main>
    );
}

export default Chat;
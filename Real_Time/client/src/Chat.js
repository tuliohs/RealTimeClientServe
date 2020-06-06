import React, { useState } from 'react';

function Chat() {

    const [message, updateMessage] = useState('');
    const [messages, updateMessages] = useState([]);

    //função handle para o input -- recebe o event e atualiza o estado da mensagem
    const handleInputChange = event =>
        updateMessage(event.target.value);

    //pega o estado de mensage que foi atualizado pelo handleInputChange 
    const handleFormSubmit = event => {
        event.preventDefault();
        if (message.trim()) {
            //Concatena todas as mensagens criar um array novo e adiciona todas as mensagens
            updateMessages([...messages, {
                //O id esta sendo declarado apenas para a interação com o MAP
                id: 1,
                message
            }])
            updateMessage('');
        }
    }

    return (
        <main className="container">
            <ul className="list">
                {
                    messages.map(msg => (
                        <li className='list__item list__item--outer'>
                            <span className='message message--mine'
                                key={msg.id} >
                                {msg.message}
                            </span>
                        </li>))
                }
            </ul>
            <form className="form" onSubmit={handleFormSubmit} >
                <input className="form__field"
                    placeholder="message here"
                    onChange={handleInputChange}
                    //o value é o que esta na variavel/estado message
                    type="text" value={message}
                />
            </form>
        </main>
    );
}

export default Chat;
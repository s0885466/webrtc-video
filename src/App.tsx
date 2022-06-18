import React, { useEffect, useRef } from 'react';
import io from 'socket.io-client';
import style from './App.scss';
import logoImg from './assets/images/logo.png';

const SERVER_URL = 'http://localhost:4000';

const App = () => {
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io(SERVER_URL, {
      query: { roomId: 'roomId' },
    });

    socketRef.current.on('connect', () => {
      console.log(
        `successfully connected to wss server ${socketRef.current.id}`
      );
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  return (
    <div className={style.main_container}>
      <div className={style.dashboard_container}>
        <img src={logoImg} alt="logo" />
      </div>
      <div className={style.main_container}>call_container</div>
      <div className={style.messenger_container}>messenger_container</div>
    </div>
  );
};

export default App;

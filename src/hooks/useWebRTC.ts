import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import { CallerDetails } from '../App';

type CallingState = 'NONE' | 'INCOMING_CALL' | 'OUTGOING_CALL';

const SERVER_URL = process.env.BACKEND_URI;

export const useWebRTC = () => {
  const [calleePersonalCode, setCalleePersonalCode] = useState(null);
  const [callType] = useState('CHAT');
  const [callingState, setCallingState] = useState<CallingState>('NONE');
  const [socketId, setSocketId] = useState(null);

  const socketRef = useRef(null);

  const updateCalleePersonalCode = (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    setCalleePersonalCode(event.currentTarget.value);
  };

  const sendPreOffer = () => {
    const data = {
      callType,
      calleePersonalCode,
    };

    setCallingState('OUTGOING_CALL');

    socketRef.current.emit('pre-offer', data);
  };

  const incomingCallHandler = (data: CallerDetails) => {
    console.log(data);
    setCallingState('INCOMING_CALL');
  };

  useEffect(() => {
    socketRef.current = io(SERVER_URL);

    socketRef.current.on('connect', () => {
      setSocketId(socketRef.current.id);
    });

    socketRef.current.on('pre-offer', (data: CallerDetails) => {
      incomingCallHandler(data);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  return {
    calleePersonalCode,
    updateCalleePersonalCode,
    sendPreOffer,
    callType,
    callingState,
    setCallingState,
    socketId,
  };
};

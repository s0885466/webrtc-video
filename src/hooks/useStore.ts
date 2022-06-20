import { useState } from 'react';

export const useStore = () => {
  const [store, setStore] = useState({
    localStream: null,
    remoteStream: null,
    screenSharingStream: null,
    allowConnectionsFromStrangers: false,
    screenSharingActive: false,
  });

  const setLocalStream = (localStream: string) => {
    setStore({ ...store, localStream });
  };

  const setAllowConnectionsFromStrangers = (allowConnection: boolean) => {
    setStore({
      ...store,
      allowConnectionsFromStrangers: allowConnection,
    });
  };

  const setScreenSharingActive = (screenSharingActive: boolean) => {
    setStore({ ...store, screenSharingActive });
  };

  const setRemoteStream = (remoteStream: string) => {
    setStore({ ...store, remoteStream });
  };

  return {
    store,
    setLocalStream,
    setAllowConnectionsFromStrangers,
    setScreenSharingActive,
    setRemoteStream,
  };
};

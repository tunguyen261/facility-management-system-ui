// SignalRContext.js
import { createContext, useContext, useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr'; // Thư viện SignalR
import { getCookie } from 'utils/cookie';
import { COOKIE_JWT } from 'utils/constants';

const SignalRContext = createContext();

export const SignalRProvider = ({ children }) => {
  const [connection, setConnection] = useState(null);
  const cookie = getCookie(COOKIE_JWT);

  const access_token =  cookie?.access_token;
  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(`https://14.225.254.145:5001/notification-hub`,{
        accessTokenFactory: () => access_token,
      })
      .build();

    setConnection(newConnection);

    newConnection.start().then(() => {
      console.log('Connection started successfully.');
    }).catch((error) => {
      console.error('Error starting connection:', error);
    });
    newConnection.onclose((error) => {
      console.error('Connection closed:', error);
    });
    
    newConnection.onreconnecting((error) => {
      console.warn('Connection is reconnecting:', error);
    });
    
    newConnection.onreconnected((connectionId) => {
      console.log('Connection has been reestablished. New connectionId:', connectionId);
    });
    
    return () => {
      console.log('stop');
      newConnection.stop();
    };
  }, [access_token]);

  return (
    <SignalRContext.Provider value={connection}>
      {children}
    </SignalRContext.Provider>
  );
};

export const useSignalREffect = (eventName, eventName2, callback) => {
  const connection = useContext(SignalRContext);
  useEffect(() => {
    connection.on('ReceiveNotifications',callback);

    const intervalId = setInterval(() => {
      if (connection) {     
        const _ = connection.invoke('GetNotifications')
        .then(res => {})
        .catch(err=> console.log('err',err));
      }
    }, 3000);


    return () => {
      clearInterval(intervalId);
      if (connection) {
        connection.off(eventName, callback);
      }
    };
  }, [connection, eventName, eventName2, callback]);
};


import { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TestData = any;
type Socket = SocketIOClient.Socket;

// EXAMPLE SOCKET HOOK - TODO: REMOVE
export const useGetTestData = (): { data?: TestData; socket?: Socket } => {
  const [data, setData] = useState<TestData | undefined>();
  const [socket, setSocket] = useState<Socket | undefined>();

  useEffect(() => {
    const socket = socketIOClient("http://localhost:8000");
    setSocket(socket);
    socket.on("CountIncremented", (data: TestData): void => {
      setData(data);
    });

    return (): void => {
      socket.disconnect();
    };
  }, []);

  return { data, socket };
};

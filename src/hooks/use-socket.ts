"use client";

import { useEffect, useRef, useState } from "react";

type SocketEvent = {
  type: string;
  data: unknown;
};

export function useSocket(url?: string) {
  const [isConnected, setIsConnected] = useState(false);
  const [lastEvent, setLastEvent] = useState<SocketEvent | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const listenersRef = useRef<Map<string, (data: unknown) => void>>(new Map());

  useEffect(() => {
    if (!url) return;

    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => setIsConnected(true);
    ws.onclose = () => setIsConnected(false);

    ws.onmessage = (event) => {
      try {
        const parsed = JSON.parse(event.data) as SocketEvent;
        setLastEvent(parsed);

        const listener = listenersRef.current.get(parsed.type);
        if (listener) {
          listener(parsed.data);
        }
      } catch {
        // ignore non-JSON messages
      }
    };

    return () => {
      ws.close();
    };
  }, [url]);

  const subscribe = (eventType: string, callback: (data: unknown) => void) => {
    listenersRef.current.set(eventType, callback);
    return () => {
      listenersRef.current.delete(eventType);
    };
  };

  const send = (type: string, data: unknown) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type, data }));
    }
  };

  return { isConnected, lastEvent, subscribe, send };
}

// Mock socket for development without a backend
export function useMockSocket() {
  const [isConnected] = useState(true);
  const [lastEvent, setLastEvent] = useState<SocketEvent | null>(null);
  const listenersRef = useRef<Map<string, (data: unknown) => void>>(new Map());
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Simulate periodic GPS updates
    intervalRef.current = setInterval(() => {
      const mockEvent: SocketEvent = {
        type: "GPS_UPDATE",
        data: {
          tripId: "mock-trip-1",
          latitude: -17.8292 + (Math.random() - 0.5) * 0.01,
          longitude: 31.0522 + (Math.random() - 0.5) * 0.01,
          speed: Math.round(20 + Math.random() * 40),
          timestamp: new Date().toISOString(),
        },
      };
      setLastEvent(mockEvent);
      const listener = listenersRef.current.get("GPS_UPDATE");
      if (listener) listener(mockEvent.data);
    }, 5000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const subscribe = (eventType: string, callback: (data: unknown) => void) => {
    listenersRef.current.set(eventType, callback);
    return () => {
      listenersRef.current.delete(eventType);
    };
  };

  const send = (type: string, data: unknown) => {
    console.log("[MockSocket] Sent:", type, data);
  };

  return { isConnected, lastEvent, subscribe, send };
}

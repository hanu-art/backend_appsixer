import { Server } from "socket.io";

/**
 * In-memory maps
 * (single server ke liye enough)
 */
const visitorSockets = new Map(); // visitorId -> socket.id
const adminSockets = new Map();   // adminId -> socket.id

export const initSocket = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    /**
     * JOIN EVENT
     * payload examples:
     * { role: "visitor", visitorId: 12 }
     * { role: "admin", adminId: 5 }
     */
    socket.on("join", (payload) => {
      if (!payload || !payload.role) return;

      if (payload.role === "visitor" && payload.visitorId) {
        visitorSockets.set(payload.visitorId, socket.id);
        socket.data.role = "visitor";
        socket.data.visitorId = payload.visitorId;

        console.log("Visitor joined:", payload.visitorId);
      }

      if (payload.role === "admin" && payload.adminId) {
        adminSockets.set(payload.adminId, socket.id);
        socket.data.role = "admin";
        socket.data.adminId = payload.adminId;

        console.log("Admin joined:", payload.adminId);
      }
    });

    /**
     * CHAT MESSAGE EVENT
     * NOTE:
     * Message DB me save ho chuka hoga
     * yahan sirf forward karna hai
     */
    socket.on("chat:message", (payload) => {
      /**
       * payload structure (expected):
       * {
       *   senderRole: "visitor" | "admin",
       *   receiverVisitorId,
       *   receiverAdminId,
       *   message
       * }
       */

      if (!payload) return;

      // Visitor -> Admin
      if (
        payload.senderRole === "visitor" &&
        payload.receiverAdminId
      ) {
        const adminSocketId = adminSockets.get(payload.receiverAdminId);
        if (adminSocketId) {
          io.to(adminSocketId).emit("chat:message", payload);
        }
      }

      // Admin -> Visitor
      if (
        payload.senderRole === "admin" &&
        payload.receiverVisitorId
      ) {
        const visitorSocketId = visitorSockets.get(payload.receiverVisitorId);
        if (visitorSocketId) {
          io.to(visitorSocketId).emit("chat:message", payload);
        }
      }
    });

    /**
     * DISCONNECT
     */
    socket.on("disconnect", () => {
      if (socket.data.role === "visitor") {
        visitorSockets.delete(socket.data.visitorId);
        console.log("Visitor disconnected:", socket.data.visitorId);
      }

      if (socket.data.role === "admin") {
        adminSockets.delete(socket.data.adminId);
        console.log("Admin disconnected:", socket.data.adminId);
      }
    });
  });

  return io;
};

import { PeerServer } from "peer";
import { JoinRoomMessage, WsMainMessage } from "./types";

const peerPort = Bun.env.PEER_PORT || 9000;
const socketsPort = Bun.env.SOCKETS_PORT || 9001;

const peerServer = PeerServer({ port: +peerPort, path: "/peerjs" });

const sockets = Bun.serve<{ roomId: string; peerId: string }>({
	fetch(req, server) {
		if (req.url === "/chat") {
			return new Response("Hello world!");
		 }
		const success = server.upgrade(req, { data: {} });
		if (success) {
			return undefined;
		}
		return new Response("Hello world!");
	},
	websocket: {
		message(ws, message) {
			const wsMsg = converWssMessage<WsMainMessage>(message);
			console.log("message received", wsMsg);
			if (wsMsg.type === "join-room") {
				const wsMsgSub = converWssMessage<JoinRoomMessage>(wsMsg.msg);
				ws.subscribe(wsMsgSub.roomId);
				ws.publish(
					wsMsgSub.roomId,
					`${wsMsgSub.peerId} joined the room ${wsMsgSub.roomId}`
				);
				ws.publish(
					wsMsgSub.roomId,
					JSON.stringify({
						type: "player-connected",
						msg: wsMsgSub.peerId,
					})
				);
				ws.data = wsMsgSub;
			}
		},
		open(ws) {},
		close(ws) {
			if (ws.data.roomId) {
				ws.publish(
					ws.data.roomId,
					JSON.stringify({
						type: "player-disconnected",
						msg: ws.data.peerId,
					})
				);
			}
		},
	},
	port: +socketsPort,
});

const converWssMessage = <T>(message: string | Buffer): T => {
	if (typeof message === "string") {
		try {
			return JSON.parse(message);
		} catch (error) {
			console.error(error);
			return message as T;
		}
	}
	return message as T;
};
console.log("Server started on port ", sockets.port);
console.log("peerjs server on port ", peerPort);


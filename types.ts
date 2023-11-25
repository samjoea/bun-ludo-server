export type WsMainMessage = {
   type: string;
   msg: string;
};

export type JoinRoomMessage = {
   roomId: string;
   peerId: string;
}
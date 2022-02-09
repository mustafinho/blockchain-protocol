import { randomBytes } from "crypto"

export const writeMessageToPeers = (peers, type: string, data: string) => {
    for (let id in peers) {
        console.log('------------- writeMessageToPeers starts -------------');
        console.log('type: ' + type + ', to: ' + id);
        console.log('------------- writeMessageToPeers ends -------------');
        sendMessage(id, type, data);
    }
}

export const writeMessageToPeerToId = (toId: string, type: string, data: string) => {
    for (let id in peers) {
        if (id === toId) {
            console.log('------------- writeMessageToPeerToId starts -------------');
            console.log('type: ' + type + ', to: ' + toId);
            console.log('------------- writeMessageToPeerToId ends -------------');
            sendMessage(id, type, data);
        }
    }
}

export const sendMessage = (id: string, type: string, data:string) => {
    peers[id].conn.write(JSON.stringify(
        {
            to: id,
            from: myPeerId,
            type: type,
            data: data
        }
    ));
}
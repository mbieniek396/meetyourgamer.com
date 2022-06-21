from channels.generic.websocket import AsyncWebsocketConsumer
import json
from main.models import ChatBox, Message
from django.contrib.auth.models import User
from asgiref.sync import sync_to_async

class ChatRoomConsumer(AsyncWebsocketConsumer):
    @sync_to_async
    def saveMessage(self, roomNR, message, senderId):
        czat = ChatBox.objects.get(id=int(roomNR))
        m = Message(content=message, sender=User.objects.get(id=int(senderId)))
        m.save()
        czat.message_set.add(m)
        czat.save()
        print("saved")

    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = self.room_name
        
        await self.channel_layer.group_add(
            self.room_group_name, 
            self.channel_name   
        )

        await self.accept()


    async def disconnect(self, code):
        return await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        user = text_data_json['user']

        await self.channel_layer.group_send(
            self.room_group_name, 
            {
                'type': 'chat_message',
                'message': message,
                'user': user
            }
        )

    async def chat_message(self, event):
        message = event['message']
        user = event['user']
        senderId = message.split("@")[0]
        where = len(senderId)+3
        message = message[where:]
        await self.saveMessage(int(self.room_group_name), message, senderId)
        print("ominelo :(")
        await self.send(text_data = json.dumps({
            'message': message,
            'user': user
        }))

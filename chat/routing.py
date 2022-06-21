from django.urls import re_path
from . import consumers

websocket_urlpatterns = [ ######### \w+ bierze wszystko i wsadza do zmiennej w <>
                                ###### /$ mowi ze nic wiecej nie moze byc
    re_path(r'ws/chat/(?P<room_name>\w+)/$', consumers.ChatRoomConsumer.as_asgi()),
]
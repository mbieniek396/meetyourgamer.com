from django.shortcuts import redirect, render
from main.models import ChatBox, Message

# Create your views here.
def home(request):
    return render(request, "chat/home.html", {})

def room(request, room_name):
    czat = ChatBox.objects.get(id=int(room_name))
    if request.user not in czat.users.all():
        return redirect("/about")
    msgs = czat.message_set.all()
    print(msgs)
    return render(request, "chat/room.html", {
        'room_name': room_name,
        'msgs': msgs
    })
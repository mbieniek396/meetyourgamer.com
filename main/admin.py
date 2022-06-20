from telnetlib import GA
from django.contrib import admin
from main.models import FriendRequest, FriendsList, GameFormula, Monday, UserGame, UserProfile, Game

# Register your models here.
admin.site.register(UserProfile)
admin.site.register(Game)
admin.site.register(GameFormula)
admin.site.register(UserGame)
admin.site.register(FriendsList)
admin.site.register(FriendRequest)
admin.site.register(Monday)
from datetime import datetime
from distutils.command.upload import upload
from django.db import models
from django.contrib.auth.models import User
from django.dispatch import receiver
from . import gameStatus

# Create your models here.
#### DAYS OF THE WEEEK #####
class Monday(models.Model):
    start=models.CharField(max_length=5,null=True, blank=True)
    end=models.CharField(max_length=5,null=True, blank=True)

    class Meta:
        ordering = ["start",]

class Tuesday(models.Model):
    start=models.CharField(max_length=5,null=True, blank=True)
    end=models.CharField(max_length=5,null=True, blank=True)
    
    class Meta:
        ordering = ["start",]

class Wedensday(models.Model):
    start=models.CharField(max_length=5,null=True, blank=True)
    end=models.CharField(max_length=5,null=True, blank=True)
    
    class Meta:
        ordering = ["start",]

class Thursday(models.Model):
    start=models.CharField(max_length=5,null=True, blank=True)
    end=models.CharField(max_length=5,null=True, blank=True)
    
    class Meta:
        ordering = ["start",]

class Friday(models.Model):
    start=models.CharField(max_length=5,null=True, blank=True)
    end=models.CharField(max_length=5, null=True, blank=True)
    
    class Meta:
        ordering = ["start",]

class Saturday(models.Model):
    start=models.CharField(max_length=5,null=True, blank=True)
    end=models.CharField(max_length=5,null=True, blank=True)
    
    class Meta:
        ordering = ["start",]

class Sunday(models.Model):
    start=models.CharField(max_length=5,null=True, blank=True)
    end=models.CharField(max_length=5,null=True, blank=True)
    
    class Meta:
        ordering = ["start",]

##################################################################
################## MODELS ######################################
#################################################################

class UserProfile(models.Model):
    user=models.OneToOneField(User, on_delete=models.CASCADE)
    profilePicture=models.ImageField(upload_to='main/img/profilePics', default="/main/img/default/blankprofile.png")
    imie=models.CharField(max_length=200, null=True, blank=True)
    nazwisko=models.CharField(max_length=200, null=True, blank=True)
    wiek=models.IntegerField(null=True, blank=True)

    ##### PlayTime #####
    mondays=models.ManyToManyField(Monday)
    tuesdays=models.ManyToManyField(Tuesday)
    wedensdays=models.ManyToManyField(Wedensday)
    thursdays=models.ManyToManyField(Thursday)
    fridays=models.ManyToManyField(Friday)
    saturdays=models.ManyToManyField(Saturday)
    sundays=models.ManyToManyField(Sunday)
    
    def __str__(self):
        return self.user.username

class Game(models.Model):
    name=models.CharField(max_length=100)
    picture=models.ImageField(upload_to='main/img/gameIMG', default="/main/img/default/blankgame.png")
    ranking=models.TextField(default="Brak")
    confirmed=models.BooleanField(default=False)

    players=models.ManyToManyField(UserProfile)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ('-id',)

class GameFormula(models.Model):
    game=models.OneToOneField(Game, on_delete=models.CASCADE, blank=True, null=True)
    author=models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    status=models.CharField(max_length=50, default=gameStatus.statusTable[2])
    signDate=models.CharField(max_length=100)
    rankingSystem=models.TextField(null=True)
    gameLink=models.TextField(null=True)
    why=models.TextField(null=True)

    def __str__(self):
        return self.game.name+" by "+self.author.username

    class Meta:
        ordering = ('-id',)

class UserGame(models.Model):
    game=models.ForeignKey(Game, on_delete=models.CASCADE)
    rank=models.TextField(max_length=100, null=True, blank=True)
    user=models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username+" gra w "+self.game.name+" jako "+self.rank  

class FriendsList(models.Model):
    owner=models.OneToOneField(User, on_delete=models.CASCADE)
    friends=models.ManyToManyField(UserProfile)

    def isFriendOf(self, other):
        for friend in self.friends.all():
            if friend.user.id == other.id:
                return True
        return False

    def __str__(self):
        return "znajomi "+self.owner.username 

class FriendRequest(models.Model):
    receiver=models.ForeignKey(User, on_delete=models.CASCADE)
    sender=models.ForeignKey(UserProfile, on_delete=models.CASCADE)

    def __str__(self):
        return self.sender.user.username+" zaprasza "+self.receiver.username

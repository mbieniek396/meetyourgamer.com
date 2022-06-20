import email
import re
from django.dispatch import receiver
from django.http import HttpResponseRedirect
from django.shortcuts import redirect, render
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from main.models import FriendRequest, FriendsList, Game, GameFormula, Monday, UserGame, UserProfile, Tuesday, Wedensday, Thursday, Friday, Saturday, Sunday
from django.core.files.storage import FileSystemStorage
from . import gameStatus
from datetime import datetime

# Create your views here.
def startpage(request):
    if request.user.is_authenticated:
        return render(request, "main/home.html", {})
    return render(request, "main/startpage.html", {})

def home(request):
    return render(request, "main/home.html", {})

def logUserOut(request):
    logout(request)
    return redirect("/")

def loginUser(request):
    if request.method == "POST":
        l = request.POST.get("login")
        p = request.POST.get("password")
        user = authenticate(request, username=l, password=p)
        if not User.objects.filter(username=l).exists():
            return render(request, "main/login.html", {"msg":"Nie ma takiego uzytkownika!"})
        if not user:
            return render(request, "main/login.html", {"msg":"Niepoprawne haslo!"})
        login(request, user)
        return HttpResponseRedirect("/about")
    return render(request, "main/login.html", {"msg":""})

def register(request):
    logins = ""
    for user in User.objects.all():
        logins+=";"+user.username
    if request.method == "POST":
        l = request.POST.get("login")
        e = request.POST.get("Regemail")
        p = request.POST.get("REGpassword")
        User.objects.create_user(username=l, password=p, email=e)
        u = User.objects.get(username=l)
        up = UserProfile(user=u)
        up.save()
        return HttpResponseRedirect("/registrationcomplete")
    return render(request, "main/register.html", {"loginsA":logins})

def registrationComplete(request):
    return render(request, "main/registrationcomplete.html", {})

def chpasswd(request):
    if request.method == "POST":
        if request.user.check_password(request.POST.get("originalPasswd")): 
            request.user.set_password(request.POST.get("passwd1"))
            request.user.save()
            login(request, request.user)
        else:
            return render(request, "main/changepasswd.html", {"error":"Zle haslo!"})
        return redirect("/about")
    return render(request, "main/changepasswd.html", {"error":""})

def profilePage(request, nickname):
    if request.method == "POST":
        if request.POST.get("addFriend"):
            fr = FriendRequest(receiver=User.objects.get(username=nickname), sender=request.user.userprofile)
            fr.save()
        if request.POST.get("delFriend"):
            frI = FriendsList.objects.get(owner=request.user)
            frU = FriendsList.objects.get(owner=User.objects.get(id=request.POST.get("delFriend")))
            frI.friends.remove(User.objects.get(id=request.POST.get("delFriend")).userprofile)
            frI.save()
            frU.friends.remove(request.user.userprofile)
            frU.save()
        return redirect(f"/profile/{nickname}")
    si = False
    pending = False
    other = True
    friends = False
    setA = FriendRequest.objects.filter(sender=request.user.userprofile, receiver=User.objects.get(username=nickname))
    if len(setA) == 1:
        pending = True
    if len(User.objects.get(username=nickname).userprofile.game_set.all()) > 0:
        si = True
    if request.user.username == nickname:
        other=False
    try:
        if request.user.friendslist.isFriendOf(User.objects.get(username=nickname)):
            friends = True
    except Exception:
        pass
    return render(request, "main/profile.html", {"profile":User.objects.get(username=nickname).userprofile, "si":si, "other": other, "pending":pending, "friends":friends})

def addGame(request):
    gameTit = ""
    for game in Game.objects.all():
        gameTit+=";"+game.name
    if request.method == "POST":
        g = Game(name=request.POST.get("title"))
        g.save()
        rankS= ""
        link = ""
        if request.POST.get("ranking"): rankS = request.POST.get("ranking")
        if request.POST.get("link"): link = request.POST.get("link")
        gf = GameFormula(game=g, author=request.user, rankingSystem=rankS, gameLink=link, signDate=datetime.now().strftime("%H:%M:%S %d-%m-%Y"))
        gf.save()
        return redirect("/gameaddsuccess")
    return render(request, "main/addgame.html", {"gry": gameTit})

def gameAddSuccess(request):
    return render(request, "main/gameaddsuccess.html", {})
    

def addedGamesList(request):
    try:
        if len(request.user.gameformula_set.all()) > 0:
            return render(request, "main/addedgamelist.html", {"si":True})
        else:
            return render(request, "main/addedgamelist.html", {"si":False})
    except Exception:
            return render(request, "main/addedgamelist.html", {"si":False})

def editProfile(request):
    variables = {}
    ################################### BEGGGIINNNNNNN ########################
    ############### PONIEDZIALEK ###############################################
    userMondays = Monday.objects.filter(userprofile=request.user.userprofile)
    if(len(userMondays) == 0):
        variables["mondaysEmpty"] = True
        variables["mondaysFull"] = False
    elif userMondays[0].start == "00:00" and userMondays[0].end == "00:00":
        variables["mondaysEmpty"] = False
        variables["mondaysFull"] = True
    else:
        variables["mondaysEmpty"] = False
        variables["mondaysFull"] = False
    ############### WTOREK ###############################################
    userTuesdays = Tuesday.objects.filter(userprofile=request.user.userprofile)
    if(len(userTuesdays) == 0):
        variables["tuesdaysEmpty"] = True
        variables["tuesdaysFull"] = False
    elif userTuesdays[0].start == "00:00" and userTuesdays[0].end == "00:00":
        variables["tuesdaysEmpty"] = False
        variables["tuesdaysFull"] = True
    else:
        variables["tuesdaysEmpty"] = False
        variables["tuesdaysFull"] = False
    ############### ŚRODA ###############################################
    userwedensdays = Wedensday.objects.filter(userprofile=request.user.userprofile)
    if(len(userwedensdays) == 0):
        variables["wedensdaysEmpty"] = True
        variables["wedensdaysFull"] = False
    elif userwedensdays[0].start == "00:00" and userwedensdays[0].end == "00:00":
        variables["wedensdaysEmpty"] = False
        variables["wedensdaysFull"] = True
    else:
        variables["wedensdaysEmpty"] = False
        variables["wedensdaysFull"] = False

    ############### Czwartek ###############################################
    userthursdays = Thursday.objects.filter(userprofile=request.user.userprofile)

    if(len(userthursdays) == 0):
        variables["thursdaysEmpty"] = True
        variables["thursdaysFull"] = False
    elif userthursdays[0].start == "00:00" and userthursdays[0].end == "00:00":
        variables["thursdaysEmpty"] = False
        variables["thursdaysFull"] = True
    else:
        variables["thursdaysEmpty"] = False
        variables["thursdaysFull"] = False
    ############### PIątwek ###############################################
    userfridays = Friday.objects.filter(userprofile=request.user.userprofile)
    if(len(userfridays) == 0):
        variables["fridaysEmpty"] = True
        variables["fridaysFull"] = False
    elif userfridays[0].start == "00:00" and userfridays[0].end == "00:00":
        variables["fridaysEmpty"] = False
        variables["fridaysFull"] = True
    else:
        variables["fridaysEmpty"] = False
        variables["fridaysFull"] = False
    ############### Sobota ###############################################
    usersaturdays = Saturday.objects.filter(userprofile=request.user.userprofile)
    if(len(usersaturdays) == 0):
        variables["saturdaysEmpty"] = True
        variables["saturdaysFull"] = False
    elif usersaturdays[0].start == "00:00" and usersaturdays[0].end == "00:00":
        variables["saturdaysEmpty"] = False
        variables["saturdaysFull"] = True
    else:
        variables["saturdaysEmpty"] = False
        variables["saturdaysFull"] = False
    ############### Niedziela ###############################################
    usersundays = Sunday.objects.filter(userprofile=request.user.userprofile)
    if(len(usersundays) == 0):
        variables["sundaysEmpty"] = True
        variables["sundaysFull"] = False
    elif usersundays[0].start == "00:00" and usersundays[0].end == "00:00":
        variables["sundaysEmpty"] = False
        variables["sundaysFull"] = True
    else:
        variables["sundaysEmpty"] = False
        variables["sundaysFull"] = False

    if request.method == "POST":
        if request.POST.get("yes"):
            ###################### DNI TYGHODNIA ########################################################
            ############################ PONIEDZIAŁEK ######################################
            if request.POST.get("mondayOptions"):
                if request.POST.get("mondayOptions") == "Exact":
                    n = 0
                    for monday in request.user.userprofile.mondays.all():
                        monday.delete()
                    while( request.POST.get("mondayEPstart"+str(n))):
                        m = Monday(start=request.POST.get("mondayEPstart"+str(n)), end=request.POST.get("mondayEPend"+str(n)))
                        m.save()
                        request.user.userprofile.mondays.add(m)
                        request.user.userprofile.save()
                        n+=1
                if request.POST.get("mondayOptions") == "Full":
                    if len(request.user.userprofile.mondays.all()) > 0:
                        for monday in request.user.userprofile.mondays.all():
                            monday.delete()
                    m = Monday(start="00:00", end="00:00")
                    m.save()
                    request.user.userprofile.mondays.add(m)
                    request.user.userprofile.save()
                if request.POST.get("mondayOptions") == "Empty":
                    for monday in request.user.userprofile.mondays.all():
                        monday.delete()
            ############################ Wtorek ######################################
            if request.POST.get("tuesdayOptions"):
                if request.POST.get("tuesdayOptions") == "Exact":
                    n = 0
                    for tuesday in request.user.userprofile.tuesdays.all():
                        tuesday.delete()
                    while( request.POST.get("tuesdayEPstart"+str(n))):
                        m = Tuesday(start=request.POST.get("tuesdayEPstart"+str(n)), end=request.POST.get("tuesdayEPend"+str(n)))
                        m.save()
                        request.user.userprofile.tuesdays.add(m)
                        request.user.userprofile.save()
                        n+=1
                if request.POST.get("tuesdayOptions") == "Full":
                    if len(request.user.userprofile.tuesdays.all()) > 0:
                        for tuesday in request.user.userprofile.tuesdays.all():
                            tuesday.delete()
                    m = Tuesday(start="00:00", end="00:00")
                    m.save()
                    request.user.userprofile.tuesdays.add(m)
                    request.user.userprofile.save()
                if request.POST.get("tuesdayOptions") == "Empty":
                    for tuesday in request.user.userprofile.tuesdays.all():
                        tuesday.delete()
            ############################ ŚRODA ######################################
            if request.POST.get("wedensdayOptions"):
                if request.POST.get("wedensdayOptions") == "Exact":
                    n = 0
                    for wedensday in request.user.userprofile.wedensdays.all():
                        wedensday.delete()
                    while( request.POST.get("wedensdayEPstart"+str(n))):
                        m = Wedensday(start=request.POST.get("wedensdayEPstart"+str(n)), end=request.POST.get("wedensdayEPend"+str(n)))
                        m.save()
                        request.user.userprofile.wedensdays.add(m)
                        request.user.userprofile.save()
                        n+=1
                if request.POST.get("wedensdayOptions") == "Full":
                    if len(request.user.userprofile.wedensdays.all()) > 0:
                        for wedensday in request.user.userprofile.wedensdays.all():
                            wedensday.delete()
                    m = Wedensday(start="00:00", end="00:00")
                    m.save()
                    request.user.userprofile.wedensdays.add(m)
                    request.user.userprofile.save()
                if request.POST.get("wedensdayOptions") == "Empty":
                    for wedensday in request.user.userprofile.wedensdays.all():
                        wedensday.delete()
            ############################ Czwartek ######################################
            if request.POST.get("thursdayOptions"):
                if request.POST.get("thursdayOptions") == "Exact":
                    n = 0
                    for thursday in request.user.userprofile.thursdays.all():
                        thursday.delete()
                    while( request.POST.get("thursdayEPstart"+str(n))):
                        m = Thursday(start=request.POST.get("thursdayEPstart"+str(n)), end=request.POST.get("thursdayEPend"+str(n)))
                        m.save()
                        request.user.userprofile.thursdays.add(m)
                        request.user.userprofile.save()
                        n+=1
                if request.POST.get("thursdayOptions") == "Full":
                    if len(request.user.userprofile.thursdays.all()) > 0:
                        for thursday in request.user.userprofile.thursdays.all():
                            thursday.delete()
                    m = Thursday(start="00:00", end="00:00")
                    m.save()
                    request.user.userprofile.thursdays.add(m)
                    request.user.userprofile.save()
                if request.POST.get("thursdayOptions") == "Empty":
                    for thursday in request.user.userprofile.thursdays.all():
                        thursday.delete()
            ############################ Piątek ######################################
            if request.POST.get("fridayOptions"):
                if request.POST.get("fridayOptions") == "Exact":
                    n = 0
                    for friday in request.user.userprofile.fridays.all():
                        friday.delete()
                    while( request.POST.get("fridayEPstart"+str(n))):
                        m = Friday(start=request.POST.get("fridayEPstart"+str(n)), end=request.POST.get("fridayEPend"+str(n)))
                        m.save()
                        request.user.userprofile.fridays.add(m)
                        request.user.userprofile.save()
                        n+=1
                if request.POST.get("fridayOptions") == "Full":
                    if len(request.user.userprofile.fridays.all()) > 0:
                        for friday in request.user.userprofile.fridays.all():
                            friday.delete()
                    m = Friday(start="00:00", end="00:00")
                    m.save()
                    request.user.userprofile.fridays.add(m)
                    request.user.userprofile.save()
                if request.POST.get("fridayOptions") == "Empty":
                    for friday in request.user.userprofile.fridays.all():
                        friday.delete()
            ############################ Sobota ######################################
            if request.POST.get("saturdayOptions"):
                if request.POST.get("saturdayOptions") == "Exact":
                    n = 0
                    for saturday in request.user.userprofile.saturdays.all():
                        saturday.delete()
                    while( request.POST.get("saturdayEPstart"+str(n))):
                        m = Saturday(start=request.POST.get("saturdayEPstart"+str(n)), end=request.POST.get("saturdayEPend"+str(n)))
                        m.save()
                        request.user.userprofile.saturdays.add(m)
                        request.user.userprofile.save()
                        n+=1
                if request.POST.get("saturdayOptions") == "Full":
                    if len(request.user.userprofile.saturdays.all()) > 0:
                        for saturday in request.user.userprofile.saturdays.all():
                            saturday.delete()
                    m = Saturday(start="00:00", end="00:00")
                    m.save()
                    request.user.userprofile.saturdays.add(m)
                    request.user.userprofile.save()
                if request.POST.get("saturdayOptions") == "Empty":
                    for saturday in request.user.userprofile.saturdays.all():
                        saturday.delete()
            ############################ Niedziela ######################################
            if request.POST.get("sundayOptions"):
                if request.POST.get("sundayOptions") == "Exact":
                    n = 0
                    for sunday in request.user.userprofile.sundays.all():
                        sunday.delete()
                    while( request.POST.get("sundayEPstart"+str(n))):
                        m = Sunday(start=request.POST.get("sundayEPstart"+str(n)), end=request.POST.get("sundayEPend"+str(n)))
                        m.save()
                        request.user.userprofile.sundays.add(m)
                        request.user.userprofile.save()
                        n+=1
                if request.POST.get("sundayOptions") == "Full":
                    if len(request.user.userprofile.sundays.all()) > 0:
                        for sunday in request.user.userprofile.sundays.all():
                            sunday.delete()
                    m = Sunday(start="00:00", end="00:00")
                    m.save()
                    request.user.userprofile.sundays.add(m)
                    request.user.userprofile.save()
                if request.POST.get("sundayOptions") == "Empty":
                    for sunday in request.user.userprofile.sundays.all():
                        sunday.delete()
            ##############################################################################
            ################### KONIEC DNI TYGODNIA ######################################
            ##############################################################################
            if request.POST.get("imie"):
                request.user.userprofile.imie = request.POST.get("imie")
                request.user.userprofile.save()
            if request.POST.get("nazwisko"):
                request.user.userprofile.nazwisko = request.POST.get("nazwisko")
                request.user.userprofile.save()
            if request.POST.get("wiek"):
                request.user.userprofile.wiek = request.POST.get("wiek")
                request.user.userprofile.save()
            try:
                request.FILES["profilePicture"]
                upload = request.FILES["profilePicture"]
                fss = FileSystemStorage()
                file = fss.save("main/img/profilePics/"+request.user.username+"."+upload.name.split(".")[1], upload)
                file_url = fss.url(file)
                request.user.userprofile.profilePicture = file_url
                request.user.userprofile.save()
            except Exception:
                        pass
        return redirect("/profile/"+request.user.username)
    return render(request, "main/editprofile.html", variables)

def viewFormula(request, wid):
    if GameFormula.objects.get(id=wid):
        return render(request, "main/gamewniosek.html", {"wniosek":GameFormula.objects.get(id=wid)})
    return redirect("/about")

def staffGameForms(request):
    if not request.user.is_staff:
        return redirect("/about")
    try:
        if len(GameFormula.objects.filter(status=gameStatus.statusTable[2])) > 0:
            return render(request, "main/staffgameforms.html", {"si":True, "obj":GameFormula.objects.filter(status=gameStatus.statusTable[2])})
        else:
            return render(request, "main/staffgameforms.html", {"si":False})
    except Exception:
            return render(request, "main/staffgameforms.html", {"si":False})

def viewStaffFormula(request, wid):
    gameTit = ""
    for game in Game.objects.all():
        gameTit+=";"+game.name
    if not request.user.is_staff:
        return redirect("/about")
    if GameFormula.objects.get(id=wid):
        formula = GameFormula.objects.get(id=wid)
        if request.method == "POST":
            if request.POST.get("accept"):
                try:
                    request.FILES["picture"]
                    upload = request.FILES["picture"]
                    fss = FileSystemStorage()
                    file = fss.save("main/img/gameIMG/"+formula.game.name+"."+upload.name.split(".")[1], upload)
                    file_url = fss.url(file)
                    formula.game.picture = file_url
                    formula.game.save()
                except Exception:
                    pass
                if request.POST.get("title"):
                    formula.game.name = request.POST.get("title")
                    formula.game.save()
                if request.POST.get("rs"):
                    formula.game.ranking = request.POST.get("rs")
                    formula.game.save()
                formula.game.confirmed = True
                formula.game.save()
                formula.status=gameStatus.statusTable[1]
                formula.save()
                return redirect(f"/wniosekfinal/1/{formula.id}")
            elif request.POST.get("skip"):
                return redirect("/staff/gameformulas")
            return redirect(f"/rejectionreason/{formula.id}")

        return render(request, "main/staffgamewniosek.html", {"gry": gameTit, "wniosek":GameFormula.objects.get(id=wid)})
    return redirect("/about")

def rejection(request, wid):
    if not request.user.is_staff:
        return redirect("/about")
    if request.method == "POST":
        formula = GameFormula.objects.get(id=wid)
        formula.why = request.POST.get("rr")
        formula.status=gameStatus.statusTable[0]
        formula.save()
        return redirect(f"/wniosekfinal/0/{formula.id}")
    return render(request, "main/rejectionreason.html", {})

def wniosekFinal(request, si, wid):
    if si:
        return render(request, "main/wniosekoa.html", {"ao":"zaakceptowany", "wniosek":GameFormula.objects.get(id=wid)})
    return render(request, "main/wniosekoa.html", {"ao":"odrzucony", "wniosek":GameFormula.objects.get(id=wid)})

def games(request):
    games = Game.objects.all().filter(confirmed=True).exclude(usergame__user__username=request.user.username)
    adminV = False
    userGames = Game.objects.all().filter(confirmed=True).filter(usergame__user__username=request.user.username)
    if request.method == "POST":
        if request.POST.get("edit") and request.user.is_staff:
            abc = request.POST.get("edit")
            return redirect(f"/staff/editgame/{abc}")
        if request.user.is_staff and request.POST.get("admin"):
            adminV = True
            return render(request, "main/games.html", {"games":games, "admin": adminV, "UserGames": userGames})
        if request.POST.get("dGame"):
            game = Game.objects.get(id=request.POST.get("dGame"))
            game.players.remove(request.user.userprofile)
            game.save()
            ug = UserGame.objects.filter(game=Game.objects.get(id=request.POST.get("dGame")), user=request.user)
            ug.delete()
        if request.POST.get("your"):
            games = None
            return render(request, "main/games.html", {"games":games, "admin": False, "UserGames": userGames})
        if request.POST.get("add"):
            game = request.POST.get("add")
            return redirect(f"/gametoyourlist/{game}")
        if request.POST.get("del"):
            if not request.user.is_staff:
                return redirect("/games")
            dg = Game.objects.get(id=request.POST.get("del"))
            dg.delete()
            adminV = True
            return render(request, "main/games.html", {"games":games, "admin": adminV, "UserGames": userGames})
        return redirect("/games")
    return render(request, "main/games.html", {"games":games, "admin": False, "UserGames": userGames})

def addYourGame(request, gid):
    u = request.user
    g = Game.objects.get(id=gid)
    ranks = g.ranking.split(";")
    if g.ranking == "Brak":
        ranks = False
    if request.method == "POST":
        if request.POST.get("back"):
            return redirect("/games")
        g.players.add(u.userprofile)
        g.save()
        ug = UserGame(user=u, game=g, rank=request.POST.get("rank"))
        ug.save()
        ranks = g.ranking.split(";")
        return redirect("/games")
    return render(request, "main/addYourgame.html", {"game":g, "ranks": ranks})

def friendRequests(request, pid):
    if request.user.id != pid:
        return redirect(f"friendrequests/{request.user.id}")
    if request.method == "POST":
        if request.POST.get("addFriend"):
            send=UserProfile.objects.get(id=request.POST.get("addFriend"))
            try:
                fl = request.user.friendslist
            except Exception:
                fl = FriendsList(owner=request.user)
                fl.save()
            try:
                flS = send.user.friendslist
            except Exception:
                flS = FriendsList(owner=send.user)
                flS.save()
            fl.friends.add(send)
            fl.save()
            flS.friends.add(request.user.userprofile)
            flS.save()
            fr = FriendRequest.objects.get(receiver=request.user, sender=send)
            fr.delete()
        if request.POST.get("delFriend"):
            send=UserProfile.objects.get(id=request.POST.get("delFriend"))
            fr = FriendRequest.objects.get(receiver=request.user, sender=send)
            fr.delete()
        if request.POST.get("cancelFriend"):
            rec=User.objects.get(id=request.POST.get("cancelFriend"))
            fr = FriendRequest.objects.get(receiver=rec, sender=request.user.userprofile)
            fr.delete()
        return redirect(f"/friendrequests/{request.user.id}")
    return render(request, "main/friendRequests.html", {"pending":FriendRequest.objects.filter(sender=request.user.userprofile), "requests":FriendRequest.objects.filter(receiver=request.user)})

def friends(request):
    si = True
    try:
        if len(request.user.friendslist.friends.all()) == 0:
            si = False
    except Exception:
        pass
    if request.POST.get("delFriend"):
        frI = FriendsList.objects.get(owner=request.user)
        frU = FriendsList.objects.get(owner=User.objects.get(id=request.POST.get("delFriend")))
        frI.friends.remove(User.objects.get(id=request.POST.get("delFriend")).userprofile)
        frI.save()
        frU.friends.remove(request.user.userprofile)
        frU.save()
        return redirect("/friends")
    return render(request, "main/friendList.html", {"si": si})

def SEGames(request, gid):
    gameTit = ""
    for game in Game.objects.all():
        gameTit+=";"+game.name
    selfTitle = Game.objects.get(id=gid).name
    game = Game.objects.get(id=gid)
    if request.method == "POST" and request.user.is_staff:
        if request.POST.get("accept"):
            try:
                request.FILES["picture"]
                upload = request.FILES["picture"]
                fss = FileSystemStorage()
                file = fss.save("main/img/gameIMG/"+game.name+"."+upload.name.split(".")[1], upload)
                file_url = fss.url(file)
                game.picture = file_url
                game.save()
            except Exception:
                pass
            game.name = request.POST.get("title")
            game.ranking = request.POST.get("rs")
            game.save()
        return redirect("/games")
    return render(request, "main/segames.html", {"self":selfTitle, "gry": gameTit, "game":game})

def findAFriend(request):
    minCommonTime = 29 # minimum common play time in a week in minuts
    sortedOppotiunities = {} # Players playing same games good times
    sortedReservedDict = {} # Players playing same games other games
    ytnyg = {} # YOUR TIME NOT YOUR GAME players playing in your time but not your games
    others = {} # others
    possible = UserProfile.objects.all()
    for profile in possible:
        if profile.user == request.user:# exclude self # exclude friends
            continue
        if request.user.friendslist: # exclude friends
            if request.user.friendslist.isFriendOf(profile.user):
                continue
        if FriendRequest.objects.filter(receiver=request.user, sender = profile) or FriendRequest.objects.filter(sender=request.user.userprofile, receiver = profile.user):
            continue
        commonGames = calculateCommonGames(profile.user, request.user) # Common games of checked users
        if commonGames > 0:
            playtime = calculateCommonTime(profile, request.user.userprofile) # Common playtime of checked users
            if playtime >= minCommonTime: 
                sortedOppotiunities[profile]=playtime+commonGames
            else:
                sortedReservedDict[profile]=playtime+commonGames
            print(playtime)
        else:
            playtime = calculateCommonTime(profile, request.user.userprofile) # Common playtime of checked users
            if playtime >= minCommonTime: 
                ytnyg[profile]=playtime
            else:
                others[profile]=playtime
    sortedOppotiunities = sorted(sortedOppotiunities.items(), key=lambda x: x[1], reverse=True)
    sortedOppotiunities = [k for k, v in sortedOppotiunities]
    sortedReservedDict = sorted(sortedReservedDict.items(), key=lambda x: x[1], reverse=True)
    sortedReservedDict = [k for k, v in sortedReservedDict]
    ytnyg = sorted(ytnyg.items(), key=lambda x: x[1], reverse=True)
    ytnyg = [k for k, v in ytnyg]
    others = sorted(others.items(), key=lambda x: x[1], reverse=True)
    others = [k for k, v in others]
    return render(request, "main/findafriend.html", {"others": others, "ytnyg":ytnyg,"possible":sortedOppotiunities, "reserved": sortedReservedDict})

def calculateCommonTime(user1, user2):
    time = 0
    timestamps1 = [user1.mondays.all(),user1.tuesdays.all(), user1.wedensdays.all(), user1.thursdays.all(), user1.fridays.all(), user1.saturdays.all(), user1.sundays.all()]
    timestamps2 = [user2.mondays.all(),user2.tuesdays.all(), user2.wedensdays.all(), user2.thursdays.all(), user2.fridays.all(), user2.saturdays.all(), user2.sundays.all()]
    for j in range(0, len(timestamps1)):
        for i in range(0, len(timestamps1[j])):
            for k in range(0, len(timestamps2[j])):
                time+=1
                if max(timestamps1[j][k].start, timestamps2[j][k].start) <= min(timestamps1[j][k].end, timestamps2[j][k].end):
                    intervalStart = min(timestamps1[j][k].start, timestamps2[j][k].start)
                    intervalStart = int(intervalStart[0:2])*60+int(intervalStart[3:])
                    intervalEnd = max(timestamps1[j][k].end, timestamps2[j][k].end)
                    intervalEnd = int(intervalEnd[0:2])*60+int(intervalEnd[3:])
                    time+=intervalEnd-intervalStart
                    time+=1
    return time

def calculateCommonGames(user1, user2):
    gameScore = 0
    games1 = UserGame.objects.filter(user=user1)
    games2 = UserGame.objects.filter(user=user2)
    for g1 in games1:
        for g2 in games2:
            if g1.game == g2.game:
                gameScore+=20
                if g1.rank == g2.rank:
                    gameScore+=200
    return gameScore
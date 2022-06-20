from django.urls import path
from . import views

urlpatterns = [
    path("", views.startpage, name="startpage"),
    path('about', views.home ,name="home"),
    path("login",views.loginUser, name="login"),
    path("register", views.register, name="register"),
    path("logout", views.logUserOut, name="logout"),
    path("games", views.games, name="games"),
    path("findafriend", views.findAFriend, name="findAFriend"),
    path("staff/editgame/<int:gid>", views.SEGames, name="StaffEditGames"),
    path("friends", views.friends, name="firends"),
    path("friendrequests/<int:pid>", views.friendRequests, name="frequest"),
    path("gametoyourlist/<int:gid>", views.addYourGame, name="YourGame"),
    path("changepassword", views.chpasswd, name="chpasswd"),
    path("rejectionreason/<int:wid>", views.rejection, name="rejestionReason"),
    path("addgame", views.addGame, name="addGame"),
    path("wniosekfinal/<int:si>/<int:wid>", views.wniosekFinal, name="wniosekFinal"),
    path("staff/gameformulas", views.staffGameForms, name="staffGameForms"),
    path("gameaddsuccess", views.gameAddSuccess, name="addGameSuccess"),
    path("gamelist", views.addedGamesList, name="gameList"),
    path("editprofile", views.editProfile, name="editProfile"),
    path("registrationcomplete", views.registrationComplete, name="registrationComplete"),
    path("profile/<str:nickname>", views.profilePage, name="profilePage"),
    path("formulas/<int:wid>", views.viewFormula, name="fromulaPage"),
    path("staff/formulas/<int:wid>", views.viewStaffFormula, name="staffFromulaPage"),
]

#urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
import {Socket} from "ng-socket-io";
import {Device} from "@ionic-native/device";
import {LoadingController, NavController, Platform} from "ionic-angular";
import {TapticEngine} from "@ionic-native/taptic-engine";
import {timer} from "rxjs/observable/timer";

export class Settings {

  constructor() {
  }


  static updateUser(user) {
    Settings.user = user;
  }

  static avatarFileNames = [];


  static categories = [{
    name: "Umfrage",
    type: "surveys",
    enabled: true,
  }, {
    name: "Schätzen",
    type: "guess",
    enabled: true,
  }, {
    name: "Quiz",
    type: "quiz",
    enabled: true,
  }
  ]

  static get selectedCategories() {
    return Settings.categories.filter((category) => {
      return category.enabled;
    })
  }


  static themes = [
    {
      name: "Bullshit",
      enabled: true
    },
    {
      name: "Informatik",
      enabled: true
    },
    {
      name: "Sport",
      enabled: true
    },
    {
      name: "Politik",
      enabled: false
    }
  ]

  static get selectedThemes() {
    return Settings.themes.filter((theme) => {
      return theme.enabled;
    })
  }


  static randomNames = [
    'Ronald Rum',
    'Angela Absinth',
    'Ricky la Fleur',
    'Lahey Liquor',
    'Brandy Randy',
    'Karl Kirschwasser',
    'Gisela Gin-Fizz',
    'Valerie Vodka',
    'Marta Mule',
    'Juicy Julian',
    'Boozy Bubbles',
    'Drunk Diana',
    'Longdrink Lucy',
    'Daiquiri Daniel',
    'Tequila Torsten',
    'Bier-git',
    'Nina Niemalsnüchtern',
    'Kahlua Kirsten',
    'Martini Martin',
    'Pils Petra',
    'Export Erwin',
    'Margarita Michel',
    'Carla Cognac',
    'Karl Korn',
    'Portwein Peter',
    'Naughty Norbert'
  ]


  static room = ''


  static initRandomUser(socket: Socket, device: Device) {


    if (Settings.avatarFileNames.length === 0) {
      socket.emit('requestAvatarList');
      socket.on('receiveAvatarList', (data) => {
        let avatarFileNames = data.avatarFileNames;
        if (avatarFileNames) {
          Settings.avatarFileNames = avatarFileNames;
          if (!Settings.user.avatar) this.setRandomAvatar();
          if (!Settings.user.name) this.setRandomName();
          socket.emit('setSocketUser', {user: Settings.user});
        }


      });
    }


  }

  static isListeningForUserChanges = false;

  static listenForUserChanges(socket: Socket) {
    if (!Settings.isListeningForUserChanges) {
      socket.on('updateUser', (data) => {
        console.log("update user settings")
        Settings.updateUser(data.user);
      })
    }
    Settings.isListeningForUserChanges = true;
  }


  static isListeningForReconnection = false;

  static listenForReconnection(socket: Socket, plt: Platform, loadingCtrl: LoadingController, navCtrl: NavController) {

    if (!Settings.isListeningForReconnection) {
      let waiting = loadingCtrl.create({
        content: 'Warte auf Antwort aus der Brauerei…'
      });

      // Cordova resume event
      plt.resume.subscribe(() => {
        console.log("Application resumed");
        socket.emit('reconnectRequest', {user: Settings.user, lastRoom: Settings.room});
        waiting.present();
      });

      socket.on('userReconnected', () => {
        console.log("User reconnected, nav to Lobby");
        waiting.dismiss();
        navCtrl.setRoot('JoinSessionPage');
      });

      socket.on('reconnectedToGame', (data) => {
        console.log("User reconnected to Game!");
        Settings.game = data.game;
        waiting.dismiss();
      });

      Settings.isListeningForReconnection = true;
    }

  }

  static isUserListSubscribed = false;

  static subscribeUserList(socket: Socket) {
    if (!Settings.isUserListSubscribed) {
      socket.on('receiveUserList', (data) => {
        console.log("update userList" + data.userList);
        Settings.game.players = data.userList;
      });
    }
    Settings.isUserListSubscribed = true;
  }


  static isListeningForGameUpdates = false;

  static listenForGameUpdates(socket: Socket) {

    //only listen if not subscribed
    if (!Settings.isListeningForGameUpdates) {
      socket.on('gameUpdate', (data) => {
        console.log("received game update:")
        Settings.game = data['game'];
        console.log(Settings.user.socketId, JSON.stringify(Settings.game.admin))
      })

    }
    Settings.isListeningForGameUpdates = true;
  }


  static isListeningForCard = false;
  static timeSinceNewCard = 0;

  static listenForCards(socket: Socket, taptic: TapticEngine) {

    if (!Settings.isListeningForCard) {
      socket.on('newCard', (data) => {
        taptic.impact({style: 'medium'});
        Settings.timeSinceNewCard = 0;

        console.log("received card: " + JSON.stringify(data['card']));
        Settings.waitForCardResponse = false;
        Settings.receivedCardResponse = false;

      })

      setInterval(() => {
        Settings.timeSinceNewCard += 100;
      }, 100);

      Settings.isListeningForCard = true;
    }
  }

  static isListeningForSurveyUpdates = false;

  static listenForSurveyUpdates(socket: Socket) {
    if (!Settings.isListeningForSurveyUpdates) {
      socket.on('surveyUpdate', (data) => {
        console.log("received survey update: " + JSON.stringify(data['survey']));
        Settings.game.currentCard = data['survey'];
      })
    }
    Settings.isListeningForSurveyUpdates = true;
  }


  static setRandomAvatar() {
    Settings.user.avatar = Settings.avatarFileNames[Math.floor(Math.random() * Settings.avatarFileNames.length)];
  }

  static setRandomName() {
    Settings.user.name = Settings.randomNames[Math.floor(Math.random() * Settings.randomNames.length)];
  }


  static isGameStarted = false;
  static waitForCardResponse = false;
  static receivedCardResponse = false;

  static game = {
    players: [],
    admin: {},
    categories: [],
    themes: [],
    cardsPerGame: 25,
    cardsPlayed: 0,
    currentCard: undefined,
    currentCategory: 'none',
    multiplier: 1,
    playerCount: ''
  }

  static user = {
    name: '',
    socketId: undefined,
    avatar: '',
    // for surveys etc where we have to wait for others to complete actions before continuing
    hasAnswered: false,
    sips: 0,
    multiplier: 1
  }


}



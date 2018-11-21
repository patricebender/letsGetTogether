import {Socket} from "ng-socket-io";
import {NavController} from "ionic-angular";
import {Device} from "@ionic-native/device";

export class Settings {

  constructor(private navCtrl: NavController) {
  }


  static updateUser(user) {
    Settings.user = user;
  }

  static avatarFileNames = [];


  static categories = [{
    name: "Umfrage",
    enabled: true
  }, {
    name: "Schätzen",
    enabled: true
  }, {
    name: "Aktionen",
    enabled: false
  },
    {
      name: "Flüche",
      enabled: false
    }, {
      name: "Duell",
      enabled: false
    }, {
      name: "Quicktime",
      enabled: false
    }, {
      name: "Quiz",
      enabled: false
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

  static isListeningForAdminPromotion = false;

  static subscribeToAdminPromotion(socket: Socket) {
    //only listen if not subscribed
    if (!Settings.isListeningForAdminPromotion) {
      socket.on('adminPromotion', () => {
        console.log("got promotod to admin!")
        Settings.user.isAdmin = true;
      })
    }
    Settings.isListeningForAdminPromotion = true;
  }


  static isListeningForGameUpdates = false;

  static listenForGameUpdates(socket: Socket) {

    //only listen if not subscribed
    if (!Settings.isListeningForGameUpdates) {
      socket.on('gameUpdate', (data) => {
        console.log("received game: " + JSON.stringify(data['game']))
        Settings.game = data['game'];
      })
    }
    Settings.isListeningForGameUpdates = true;
  }


  static isListeningForCard = false;
  static listenForCards(socket: Socket) {
    if(!Settings.isListeningForCard){
      socket.on('newCard', (data) => {
        console.log("received card: " + JSON.stringify(data['card']));
        Settings.game.currentCard = data['card'];
        Settings.game.currentCategory = data['card'].category;
        Settings.waitForCardResponse = false;
        Settings.receivedCardResponse = false;
      })
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
    multiplier: 1
  }

  static user = {
    name: '',
    socketId: undefined,
    isAdmin: false,
    avatar: '',
    // for surveys etc where we have to wait for others to complete actions before continuing
    hasAnswered: false,
    sips: 0,
    multiplier: 1
  }


}



import {Socket} from "ng-socket-io";
import {NavController} from "ionic-angular";
import {Device} from "@ionic-native/device";

export class Settings {

  constructor(private navCtrl: NavController) {
  }

  static user = {
    name: '',
    uuid: undefined,
    isAdmin: false,
    avatar: '',
    // for surveys etc where we have to wait for others to complete actions before continuing
    hasAnswered: false,
    sips: 0,
    multiplier: 1
  }

  static waitForCardResponse = false;


  static updateUser(user) {
    Settings.user = user;
  }

  static avatarFileNames = [];


  static categories = [{
    name: "Survey",
    enabled: true
  }, {
    name: "Action",
    enabled: false
  },
    {
      name: "Curse",
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
    },
    {
      name: "Outdoor",
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
      name: "Computer Science",
      enabled: true
    },
    {
      name: "Intimate",
      enabled: true
    },
    {
      name: "Sport",
      enabled: true
    },
    {
      name: "Politics",
      enabled: false
    }
  ]

  static get selectedThemes() {
    return Settings.themes.filter((theme) => {
      return theme.enabled;
    })
  }


  static randomNames = [
    'Peter Punsch',
    'Ronald Rum',
    'Angela Absinth',
    'Ricky la Fleur',
    'Lahey Liquor',
    'Randy Burgers',
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
    'Kahlua Kirsten'

  ]


  static room = ''


  static initRandomUser(socket: Socket, device: Device) {


    if (!Settings.user.uuid) {
      Settings.user.uuid = device.uuid;
    }

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
        console.log("received game: " + data['game'])
        Settings.game = data['game'];
      })
    }
    Settings.isListeningForGameUpdates = true;
  }

  static isListeningForSurveys = false;
  static listenForSurveys(socket: Socket) {
    if(!Settings.isListeningForSurveys) {
      socket.on('newSurvey', (data) => {
        console.log("received survey: " + JSON.stringify( data['survey']));

        Settings.waitForCardResponse = false;
        Settings.game.currentCard = data['survey'];
        Settings.game.currentCategory = 'survey';
      })
    }
    Settings.isListeningForSurveys = true;
  }

  static isListeningForSurveyUpdates = false;
  static listenForSurveyUpdates(socket: Socket) {
    if(!Settings.isListeningForSurveyUpdates) {
      socket.on('surveyUpdate', (data) => {
        console.log("received survey update: " + JSON.stringify( data['survey']));
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


}



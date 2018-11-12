import {Socket, SocketIoModule} from "ng-socket-io";

export class Settings {

  static user = {
    name: '',
    isAdmin: false,
    avatar: ''
  }

  static updateUser(user) {
    Settings.user = user;
  }

  static avatarFileNames = [];

  static game = {
    isGameStarted: false,
    otherUsers: []
  }

  static categories = [{
    name: "Survey",
    enabled: true
  },
    {
      name: "Curse",
      enabled: true
    }, {
      name: "Duell",
      enabled: true
    }, {
      name: "Quicktime",
      enabled: true
    }, {
      name: "Quiz",
      enabled: true
    },
    {
      name: "Outdoor",
      enabled: false
    }

  ]

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
    'Boozy Bubbles'
  ]


  static get selectedCategories() {
    return Settings.categories.filter((category) => {
      return category.enabled;
    })
  }


  static room = ''


  static initRandomUser(socket: Socket) {
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
        Settings.game.otherUsers = data.userList;
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

  static setRandomAvatar() {
    Settings.user.avatar = Settings.avatarFileNames[Math.floor(Math.random() * Settings.avatarFileNames.length)];
  }

  static setRandomName() {
    Settings.user.name = Settings.randomNames[Math.floor(Math.random() * Settings.randomNames.length)];

  }


}



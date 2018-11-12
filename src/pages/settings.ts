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
    return Settings.categories.filter((category)=> {
      return category.enabled;
    })
  }




  static room = ''

  static initRandomUser(socket: Socket) {
    if(!Settings.user.avatar) this.setRandomAvatar();
    if(!Settings.user.name) this.setRandomName();
    socket.emit('setSocketUser', {user: Settings.user});

  }

  static setRandomAvatar() {
      Settings.user.avatar = Settings.avatarFileNames[Math.floor(Math.random()*Settings.avatarFileNames.length)];
  }

  static setRandomName() {
    Settings.user.name = Settings.randomNames[Math.floor(Math.random()*Settings.randomNames.length)];

  }






}



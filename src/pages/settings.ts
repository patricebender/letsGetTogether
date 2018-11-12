export class Settings {

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

  static avatarFileNames = [];

  static get selectedCategories() {
    return Settings.categories.filter((category)=> {
      return category.enabled;
    })
  }

  static user = {
    name: '',
    isAdmin: false,
    avatar: ''
  }


  static room = ''


}

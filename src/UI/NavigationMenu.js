/**
 * Navigation Menu
 * Author: The Unite.cash Developers
 * License: GNU AGPL v3
 *
 * @file Implements a method of navigating the application.
 */

require('./../images/back_icon.svg')
require('./../images/unite_icon.svg')
require('./../images/newposts_icon.svg')
require('./../images/newusers_icon.svg')
require('./../images/feed_icon.svg')
require('./../images/profile_icon.svg')
require('./../images/popular_icon.svg')
require('./../images/compose_icon.svg')
require('./../images/settings_icon.svg')
require('./../images/upload_icon.svg')

export default class NavigationMenu {

  constructor (options) {
    if (typeof options === 'undefined') {
      options = {}
    }
    if (typeof options.pageTitle === 'undefined') {
      options.pageTitle = 'Untitled Page'
    }
    if (typeof options.pageIcon === 'undefined') {
      options.pageIcon = 'images/unite_icon.svg'
    }
    if (typeof options.leftButton === 'undefined') {
      options.leftButton = ''
    }
    if (typeof options.rightButton === 'undefined') {
      options.rightButton = ''
    }
    if (typeof options.showBackButton === 'undefined') {
      options.showBackButton = false
    }

    var navigationMenu = window.$('<div></div>')
    navigationMenu.attr('class', 'navigationMenu')

    var heading = window.$('<div></div>')
    heading.attr('class', 'navigationHeader')

    var headingIcon = window.$('<img></img>')
    headingIcon.attr('class', 'headingIcon')
    headingIcon.attr('src', options.pageIcon)
    headingIcon.attr('alt', options.pageTitle)
    headingIcon.attr('title', options.pageTitle)
    heading.append(headingIcon)

    var headingTitle = window.$('<h1></h1>')
    headingTitle.attr('class', 'headingTitle')
    headingTitle.text(options.pageTitle)
    heading.append(headingTitle)

    navigationMenu.append(heading)

    var leftButton = window.$('<div></div>')
    leftButton.attr('class', 'leftButton')
    // Add a back button on the left if appropriate
    if (options.showBackButton) {
      var backButton = new ImageButton({
        text: 'Back',
        image: 'images/back_icon.svg',
        onclick: () => {
          window.Utilities.goBack()
        }
      }).render()
      leftButton.append(backButton)
    }
    leftButton.append(options.leftButton)
    navigationMenu.append(leftButton)

    var rightButton = window.$('<div></div>')
    rightButton.attr('class', 'rightButton')
    rightButton.append(options.rightButton)
    navigationMenu.append(rightButton)

    var navigationLinks = window.$('<div></div>')
    navigationLinks.attr('class', 'navigationLinks')

    var newPostsLink = window.$('<a></a>')
    newPostsLink.attr('class', 'navigationLink')
    newPostsLink.attr('href', './newposts.html')
    var newPostsImage = window.$('<img></img>')
    newPostsImage.attr('src', './images/newposts_icon.svg')
    newPostsImage.attr('alt', 'New Posts')
    newPostsImage.attr('title', 'New Posts')
    newPostsLink.append(newPostsImage)
    var newPostsSpan = window.$('<span></span>')
    newPostsSpan.text('New Posts')
    newPostsLink.append(newPostsSpan)
    navigationLinks.append(newPostsLink)

    var newUsersLink = window.$('<a></a>')
    newUsersLink.attr('class', 'navigationLink')
    newUsersLink.attr('href', './newusers.html')
    var newUsersImage = window.$('<img></img>')
    newUsersImage.attr('src', './images/newusers_icon.svg')
    newUsersImage.attr('alt', 'New Users')
    newUsersImage.attr('title', 'New Users')
    newUsersLink.append(newUsersImage)
    var newUsersSpan = window.$('<span></span>')
    newUsersSpan.text('New Users')
    newUsersLink.append(newUsersSpan)
    navigationLinks.append(newUsersLink)

    var feedLink = window.$('<a></a>')
    feedLink.attr('class', 'navigationLink')
    feedLink.attr('href', './feed.html')
    var feedImage = window.$('<img></img>')
    feedImage.attr('src', './images/feed_icon.svg')
    feedImage.attr('alt', 'Feed')
    feedImage.attr('title', 'Feed')
    feedLink.append(feedImage)
    var feedSpan = window.$('<span></span>')
    feedSpan.text('Feed')
    feedLink.append(feedSpan)
    navigationLinks.append(feedLink)

    var popularLink = window.$('<a></a>')
    popularLink.attr('class', 'navigationLink')
    popularLink.attr('href', './popular.html')
    var popularImage = window.$('<img></img>')
    popularImage.attr('src', './images/popular_icon.svg')
    popularImage.attr('alt', 'Popular')
    popularImage.attr('title', 'Popular')
    popularLink.append(popularImage)
    var popularSpan = window.$('<span></span>')
    popularSpan.text('Popular')
    popularLink.append(popularSpan)
    navigationLinks.append(popularLink)

    var profileLink = window.$('<a></a>')
    profileLink.attr('class', 'navigationLink')
    profileLink.attr('href', './profile.html')
    var profileImage = window.$('<img></img>')
    profileImage.attr('src', './images/profile_icon.svg')
    profileImage.attr('alt', 'Profile')
    profileImage.attr('title', 'Profile')
    profileLink.append(profileImage)
    var profileSpan = window.$('<span></span>')
    profileSpan.text('Profile')
    profileLink.append(profileSpan)
    navigationLinks.append(profileLink)

    navigationMenu.append(navigationLinks)
    window.$('body').append(navigationMenu)

  }

}

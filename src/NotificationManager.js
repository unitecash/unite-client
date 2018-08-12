/**
 * Notification Manager
 * Author: The Unite.cash Developers
 * License: GNU AGPL v3
 *
 * Defines a class for displaying ntoifications and handling notification
 * permissions across platforms.
 *
 * @file Defines the NotificationManager cclass
 */

export default class NotificationManager {
  /*
   * @constructor
   *
   * Initializes the notification system, asking for permission on all platforms
   *
   */

  constructor () {
    // Acquire notification permissions
    if (Notification.permission == 'default' &&
        localStorage.notification == undefined) {
      localStorage.notification = 1
      new Popup().setTitle('ALLOW NOTIFICATIONS')
        .addText('Notifications let you know when your friends send you tips ')
        .addText('or replies')
        .show()
      Notification.requestPermission(function (permission) {
        Utilities.goBack()
        if (permission != 'granted') {
          new Popup().setTitle('NOTIFICATIONS')
            .addText('Unite will work without notifications, but you might ')
            .addText('miss out when things happen.')
            .show()
        } else {
          new SuccessBanner('We\'ll let you know when things happen!').show()
        }
      })
    }
  }
}

/**
 * Name Change Window
 * Author: The Unite.cash Developers
 * License: GNU AGPL v3
 *
 * @file Defines and displays the Name Change Window
 */

export default class NameChangeWindow {
  constructor () {
    if (window.$('#nameChangeWindow').length === 0) {
      var nameChangeWindow = window.$('<div></div>')
      nameChangeWindow.attr('id', 'nameChangeWindow')
      nameChangeWindow.attr('class', 'UIAlertWindow hidden')

      var nameChangeTitle = window.$('<h2></h2>')
      nameChangeTitle.text('CHANGE NAME')
      nameChangeWindow.append(nameChangeTitle)

      var nameChangeLabel = window.$('<p></p>')
      nameChangeLabel.text(`Your name is NOT the username that you use when you
        log into your account. Your name is what others see when you write
        posts, send tips, or leave replies. Unless you set it here, your name
        will show up as 6 random letters and numbers.`)
      nameChangeWindow.append(nameChangeLabel)

      var nameChangeForm = window.$('<form></form>')
      nameChangeForm.attr('id', 'nameChangeForm')

      var nameChangeField = window.$('<input></input>')
      nameChangeField.attr('type', 'text')
      nameChangeField.attr('id', 'newName')
      nameChangeField.attr('class', 'UITextField center w90')
      nameChangeField.attr('placeholder', 'New name...')
      nameChangeForm.append(nameChangeField)

      var nameChangeSubmit = window.$('<button></button>')
      nameChangeSubmit.attr('type', 'submit')
      nameChangeSubmit.attr('class', 'UIButton center w90')
      nameChangeSubmit.text('CHANGE NAME')
      nameChangeForm.append(nameChangeSubmit)

      nameChangeWindow.append(nameChangeForm)

      window.$(document).on('submit', '#nameChangeForm', (ev) => {
        ev.preventDefault()
        var newName = window.$('#newName').val()
        if (newName.length < 5 || name.length > 24) {
          new window.Popup({
            text: 'Your name should be between 5 and 24 characters.'
          }).show()
        } else {
          PostBuilder.build(
            '5504',
            newName,
            window.config.CENTRAL_PROFILE_ADDRESS,
            window.config.DUST_LIMIT_SIZE
          )
          window.$('#newName').val('')
          window.Utilities.closePopup()
          new SuccessBanner('Name changed! It should take effect in a few moments.').show()
        }
      })

      window.$('body').append(nameChangeWindow)
    }
    new InteractivePopup('#nameChangeWindow').show()
  }
}

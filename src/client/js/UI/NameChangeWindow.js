/**
 * Name Change Window
 * Author: The Unite.cash Developers
 * License: GNU AGPL v3
 *
 * @file Defines and displays the Name Change Window
 */

export default class NameChangeWindow {
  constructor () {
    if ($('#nameChangeWindow').length === 0) {
      var nameChangeWindow = $('<div></div>')
      nameChangeWindow.attr('id', 'nameChangeWindow')
      nameChangeWindow.attr('class', 'UIAlertWindow hidden')

      var nameChangeTitle = $('<h2></h2>')
      nameChangeTitle.text('CHANGE NAME')
      nameChangeWindow.append(nameChangeTitle)

      var nameChangeLabel = $('<p></p>')
      nameChangeLabel.text(`Your name is NOT the username that you use when you
        log into your account. Your name is what others see when you write
        posts, send tips, or leave replies. Unless you set it here, your name
        will show up as 6 random letters and numbers.`)
      nameChangeWindow.append(nameChangeLabel)

      var nameChangeForm = $('<form></form>')
      nameChangeForm.attr('id', 'nameChangeForm')

      var nameChangeField = $('<input></input>')
      nameChangeField.attr('type', 'text')
      nameChangeField.attr('id', 'newName')
      nameChangeField.attr('class', 'UITextField center w90')
      nameChangeField.attr('placeholder', 'New name...')
      nameChangeForm.append(nameChangeField)

      var nameChangeSubmit = $('<button></button>')
      nameChangeSubmit.attr('type', 'submit')
      nameChangeSubmit.attr('class', 'UIButton center w90')
      nameChangeSubmit.text('CHANGE NAME')
      nameChangeForm.append(nameChangeSubmit)

      nameChangeWindow.append(nameChangeForm)

      $(document).on('submit', '#nameChangeForm', (ev) => {
        console.log($(this))
        ev.preventDefault()
        var newName = $('#newName').val()
        if (newName.length < 5 || name.length > 24) {
          new Popup({
            text: 'Your name should be between 5 and 24 characters.'
          }).show()
        } else {
          PostBuilder.build(
            '5504',
            newName,
            config.CENTRAL_PROFILE_ADDRESS,
            config.DUST_LIMIT_SIZE
          )
          $('#newName').val('')
          Utilities.closePopup()
          new SuccessBanner('Name changed! It should take effect in a few moments.').show()
        }
      })

      $('body').append(nameChangeWindow)
    }
    new InteractivePopup('#nameChangeWindow').show()
  }
}

const path = require('path')

const options = {
  width: 800,
  height: 600,
  frame: true,
  transparent: false,
  icon: path.join(__dirname, '../../../public/images/icon.png'),
  autoHideMenuBar: true,
  backgroundColor: '#222233'
}

module.exports = options

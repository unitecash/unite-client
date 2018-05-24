import { expect } from 'chai'
import App from '../../src/js/core/App'

describe('App', () => {
  let app: any

  beforeEach(() => {
    app = new App()
  })

  it('should do something complexe', () => {
    const result = app.test()
    expect(result).to.be.a('string')
  })
})

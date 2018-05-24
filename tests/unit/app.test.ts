import { expect } from 'chai'
import App from '../../src/js/core/App'

const app = new App()

describe('App', () => {
  describe('#test', () => {
    const result = app.test()

    it('should be a string', () => {
      expect(result).to.be.a('string')
    })

    it('should return "test"', () => {
      expect(result).to.equal('test')
    })
  })
})

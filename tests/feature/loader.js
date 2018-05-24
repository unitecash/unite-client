import chai from 'chai'
import ChaiAsPromised from 'chai-as-promised'
import ChaiSpies from 'chai-spies'
import SinonChai from 'sinon-chai'

chai.use(ChaiAsPromised)
chai.use(ChaiSpies)
chai.use(SinonChai)

const requireAll = function (requireContext) {
  return requireContext.keys().forEach(requireContext)
}

requireAll(require.context('./', false, /\.test\.ts/))

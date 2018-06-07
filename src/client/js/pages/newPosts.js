window.pageInit = function () {
  TransactionManager.loadTransactionsByAddress(config.CENTRAL_CONTENT_ADDRESS)
}
window.onPostLoad = function (post) {
  post.render()
}

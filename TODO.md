# Unite Project TODO:

This list outlines some things that need to be done.

### Bugs and issues

- Fix inefficient and unneeded data stored about transactions in localStorage,
  (for example nLockTime, version, etc), possibly employing compression

### Short-term

- User.follow(address)
- User.unfollow(address)
- User.listFollowers()
- User.listFollowing()
- User.getNumFollowers()
- User.getNumFollowing()
- networkManager.getTotalTipped(post)
- Reporting of posts and content

### After the above, some things to consider

- get a code signing certificate
- setup, installation, uninstallation wizards
- Signed (potentially automated) updates from the developers
- Profile photos, taglines
- Post composition dialog box (finish CSS, markdown, inline photos/videos)
- Sanity checks for IPFS and AJAX data (size, no 1x100000-pixel images, etc)
- A propper way of handling multiple block explorers / websockets
- Persistant cross-session logins with short 6-digit PIN and localStorage
- Build system for native iOS, Android apps
- Watch towers for active push notifications relating to on-chain actions
- Name-to-address resolution with various schemes (first-come-first-serve,
  amount-backed * time, etc)
- Name "backing" in which users can vote on contentious names with their money
- Mentions/tagging by-name and by-address
- Trustless linking of Reddit, Discord, Twitter, YouTube accounts
- Portability tools allowing for people to move tweets/threads/comments
- Subreddit-mirroring allowing for people to contribute to the discussion
  occurring in a reddit thread, but their contribution is exclusively
  available on Unite

## Further down the road

- popular posts (popularity=numReplies*tips/age?)
- new users screen (encourage people to tip and interact with them)
- Integrate credit card payments (simplex.com)
- set up a faucet to on-board new users, donation system:
  whenever a user logs in (1 in 100 chance), if their balance is
  high enough they get a message asking for donations "1/10th of
  your balance could pay for 5754 new users to join!"
- Forums, markdown, blogging, threading, comments
- popularity ranking algorithms
- differing, customizable moderation styles and creator&viewer-specified comment
  viewership settings/thresholds
- encrypted messaging between BCH privkeys, group keys

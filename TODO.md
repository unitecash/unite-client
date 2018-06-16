# Unite Project TODO:

This list outlines some things that need to be done.

## Misc

- skeleton of the unite.cash homepage
- get a code signing certificate
- setup, installation, uninstallation wizards

## Short-term

- The User class
- User.follow(address)
- User.unfollow(address)
- User.listFollowers()
- User.listFollowing()
- User.getNumFollowers()
- User.getNumFollowing()
- networkManager.getTotalTipped(post)
- networkManager.getTotalTipped(User)
- Signed (potentially automated) updates from the developers
- Reporting of posts and content
- Post composition dialog box
- IPFS node integrations
- Define data structure for IPFS content
- IPFS node "client pin requests" to ensure content availability
- Profile photos, taglines
- Sanity checks for IPFS and AJAX data (size, no 1x100000-pixel images, etc)
- Persistant cross-session logins with short 6-digit PIN and localStorage
- Build system for native iOS, Android apps
- Watch towers for active push notifications relating to on-chain actions
- Name-to-address resolution with various schemes (first-come-first-serve,
  amount-backed * time, etc)
- Name "backing" in which users can vote on contentious names with their money
- Mentions/tagging by-name and by-address
- Trustless linking of Reddit, Discord, Twitter, YouTube accounts
- Portability tools allowing for people to move tweets
- Subreddit-mirroring allowing for people to contribute to the discussion
  occurring in a reddit thread, but their contribution is exclusively
  available on Unite

## Medium-term

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

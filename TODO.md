# Unite Project TODO:

This list outlines some things that need to be done.

### Bugs and issues

- Errors aren't being properly caught for failed WebSocket connections
- When uploading files to the Unite Endpoint, onerror is called
- Argument parsing in various places is extremely poor, use ES6 destructuring.

### Short-term

- ReactJS and JSX
- sass and better styling system
- Unit testing
- User.getBalance()
- User.follow(address)
- User.unfollow(address)
- User.listFollowers()
- User.listFollowing()
- User.getNumFollowers()
- User.getNumFollowing()
- Post.getTotalTipped()
- Rendering queues and correct ordering of posts over time
- Reporting of posts and content

### After the above, some things to consider

- get a code signing certificate
- setup, installation, uninstallation wizards
- Signed (potentially automated) updates from the developers
- Profile photos, taglines
- improve CompositionWindow (finish CSS, markdown, inline photos/video previews)
- Sanity checks for IPFS and AJAX data (size, no 1x100000-pixel images, etc)
- Better support for individual nuances of each block explorer/endpoint
- Persistent cross-session logins with short 6-digit PIN and localStorage
- Build system for native iOS, Android apps
- Watch towers for active push notifications relating to on-chain actions
- Name-to-address resolution with various schemes (first-come-first-serve,
  amount-backed * time, etc)
- Indexing and searching functionality on the endpoint with client querying
- Mentions/tagging by-name and by-address
- Trustless linking of Reddit, Discord, Twitter, YouTube accounts
- Portability tools allowing for people to move tweets/threads/comments
- Subreddit-mirroring allowing for people to contribute to the discussion
  occurring in a reddit thread, but their contribution is exclusively
  available on Unite.

## Further down the road

- popular posts (popularity=numReplies*tips/age?)
- new users screen (encourage people to tip and interact with them)
- Integrate credit card payments (simplex.com? coinbase?)
- set up a faucet to onboard new users, donation system:
  whenever a user logs in (1 in 100 chance), if their balance is
  high enough they get a message asking for donations "1/10th of
  your balance could pay for 5754 new users to join!"
- popularity ranking algorithms
- differing, customizable moderation styles and creator&viewer-specified comment
  viewership settings/thresholds
- encrypted messaging between BCH privkeys, groups, group keys

## Extended vision

At this stage, the protocol will be able to support the features needed to
create any number of compatible applications. Video viewers could be
developed allowing users to support their favorite content creators.
Blogging platforms could be launched allowing for censorship-resistant
publication.

A distributed document referencing system and domain naming
architecture could allow the decentralized web to flourish with no centralized
DNS authority and a competing market for effective domain-name resolution
solutions. Integrated BCH payments and the time-stamping capabilities of the
blockchain will allow original content creators to be rewarded with donations,
even in cases of piracy.

- Split the project into multiple apps: A video viewing platform, a blogging
  platform, a social network and a web browser. Allow competing implementations
  of the same protocol for each. Where possible, the four platforms are
  insentivized to be compatible.

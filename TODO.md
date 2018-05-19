# Unite Project TODO:

This list outlines some basic things that need to be completed.
This list is not complete. Most urgent things at the top.

## Short Term

- improve find_utxo as specified
- skeleton of the unite.cash homepage
- get a code signing certificate
- setup, installation, uninstallation wizards

## Medium Term

- tip/report UIs
- following/feed actions
- get_num_followers(addr)
- get_num_following(addr)
- get_tips(txid)
- updates and network management actions
- report action with own centralReportAddress
- reply action
- post composition dialog box
- extended posts (WebTorrent)
- images
- limits on how much data can be received by AJAX to stop spam
- limits to the files which can be received
- key stretching improvements?
- "Remember Me" with quicker login options, passcodes

## Long Term

- popular posts (popularity=numReplies*tips/age?)
- new users screen (encourage people to tip and interact with them)
- set up a faucet to onboard new users, donation system
 - funds from central addresses (posts, profile, reporting, group)
 - whenever a user logs in (1 in 100 chance), if their balance is
   high enough they get a message asking for donations "1/10th of
   your balance could pay for 5754 new users to join!"
 - centralized faucet service
- subreddits/forums/groups
 - centralGroupAddress
 - group creation
 - groups tab / UI
 - implement listing of groups from CentralGroupsAddress
 - group homepage UI
 - implement group name setting
 - group background-image, reddit-like custom CSS actions
 - add the ability to create threads in a group
 - add comments in threads
 - add comment replies, nested reply rendering with parent-child,...
 - tips and reporting (up-downvotes)
 - popularity ranking algorithms
 - moderation styles
- encrypted messaging between BCH privkeys
 - core simple feature
 - groups of encrypted messaging participants
 - anonymous messaging with ringsig
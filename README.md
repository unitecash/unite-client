# Unite.cash Client Implementation

The Unite protocol is a powerful, extensible, robust and censorship-resistant
social networking and content distribution system.

Unite-client is simply the first application to implement this protocol.
Unite-client relies on Bitcoin Cash and IPFS for attribution, content storage
and content delivery.

## Temporary Note

The project, protocol and repository are currently in the process of being
re-factored. Files will move around frequently, builds may fail and
dependencies may change often.

## Building and Running

You will need NodeJS and NPM in order to build the project.
The process should work on all operating systems that can run NPM.

Clone the repository to a directory on your computer. Then run the
commands below:

```
npm install
npm run build
```

You will find the compiled application in the dist directory. You may serve the
directory, or just open the ```index.html``` file in a web browser.
You may also run the electron desktop application with ```npm run start```.

## Contributing

Pull requests are much appreciated. Please see the [TODO.md](TODO) for a list
of what needs doing. Especially lacking are UX and graphic designers.

## Donations

Donations are gladly accepted to this Bitcoin Cash address:

```
bitcoincash:qra4cts50zs0spfuwk94yae5a57t073jps5hae847u
```

## License

As of May 18th, 2018, this software is licensed under the GNU AGPL 3.0. Prior
to that date, this software was licensed under the terms of the MIT license.
A copy of the MIT license is included for the purpose of fulfilling the
requirement that certain software (JQuery and older revisions of the code
as contained within this repository before May 18th, 2018) have a copy included.
As of May 18th, 2018, any code committed to this repository, and any code used
by the unite.cash project shall be licensed under the terms of the GNU AGPL 3.0
license. By incorporating code from this repository or any other unite.cash
repository or source into any application, you agree to make your source code
freely available to the public. The GNU AGPL 3.0 can be found  [https://www.gnu.org/licenses/agpl-3.0.en.html](here.)

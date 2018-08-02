# logging

The Unite client contains many complicated components, all of which produce
debug and error messages. In order to make it easier for developers to find and
fix problems, various categories are used when logging messages to the console.

For example, to log a message in the "net" category, this syntax can be used:

```javascript
const foo = 42, bar = "Orange"
log('net', 'Could not do thing:', foo, bar)
```

This would produce the following output to the console, assuming the log method
was called from within networkManager.doSomething:

```
networkManager.doSomething: Could not do thing: 42 Orange
```

## Control of logging categories

The advantage to this approach is that when debugging, developers can easily
enable and disable certain logging categories to avoid being overwhelmed.
For example, if a bug was preventing transactions from broadcasting, logging
for the "net" category can easily be enabled from Config.js.

## Adding new logging categories

Logging categories should be added on a per-feature basis. For example, it is not
necessary to add a category for every function, but when implementing something
like a video player, create a new category "video". Category names should generally
be as short as possible for ease of use.

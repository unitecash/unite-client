# Unite.cash Client Implementation

This is a fully open-source implementation of a Bitcoin Cash blockchain
social network. Keys never leave the client, and everything runs either
in-browser or in Electron.

## Protocol

Values are stored in OP_RETURN transactions on the BCH blockchain. Referenced
data is stored inside magnet URLs, accessible via WebTorrent or similar
software.

|  **Hex Value**  |  Description  |  Example |
|--------------------------------------------|
| ```0x5501```    |  Content      | ```TODO```|

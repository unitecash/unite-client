/**
 * IPFS Endpoint
 * Author: The Unite.cash Developers
 * License: GNU AGPL v3
 *
 * Provides a way of tracking the reliability, speed, latency and failure rate
 * of IPFS endpoing servers during content resolution
 *
 * @file Defines the IPFS Endpoint class.
 */

export default class IPFSEndpoint {
  constructor (URL) {
    this.URL = URL
    // TODO add the above options from the @file description and keep track of
    // the stats for this specific URL from localStorage. Same with
    // NetworkEndpoint.
  }
}

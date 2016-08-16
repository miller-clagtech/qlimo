/**
 * Serviceprovider model events
 */

'use strict';

import {EventEmitter} from 'events';
import Serviceprovider from './serviceprovider.model';
var ServiceproviderEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ServiceproviderEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Serviceprovider.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    ServiceproviderEvents.emit(event + ':' + doc._id, doc);
    ServiceproviderEvents.emit(event, doc);
  }
}

export default ServiceproviderEvents;

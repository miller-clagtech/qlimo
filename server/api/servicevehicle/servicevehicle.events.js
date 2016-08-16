/**
 * Servicevehicle model events
 */

'use strict';

import {EventEmitter} from 'events';
import Servicevehicle from './servicevehicle.model';
var ServicevehicleEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ServicevehicleEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Servicevehicle.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    ServicevehicleEvents.emit(event + ':' + doc._id, doc);
    ServicevehicleEvents.emit(event, doc);
  }
}

export default ServicevehicleEvents;

/**
 * Vehicles model events
 */

'use strict';

import {EventEmitter} from 'events';
import Vehicles from './vehicles.model';
var VehiclesEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
VehiclesEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Vehicles.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    VehiclesEvents.emit(event + ':' + doc._id, doc);
    VehiclesEvents.emit(event, doc);
  }
}

export default VehiclesEvents;

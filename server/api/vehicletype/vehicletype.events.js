/**
 * Vehicletype model events
 */

'use strict';

import {EventEmitter} from 'events';
import Vehicletype from './vehicletype.model';
var VehicletypeEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
VehicletypeEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Vehicletype.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    VehicletypeEvents.emit(event + ':' + doc._id, doc);
    VehicletypeEvents.emit(event, doc);
  }
}

export default VehicletypeEvents;

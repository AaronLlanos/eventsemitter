class EmitterSubscription {
  constructor (_events, cbRef, eventName) {
    this.isReleased = false
    this._events = _events
    this.cbRef = cbRef
    this.eventName = eventName
  }

  release() {
    const eventList = this._events[this.eventName]
    if(!this.isReleased && eventList) {
      for (let i = 0; i < eventList.length; i++) {
        let func = eventList[i]
        if (func === this.cbRef) {
          eventList.splice(i, 1)
          this.isReleased = true
          return
        }
      }
    } else {
      console.log('already released', this._events[this.eventName].length)
    }
  }
}

export default class Emitter {
  constructor() {
    this._events = Object.create(null)
  }
  subscribe(eventName, cb) {
    if (!(eventName instanceof String)) {
      throw new Error('eventName should be a string')
    }
    if (!(cb instanceof Function)) {
      throw new Error('callback should be a function')
    }
    if (this._events[eventName]) {
      this._events[eventName].push(cb)
    } else {
      this._events[eventName] = [cb]
    }
    return new EmitterSubscription(this._events, cb, eventName)
  }

  emit(eventName, ...restOfParams) {
    if (this._events[eventName]) {
      this._events[eventName].forEach(func => func(...restOfParams))
    }
  }

  releaseAll() {
    this._events = Object.create(null)
  }
}
class EmitterListener {
  constructor (_events, cbRef, eventName) {
    this.isReleased = false
    this._events = _events
    this.cbRef = cbRef
    this.eventName = eventName
  }

  release() {
    if(!this.isReleased) {
      const eventList = this._events[this.eventName]
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

class Emitter {
  constructor() {
    this._events = Object.create(null)
  }
  subscribe(eventName, cb) {
    if (this._events[eventName]) {
      this._events[eventName].push(cb)
    } else {
      this._events[eventName] = [cb]
    }
    return new EmitterListener(this._events, cb, eventName)
  }

  emit(eventName, ...restOfParams) {
    if (this._events[eventName]) {
      this._events[eventName].forEach(func => func(...restOfParams))
    }
  }
}
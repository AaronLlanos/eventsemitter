# Event Listener
## Getting Started
```js
import Emitter from 'event-listener'

const emitter = new Emitter()
// Subscribe to a new event
const listener = emitter.subscribe('event_name', callback)
emitter.emit('event_name')

// Remove event subscription
listener.release()

// Remove all event subscriptions
emitter.releaseAll()
```
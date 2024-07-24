import {
  SYSTEM_PROJECT_NAME
} from '@constants'

// TODO create listener stack & consolidate socket listener

export const registerSocketResponseHandler = (eventType, callback) => {
  const systemEvent = `system.${SYSTEM_PROJECT_NAME}`
  const handler = ({ type, payload }) => {
    if (
      eventType === type
      && payload.recipient === game.userId
    ) {
      callback(payload)
      // game.socket.off(systemEvent, handler)
    }
  }
  game.socket.on(systemEvent, handler)
}

import config from 'config'
import log4js from 'log4js'
import path from 'path'

const env = process.env.NODE_ENV || 'development'

let cfg = {
  appenders: {
    [config.logs.name]: {
      type : 'file',
      filename : path.join(config.logs.path, `${config.logs.name}.log`),
      maxLogSize : config.logs.maxLogSize,
      backups : 10,
      category : config.logs.name
    }
  },
  categories: {
    default: {
      appenders: [config.logs.name],
      level: config.logs.level
    }
  },
  replaceConsole: true
}

log4js.configure(cfg)

let logger = log4js.getLogger('app')
// logger.level = env === 'development' ? 'DEBUG' : 'ERROR'
logger.level = 'debug'

if (process.env.NODE_ENV === 'development') {
  logger = console
}

export default logger

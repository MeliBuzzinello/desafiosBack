import log4js from 'log4js;'

// trace 6
// debug 5
// info 4
// warn 3
// error 2
// fatal 1 

log4js.configure({
        appenders: {
            console: { type: 'console' },
            archivoWarning: { type: 'file', filename: 'warn.log' },
            archivoLogs: { type: 'file', filename: 'error.log' },
            loggerConsola: { type: 'logLevelFilter', appender: 'console', level: 'info' },
            loggerArchivoErrores: { type: 'logLevelFilter', appender: 'archivoWarning', level: 'warn' },
            loggerArchivoDebug: { type: 'logLevelFilter', appender: 'archivoLogs', level: 'error' }
        },
        categories: {
            default: {
                appenders: ['loggerConsola'], level: 'all'
            },
            prod: {
                appenders: ['loggerArchivoErrores', 'loggerArchivoDebug'], level: 'all'
            }
        }
    });
    
const logger = (process.env.NODE_ENV === 'PROD') ?
    log4js.getLogger('prod') : log4js.getLogger('default');


export default logger;
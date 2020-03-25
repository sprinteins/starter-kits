import { toDefault } from './util'

const host = toDefault(process.env.DEV_SERVER_HOST, "localhost")
const port = parseInt(toDefault(process.env.DEV_SERVER_PORT, "9000"))

export const baseUrl = `http://${host}:${port}`

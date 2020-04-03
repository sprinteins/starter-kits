import { Browser, Chrome } from './browser'

// let browser: Browser;

export async function startBrowser(slowMo: number = 0): Promise<Browser> {
    // if (!browser) {

    // }
    const puppeteerUrl = process.env.PUPPETEER_URL as string
    const nodeEnv = process.env.NODE_ENV;
    const isHeadless = nodeEnv === 'CI';

    const browser = await Chrome.New(isHeadless, puppeteerUrl, slowMo)
    registerNodeHooks(browser)
    return browser
}


function registerNodeHooks(b: Browser) {

    // do something when app is closing
    process.on('exit', () => b.closeAllPages());

    // catches ctrl+c event
    process.on('SIGINT', () => b.closeAllPages());

    // catches "kill pid" (for example: nodemon restart)
    process.on('SIGUSR1', () => b.closeAllPages());
    process.on('SIGUSR2', () => b.closeAllPages());
}

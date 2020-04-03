import * as puppeteer from 'puppeteer'
import fetch from 'node-fetch'
import * as url from 'url'

export class Chrome {
    private browser: puppeteer.Browser
    private page: puppeteer.Page
    private slowMo: number

    /**
     * 
     * A factory function used because the creation of a browser is async
     * and constructors cannot be async.
     * 
     */
    public static async New(
        isHeadless: boolean = true,
        puppeteerUrl: string,
        slowMo: number = 0,
    ): Promise<Chrome> {
        const ch = new Chrome()
        ch.slowMo = slowMo

        if (!puppeteerUrl) {
            ch.browser = await ch.launch(isHeadless)
        } else {
            ch.browser = await ch.connect(puppeteerUrl)
        }

        ch.page = await ch.browser.newPage();

        return ch
    }

    private async launch(isHeadless: boolean): Promise<puppeteer.Browser> {
        const browser = await puppeteer.launch({
            headless: isHeadless,
            slowMo: this.slowMo,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        return browser
    }

    /**
     * 
     * `puppeteer.connect` has the option (`browserURL`) just to give it an url
     * and it can fetch the websocket itself.
     * The problem is that websocket's host is 127.0.0.1 (localhost)
     * but when we use `connect`, the tests are running a container
     * and we have to replace it with `host.docker.internal`
     * So we fetch the websocket ourself.
     * 
     */
    private async connect(puppeteerUrl: string): Promise<puppeteer.Browser> {

        const browserWSEndpoint = await this.fetchBrowserWSEndpoint(puppeteerUrl)
        const browser = await puppeteer.connect(
            {
                browserWSEndpoint,
                slowMo: this.slowMo,
            },
        );

        return browser
    }


    private async fetchBrowserWSEndpoint(puppeteerUrl: string) {
        const pu = new url.URL(puppeteerUrl)
        const port = pu.port
        const headerHost = `127.0.0.1:${port}`

        pu.pathname = "/json/version"

        const resp = await fetch(pu.href, {
            headers: {
                'Content-Type': 'application/json',
                'Host': headerHost,
            },
        })
        const result = await resp.json()
        const wsURL = result.webSocketDebuggerUrl
        const dockerizedURL = wsURL.replace(/127.0.0.1/g, 'host.docker.internal')

        return dockerizedURL
    }


    public async sleep(ms: number): Promise<void> {
        return this.page.waitFor(ms)
    }

    // we cannot simply return, because `goto` returns something
    // and we want void
    public async open(url: string): Promise<void> {
        await this.page.goto(url)

    }

    public async close(): Promise<void> {
        return this.browser.close()
    }

    public async closeAllPages(): Promise<void> {
        const pages = await this.browser.pages()
        await Promise.all(pages.map(page => page.close()))
    }

    public async closePage(): Promise<void> {
        return this.page.close()
    }

    public async click(selector: string): Promise<void> {
        await this.waitFor(selector)
        return this.page.click(selector)
    }

    public async fetchText(selector: string): Promise<string> {
        await this.waitFor(selector)
        const textNode = await this.page.$(selector)
        const text = await this.page.evaluate((textNode) => textNode.innerText, textNode);

        return text
    }

    // we cannot simply return, because `waitFor` returns something
    // and we want void
    private async waitFor(selector: string): Promise<void> {
        await this.page.waitFor(selector)
    }
}
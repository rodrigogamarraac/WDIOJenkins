const chromeArgs = [
    '--disable-infobars',
    '--disable-extensions',
    '--disable-blink-features=AutomationControlled',
    '--window-size=1440,900'
]

if (process.env.HEADLESS === 'true') chromeArgs.push('--headless=new')

const browserCapabilities = {
    chrome: {
        browserName: 'chrome',
        'goog:chromeOptions': { args: chromeArgs }
    },
    edge: {
        browserName: 'MicrosoftEdge',
        'ms:edgeOptions': { args: chromeArgs }
    }
}

const selectedBrowser = (process.env.BROWSER || 'chrome').toLowerCase()
const capabilities = selectedBrowser === 'all'
    ? [browserCapabilities.chrome, browserCapabilities.edge]
    : [browserCapabilities[selectedBrowser] || browserCapabilities.chrome]

exports.config = {
    runner: 'local',
    specs: ['./features/**/*.feature'],
    maxInstances: 1,
    capabilities,
    logLevel: process.env.WDIO_LOG_LEVEL || 'warn',
    bail: 0,
    baseUrl: 'https://biblioteca-qa.pages.dev',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 2,
    services: [],
    framework: 'cucumber',
    reporters: [
        'spec',
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false,
            useCucumberStepReporter: true,
            addConsoleLogs: true
        }]
    ],
    cucumberOpts: {
        require: ['./features/step_definitions/**/*.js'],
        backtrace: false,
        dryRun: false,
        failFast: false,
        snippets: true,
        source: true,
        strict: true,
        tags: process.env.TAGS || '',
        timeout: 60000,
        ignoreUndefinedDefinitions: false
    },
    beforeScenario: async function () {
        await browser.url('/login')

        await browser.execute(() => {
            window.localStorage.clear()
            window.sessionStorage.clear()
        })

        await browser.deleteAllCookies()
        await browser.refresh()
    },
    /*afterScenario: async function (world, result) {
        if (!result.passed) await browser.takeScreenshot()
    },*/
    afterStep: async function () {
        await browser.takeScreenshot()
    },
}

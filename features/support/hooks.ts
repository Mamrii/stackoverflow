import { Before, After, Status } from "@cucumber/cucumber";
import { chromium } from "@playwright/test";
import { CustomWorld } from "./world";
import { setDefaultTimeout } from "@cucumber/cucumber";

setDefaultTimeout(60000); // 60 secondes

Before(async function (this: CustomWorld) {
    this.browser = await chromium.launch({
        headless: process.env.CI ? true : false
    });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
});

After(async function (this: CustomWorld, scenario) {

    if (scenario.result?.status === Status.FAILED) {

        const screenshot = await this.page.screenshot({
            path: `reports/screenshots/${scenario.pickle.name}.png`,
            fullPage: true
        });

        await this.attach(screenshot, "image/png");
    }

    if (this.browser) {
        await this.page?.close();
        await this.context?.close();
        await this.browser?.close();
    }
});
import { Before, After } from "@cucumber/cucumber";
import { chromium } from "@playwright/test";
import { CustomWorld } from "./world";

Before(async function (this: CustomWorld) {
    this.browser = await chromium.launch({
        headless: process.env.CI ? true : false
    });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
});

After(async function (this: CustomWorld) {

    if (this.browser) {
        await this.browser.close();
    }
});
import { setWorldConstructor, World } from "@cucumber/cucumber";
import { APIResponse, Browser, BrowserContext, Page } from "@playwright/test";

export class CustomWorld extends World {
    browser!: Browser;
    context!: BrowserContext;
    page!: Page;

    endpoint!: string;
    response!: APIResponse;

    apiTitle!: string;
    uiTitle!: string;
}

setWorldConstructor(CustomWorld);
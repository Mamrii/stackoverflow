import { Page, Locator } from "@playwright/test";
import { Config } from "../support/config";

export class StackOverflowPage {

    // ===== LOCATORS =====
    private firstQuestionTitle: Locator;

    constructor(private page: Page) {

        this.firstQuestionTitle = this.page.locator("(//div[contains(@class,'s-post-summary--content')]//span[@itemprop='name'])[1]");
    }

    // ===== ACTIONS =====

    async openNewestQuestions() {
        await this.page.goto(`${Config.ui.baseUrl}/questions?tab=Newest`);
    }

    async getFirstQuestionTitle(): Promise<string> {

    const firstTitle = this.firstQuestionTitle;
    await firstTitle.waitFor({
        state: "visible",
        timeout: 30000
    });

    const title = await firstTitle.innerText();

    return title.trim();
}
}
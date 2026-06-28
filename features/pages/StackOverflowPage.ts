import { Page, Locator } from "@playwright/test";
import { Config } from "../support/config";

export class StackOverflowPage {

    // ===== LOCATORS =====
    private firstQuestionTitle: Locator;

    constructor(private page: Page) {

        this.firstQuestionTitle = this.page.locator(
            "#questions .s-post-summary h3 a"
        );
    }

    // ===== ACTIONS =====

    async openNewestQuestions() {
        await this.page.goto(`${Config.ui.baseUrl}/questions?tab=Newest`);
    }

    async getFirstQuestionTitle(): Promise<string> {
        const title = await this.firstQuestionTitle.first().innerText();
        return title.trim();
    }
}
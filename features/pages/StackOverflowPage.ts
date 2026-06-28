import { Page } from "@playwright/test";
import { Config } from "../support/config";


export class StackOverflowPage {

    constructor(private page: Page) {}

    async openNewestQuestions() {
    await this.page.goto(`${Config.ui.baseUrl}/questions?tab=Newest`);    
    }

    async getFirstQuestionTitle(): Promise<string> {
        const title = await this.page
            .locator("#questions .s-post-summary h3 a")
            .first()
            .innerText();

        return title.trim();
    }
}
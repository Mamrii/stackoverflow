import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/world";
import { StackOverflowPage } from "../pages/StackOverflowPage";


When("A_IHM_ j'ouvre la page des dernières questions StackOverflow", async function (this: CustomWorld) {

    const page = new StackOverflowPage(this.page);
    
    await page.openNewestQuestions();

});

When("A_IHM_ je récupère le premier titre affiché", async function (this: CustomWorld) {

    const page = new StackOverflowPage(this.page);
    console.log(await this.page.title());
    console.log(this.page.url());
    
    this.uiTitle = await page.getFirstQuestionTitle();

    console.log("Titre IHM :", this.uiTitle);

});

Then("C_IHM_ les deux titres doivent être identiques", async function (this: CustomWorld) {

    expect(this.uiTitle).toBe(this.apiTitle);

});
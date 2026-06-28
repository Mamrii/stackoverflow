import { Given, When, Then, DataTable } from "@cucumber/cucumber";
import { expect, request } from "@playwright/test";
import { CustomWorld } from "../support/world";
import { Config } from "../support/config";

Given("A_API_ j'appelle le endpoint {string}",
  async function (this: CustomWorld, endpoint: string) {
    this.endpoint = endpoint;
  }
);

Given("A_API_ avec les paramètres suivants",
  async function (this: CustomWorld, table: DataTable) {

    const apiContext = await request.newContext();

    const params = table.rowsHash();

    const url = `${Config.api.baseUrl}${this.endpoint}`;

    console.log("URL :", url);
    console.log("Query Params :", params);

    this.response = await apiContext.get(url, {
      params
    });

  }
);

Given("C_API_ la réponse HTTP est {string}",
  async function (this: CustomWorld, expectedStatus: string) {

    const actualStatus = this.response.status();

    console.log("Status HTTP :", actualStatus);

    expect(actualStatus).toBe(Number(expectedStatus));
  }
);


Given("A_API_ je récupère le premier titre de la réponse", async function (this: CustomWorld) {

    const json = await this.response.json();

    this.apiTitle = json.items[0].title;

    console.log("Titre API :", this.apiTitle);

});


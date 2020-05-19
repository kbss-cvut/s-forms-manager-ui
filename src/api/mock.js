import MockAdapter from "axios-mock-adapter";

export default function useMock(axios: AxiosInstance): void {

    const mock = new MockAdapter(axios, {delayResponse: 500});

    mock.onGet("/api/data.json").reply(200, require("./mockData"));

}

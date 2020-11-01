import MockAdapter from "axios-mock-adapter";
import {AxiosInstance} from "axios";

export default function useMock(axios: AxiosInstance): void {

    const mock = new MockAdapter(axios, {delayResponse: 500});

    mock.onGet("/api/data.json").reply(200, require("../__mocks__/mock_data_jargon.json"));

}

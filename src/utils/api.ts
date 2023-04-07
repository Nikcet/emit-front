import { localUrl } from './config';

interface IApiResponse {
    __v: number,
    _id: string,
    firstCommand: string,
    secondCommand: string,
    firstCommandScore: number,
    secondCommandScore: number,
    isPaused: boolean,
    isRunning: boolean,
    minutes: number,
    seconds: number,
    period: number,
}

interface IApiRequest {
    firstCommand: string,
    secondCommand: string,
    firstCommandScore: number,
    secondCommandScore: number,
    isPaused: boolean,
    isRunning: boolean,
    minutes: number,
    seconds: number,
    period: number
}

interface IApiHeaders {
    [key: string]: string;
}

class Api {
    private _url: string;
    private _headers: IApiHeaders;
    private _credentials: RequestCredentials;

    constructor({ url, headers, credentials }: { url: string, headers: IApiHeaders, credentials: RequestCredentials }) {
        this._url = url;
        this._headers = headers;
        this._credentials = credentials;
    }

    onResponse(res: Response): Promise<IApiResponse> {
        return res.json();
    }

    // Получает все матчи
    getMatches(): Promise<IApiResponse> {
        return fetch(`${this._url}/results`, {
            headers: this._headers,
            credentials: this._credentials,
        })
            .then(this.onResponse)
    }

    getMatch(): Promise<IApiResponse> {
        return fetch(`${this._url}`, {
            headers: this._headers,
            credentials: this._credentials,
        })
            .then(this.onResponse)
    }

    postMatch({
        firstCommand,
        secondCommand,
        isRunning,
        isPaused,
        period,
        seconds,
        minutes,
        firstCommandScore,
        secondCommandScore,
    }: IApiRequest): Promise<IApiResponse> {
        return fetch(`${this._url}/create`, {
            method: 'POST',
            headers: this._headers,
            credentials: this._credentials,
        })
            .then(this.onResponse)
    }

    updateMatch({
        firstCommand,
        secondCommand,
        isRunning,
        isPaused,
        period,
        seconds,
        minutes,
        firstCommandScore,
        secondCommandScore,
    }: IApiRequest): Promise<IApiResponse> {
        return fetch(`${this._url}/create`, {
            method: 'PATCH',
            headers: this._headers,
            credentials: this._credentials,
        })
            .then(this.onResponse)
    }
}

const api = new Api({
    url: localUrl,
    credentials: 'omit',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;

import { APIGatewayProxyResult } from "aws-lambda";
import fetch from "node-fetch";

export const resasApiClient = async (
  pathAndQueryString: string
): Promise<APIGatewayProxyResult> => {
  const endpoint = "https://opendata.resas-portal.go.jp";

  const res = await fetch(endpoint + pathAndQueryString, {
    headers: { "X-API-KEY": process.env.RESAS_API_KEY },
  });

  if (!res.ok) {
    console.error(res);
    throw new Error(`${res.status}: ${res.statusText}`);
  } else {
    const json = await res.json();

    // RESASの4xxエラーは、レスポンスヘッダーのステータスコードでは判断できない (レスポンスヘッダーのステータスコードは`200 OK`で返ってくるため)
    // see: https://opendata.resas-portal.go.jp/docs/api/v1/detail/index.html
    const clientErrorResult = handleClientErrors(json);
    if (clientErrorResult !== null) {
      return clientErrorResult;
    }

    return {
      statusCode: 200,
      body: JSON.stringify(json),
    };
  }
};

function handleClientErrors(responseBody): APIGatewayProxyResult | null {
  if (responseBody === "400") {
    return {
      statusCode: 400,
      body: "Bad Request",
    };
  }
  if (responseBody === "404") {
    return {
      statusCode: 404,
      body: "Not Found",
    };
  }
  if (responseBody.statusCode) {
    const { statusCode, message } = responseBody;

    return {
      statusCode: Number(statusCode),
      body: message,
    };
  }

  return null;
}

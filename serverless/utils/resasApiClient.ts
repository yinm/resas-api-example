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

    return {
      statusCode: 200,
      body: JSON.stringify(json),
    };
  }
};

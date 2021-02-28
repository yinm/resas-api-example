import { APIGatewayProxyHandler } from "aws-lambda";
import { resasApiClient } from "./utils/resasApiClient";

export const handler: APIGatewayProxyHandler = async () => {
  try {
    const proxyResult = await resasApiClient("/api/v1/prefectures");
    return proxyResult;
  } catch (e) {
    console.error(e);
  }
};

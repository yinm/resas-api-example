import { APIGatewayProxyHandler } from "aws-lambda";
import { resasApiClient } from "./utils/resasApiClient";

export const handler: APIGatewayProxyHandler = async ({
  queryStringParameters,
}) => {
  try {
    const proxyResult = await resasApiClient(
      `/api/v1/population/composition/perYear?prefCode=${queryStringParameters.prefCode}`
    );
    return proxyResult;
  } catch (e) {
    console.error(e);
  }
};

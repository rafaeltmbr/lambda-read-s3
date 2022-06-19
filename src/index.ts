import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getTextFileFromGetObjectCommand } from "./util/getTextFileFromGetObjectCommand";

const handler: APIGatewayProxyHandlerV2 = async (evt) => {
  try {
    const client = new S3Client({ region: "us-east-1" });

    const response = await client.send(
      new GetObjectCommand({
        Bucket: "rafaeltmbr-read-s3",
        Key: evt.rawPath.slice(1),
      })
    );

    return {
      statusCode: 200,
      body:
        JSON.stringify({
          response: await getTextFileFromGetObjectCommand(response.Body),
        }) + "\n",
    };
  } catch (err) {
    return {
      statusCode: 400,
      body:
        JSON.stringify({
          error: err instanceof Error ? err.message : String(err),
        }) + "\n",
    };
  }
};

exports.handler = handler;

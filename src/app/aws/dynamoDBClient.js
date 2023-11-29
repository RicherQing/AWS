import { DynamoDBClient, ListTablesCommand } from "@aws-sdk/client-dynamodb";
(async function () {
  const dbclient = new DynamoDBClient({ region: "us-east-1" });

  try {
    const results = await dbclient.send(new ListTablesCommand());
    results.Tables.forEach(function (item, index) {
      console.log(item.Name);
    });
  } catch (err) {
    console.error(err);
  }
})();


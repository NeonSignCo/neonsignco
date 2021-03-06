import { captureOrder } from "../../../../server/handlers/order";
import nc from "next-connect";
import dbConnection from "../../../../server/middleware/dbConnection";
import ncConfig from "../../../../server/utils/ncConfig";

const handler = nc(ncConfig).use(dbConnection).post(captureOrder);

export default handler;

import { onRequest } from "firebase-functions/v1/https";

export type HttpsHandlerType = Parameters<typeof onRequest>[0];

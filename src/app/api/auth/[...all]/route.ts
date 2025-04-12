import { toNextJsHandler } from "better-auth/next-js";
import { authService } from "~/services";

export const { POST, GET } = toNextJsHandler(authService);

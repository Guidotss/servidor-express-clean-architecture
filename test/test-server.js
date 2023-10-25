"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testServer = void 0;
const server_1 = require("../src/presentation/server");
const envs_1 = require("../src/config/envs");
const routes_1 = require("../src/presentation/routes");
exports.testServer = new server_1.Server({
    port: envs_1.envs.PORT,
    routes: routes_1.AppRoutes.routes,
});

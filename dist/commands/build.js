"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildProject = void 0;
const run_1 = require("./run");
const buildProject = async () => {
    return (0, run_1.runCommand)('npm run build');
};
exports.buildProject = buildProject;

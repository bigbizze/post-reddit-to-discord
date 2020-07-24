"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const node_fetch_1 = __importDefault(require("node-fetch"));
function get_type_from_json(value) {
    return JSON.parse(value);
}
function get_webhook_info(webhook_url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield node_fetch_1.default(webhook_url, {
                method: "GET"
            });
            if (res.status === 200) {
                console.log();
                const json_string = (yield res.buffer()).toString("utf-8");
                return get_type_from_json(json_string);
            }
        }
        catch (e) {
            console.log(e);
            return;
        }
    });
}
function get_webhook(webhook_url) {
    return __awaiter(this, void 0, void 0, function* () {
        const webhook_info = yield get_webhook_info(webhook_url);
        if (webhook_info == null) {
            return;
        }
        return new discord_js_1.WebhookClient(webhook_info.id, webhook_info.token);
    });
}
exports.default = get_webhook;

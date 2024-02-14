import type { TelepresenceAdapter, OnlineAgent, PerspectiveExpression, TelepresenceSignalCallback, HolochainLanguageDelegate, LanguageContext } from "https://esm.sh/@perspect3vism/ad4m@0.5.0";;
import { DNA_NICK, ZOME_NAME } from "./build/dna.js";

export class TelepresenceAdapterImplementation implements TelepresenceAdapter {
    hcDna: HolochainLanguageDelegate;
    signalCallbacks: TelepresenceSignalCallback[] = [];

    constructor(context: LanguageContext) {
        this.hcDna = context.Holochain as HolochainLanguageDelegate;
    }

    async setOnlineStatus(status: PerspectiveExpression): Promise<void> {
        await this.hcDna.call(DNA_NICK, ZOME_NAME, "set_online_status", status);
    }

    async getOnlineAgents(): Promise<OnlineAgent[]> {
        return []
    }

    async sendSignal(remoteAgentDid: string, payload: PerspectiveExpression): Promise<object> {
        return {};
    }

    async sendBroadcast(payload: PerspectiveExpression): Promise<object> {
        return {};
    }

    async registerSignalCallback(callback: TelepresenceSignalCallback): Promise<void> {
        this.signalCallbacks.push(callback);
    }
}
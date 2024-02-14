import { LinkSyncAdapter, PerspectiveDiffObserver, HolochainLanguageDelegate, LanguageContext, PerspectiveDiff, 
  LinkExpression, DID, Perspective, PerspectiveState } from "https://esm.sh/@perspect3vism/ad4m@0.5.0";
import type { SyncStateChangeObserver } from "https://esm.sh/@perspect3vism/ad4m@0.5.0";
import { Mutex, withTimeout } from "https://esm.sh/async-mutex@0.4.0";
import { DNA_NICK, ZOME_NAME } from "./build/dna.js";

class PeerInfo {
  //@ts-ignore
  currentRevision: Buffer;
  //@ts-ignore
  lastSeen: Date;
};

export class LinkAdapter implements LinkSyncAdapter {
  hcDna: HolochainLanguageDelegate;
  linkCallback?: PerspectiveDiffObserver
  syncStateChangeCallback?: SyncStateChangeObserver
  peers: Map<DID, PeerInfo> = new Map();
  generalMutex: Mutex = withTimeout(new Mutex(), 10000, new Error('PerspectiveDiffSync: generalMutex timeout'));
  me: DID
  gossipLogCount: number = 0;
  myCurrentRevision: Buffer | null = null;

  constructor(context: LanguageContext) {
    //@ts-ignore
    this.hcDna = context.Holochain as HolochainLanguageDelegate;
    this.me = context.agent.did;
  }

  writable(): boolean {
    return true;
  }

  public(): boolean {
    return false;
  }

  async others(): Promise<DID[]> {
    //@ts-ignore
    let others = await this.hcDna.call(DNA_NICK, ZOME_NAME, "get_others", null);
    return others as DID[];
  }

  async currentRevision(): Promise<string> {
    return ""
  }

  async sync(): Promise<PerspectiveDiff> {
    return new PerspectiveDiff()
  }

  async gossip() {}

  async render(): Promise<Perspective> {
    return new Perspective();
  }

  async commit(diff: PerspectiveDiff): Promise<string> {
    return ""
  }

  addCallback(callback: PerspectiveDiffObserver): number {
    this.linkCallback = callback;
    return 1;
  }

  addSyncStateChangeCallback(callback: SyncStateChangeObserver): number {
    this.syncStateChangeCallback = callback;
    return 1;
  }

  async handleHolochainSignal(signal: any): Promise<void> {}

  async addActiveAgentLink(hcDna: HolochainLanguageDelegate): Promise<any> {}
}
/**
 * StorageClient stub — kept for config.ts compatibility.
 * Image uploads are now handled natively via ExternalBlob.
 */
export class StorageClient {
  private readonly _url: string;

  constructor(
    storageGatewayUrl: string,
    _backendCanisterId: string,
    _projectId: string,
    _agent: unknown,
    _extra?: unknown,
  ) {
    this._url = storageGatewayUrl;
  }

  async putFile(
    _bytes: Uint8Array,
    _onProgress?: (pct: number) => void,
  ): Promise<{ hash: string }> {
    throw new Error(
      `StorageClient (${this._url}) is deprecated. Use ExternalBlob instead.`,
    );
  }

  async getDirectURL(_hash: string): Promise<string> {
    throw new Error("StorageClient is deprecated. Use ExternalBlob instead.");
  }
}

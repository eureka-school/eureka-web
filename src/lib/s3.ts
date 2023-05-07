import pkg from "aws-sdk";
const { S3 } = pkg;

const options = {
  endpoint: process.env.ENDPOINT,
  accessKeyId: process.env.APPLICATION_KEY_ID,
  secretAccessKey: process.env.APPLICATION_KEY,
};

declare global {
  var _s3: any;
}

class Singleton {
  private static _instance: Singleton;

  private s3: any;
  private constructor() {
    this.s3 = new S3(options);
    if (process.env.NODE_ENV === "development") {
      // In development mode, use a global variable so that the value
      // is preserved across module reloads caused by HMR (Hot Module Replacement).
      global._s3 = this.s3;
    }
  }

  public static get instance() {
    if (!this._instance) {
      this._instance = new Singleton();
    }
    return this._instance.s3;
  }
}
const s3 = Singleton.instance;

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default s3;

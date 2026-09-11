declare namespace Cloudflare {
  interface Env {
    DB?: D1Database;
    SEONBIZ_ADMIN_KEY?: string;
    BUCKET?: R2Bucket;
  }
}

declare namespace Cloudflare {
  interface Env {
    CONTACT_EMAIL?: SendEmail;
    CONTACT_EMAIL_FROM?: string;
    CONTACT_EMAIL_TO?: string;
    CONTACT_PHONE_LIMIT?: RateLimit;
    CONTACT_IP_LIMIT?: RateLimit;
    BUCKET?: R2Bucket;
  }
}

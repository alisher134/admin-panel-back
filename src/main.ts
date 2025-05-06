import { NestFactory } from "@nestjs/core";
import * as cookieParser from "cookie-parser";
import helmet from "helmet";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    helmet({
      // Content Security Policy (CSP) to prevent XSS and other attacks
      contentSecurityPolicy: {
        useDefaults: true, // Use helmet's default secure policies
        directives: {
          defaultSrc: ["'self'"], // Default to same-origin only
          scriptSrc: ["'self'"], // Scripts only from same origin (add nonce or hashes if needed)
          styleSrc: ["'self'"], // Styles only from same origin
          imgSrc: ["'self'", "data:", "https://api.datasec.org.kz"], // Allow images from these sources
          connectSrc: [
            "'self'",
            "https://api.datasec.org.kz",
            "https://datasec.org.kz",
          ], // Allow API calls to these origins
          fontSrc: ["'self'"], // Fonts only from same origin
          objectSrc: ["'none'"], // Disallow <object> tags (prevents Flash, etc.)
          mediaSrc: ["'self'"], // Media (audio, video) only from same origin
          frameSrc: ["'none'"], // Disallow iframes unless explicitly needed
          baseUri: ["'self'"], // Restrict <base> tag to same origin
          formAction: ["'self'"], // Restrict form submissions to same origin
          frameAncestors: ["'none'"], // Prevent clickjacking by disallowing framing
        },
      },
      // Referrer Policy: Only send referrer for same-origin requests or cross-origin HTTPS
      referrerPolicy: { policy: "strict-origin-when-cross-origin" },
      // Enable XSS-Protection header (for older browsers)
      xssFilter: true,
      // Prevent MIME-type sniffing (fixes "X-Content-Type-Options missing" alerts)
      noSniff: true,
      // HTTP Strict Transport Security (HSTS) to enforce HTTPS
      hsts: {
        maxAge: 31536000, // 1 year
        includeSubDomains: false, // Set to true only if all subdomains are HTTPS-ready
        preload: false, // Set to true only if you're ready to submit to preload lists
      },
      // Prevent framing for clickjacking protection
      frameguard: { action: "deny" }, // Stronger than 'sameorigin'
      // Remove X-Powered-By header to reduce information disclosure
      hidePoweredBy: true,
      // Restrict cross-domain policies for Flash and PDF
      permittedCrossDomainPolicies: { permittedPolicies: "none" },
      // Cross-Origin policies (fixes "Cross-origin non-critical configuration" alert)
      crossOriginEmbedderPolicy: { policy: "require-corp" }, // Require CORP for embedded resources
      crossOriginOpenerPolicy: { policy: "same-origin" }, // Prevent cross-origin window access
      crossOriginResourcePolicy: { policy: "cross-origin" }, // Restrict resource sharing to same origin
    })
  );

  app.setGlobalPrefix("api");
  app.use(cookieParser());
  app.enableCors({
    origin: ["https://datasec.org.kz"],
    credentials: true,
    exposedHeaders: "set-cookie",
  });

  await app.listen(4200);
}
bootstrap();

import { APPLE_SPLASH_IMAGES } from "@/lib/pwa/apple-splash-images";

export function AppleSplashLinks() {
  return (
    <>
      {APPLE_SPLASH_IMAGES.map(({ href, media }) => (
        <link
          key={href}
          rel="apple-touch-startup-image"
          href={href}
          media={media}
        />
      ))}
    </>
  );
}

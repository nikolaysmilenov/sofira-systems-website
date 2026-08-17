import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/data/site";

export const ogImageSize = {
  width: 1200,
  height: 630,
};

export const ogImageAlt = `${site.name} — софтуерни решения за бизнеса`;

export async function createOgImage(): Promise<ImageResponse> {
  const logo = await readFile(
    join(process.cwd(), "public/brand/sofira-logo.png"),
  );
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          background: "#000000",
          padding: "72px 88px",
        }}
      >
        {/* Satori/OG rendering does not support next/image. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoSrc}
          width={168}
          height={181}
          alt=""
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: 48,
          }}
        >
          <div
            style={{
              color: "#F4F6FA",
              fontSize: 68,
              fontWeight: 700,
              letterSpacing: 10,
              lineHeight: 1,
            }}
          >
            SOFIRA
          </div>
          <div
            style={{
              color: "#8EA0BB",
              fontSize: 26,
              letterSpacing: 18,
              marginTop: 18,
            }}
          >
            SYSTEMS
          </div>
          <div
            style={{
              width: 72,
              height: 3,
              background: "#1A6DFF",
              marginTop: 28,
            }}
          />
        </div>
      </div>
    ),
    {
      ...ogImageSize,
    },
  );
}

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
          background: "#F3F6FB",
          padding: "72px 88px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 176,
            height: 176,
            background: "#000000",
            borderRadius: 28,
          }}
        >
          {/* Satori/OG rendering does not support next/image. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={132} height={142} alt="" />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: 48,
          }}
        >
          <div
            style={{
              color: "#0C1730",
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
              color: "#4D5D78",
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

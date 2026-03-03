import { ImageResponse } from "@vercel/og";

export const runtime = "edge";
export const alt = "Traditional Art Gallery - Chris West";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const notoSans = await fetch(
    "https://fonts.gstatic.com/s/notosansdisplay/v29/RLpbK4fy6r6tOBEJg0IAKzqdFZVZxpMkXJMhnB9XjO1o90LuV-PT4Doq_AKp_3cKVTGQ2iHrvWM.ttf"
  ).then((res) => res.arrayBuffer());

  const logoUrl = new URL("/cwtech.png", process.env.NEXT_PUBLIC_SITE_URL || "https://chriswest.tech").toString();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "60px 80px",
          backgroundColor: "#000000",
        }}
      >
        <img
          src={logoUrl}
          width={140}
          height={85}
          style={{ position: "absolute", top: "40px", left: "60px" }}
        />

        <div
          style={{
            display: "flex",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(168,85,247,0.2)",
              color: "#c4b5fd",
              padding: "8px 20px",
              borderRadius: "9999px",
              fontSize: "18px",
              fontFamily: "Noto Sans Display",
            }}
          >
            Traditional Art
          </div>
        </div>

        <div
          style={{
            fontSize: "52px",
            fontWeight: 700,
            color: "#ededed",
            lineHeight: 1.2,
            fontFamily: "Noto Sans Display",
          }}
        >
          Traditional Art Gallery
        </div>

        <div
          style={{
            fontSize: "26px",
            color: "#a1a1aa",
            marginTop: "16px",
            fontFamily: "Noto Sans Display",
          }}
        >
          A gallery of traditional art pieces
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "80px",
            fontSize: "20px",
            color: "#52525b",
            fontFamily: "Noto Sans Display",
          }}
        >
          chriswest.tech
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Noto Sans Display",
          data: notoSans,
          style: "normal",
          weight: 700,
        },
      ],
    }
  );
}

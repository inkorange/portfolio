import { ImageResponse } from "@vercel/og";

export const runtime = "edge";
export const alt = "Chris West - Engineering & Art Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const notoSans = await fetch(
    new URL("https://fonts.googleapis.com/css2?family=Noto+Sans+Display:wght@600;700&display=swap")
  ).then(() =>
    fetch(
      "https://fonts.gstatic.com/s/notosansdisplay/v29/RLpbK4fy6r6tOBEJg0IAKzqdFZVZxpMkXJMhnB9XjO1o90LuV-PT4Doq_AKp_3cKVTGQ2iHrvWM.ttf"
    ).then((res) => res.arrayBuffer())
  );

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
          alignItems: "center",
          backgroundColor: "#000000",
          padding: "60px",
        }}
      >
        {/* Logo */}
        <img
          src={logoUrl}
          width={180}
          height={110}
          style={{ marginBottom: "40px" }}
        />

        {/* Title */}
        <div
          style={{
            fontSize: "56px",
            fontWeight: 700,
            color: "#ededed",
            textAlign: "center",
            lineHeight: 1.2,
            fontFamily: "Noto Sans Display",
          }}
        >
          Engineering and Art Reflections
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: "28px",
            color: "#a1a1aa",
            marginTop: "20px",
            textAlign: "center",
            fontFamily: "Noto Sans Display",
          }}
        >
          from the mind of a seasoned tech leader
        </div>

        {/* Footer */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
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

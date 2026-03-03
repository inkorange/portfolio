import { ImageResponse } from "@vercel/og";
import { getProductBySlug } from "@/lib/sanity/fetch";
import { urlFor } from "@/lib/sanity/image";

export const runtime = "edge";
export const alt = "Project - Chris West";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  const notoSans = await fetch(
    "https://fonts.gstatic.com/s/notosansdisplay/v29/RLpbK4fy6r6tOBEJg0IAKzqdFZVZxpMkXJMhnB9XjO1o90LuV-PT4Doq_AKp_3cKVTGQ2iHrvWM.ttf"
  ).then((res) => res.arrayBuffer());

  const logoUrl = new URL("/cwtech.png", process.env.NEXT_PUBLIC_SITE_URL || "https://chriswest.tech").toString();

  const productImageUrl = product?.image
    ? urlFor(product.image).width(1200).height(630).url()
    : null;

  const title = product?.title || "Project";
  const summary = product?.summary || "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "60px 80px",
          backgroundColor: "#000000",
          position: "relative",
        }}
      >
        {/* Background product image with overlay */}
        {productImageUrl && (
          <img
            src={productImageUrl}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.3,
            }}
          />
        )}

        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "linear-gradient(to top, #000000 30%, transparent 100%)",
          }}
        />

        {/* Logo top-left */}
        <img
          src={logoUrl}
          width={140}
          height={85}
          style={{ position: "absolute", top: "40px", left: "60px" }}
        />

        {/* Content */}
        <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
          {/* Badge */}
          <div style={{ display: "flex", marginBottom: "20px" }}>
            <div
              style={{
                backgroundColor: "rgba(16,185,129,0.2)",
                color: "#6ee7b7",
                padding: "6px 18px",
                borderRadius: "9999px",
                fontSize: "16px",
                fontFamily: "Noto Sans Display",
              }}
            >
              Project
            </div>
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: title.length > 50 ? "38px" : "48px",
              fontWeight: 700,
              color: "#ededed",
              lineHeight: 1.2,
              fontFamily: "Noto Sans Display",
            }}
          >
            {title}
          </div>

          {/* Summary */}
          {summary && (
            <div
              style={{
                fontSize: "22px",
                color: "#a1a1aa",
                marginTop: "16px",
                lineHeight: 1.4,
                fontFamily: "Noto Sans Display",
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              }}
            >
              {summary.length > 120 ? summary.slice(0, 120) + "..." : summary}
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            position: "absolute",
            bottom: "30px",
            right: "60px",
            fontSize: "18px",
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

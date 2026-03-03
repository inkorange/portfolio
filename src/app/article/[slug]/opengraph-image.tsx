import { ImageResponse } from "@vercel/og";
import { getProjectBySlug } from "@/lib/sanity/fetch";
import { urlFor } from "@/lib/sanity/image";

export const runtime = "edge";
export const alt = "Article - Chris West";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  const notoSans = await fetch(
    "https://fonts.gstatic.com/s/notosansdisplay/v29/RLpbK4fy6r6tOBEJg0IAKzqdFZVZxpMkXJMhnB9XjO1o90LuV-PT4Doq_AKp_3cKVTGQ2iHrvWM.ttf"
  ).then((res) => res.arrayBuffer());

  const logoUrl = new URL("/cwtech.png", process.env.NEXT_PUBLIC_SITE_URL || "https://chriswest.tech").toString();

  const featuredImageUrl = project?.featuredImage
    ? urlFor(project.featuredImage).width(1200).height(630).url()
    : null;

  const title = project?.title || "Article";
  const author = project?.author || "Chris West";
  const type = project?.type;
  const date = project?.publishedDate
    ? new Date(project.publishedDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  const badgeColor = type === "UI"
    ? { bg: "rgba(59,130,246,0.2)", text: "#93c5fd" }
    : { bg: "rgba(168,85,247,0.2)", text: "#c4b5fd" };
  const badgeLabel = type === "UI" ? "Tech" : type || "Article";

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
        {/* Background featured image with overlay */}
        {featuredImageUrl && (
          <img
            src={featuredImageUrl}
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
          {/* Badge + Meta */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
            <div
              style={{
                backgroundColor: badgeColor.bg,
                color: badgeColor.text,
                padding: "6px 18px",
                borderRadius: "9999px",
                fontSize: "16px",
                fontFamily: "Noto Sans Display",
              }}
            >
              {badgeLabel}
            </div>
            <div style={{ color: "#a1a1aa", fontSize: "16px", fontFamily: "Noto Sans Display" }}>
              {author}
            </div>
            {date && (
              <>
                <div style={{ color: "#52525b", fontSize: "16px" }}>•</div>
                <div style={{ color: "#a1a1aa", fontSize: "16px", fontFamily: "Noto Sans Display" }}>
                  {date}
                </div>
              </>
            )}
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

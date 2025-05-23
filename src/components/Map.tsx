import { useState } from "react";

const Map = ({ address }: { address: string }) => {
  const [isLoading, setIsLoading] = useState(true);

  const encodedAddress = encodeURIComponent(address);
  const src = `https://www.google.com/maps?q=${encodedAddress}&output=embed`;

  return (
    <div style={{ position: "relative", width: "100%", height: "400px" }}>
      {isLoading && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f5f5f5",
          }}
        >
          Loading map...
        </div>
      )}
      <iframe
        width="100%"
        height="100%"
        style={{ border: 0 }}
        src={src}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
};

export default Map;

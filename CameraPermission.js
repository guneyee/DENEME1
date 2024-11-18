import React, { useState, useRef, useEffect } from "react";

const TakePhoto = () => {
  const [isCameraAllowed, setIsCameraAllowed] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [dominantColor, setDominantColor] = useState(null); // Dominant renk
  const videoRef = useRef(null); // Video referansı
  const canvasRef = useRef(null); // Canvas referansı

  // Kamera izni isteği ve video akışını başlatma
  const requestCameraPermission = async () => {
    try {
      // Kamera izni al
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      setIsCameraAllowed(true);

      // Video akışını video elementine bağla
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      // Kamera akışını sonlandırma
      stream.getTracks().forEach((track) => {
        track.onended = () => {
          setIsCameraAllowed(false);
        };
      });
    } catch (err) {
      console.error("Kamera izni alınamadı:", err);
      alert(
        "Kamera izni verilmedi. Kamera erişimi sağlamak için lütfen ayarlara gidin."
      );
    }
  };

  // Fotoğraf çekme fonksiyonu
  const takePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext("2d");

    // Video akışından fotoğraf çekme
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Canvas'tan base64 formatında fotoğraf al
    const photoUrl = canvas.toDataURL("image/png");
    setPhoto(photoUrl); // Fotoğrafı state'e kaydet

    // Fotoğrafın baskın rengini bul
    extractDominantColor(canvas);
  };

  // Fotoğrafın baskın rengini alma fonksiyonu
  const extractDominantColor = (canvas) => {
    const context = canvas.getContext("2d");
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;

    let r = 0,
      g = 0,
      b = 0;

    // Piksel verilerini analiz et
    for (let i = 0; i < pixels.length; i += 4) {
      r += pixels[i]; // Red kanal
      g += pixels[i + 1]; // Green kanal
      b += pixels[i + 2]; // Blue kanal
    }

    // Ortalama renk hesapla
    const pixelCount = pixels.length / 4;
    r = Math.floor(r / pixelCount);
    g = Math.floor(g / pixelCount);
    b = Math.floor(b / pixelCount);

    const dominantColor = `rgb(${r}, ${g}, ${b})`;
    setDominantColor(dominantColor); // Rengi state'e kaydet

    // Rengi sayfa arka planı olarak uygula
    document.body.style.backgroundColor = dominantColor;
  };

  // Fotoğraf kaydetme fonksiyonu
  const savePhoto = () => {
    if (photo) {
      const link = document.createElement("a");
      link.href = photo;
      link.download = "photo.png"; // Fotoğraf adı
      link.click(); // Fotoğrafı indirme
    }
  };

  // Kamera izin talebi sayfa yüklendiğinde
  useEffect(() => {
    requestCameraPermission();
  }, []);

  return (
    <div>
      <h1>Take a Photo</h1>
      <p>Please allow camera access to take a photo.</p>

      {/* Küçük video görüntüsü */}
      {isCameraAllowed ? (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          style={{
            width: "300px", // Video genişliği
            height: "auto", // Yüksekliği orantılı olarak ayarlama
            border: "1px solid black",
            transform: "scaleX(-1)", // Ayna efekti (yatay ters çevirme)
          }}
        ></video>
      ) : (
        <p>Loading camera...</p>
      )}

      {/* Canvas elementi (gizli) */}
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>

      {/* Fotoğraf çekme butonu */}
      <button
        onClick={takePhoto}
        style={{
          backgroundColor: "black",
          color: "white",
          padding: "10px 20px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Take Photo
      </button>

      {/* Fotoğrafı gösterme */}
      {photo && (
        <div>
          <h3>Here is your photo:</h3>
          <img src={photo} alt="Captured" style={{ width: "100%", maxWidth: "400px" }} />
          <br />
          {/* Fotoğrafı kaydetme butonu */}
          <button
            onClick={savePhoto}
            style={{
              backgroundColor: "green",
              color: "white",
              padding: "10px 20px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Save Photo
          </button>
        </div>
      )}
    </div>
  );
};

export default TakePhoto;

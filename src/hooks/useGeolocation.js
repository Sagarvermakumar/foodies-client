import { useEffect, useState } from "react";

export const useGeolocation = () => {
  const [coordinates, setCoordinates] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = [pos.coords.longitude, pos.coords.latitude];
        setCoordinates(coords);
      },
      (err) => {
        if (err.code === 1) {
          // User denied permission
          setError("We couldn’t access your location. To set your outlet address accurately, please allow location access in your browser or device settings, or type location coordinates manually.");
        } else {
          setError("Unable to fetch location. Please try again.");
        }
      },
      { enableHighAccuracy: true }
    );
  }, []);

  return { coordinates, error };
};

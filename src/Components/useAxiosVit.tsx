import { useEffect, useState } from "react";
import db from "../config.json";
import { IDataUrl } from "../interfaces"; // исправлено: "inrefaces" → "interfaces"
import axios from "axios";

interface UseAxiosVitResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useAxiosVit<T>(
  dataUrl: IDataUrl,
  onLoadingChange?: (isLoading: boolean) => void
): UseAxiosVitResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const apiUrl = db.pathDB;

  async function fetchVit() {
    setLoading(true);
    onLoadingChange?.(true);
    setError(null);

    try {
      const response = await axios.post(apiUrl, dataUrl, config);
      
      setData(response.data);
    } catch (err) {
      const error = err as Error;
      setError(error);
      console.error("Ошибка запроса:", error);
    } finally {
      setLoading(false);
      onLoadingChange?.(false);
    }
  }

  useEffect(() => {
    fetchVit();
  }, [dataUrl]); // зависимость от dataUrl

  return { data, loading, error };
}
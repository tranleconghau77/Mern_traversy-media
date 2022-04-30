import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";

let cache = {};

const optDefault = {
  sizeCache: 100,
  saveCache: false,
};

const useQuery = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;

    let here = true;
    if (cache[url]) {
      setData(cache[url]);
    }

    if (!cache[url]) setLoading(true);

    axios
      .get(url)
      .then((res) => {
        if (here) {
          setData(res.data);
        }
      })
      .catch((err) => {
        if (here) {
          setError(err.response.data.msg);
          toast.error(err.response.data.msg);
        }
      })
      .finally(() => {
        if (here) setLoading(false);
      });
  }, [url]);

  return { data, loading, error };
};

export default useQuery;

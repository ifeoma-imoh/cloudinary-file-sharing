import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import styles from "../styles/Home.module.css";

export default function FileDownload() {
  const [fileResponse, setFileResponse] = useState();
  const [axiosCallStatus, setAxiosCallStatus] = useState();

  const { id } = useRouter().query;

  useEffect(() => {
    if (id === undefined) return;
    (async () => {
      setAxiosCallStatus("Loading...");
      try {
        const response = await axios.get(`/api/upload?id=${id}`);
        console.log(response.data.resources[0]);
        setFileResponse(response.data.resources[0]);
        setAxiosCallStatus("");
      } catch (error) {
        setAxiosCallStatus("File not found, refresh your browser");
      }
    })();
  }, [id]);
  return (
    <div className={styles.app}>
      <div className={styles.box}>
        <h2>Your file is Ready</h2>
        {fileResponse && fileResponse.length !== 0 ? (
          <>
            <h4>{fileResponse.context.filename}</h4>
            <a
              href={fileResponse.secure_url.replace(
                "/upload/",
                `/upload/fl_attachment:${
                  fileResponse.context.filename.split(".")[0]
                }/`
              )}
            >
              Click to download
            </a>
          </>
        ) : (
          <p>{axiosCallStatus || "No file found"}</p>
        )}
      </div>
    </div>
  );
}

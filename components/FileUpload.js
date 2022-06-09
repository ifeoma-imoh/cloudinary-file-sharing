import { useRef } from "react";
import styles from "../styles/Home.module.css";

export default function FileUpload({ file, setFile, handleUpload, status }) {
  const fileRef = useRef();

  return (
    <form className={styles.form} onSubmit={handleUpload}>
      <div className={styles.upload} onClick={() => fileRef.current.click()}>
        <input
          type="file"
          ref={fileRef}
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
        />
        <p>Click to select a file</p>
      </div>
      {file && (
        <>
          <div>
            <h5>{file.name}</h5>
          </div>
          <button type="submit" disabled={status === "Uploading..."}>
            Upload file
          </button>
          <p>{status}</p>
        </>
      )}
    </form>
  );
}

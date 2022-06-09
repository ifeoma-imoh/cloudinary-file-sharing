import styles from "../styles/Home.module.css";

export default function FileLinkPreview({ file, id, setStatus }) {
  const url = `${process.env.NEXT_PUBLIC_URL}/fileDownload?id=${id}`;

  const handleCopy = async () => {
    await window.navigator.clipboard.writeText(url);
  };

  return (
    <div className={styles.box}>
      <h4>{file.name}</h4>
      <p>File uploaded to Cloudinary, share this link to others.</p>
      <p>{url}</p>
      <button className={styles.copy} onClick={handleCopy}>
        Copy!
      </button>
      <button onClick={() => setStatus("")}>Upload new file</button>
    </div>
  );
}

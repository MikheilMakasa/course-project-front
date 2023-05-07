import { useEffect, useRef } from 'react';

const UploadWidget = ({ handleImageUpload }) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: 'dpdge6g5e',
        uploadPreset: 'ereqqkzr',
      },
      function (err, result) {
        if (!err && result && result.event === 'success') {
          // Pass the image URL to the parent component
          handleImageUpload(result.info.secure_url);
        }
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <button
      style={{
        fontSize: '15px',
        padding: '8px 18px',
        cursor: 'pointer',
        backgroundColor: 'transparent',
        border: '1px solid #ffc961',
        color: '#ffc961',
        borderRadius: ' 5px',
      }}
      onClick={() => widgetRef.current.open()}
    >
      Upload Image
    </button>
  );
};

export default UploadWidget;

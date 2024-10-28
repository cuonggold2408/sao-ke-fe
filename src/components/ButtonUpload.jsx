import { useRef, useState } from "react";
import axios from "axios";
import { API_ROOT } from "@/app/constants/api";

export default function ButtonUpload({ onDataFilterChange }) {
  const [loading, setLoading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState("");
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (
        !process.env.NEXT_PUBLIC_UPLOAD_PRESET ||
        !process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
      ) {
        alert("Cloudinary environment variables are not set properly.");
        return;
      }

      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", process.env.NEXT_PUBLIC_UPLOAD_PRESET);

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          formData
        );
        const url = response.data.secure_url;
        setUploadedUrl(url);

        const saveImageToDatabase = await axios.post(
          `${API_ROOT}/upload-image`,
          { url: url }
        );

        const dataFilter = saveImageToDatabase?.data?.data;

        console.log("saveImageToDatabase: ", dataFilter);

        let dataFinal = {
          amount: dataFilter[0]?.money,
          bank: dataFilter[0]?.bank,
          search: dataFilter[0]?.description,
        };

        console.log("dataFinal: ", dataFinal);
        if (!dataFinal.money && !dataFinal.bank && !dataFinal.description) {
          dataFinal = "not ok";
        }

        // Gửi `dataFilter` lên component cha (Header)
        if (onDataFilterChange) {
          onDataFilterChange(dataFinal);
        }

        fileInputRef.current.value = "";
      } catch (error) {
        console.error("Error uploading image:", error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          alert(`Failed to upload image: ${error.response.data.error.message}`);
        } else {
          alert("Failed to upload image.");
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col items-center border-gray-400 rounded-lg max-w-md mx-auto">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        ref={fileInputRef}
        className="hidden"
      />
      <button
        onClick={handleButtonClick}
        className="px-5 py-2 text-black rounded transition-colors duration-300"
        disabled={loading}
      >
        {loading ? "Uploading..." : "Kiểm tra phông bạt"}
      </button>
    </div>
  );
}

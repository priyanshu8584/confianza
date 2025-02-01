import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react"; // Ensure useQuery is imported
import { useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { Id } from "@/convex/_generated/dataModel";

interface InitialData {
  imageStorageId?: Id<"_storage">;

}

const ImageUpload = ({ imageStorageId: initialStorageId }: InitialData) => {
  const [image, setImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [imageStorageId, setImageStorageId] = useState<Id<"_storage"> | undefined>(
    initialStorageId
  );
  const saveImage = useMutation(api.storage.saveImage)
  const generateUploadUrl = useMutation(api.storage.generateUploadUrl);
  // const deleteImage = useMutation(api.storage.deletImage);

  // ✅ Fetch image URL using storageId (only inside the component body)
  const imageUrl = useQuery(api.storage.getUrl, imageStorageId ? { storageId: imageStorageId } : "skip");

  async function handleImageUpload() {
    if (!image) {
      alert("Please select an image first.");
      return;
    }

    setUploading(true);
    try {
      // Generate a pre-signed upload URL
      // const date=new Date();
    //  const today=`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
      const postUrl = await generateUploadUrl();
      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": image.type },
        body: image,
      });

      const { storageId } = await result.json();
      await saveImage({ storageId });  
      setImageStorageId(storageId); // ✅ Update state with new storageId
    } catch (error) {
      console.error("Failed to upload image:", error);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="font-bold text-lg mb-2">Upload Image</h2>

      {/* ✅ Image Preview (Existing or Uploaded Image) */}
      {imageUrl && (
        <div className="mb-2">
          <Image
            src={imageUrl}
            alt="Uploaded"
            width={100}
            height={100}
            className="rounded-lg"
          />
        </div>
      )}

      <input
        type="file"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
        className="mb-2"
      />
      <Button
        onClick={handleImageUpload}
        disabled={uploading}
        className="bg-blue-500 text-white w-full"
      >
        {uploading ? "Uploading..." : "Upload Image"}
      </Button>
    </div>
  );
};

export default ImageUpload;

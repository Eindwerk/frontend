"use client";

import { useState } from "react";
import DetailContainer from "@/components/newpost-page/DetailContainer";
import ImageContainer from "@/components/newpost-page/ImageContainer";
import Button from "@/components/ui/Button";
import ConfirmOverlay from "@/components/ui/ConfirmOverlay";
import { SendNewPost } from "@/lib/actions/sendPost";
import Text from "@/components/ui/Text";

const NewPostPage = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedGameId, setSelectedGameId] = useState<number | null>(null);
  const [selectedStadiumId, setSelectedStadiumId] = useState<number | null>(
    null
  );
  const [errors, setErrors] = useState<string[]>([]);

  const handleImageChange = (file: File, preview: string) => {
    setSelectedImage(file);
    setPreviewUrl(preview);
  };

  const handlePostClick = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);
    setShowConfirm(true);
  };

  const handleConfirm = async () => {
    setShowConfirm(false);

    if (!selectedGameId || !selectedStadiumId || !selectedImage) {
      setErrors(["Alle velden zijn verplicht om te posten."]);
      return;
    }

    const result = await SendNewPost(
      selectedGameId,
      selectedStadiumId,
      selectedImage
    );

    if (!result.success) {
      setErrors([result.message || "Onbekende fout bij het posten."]);
    } else {
      setErrors([]);
      setSelectedImage(null);
      setPreviewUrl(null);
      setSelectedGameId(null);
      setSelectedStadiumId(null);
      alert("Post succesvol aangemaakt!");
    }
  };

  return (
    <>
      {showConfirm && (
        <ConfirmOverlay
          message="Are you sure you want to post this?"
          confirmText="Yes, Post"
          cancelText="Cancel"
          onConfirm={handleConfirm}
          onCancel={() => setShowConfirm(false)}
        />
      )}
      <form className="new-post-page" onSubmit={handlePostClick}>
        <ImageContainer
          imageSrc={previewUrl}
          onImageChange={handleImageChange}
        />
        <div className="new-post-page__content">
          <DetailContainer
            onSelectGame={(gameId: number, stadiumId: number | null) => {
              setSelectedGameId(gameId);
              setSelectedStadiumId(stadiumId);
            }}
          />
          {errors.length > 0 && (
            <div className="new-post-page__content__error-container">
              {errors.map((error, i) => (
                <Text key={i} variant="subtext-red-12">
                  {error}
                </Text>
              ))}
            </div>
          )}
          <div className="new-post-page__content__button">
            <Button variant="primary" type="submit">
              Post
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default NewPostPage;

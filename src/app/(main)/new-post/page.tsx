"use client";

// TODO: validate the inputs and implement the actual post logic

import { useState } from "react";
import DetailContainer from "@/components/newpost-page/DetailContainer";
import ImageContainer from "@/components/newpost-page/ImageContainer";
import Button from "@/components/ui/Button";
import ConfirmOverlay from "@/components/ui/ConfirmOverlay";

const NewPostPage = () => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handlePostClick = () => {
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    setShowConfirm(false);
    console.log("Confirmed post!");
    // TODO: trigger actual post logic
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  return (
    <>
      {showConfirm && (
        <ConfirmOverlay
          message="Are you sure you want to post this?"
          confirmText="Yes, Post"
          cancelText="Cancel"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
      <div className="new-post-page">
        <ImageContainer />
        <DetailContainer />
        <div className="new-post-page__button">
          <Button variant="primary" onClick={handlePostClick}>
            Post
          </Button>
        </div>
      </div>
    </>
  );
};

export default NewPostPage;

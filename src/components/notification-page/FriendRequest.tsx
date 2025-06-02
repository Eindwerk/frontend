"use client";

import React, { useState } from "react";
import Text from "@/components/ui/Text";

import { ArrowRightIcon, Check, UserPlus, X } from "lucide-react";

export const FriendRequest = () => {
  const [expanded, setExpanded] = useState(false);

  const handleAccept = () => {
    console.log("Accepted");
  };

  const handleDecline = () => {
    console.log("Declined");
  };

  return (
    <div className="friend-request-card">
      {!expanded ? (
        <button
          className="friend-request-card__summary"
          onClick={() => setExpanded(true)}
        >
          <div className="friend-request-card__info">
            <span className="friend-request-card__icon">
              <UserPlus />
            </span>
            <Text variant="bold-blue-17">User, Requested to follow</Text>
          </div>
          <span className="friend-request-card__arrow">
            <ArrowRightIcon />
          </span>
        </button>
      ) : (
        <div className="friend-request-card__actions">
          <button
            onClick={handleAccept}
            className="friend-request-card__btn accept"
          >
            <Check />
            <Text variant="bold-blue-17"> Accept</Text>
          </button>
          <button
            onClick={handleDecline}
            className="friend-request-card__btn decline"
          >
            <X />
            <Text variant="bold-blue-17">Decline</Text>
          </button>
        </div>
      )}
    </div>
  );
};

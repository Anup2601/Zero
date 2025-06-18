import React, { useRef, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import ReviewForm from "./review";
import "./ReviewForm.css";

const Room = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const meetingContainerRef = useRef(null);
  const isInitialized = useRef(false);
  const [showReview, setShowReview] = useState(false); // State for review popup

  function randomID(len) {
    let result = '';
    const chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP';
    const maxPos = chars.length;
    len = len || 5;
    for (let i = 0; i < len; i++) {
      result += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return result;
  }

  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;

    const initMeeting = async () => {
      const appID = 1068273630;
      const serverSecret = "8e70ccf91dd4fa703cd101d067773500";
      const userID = randomID(5);
      const userName = " ";

      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomId,
        userID,
        userName
      );

      const zp = ZegoUIKitPrebuilt.create(kitToken);

      zp.joinRoom({
        container: meetingContainerRef.current,
        sharedLinks: [
          {
            name: 'Copy link',
            url: `${window.location.origin}/room/${roomId}`,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall,
        },
        showScreenSharingButton: true,
        onLeaveRoom: () => {
          setShowReview(true); // Show review form when user leaves the call
        },
      });
    };

    initMeeting();
  }, [roomId]);

  const handleReviewSubmit = (review) => {
    console.log("Review Submitted:", review);
    setShowReview(false);
    navigate(`/room/${value}`); // Redirect to home page after submitting review
  };

  return (
    <div>
      <div ref={meetingContainerRef} style={{ width: "100%", height: "100vh" }} />
      {showReview && (
        <div className="review-popup">
          <ReviewForm onSubmit={handleReviewSubmit} onClose={() => navigate(`/room/${value}`)} />
        </div>
      )}
    </div>
  );
};

export default Room;

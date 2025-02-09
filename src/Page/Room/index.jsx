import React, { useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

const Room = () => {
  const { roomId } = useParams();
  const meetingContainerRef = useRef(null);
  const isInitialized = useRef(false); // Prevent reinitialization

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
    if (isInitialized.current) return; // Prevent multiple calls
    isInitialized.current = true;

    const initMeeting = async () => {
      const appID = 1944778439;
      const serverSecret = "d5c2462e917e1d78954c9e9c09a61a58";
      const userID = randomID(5); // Keep the user ID random
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
      });
    };

    initMeeting();
  }, [roomId]);

  return (
    <div>
      <div ref={meetingContainerRef} style={{ width: "100%", height: "100vh" }} />
    </div>
  );
};

export default Room;

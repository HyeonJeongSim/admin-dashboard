// Kakao Postcode API 화면

import React, { useEffect, useRef } from "react";
import "../../styles/components/Modal.css";
import { PostcodeResult } from "../../models/company";

declare global {
  interface Window {
    daum: {
      Postcode: new (options: {
        oncomplete: (data: any) => void;
        onclose?: () => void;
        width?: string | number;
        height?: string | number;
        maxSuggestItems?: number;
        pleaseReadGuide?: number;
        pleaseReadGuideTimer?: number;
        shorthand?: boolean;
        hideMapBtn?: boolean;
        hideEngBtn?: boolean;
        autoMapping?: boolean;
        autoMappingTimer?: number;
        theme?: {
          bgColor?: string;
          searchBgColor?: string;
          contentBgColor?: string;
          pageBgColor?: string;
          textColor?: string;
          queryTextColor?: string;
          postcodeTextColor?: string;
          emphTextColor?: string;
          outlineColor?: string;
        };
      }) => {
        embed: (element: HTMLElement) => void;
        open: () => void;
      };
    };
  }
}

interface PostcodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (data: PostcodeResult) => void;
}

const PostcodeModal: React.FC<PostcodeModalProps> = ({
  isOpen,
  onClose,
  onComplete,
}) => {
  const postcodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const initializePostcode = () => {
      if (!postcodeRef.current || !window.daum) return;

      new window.daum.Postcode({
        oncomplete: (data: any) => {
          const selectedResult: PostcodeResult = {
            zipCode: data.zonecode,
            address: data.address,
            roadAddress: data.roadAddress || "",
            jibunAddress: data.jibunAddress || "",
            detailAddress: "",
          };
          onComplete(selectedResult);
          onClose();
        },
        onclose: onClose,
        width: "100%",
        height: "100%",
        maxSuggestItems: 5,
        hideMapBtn: false,
        hideEngBtn: false,
        autoMapping: true,
        shorthand: false,
        pleaseReadGuide: 0,
        theme: {
          bgColor: "#FFFFFF",
          searchBgColor: "#FFFFFF",
          contentBgColor: "#FFFFFF",
          pageBgColor: "#FAFAFA",
          textColor: "#333333",
          queryTextColor: "#222222",
          postcodeTextColor: "#FA4256",
          emphTextColor: "#008BD3",
          outlineColor: "#E0E0E0",
        },
      }).embed(postcodeRef.current);
    };

    if (window.daum && window.daum.Postcode) {
      initializePostcode();
    } else {
      const script = document.createElement("script");
      script.src =
        "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
      script.onload = initializePostcode;
      document.head.appendChild(script);
      return () => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      };
    }
  }, [isOpen, onClose, onComplete]);

  if (!isOpen) return null;

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="postcode-modal-overlay" onClick={handleBackgroundClick}>
      <div className="postcode-modal-container">
        <div className="postcode-modal-header">
          <h3>우편번호 찾기</h3>
          <button
            type="button"
            className="postcode-modal-close-btn"
            onClick={onClose}>
            ×
          </button>
        </div>
        <div className="postcode-modal-body">
          <div ref={postcodeRef} className="postcode-embed-area"></div>
        </div>
      </div>
    </div>
  );
};

export default PostcodeModal;

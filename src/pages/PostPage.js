import React, { useState } from "react";
import Logo from "../components/Layout/Logo";
import checkIcon from "../assets/check_Icon.png";

function PostHeader() {
  return (
    <header className="bg-white shadow-md w-full py-4 px-6 md:px-24 lg:px-48">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Logo />
      </div>
    </header>
  );
}

function SubmitButton({ onClick, disabled, text }) {
  return (
    <button
      type="button"
      onClick={() => onClick()}
      disabled={disabled}
      className={`w-full rounded-xl py-4 font-bold text-white mt-20 ${
        disabled ? "bg-gray300" : "bg-purple600"
      }`}
    >
      {text}
    </button>
  );
}

function PostPage() {
  const colors = [
    { idx: 0, cls: "bg-beige300", name: "beige" },
    { idx: 1, cls: "bg-purple300", name: "purple" },
    { idx: 2, cls: "bg-blue300", name: "blue" },
    { idx: 3, cls: "bg-green300", name: "green" },
  ];
  const images = [
    { idx: 0, link: "https://picsum.photos/id/14/2500/1667" },
    { idx: 1, link: "https://picsum.photos/id/19/2500/1667" },
    { idx: 2, link: "https://picsum.photos/id/20/2500/1667" },
    { idx: 3, link: "https://picsum.photos/id/22/2500/1667" },
  ];
  const [name, setName] = useState("");
  const [userStartTyping, setUserStartTyping] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isColor, setIsColor] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const submit = async () => {
    if (isProcessing) return;
    setIsProcessing(true);
    console.log(name);
    console.log(selectedIdx);

    try {
      const response = await fetch(
        `https://rolling-api.vercel.app/11-7/recipients/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            backgroundColor: colors[selectedIdx].name,
            backgroundImageURL: !isColor ? images[selectedIdx].link : null,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        window.location.href = `/post/${data.id}`;
      } else {
        console.error("POST 요청 실패:", response.status);
      }
    } catch (error) {
      console.error("POST 요청 중 오류 발생:", error);
    } finally {
      setIsProcessing(false);
    }
  };
  const handleFocusout = () => {
    setUserStartTyping(true);
  };
  return (
    <div className="bg-gray-100 min-h-screen">
      <PostHeader />
      <main className="flex flex-col py-8 px-4 sm:px-6 md:px-16 lg:px-24 items-center">
        <div className="flex flex-col max-w-screen-sm w-full items-start">
          <h2 className="text-xl font-semibold mb-2">To.</h2>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="받는 사람 이름을 입력해주세요"
            onBlur={() => handleFocusout()}
            className={`w-full border-2 rounded-lg px-4 py-2 focus:outline-none mb-5 ${
              userStartTyping && name.length === 0
                ? "border-error"
                : "border-gray300"
            }`}
          />
          {userStartTyping && name.length === 0 && (
            <p className="text-error mb-3 text-sm">값을 입력해 주세요</p>
          )}
          <h2 className="text-xl font-semibold mb-2">
            배경화면을 선택해 주세요.
          </h2>
          <div className="mb-4">
            컬러를 선택하거나, 이미지를 선택할 수 있습니다.
          </div>
          <div className="flex-row mb-3">
            <button
              type="button"
              className={`py-2 rounded-lg w-20 border-2 ${
                isColor
                  ? "text-purple600 border-purple600 font-bold"
                  : "bg-gray200 border-gray200"
              }`}
              onClick={() => setIsColor(true)}
            >
              컬러
            </button>
            <button
              type="button"
              className={`py-2 rounded-lg w-20 border-2 ${
                !isColor
                  ? "text-purple600 border-purple600 font-bold"
                  : "bg-gray200 border-gray200"
              }`}
              onClick={() => setIsColor(false)}
            >
              이미지
            </button>
          </div>
          <div className="flex flex-row w-full space-x-2">
            {isColor &&
              colors.map((color) => (
                <button
                  type="button"
                  onClick={() => setSelectedIdx(color.idx)}
                  className={`${color.cls} flex-1 aspect-[1] w-1/4 rounded-lg items-center flex justify-center`}
                >
                  {selectedIdx === color.idx && (
                    <img
                      src={checkIcon}
                      alt="추가 아이콘"
                      className="w-10 h-10"
                    />
                  )}
                </button>
              ))}
          </div>

          <div className="flex flex-row w-full space-x-2">
            {!isColor &&
              images.map((image) => (
                <button
                  type="button"
                  onClick={() => setSelectedIdx(image.idx)}
                  className="flex-1 aspect-[1] w-1/4 items-center flex justify-center relative"
                >
                  <img
                    className="w-full h-full rounded-lg"
                    alt={image.link}
                    src={image.link}
                  />

                  {selectedIdx === image.idx && (
                    <img
                      src={checkIcon}
                      alt="추가 아이콘"
                      className="w-10 h-10 absolute"
                    />
                  )}
                </button>
              ))}
          </div>
          <SubmitButton
            onClick={() => submit()}
            disabled={name.length === 0}
            text="생성하기"
          />
        </div>
      </main>
    </div>
  );
}

export default PostPage;

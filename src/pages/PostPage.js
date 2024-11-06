import React, { useCallback, useMemo, useState } from "react";
import ImageTile from "../components/postPage/ImageTile";
import SubmitButton from "../components/postPage/SubmitButton";
import NameInput from "../components/postPage/NameInput";
import PostHeader from "../components/postPage/PostHeader";
import ColorSelector from "../components/postPage/ColorSelector";
import ColorTile from "../components/postPage/ColorTile";

const MemorizedPostHeader = React.memo(PostHeader);
const MemorizedImageTile = React.memo(ImageTile);
const MemorizedSubmitButton = React.memo(SubmitButton);
const MemorizedNameInput = React.memo(NameInput);
const MemorizedColorSelector = React.memo(ColorSelector);
const MemorizedColorTile = React.memo(ColorTile);

function PostPage() {
  const colors = useMemo(
    () => [
      { idx: 0, cls: "bg-beige200", name: "beige" },
      { idx: 1, cls: "bg-purple200", name: "purple" },
      { idx: 2, cls: "bg-blue200", name: "blue" },
      { idx: 3, cls: "bg-green200", name: "green" },
    ],
    []
  );
  const images = useMemo(
    () => [
      { idx: 0, link: "https://picsum.photos/id/14/2500/1667" },
      { idx: 1, link: "https://picsum.photos/id/19/2500/1667" },
      { idx: 2, link: "https://picsum.photos/id/20/2500/1667" },
      { idx: 3, link: "https://picsum.photos/id/22/2500/1667" },
    ],
    []
  );
  const [name, setName] = useState("");
  const [userStartTyping, setUserStartTyping] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isColor, setIsColor] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (isProcessing) return;
      setIsProcessing(true);

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
    },
    [colors, images, isColor, isProcessing, name, selectedIdx]
  );
  const handleFocusout = useCallback(() => {
    setUserStartTyping(true);
  }, []);
  const handleChangeName = useCallback((e) => setName(e.target.value), []);
  const handleChangeIdx = useCallback((idx) => setSelectedIdx(idx), []);
  const hancleColorSelected = useCallback((color) => setIsColor(color), []);
  const handleColorClick = useCallback((idx) => setSelectedIdx(idx), []);
  return (
    <div className="bg-gray-100 dark:bg-dark1 dark:text-gray300 min-h-screen">
      <MemorizedPostHeader />
      <main className="flex flex-col py-8 px-4 sm:px-6 md:px-16 lg:px-24 items-center">
        <form
          className="flex flex-col max-w-screen-sm w-full items-start"
          onSubmit={handleSubmit}
        >
          <MemorizedNameInput
            name={name}
            handleChangeName={handleChangeName}
            handleFocusout={handleFocusout}
            isError={userStartTyping && name.length === 0}
          />
          <MemorizedColorSelector
            isColor={isColor}
            colorSelected={hancleColorSelected}
          />
          <div className="flex w-full space-x-2">
            {isColor &&
              colors.map((color) => (
                <MemorizedColorTile
                  isSelected={color.idx === selectedIdx}
                  cls={color.cls}
                  onClick={() => handleColorClick(color.idx)}
                />
              ))}
          </div>

          <div className="flex w-full space-x-2">
            {!isColor &&
              images.map((image) => (
                <MemorizedImageTile
                  link={image.link}
                  onClick={() => handleChangeIdx(image.idx)}
                  isSelected={selectedIdx === image.idx}
                />
              ))}
          </div>
          <MemorizedSubmitButton disabled={name.length === 0} text="생성하기" />
        </form>
      </main>
    </div>
  );
}

export default PostPage;

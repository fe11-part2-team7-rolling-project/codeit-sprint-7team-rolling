import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TrashIcon from "../components/TrashIcon";
import DeleteButton from "../components/DeleteButton";
import {
  getRecipients,
  getRecipientsMessage,
  deleteRecipient,
  deleteMessage,
} from "../api/recipientsApi";
import Reactions from "../components/postIdPage/Reactions";
import useDark from "../hooks/useDark"; // Dark Mode를 위한 훅 가져오기
import DarkModeButton from "../components/Layout/DarkModeButton";

// 배경 색상 맵, 다크 모드 스타일 포함
const colorClassMap = {
  purple: "bg-purple200",
  blue: "bg-blue200",
  green: "bg-green200",
  beige: "bg-beige200",
};

const fontClasses = {
  "Noto Sans": "font-noto",
  Pretendard: "font-regular",
  나눔명조: "font-custom",
  "나눔손글씨 손편지체": "font-custom",
};

const relationMap = {
  지인: "bg-beige100 text-beige500",
  동료: "bg-purple100 text-purple500",
  가족: "bg-green100 text-green500",
  친구: "bg-blue100 text-blue500",
};

function PostEditPage() {
  const { id } = useParams(); // URL에서 롤링페이퍼 ID를 추출
  const navigate = useNavigate(); // 페이지 이동 함수
  const { isDark } = useDark(); // Dark Mode 상태와 토글 함수 가져오기

  // 상태 관리: 롤링페이퍼 정보 및 메시지 목록을 포함한 초기 상태 설정
  const [items, setItems] = useState({
    name: "", // 롤링페이퍼 이름
    backgroundImageURL: "", // 배경 이미지 URL
    backgroundColor: "", // 배경색
    recentMessages: [], // 메시지 목록
  });

  // 롤링페이퍼와 메시지 정보를 API에서 가져오기
  useEffect(() => {
    async function fetchRecipientData() {
      try {
        const recipientData = await getRecipients(id); // 롤링페이퍼 정보 가져오기
        const messageData = await getRecipientsMessage(id, 1000, 0); // 메시지 목록 가져오기

        // 상태 업데이트: 가져온 데이터를 items에 저장
        setItems({
          name: recipientData.name, // 롤링페이퍼 이름 설정
          backgroundImageURL: recipientData.backgroundImageURL, // 배경 이미지 URL 설정
          backgroundColor: recipientData.backgroundColor, // 배경색 설정
          recentMessages: messageData.results, // 메시지 목록 설정
        });
      } catch (error) {
        console.error("데이터를 불러오는데 실패했습니다:", error); // 데이터 로딩 실패 시 에러 표시
      }
    }

    fetchRecipientData(); // 컴포넌트 로드시 데이터 가져오기
  }, [id]); // id가 변경될 때마다 호출

  // 개별 메시지 삭제 함수
  const handleDelete = async (messageId) => {
    // 삭제 확인 창 표시
    const isConfirmed = window.confirm("정말 이 메시지를 삭제하시겠습니까?");
    if (!isConfirmed) return; // 취소 시 함수 종료

    try {
      await deleteMessage(messageId); // API를 통해 메시지 삭제 요청
      // 삭제된 메시지를 상태에서 제거하여 UI 업데이트
      setItems((prevItems) => ({
        ...prevItems,
        recentMessages: prevItems.recentMessages.filter(
          (message) => message.id !== messageId
        ),
      }));
    } catch (error) {
      console.error("Failed to delete message:", error); // 삭제 실패 시 에러 표시
      alert("메시지 삭제에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  // 전체 롤링페이퍼 삭제 함수
  const handleDeleteAll = async () => {
    // 전체 삭제 확인 창 표시
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        await deleteRecipient(id); // API를 통해 롤링페이퍼 삭제 요청
        navigate("/list"); // 삭제 후 목록 페이지로 이동
      } catch (error) {
        console.error("삭제 중 오류가 발생했습니다:", error); // 삭제 실패 시 에러 표시
        alert("삭제에 실패했습니다. 다시 시도해 주세요.");
      }
    }
  };

  return (
    <div className={`w-full h-full ${isDark ? "dark" : ""}`}>
      <div className="sticky top-0 z-20">
        {/* 상단 네비게이션 바 */}
        <div className="flex justify-between items-center bg-white dark:bg-dark2 text-black dark:text-white dark:border-b border-white h-[52px] px-6">
          <div className="text-[18px] leading-[26px] font-regular">
            To. {items.name} {/* 롤링페이퍼 이름 표시 */}
          </div>

          {/* 다크 모드 토글 버튼 */}
          <DarkModeButton />
        </div>

        {/* 공유 영역 */}
        <div className="dark:bg-dark2 pr-4 flex items-center justify-between bg-white text-black w-full h-[52px] border-b border-gray200">
          <Reactions />
          {/* Back 버튼을 아래 이모지 영역 우측에 배치 */}
          <button
            onClick={() => navigate(`/post/${id}`)} // 목록 페이지로 돌아가기 버튼
            type="button"
            className="px-2 py-1 sm:px-4 font-regular sm:py-2 text-sm sm:text-base bg-blue500 dark:bg-blue600 text-white rounded-md shadow-md hover:bg-blue600 dark:hover:bg-blue700 transition"
          >
            Back
          </button>
        </div>
      </div>

      {/* 배경 설정 */}
      <div
        className={`w-full min-h-screen h-full bg-cover z-0 ${
          items.backgroundImageURL ? "" : colorClassMap[items.backgroundColor]
        }`}
        style={{
          backgroundImage: items.backgroundImageURL
            ? `url(${items.backgroundImageURL})`
            : "none",
          backgroundSize: items.backgroundImageURL ? "cover" : "auto",
          backgroundPosition: "center",
        }}
      >
        {/* 메시지 목록 및 삭제 버튼 영역 */}
        <div className="items-center">
          <div className="max-w-[1200px] md:pt-20 xl:pt-28 mx-auto grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {items.recentMessages.map((message) => (
              <div className="p-4">
                <div
                  key={message.id}
                  className="relative flex flex-col max-h-[285px] gap-4 items-start justify-center z-10 w-full h-full bg-white dark:bg-dark3 text-black dark:text-white rounded-[16px] shadow-lg"
                >
                  {/* 프로필 이미지와 발신자 정보 */}
                  <div className="flex flex-row justify-between w-[310px] mx-6 pt-7 pb-4 border-b border-gray200 dark:border-gray700 items-center">
                    <div className="flex gap-[14px] items-center">
                      <img
                        src={message.profileImageURL || "/default_profile.png"}
                        alt={message.sender}
                        className="w-[56px] h-[56px] rounded-full"
                      />
                      <div className="flex flex-col gap-[6px] text-left">
                        <div className="flex flex-row gap-[6px] items-center">
                          <div className="text-[18px] font-regular leading-[28px] text-black dark:text-white">
                            From.
                          </div>
                          <div className="text-[16px] font-bold leading-[26px] text-black dark:text-white">
                            {message.sender}
                          </div>
                        </div>
                        <div
                          className={`flex px-2 py-1 mr-auto rounded-[4px] ${
                            relationMap[message.relationship]
                          } font-regular text-[14px] leading-[20px]`}
                        >
                          {message.relationship}
                        </div>
                      </div>
                      {/* TrashIcon을 메시지 카드의 우측 상단에 배치 */}
                    </div>
                    <div>
                      <TrashIcon onDelete={() => handleDelete(message.id)} />
                    </div>
                  </div>

                  {/* 메시지 내용 */}
                  <p
                    className={`px-6 py-[16px] h-[80px] ${
                      fontClasses[message.font] || "font-custom"
                    } text-gray600 dark:text-gray300 text-left text-[15px] leading-[22px] -tracking-[.01em] overflow-hidden text-ellipsis `}
                    style={{ textIndent: "1em" }}
                  >
                    {message.content}
                  </p>

                  {/* 메시지 날짜 */}
                  <div className="py-6 px-6 font-extraLight text-gray400 dark:text-gray300 text-[12px] leading-[18px] -tracking-[.05em] text-left">
                    {new Date(message.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 하단 고정 전체 삭제 버튼 */}
        <div className="fixed bottom-4 left-0 right-0 flex justify-center z-20">
          <DeleteButton
            onClick={handleDeleteAll}
            label="삭제하기"
            className="bg-purple500 dark:bg-purple600 text-white py-2 px-6 rounded-md shadow-md hover:bg-purple600 dark:hover:bg-purple700"
          />
        </div>
      </div>
    </div>
  );
}

export default PostEditPage;

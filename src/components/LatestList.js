import React, { useEffect, useState } from "react";

function LatestList() {
  const [latestList, setLatestList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 더미 데이터 생성 함수
  const createDummyData = () => [
    {
      id: 2,
      name: "강영훈",
      backgroundColor: "#D0F5C3",
      backgroundImageURL: null,
      createdAt: "2023-10-26T13:19:31.401765Z",
      messageCount: 3,
      recentMessages: [
        {
          id: 32,
          recipientId: 2,
          sender: "김하은",
          profileImageURL:
            "https://fastly.picsum.photos/id/311/200/200.jpg?hmac=CHiYGYQ3Xpesshw5eYWH7U0Kyl9zMTZLQuRDU4OtyH8",
          relationship: "가족",
          content: "열심히 일하는 모습 멋있습니다.",
          font: "Pretendard",
          createdAt: "2023-11-01T08:05:25.399056Z",
        },
        {
          id: 31,
          recipientId: 2,
          sender: "이영준",
          profileImageURL:
            "https://fastly.picsum.photos/id/1025/200/200.jpg?hmac=VHJNaINoB_NM72EECUzBuWQKjTVB4_u2YOA1LxZTkcw",
          relationship: "지인",
          content: "항상 응원합니다",
          font: "Noto Sans",
          createdAt: "2023-11-01T08:04:12.852691Z",
        },
        {
          id: 33,
          recipientId: 2,
          sender: "박지민",
          profileImageURL:
            "https://fastly.picsum.photos/id/64/200/200.jpg?hmac=9TEnAyLXcBd9SojGrsZtF8L_q_pBEotwMA6HfbyR5tk",
          relationship: "친구",
          content: "잘하고 있어요!",
          font: "Arial",
          createdAt: "2023-11-01T08:03:10.123456Z",
        },
      ],
      reactionCount: 48,
      topReactions: [
        { id: 27, emoji: "😀", count: 14 },
        { id: 31, emoji: "😊", count: 11 },
        { id: 33, emoji: "👍", count: 10 },
      ],
    },
    {
      id: 3,
      name: "은하",
      backgroundColor: "#FFE2AD",
      backgroundImageURL: null,
      createdAt: "2023-10-28T13:19:31.401765Z",
      messageCount: 5,
      recentMessages: [
        {
          id: 34,
          recipientId: 3,
          sender: "서현우",
          profileImageURL:
            "https://fastly.picsum.photos/id/102/200/200.jpg?hmac=3h_smg_G23ZpeImdE2YFupWnM0-DwpTXxUnb25MPwDo",
          relationship: "가족",
          content: "축하해!",
          font: "Roboto",
          createdAt: "2023-11-02T08:00:25.399056Z",
        },
        {
          id: 35,
          recipientId: 3,
          sender: "이진아",
          profileImageURL:
            "https://fastly.picsum.photos/id/54/200/200.jpg?hmac=Wo8I6KPlR54Z1JIQSUjzXMxL1PQ8Upvb07Qyp7NpIqc",
          relationship: "친구",
          content: "항상 행복하길!",
          font: "Times New Roman",
          createdAt: "2023-11-02T07:45:25.399056Z",
        },
        {
          id: 35,
          recipientId: 3,
          sender: "이진아",
          profileImageURL:
            "https://fastly.picsum.photos/id/54/200/200.jpg?hmac=Wo8I6KPlR54Z1JIQSUjzXMxL1PQ8Upvb07Qyp7NpIqc",
          relationship: "친구",
          content: "항상 행복하길!",
          font: "Times New Roman",
          createdAt: "2023-11-02T07:45:25.399056Z",
        },
        {
          id: 35,
          recipientId: 3,
          sender: "이진아",
          profileImageURL:
            "https://fastly.picsum.photos/id/54/200/200.jpg?hmac=Wo8I6KPlR54Z1JIQSUjzXMxL1PQ8Upvb07Qyp7NpIqc",
          relationship: "친구",
          content: "항상 행복하길!",
          font: "Times New Roman",
          createdAt: "2023-11-02T07:45:25.399056Z",
        },
        {
          id: 35,
          recipientId: 3,
          sender: "이진아",
          profileImageURL:
            "https://fastly.picsum.photos/id/54/200/200.jpg?hmac=Wo8I6KPlR54Z1JIQSUjzXMxL1PQ8Upvb07Qyp7NpIqc",
          relationship: "친구",
          content: "항상 행복하길!",
          font: "Times New Roman",
          createdAt: "2023-11-02T07:45:25.399056Z",
        },
      ],
      reactionCount: 36,
      topReactions: [
        { id: 34, emoji: "❤️", count: 16 },
        { id: 35, emoji: "🎉", count: 12 },
        { id: 36, emoji: "😊", count: 8 },
      ],
    },
    {
      id: 2,
      name: "강영훈",
      backgroundColor: "#FFE2AD",
      backgroundImageURL: null,
      createdAt: "2023-10-26T13:19:31.401765Z",
      messageCount: 3,
      recentMessages: [
        {
          id: 32,
          recipientId: 2,
          sender: "김하은",
          profileImageURL:
            "https://fastly.picsum.photos/id/311/200/200.jpg?hmac=CHiYGYQ3Xpesshw5eYWH7U0Kyl9zMTZLQuRDU4OtyH8",
          relationship: "가족",
          content: "열심히 일하는 모습 멋있습니다.",
          font: "Pretendard",
          createdAt: "2023-11-01T08:05:25.399056Z",
        },
        {
          id: 31,
          recipientId: 2,
          sender: "이영준",
          profileImageURL:
            "https://fastly.picsum.photos/id/1025/200/200.jpg?hmac=VHJNaINoB_NM72EECUzBuWQKjTVB4_u2YOA1LxZTkcw",
          relationship: "지인",
          content: "항상 응원합니다",
          font: "Noto Sans",
          createdAt: "2023-11-01T08:04:12.852691Z",
        },
        {
          id: 33,
          recipientId: 2,
          sender: "박지민",
          profileImageURL:
            "https://fastly.picsum.photos/id/64/200/200.jpg?hmac=9TEnAyLXcBd9SojGrsZtF8L_q_pBEotwMA6HfbyR5tk",
          relationship: "친구",
          content: "잘하고 있어요!",
          font: "Arial",
          createdAt: "2023-11-01T08:03:10.123456Z",
        },
      ],
      reactionCount: 48,
      topReactions: [
        { id: 27, emoji: "😀", count: 14 },
        { id: 31, emoji: "😊", count: 11 },
        { id: 33, emoji: "👍", count: 10 },
      ],
    },
    {
      id: 2,
      name: "강영훈",
      backgroundColor: "#ECD9FF",
      backgroundImageURL: null,
      createdAt: "2023-10-26T13:19:31.401765Z",
      messageCount: 3,
      recentMessages: [
        {
          id: 32,
          recipientId: 2,
          sender: "김하은",
          profileImageURL:
            "https://fastly.picsum.photos/id/311/200/200.jpg?hmac=CHiYGYQ3Xpesshw5eYWH7U0Kyl9zMTZLQuRDU4OtyH8",
          relationship: "가족",
          content: "열심히 일하는 모습 멋있습니다.",
          font: "Pretendard",
          createdAt: "2023-11-01T08:05:25.399056Z",
        },
        {
          id: 31,
          recipientId: 2,
          sender: "이영준",
          profileImageURL:
            "https://fastly.picsum.photos/id/1025/200/200.jpg?hmac=VHJNaINoB_NM72EECUzBuWQKjTVB4_u2YOA1LxZTkcw",
          relationship: "지인",
          content: "항상 응원합니다",
          font: "Noto Sans",
          createdAt: "2023-11-01T08:04:12.852691Z",
        },
        {
          id: 33,
          recipientId: 2,
          sender: "박지민",
          profileImageURL:
            "https://fastly.picsum.photos/id/64/200/200.jpg?hmac=9TEnAyLXcBd9SojGrsZtF8L_q_pBEotwMA6HfbyR5tk",
          relationship: "친구",
          content: "잘하고 있어요!",
          font: "Arial",
          createdAt: "2023-11-01T08:03:10.123456Z",
        },
      ],
      reactionCount: 48,
      topReactions: [
        { id: 27, emoji: "😀", count: 14 },
        { id: 31, emoji: "😊", count: 11 },
        { id: 33, emoji: "👍", count: 10 },
      ],
    },
    {
      id: 2,
      name: "강영훈",
      backgroundColor: "#ECD9FF",
      backgroundImageURL: null,
      createdAt: "2023-10-26T13:19:31.401765Z",
      messageCount: 3,
      recentMessages: [
        {
          id: 32,
          recipientId: 2,
          sender: "김하은",
          profileImageURL:
            "https://fastly.picsum.photos/id/311/200/200.jpg?hmac=CHiYGYQ3Xpesshw5eYWH7U0Kyl9zMTZLQuRDU4OtyH8",
          relationship: "가족",
          content: "열심히 일하는 모습 멋있습니다.",
          font: "Pretendard",
          createdAt: "2023-11-01T08:05:25.399056Z",
        },
        {
          id: 31,
          recipientId: 2,
          sender: "이영준",
          profileImageURL:
            "https://fastly.picsum.photos/id/1025/200/200.jpg?hmac=VHJNaINoB_NM72EECUzBuWQKjTVB4_u2YOA1LxZTkcw",
          relationship: "지인",
          content: "항상 응원합니다",
          font: "Noto Sans",
          createdAt: "2023-11-01T08:04:12.852691Z",
        },
        {
          id: 33,
          recipientId: 2,
          sender: "박지민",
          profileImageURL:
            "https://fastly.picsum.photos/id/64/200/200.jpg?hmac=9TEnAyLXcBd9SojGrsZtF8L_q_pBEotwMA6HfbyR5tk",
          relationship: "친구",
          content: "잘하고 있어요!",
          font: "Arial",
          createdAt: "2023-11-01T08:03:10.123456Z",
        },
      ],
      reactionCount: 48,
      topReactions: [
        { id: 27, emoji: "😀", count: 14 },
        { id: 31, emoji: "😊", count: 11 },
        { id: 33, emoji: "👍", count: 10 },
      ],
    },
  ];

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = createDummyData(); // getList 대신 더미 데이터 사용
        setLatestList(data);
      } catch (err) {
        setError("데이터를 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="pl-5 flex gap-3 overflow-x-auto scrollbar-hide min-[376px]:gap-5 min-[1025px]:overflow-x-hidden min-[1025px]:max-w-[1190px]">
      {latestList.map((item) => (
        <div
          key={item.id}
          className="flex flex-col border-black/[.10] border-[1px] gap-3 pt-[30px] pl-[24px] rounded-2xl min-w-[208px] h-[232px] min-[376px]:min-w-[275px] min-[376px]:min-h-[260px] bg-white shadow-md"
          style={{ backgroundColor: item.backgroundColor }}
        >
          {/* 받는 사람 */}
          <div className="font-bold text-gray900 text-lg leading-7 min-[376px]:text-2xl min-[376px]:leading-9">
            To. {item.name}
          </div>
          {/* 프로필 이미지 섹션 */}
          <div className="flex -space-x-3">
            {item.recentMessages.slice(0, 3).map((message) => (
              <img
                key={message.id}
                src={message.profileImageURL}
                alt={message.sender}
                className="w-7 h-7 rounded-full border-2 border-white"
              />
            ))}
            {item.recentMessages.length > 3 && (
              <span className="w-8 h-7 rounded-[30px] bg-white text-gray500 text-xs flex justify-center items-center">
                +{item.recentMessages.length - 3}
              </span>
            )}
          </div>
          <div className="text-sm font-regular text-gray700 min-[376px]:text-base">
            {item.messageCount}명이 작성했어요!
          </div>
          {/* 리액션 섹션 */}
          <div className="flex w-[162px] space-x-1 border-black/[.12] border-t-[1px] pt-[17px] mt-[21px] min-[376px]:w-[227px] min-[376px]:space-x-1.5">
            {item.topReactions.map((reaction) => (
              <div
                key={reaction.id}
                className="flex items-center justify-center space-x-1 bg-black/50 w-[53px] h-[32px] rounded-full text-white text-sm min-[376px]:text-base min-[376px]:w-[65px] min-[376px]:h-[36px]"
              >
                <span>{reaction.emoji}</span>
                <span>{reaction.count}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default LatestList;

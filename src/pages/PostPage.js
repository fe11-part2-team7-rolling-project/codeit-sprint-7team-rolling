import React, {useState} from 'react';
import Logo from "../components/Layout/Logo";
import plusCircle from "../assets/pluscircle.svg";
import sampleImage01 from "../assets/sample_Image_01.jpg";
import sampleImage02 from "../assets/sample_Image_02.jpg";

function PostHeader() {
  return <header className="bg-white shadow-md w-full py-4 px-6 md:px-24 lg:px-48">
    <div className="flex justify-between items-center max-w-7xl mx-auto">
      <Logo/>
    </div>
  </header>
}

function PostPage() {
  const colors = [
    {idx: 0, cls: 'bg-beige300', name: 'beige'},
    {idx: 1, cls: 'bg-purple300', name: 'purple'},
    {idx: 2, cls: 'bg-blue300', name: 'blue'},
    {idx: 3, cls: 'bg-green300', name: 'green'}
  ];
  const images = [
    {idx: 0, link: sampleImage01},
    {idx: 1, link: sampleImage02},
    {idx: 2, link: sampleImage01},
    {idx: 3, link: sampleImage02},
  ]
  const [name, setName] = useState('')
  const [userStartTyping, setUserStartTyping] = useState(false)
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isColor, setIsColor] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const submit = async () => {
    if (isProcessing) return;
    setIsProcessing(true);
    console.log(name)
    console.log(selectedIdx)

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
  }
  const handleFocusout = () => {
    setUserStartTyping(true)
  }
  return <div className="bg-gray-100 min-h-screen">
    <PostHeader/>
    <main className="flex flex-col items-start py-8 px-4 sm:px-6 md:px-16 lg:px-24">
      <h2 className="text-xl font-semibold mb-2">To.</h2>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="받는 사람 이름을 입력해주세요"
        onBlur={() => handleFocusout()}
             className={`w-full border-2 rounded-lg px-4 py-2 focus:outline-none mb-3 ${
               userStartTyping && name.length === 0 ? 'border-error' : 'border-gray300'
             }`}
      />
      {userStartTyping && name.length === 0 && <p className="text-error mb-3 text-sm">값을 입력해 주세요</p>}
      <h2 className="text-xl font-semibold mb-2">배경화면을 선택해 주세요.</h2>
      <div className="text-red500">컬러를 선택하거나, 이미지를 선택할 수 있습니다.</div>
      <div className="flex-row">
        <button type="button"
                className={`py-2 ${isColor ? 'text-purple600' : 'text-gray300'}`}
                onClick={() => setIsColor(true)}>컬러</button>
        <button type="button" className={!isColor ? 'text-blue500' : ''} onClick={() => setIsColor(false)}>이미지</button>
      </div>
      <div className="flex-row">
        {isColor && colors.map(color => <button type="button" onClick={() => setSelectedIdx(color.idx)}
                                                className={`${color.cls} w-10 h-10`}>
          {selectedIdx === color.idx && <img src={plusCircle} alt="추가 아이콘" className="w-6 h-6"/>}
        </button>)}
      </div>

      <div className="flex-row">
      {!isColor && images.map(image => <button type="button" onClick={() => setSelectedIdx(image.idx)} className="relative">
        <img className="w-10 h-10" alt={image.link} src={image.link}/>

        {selectedIdx === image.idx && <img src={plusCircle} alt="추가 아이콘" className="w-6 h-6 absolute top-0"/>}

      </button>)}
      </div>
      <button type="button" onClick={() => submit()} disabled={name.length === 0}
              className={`w-full bg-purple600 rounded-xl py-4 font-bold text-white ${
                name.length === 0 ? 'bg-gray300' : 'bg-purple600'
              }`}>생성하기</button>
    </main>
  </div>;

}

export default PostPage;
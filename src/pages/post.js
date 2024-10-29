import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBackgroundImagesApiResponse, postRecipientApiResponse, upLoadImg } from "../../util/api";
import styles from "./post.css";
import Input from "./components/Input";
import Button from "./components/Button";
import ToggleButton from "./components/ToggleButton";
import ColorOption from "./components/ColorOption";
import ImageOption from "./components/ImageOption";

const BUTTON_NAME = ["컬러", "이미지"];
const NEW_PAGE = {
  name: '',
  backgroundColor: 'beige',
  backgroundImageURL: null,
}
      
function Post() {
  const [inputValue, setInputValue] = useState("");
  const [selectedButtonName, setSelectedButtonName] = useState(BUTTON_NAME[0]);
  const [baseImages, setBaseImages] = useState([]);
  const [clickItem, setClickItem] = useState('beige');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputValue = (value) => setInputValue(value);
  const handleButtonClick = (e) => {
    if (selectedButtonName === BUTTON_NAME[1]) setClickItem('beige');
    if (selectedButtonName === BUTTON_NAME[0]) setClickItem('https://picsum.photos/id/683/3840/2160')
    setSelectedButtonName(e.target.innerText);
    setTimeout(() => {
      setIsLoading(true);
    }, 200);
  }

  const handleClick = (e) => {
    setClickItem(e.target.value);
  }

  const handleAddImageDataChange = async (e) => {
    const { files } = e.target;
    const uploadFile = files[0];

    if (!uploadFile) return;

      const newImageUrl = await upLoadImg(uploadFile);
      setBaseImages((prev) => ([newImageUrl, ...prev]));
    } 

  const getBaseImages = async () => {
    const { imageUrls } = await getBackgroundImagesApiResponse();
    
    if (!imageUrls) return;

    setBaseImages(imageUrls);
  }

  useEffect(() => {
    getBaseImages();
  }, [])

  const createRolling = async () => {
    NEW_PAGE.name = inputValue;
    if (clickItem.includes('http')) {
      NEW_PAGE.backgroundImageURL = clickItem;
    } else {
      NEW_PAGE.backgroundColor = clickItem;
      NEW_PAGE.backgroundImageURL = null;
    }
    
    const { id } = await postRecipientApiResponse(NEW_PAGE);

    if (!id) return;

    navigate(`/post/${id}`)
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.inputBox}>
          <div className={styles.inputName}>To. {inputValue}</div>
          <Input
            inputValue={inputValue}
            onInputValueChange={handleInputValue}
          />
        </div>

        <div className={styles.describeBackgroundInfo}>
          <h2 className={styles.describeTitle}>배경화면을 선택해 주세요</h2>
          <p className={styles.describeSubtitle}>
            컬러를 선택하거나, 이미지를 선택할 수 있습니다.
          </p>
        </div>
        <div className={styles.selectButton}>
          <ToggleButton list={BUTTON_NAME} selectedButtonName={selectedButtonName} onClick={handleButtonClick}/>
        </div>
        <div>
          {selectedButtonName === BUTTON_NAME[0]
            && <ColorOption clickItem={clickItem}
                            onClick={handleClick} />}
          {selectedButtonName === BUTTON_NAME[1]
            && <ImageOption clickItem={clickItem}
                            imageData={baseImages}
                            onChange={handleAddImageDataChange}
                            onClick={handleClick}
                            isLoading={isLoading} />}
        </div>

        <div className={styles.createButton}>
          <Button type="primary" height="tall" disabled={!inputValue} onClick={createRolling} >
            생성하기
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Post;

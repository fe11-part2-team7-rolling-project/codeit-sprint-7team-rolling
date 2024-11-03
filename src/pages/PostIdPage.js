import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Reactions from '../components/postIdPage/Reactions';
import Message from '../components/postIdPage/Message';
import Share from '../components/postIdPage/Share';
import { getRecipients } from '../api/recipientsApi';

const INITIAL_VALUES = {
  backgroundColor: '',
  backgroundImageURL: null,
  createdAt: '',
  id: 0,
  messageCount: 0,
  name: '',
  recentMessages: [],
  topReactions: [],
};

function PostIdPage({ initialValues = INITIAL_VALUES }) {
  const { id } = useParams();
  const [items, setItems] = useState(initialValues);
  const colorClassMap = {
    purple: 'bg-purple200',
    blue: 'bg-blue200',
    green: 'bg-green200',
    beige: 'bg-beige200',
  };

  useEffect(() => {
    async function fetchRecipientData() {
      try {
        const data = await getRecipients(id);
        setItems(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchRecipientData();
  }, [id]);

  return (
    <div className="w-full h-full">
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        draggable
        className="p-4"
      />
      <div className="sticky top-0 z-20">
        <div className="bg-white text-black w-full h-[52px] border-b border-gray200">
          <h1 className="flex flex-row items-center px-6 w-full h-full text-[18px] leading-[26px] font-regular">
            To. {items.name}
          </h1>
        </div>
        <div className="flex flex-row items-center justify-between bg-white text-black w-full h-[52px] border-b border-gray200">
          <Reactions />
          <Share items={items} />
        </div>
      </div>
      <div
        className={`w-full min-h-screen h-full bg-cover z-0 ${
          items.backgroundImageURL ? '' : colorClassMap[items.backgroundColor]
        }`}
        style={{
          backgroundImage: items.backgroundImageURL
            ? `url(${items.backgroundImageURL})`
            : 'none',
          backgroundSize: items.backgroundImageURL ? 'cover' : 'auto',
          backgroundPosition: 'center',
        }}
      >
        <Message />
      </div>
    </div>
  );
}

PostIdPage.propTypes = {
  initialValues: PropTypes.shape({
    backgroundColor: PropTypes.string,
    backgroundImageURL: PropTypes.string,
    createdAt: PropTypes.string,
    id: PropTypes.number,
    messageCount: PropTypes.number,
    name: PropTypes.string,
    recentMessages: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        recipientId: PropTypes.number,
        sender: PropTypes.string,
        profileImageURL: PropTypes.string,
        relationship: PropTypes.string,
        content: PropTypes.string,
        font: PropTypes.string,
        createdAt: PropTypes.string,
      }),
    ),
    topReactions: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        emoji: PropTypes.string,
        count: PropTypes.number,
      }),
    ),
  }),
};

export default PostIdPage;

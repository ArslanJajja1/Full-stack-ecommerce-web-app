import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';

const Search = ({ navMode }) => {
  const [open, setOpen] = useState(false);
  const { search } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { text } = search;
  const handleChange = (e) => {
    dispatch({ type: 'SEARCH_QUERY', payload: { text: e.target.value } });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(false);
    navigate(`/shop?${text}`);
  };
  return (
    <>
      <form className="h-100 text-center d-flex align-items-center" onSubmit={handleSubmit}>
        {navMode === 'vertical' && (
          <p onClick={() => setOpen(true)} className="text-dark">
            <span>🔍</span>
            <span className="px-2 font-weight-bold">Search</span>
          </p>
        )}
        {navMode !== 'vertical' && (
          <SearchOutlined
            onClick={() => setOpen(true)}
            style={{ cursor: 'pointer', fontWeight: 'bold', fontSize: '15px', textAlign: 'center' }}
            className="font-weight-bold"
          />
        )}
        <Modal
          title="Search , What you are thinking... 🤔"
          centered
          open={open}
          onOk={handleSubmit}
          onCancel={() => setOpen(false)}
          width={1000}
          style={{ opacity: '90%', textAlign: 'center' }}
        >
          <input
            type="search"
            value={text}
            onChange={handleChange}
            className="form-control mr-sm-2 font-weight-bold font-italic"
            placeholder="Search Products 🔍"
          />
        </Modal>
      </form>
    </>
  );
};

export default Search;

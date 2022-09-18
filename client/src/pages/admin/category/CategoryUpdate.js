import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { getCategory, updateCategory } from '../../../functions/category';
import CategoryForm from '../../../components/forms/CategoryForm';
import { LoadingOutlined } from '@ant-design/icons';

const initialState = {
  name: '',
  images: [],
};
const CategoryUpdate = () => {
  const [values, setValues] = useState(initialState);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const param = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));
  const slug = param.slug;
  useEffect(() => {
    loadCategory();
    console.log('Slug ', slug);
  }, []);
  const loadCategory = () => {
    getCategory(slug).then((res) => {
      setName(res.data.name);
      setValues({ ...values, ...res.data });
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    updateCategory(slug, values, user.token)
      .then((res) => {
        setLoading(false);
        setName('');
        setValues({ name: '', images: [] });
        toast.success(`${res.data.name} updated`);
        navigate('/admin/category');
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          {imageLoading ? <LoadingOutlined className="text-danger h1" /> : <h4 className="text-white">Create Update</h4>}
          <CategoryForm
            values={values}
            setValues={setValues}
            setImageLoading={setImageLoading}
            handleSubmit={handleSubmit}
            loading={loading}
            handleChange={handleChange}
          />
          <hr />
        </div>
      </div>
    </div>
  );
};

export default CategoryUpdate;

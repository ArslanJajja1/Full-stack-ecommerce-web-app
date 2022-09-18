import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { EditOutlined, DeleteOutlined, LoadingOutlined } from '@ant-design/icons';
import { updateSubCategory, getSubCategory } from '../../../functions/subCategory';
import { getCategories } from '../../../functions/category';
import CategoryForm from '../../../components/forms/CategoryForm';
import LocalSearch from '../../../components/forms/LocalSearch';

const initialState = {
  name: '',
  images: [],
};
const SubCategoryUpdate = () => {
  const [values, setValues] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const [parent, setParent] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  const param = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    loadCategories();
    loadSubCategory();
  }, []);
  const loadCategories = () => {
    getCategories().then((res) => setCategories(res.data));
  };
  const loadSubCategory = () => {
    getSubCategory(param.slug).then((s) => {
      setValues(s.data.sub);
      setParent(s.data.parent);
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    updateSubCategory(param.slug, { ...values, parent }, user.token)
      .then((res) => {
        setLoading(false);
        setValues({ name: '', images: [] });
        console.log('res===>', res);
        toast.success(`${res.data.name} updated`);
        navigate('/admin/subcategory');
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
    <div className="container-fluid mt-2">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          {imageLoading ? <LoadingOutlined className="text-danger h1" /> : <h4 className="text-white">Update Sub Category</h4>}
          <div className="form-group">
            <label htmlFor="category" className="text-white font-weight-bold">
              Parent Category
            </label>
            <select
              name="category"
              id="category"
              className="form-control border-bottom text-white"
              style={{ backgroundColor: '#2c2c6c' }}
              onChange={(e) => setParent(e.target.value)}
            >
              <option>Please select</option>
              {categories.length > 0 &&
                categories.map((c) => (
                  <option key={c._id} value={c._id} selected={c._id === parent}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>
          <CategoryForm
            values={values}
            setValues={setValues}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            loading={loading}
            setImageLoading={setImageLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default SubCategoryUpdate;

import React, { useState, useEffect } from 'react';
import { getProductsByCount, fetchProductsByFilter } from '../functions/product';
import { getCategories } from '../functions/category';
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../components/cards/ProductCard';
import { Menu, Slider, Checkbox, Radio } from 'antd';
import { DollarOutlined, DownSquareOutlined, StarOutlined } from '@ant-design/icons';
import Star from '../components/forms/Star';
import { getSubCategories } from '../functions/subCategory';

const { SubMenu, ItemGroup } = Menu;

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [star, setStar] = useState('');
  const [subs, setSubs] = useState([]);
  const [sub, setSub] = useState('');
  const [brand, setBrand] = useState('');
  const [color, setColor] = useState('');
  const [shipping, setShipping] = useState('');
  const [brands, setBrands] = useState(['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'ASUS']);
  const [colors, setColors] = useState(['Black', 'Brown', 'Silver', 'White', 'Blue']);
  const { search } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const { text } = search;
  const fetchProducts = (arg) => {
    fetchProductsByFilter(arg).then((res) => {
      setProducts(res.data);
    });
  };

  //1. Load products by default on page load;
  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(12).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };
  useEffect(() => {
    loadAllProducts();
    getCategories().then((res) => setCategories(res.data));
    getSubCategories().then((res) => setSubs(res.data));
  }, []);
  //2. Load product on search input change
  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchProducts({ query: text });
      if (!text) {
        loadAllProducts();
      }
    }, 300);
    return () => clearTimeout(delayed);
  }, [text]);
  //3. Load products based on price range
  useEffect(() => {
    fetchProducts({ price });
  }, [ok]);
  const handleSlider = (value) => {
    setCategoryIds([]);
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    setPrice(value);
    setStar('');
    setSub('');
    setBrand('');
    setColor('');
    setShipping('');
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };
  //4. Load products based on categories
  //show categories in a list of checkbox
  const showCategories = () =>
    categories.map((c) => (
      <div key={c._id}>
        <Checkbox
          onChange={handleCheck}
          className="pb-2 pl-4 pr-4"
          value={c._id}
          name="category"
          checked={categoryIds.includes(c._id)}
        >
          {c.name}
        </Checkbox>
        <br />
      </div>
    ));
  // handleCheck for categories
  const handleCheck = (e) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    setPrice([0, 0]);
    setStar('');
    setSub('');
    setBrand('');
    setColor('');
    setShipping('');
    let inTheState = [...categoryIds];
    let justChecked = e.target.value;
    let foundInTheState = inTheState.indexOf(justChecked);
    if (foundInTheState === -1) {
      inTheState.push(justChecked);
    } else {
      inTheState.splice(foundInTheState, 1);
    }
    setCategoryIds(inTheState);
    fetchProducts({ category: inTheState });
  };
  // 5. Show products by star rating
  const handleStarClick = (num) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar(num);
    setSub('');
    setBrand('');
    setColor('');
    setShipping('');
    fetchProducts({ stars: num });
  };
  const showStars = () => (
    <div className="pr-4 pl-4 pb-2">
      <Star starClick={handleStarClick} numberOfStars={1} />
      <Star starClick={handleStarClick} numberOfStars={2} />
      <Star starClick={handleStarClick} numberOfStars={3} />
      <Star starClick={handleStarClick} numberOfStars={4} />
      <Star starClick={handleStarClick} numberOfStars={5} />
    </div>
  );
  // 6. show products by sub categories
  const showSubs = () =>
    subs.map((s) => (
      <div key={s._id} onClick={() => handleSub(s)} className="p-1 m-1 badge badge-secondary" style={{ cursor: 'pointer' }}>
        {s.name}
      </div>
    ));
  const handleSub = (sub) => {
    setSub(sub);
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar('');
    setBrand('');
    setColor('');
    setShipping('');
    fetchProducts({ sub });
  };
  // 7. show products based on brands
  const showBrands = () =>
    brands.map((b) => (
      <Radio key={`${b}#`} value={b} name={b} checked={b === brand} onChange={handleBrand} className="pb-1 pl-4 pr-5">
        {b}
      </Radio>
    ));
  const handleBrand = (e) => {
    setSub('');
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar('');
    setColor('');
    setShipping('');
    setBrand(e.target.value);
    fetchProducts({ brand: e.target.value });
  };
  //8. show products based on colors
  const showColors = () =>
    colors.map((c) => (
      <Radio key={`${c}#`} value={c} name={c} checked={c === color} onChange={handleColor} className="pb-1 pl-4 pr-5">
        {c}
      </Radio>
    ));
  const handleColor = (e) => {
    setSub('');
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar('');
    setBrand('');
    setShipping('');
    setColor(e.target.value);
    fetchProducts({ color: e.target.value });
  };
  //9 . show products based on shipping
  const showShipping = () => (
    <>
      <Checkbox className="pb-2 pl-4 pr-4" onChange={handleShipping} value="Yes" checked={shipping === 'Yes'}>
        Yes{' '}
      </Checkbox>
      <Checkbox className="pb-2 pl-4 pr-4" onChange={handleShipping} value="No" checked={shipping === 'No'}>
        No
      </Checkbox>
    </>
  );
  const handleShipping = (e) => {
    setSub('');
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar('');
    setBrand('');
    setColor('');
    setShipping(e.target.value);
    fetchProducts({ shipping: e.target.value });
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 pt-2">
          <h4>Search/Filter</h4>
          <hr />
          <Menu mode="inline" defaultOpenKeys={['1', '2', '3', '4', '5', '6', '7']}>
            {/* //Price submenu */}
            <SubMenu
              key="1"
              title={
                <span className="h6">
                  <DollarOutlined /> Price
                </span>
              }
            >
              <div>
                <Slider
                  className="ml-4 mr-4"
                  tipFormatter={(v) => `$${v}`}
                  range
                  value={price}
                  onChange={handleSlider}
                  max="3000"
                />
              </div>
            </SubMenu>
            {/* // categories submenu */}
            <SubMenu
              key="2"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Categories
                </span>
              }
            >
              <div>{showCategories()}</div>
            </SubMenu>
            {/* // stars submenu */}
            <SubMenu
              key="3"
              title={
                <span className="h6">
                  <StarOutlined /> Ratings
                </span>
              }
            >
              <div>{showStars()}</div>
            </SubMenu>
            {/* // sub categories submenu */}
            <SubMenu
              key="4"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Sub Categories
                </span>
              }
            >
              <div className="pl-4 pr-4">{showSubs()}</div>
            </SubMenu>
            {/* // Brands submenu */}
            <SubMenu
              key="5"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Brands
                </span>
              }
            >
              <div className="pr-4">{showBrands()}</div>
            </SubMenu>
            {/* // Colors submenu */}
            <SubMenu
              key="6"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Colors
                </span>
              }
            >
              <div className="pr-4">{showColors()}</div>
            </SubMenu>
            {/* // Colors submenu */}
            <SubMenu
              key="7"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Shipping
                </span>
              }
            >
              <div className="pr-4">{showShipping()}</div>
            </SubMenu>
          </Menu>
        </div>
        <div className="col-md-9 pt-2">
          {loading ? <h4 className="text-danger">Loading...</h4> : <h4 className="text-danger">Products</h4>}
          {products.length < 1 && <p>No products Found</p>}
          <div className="row pb-5">
            {products.map((p) => (
              <div key={p._id} className="col-md-4 mt-3">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;

import React from 'react';
import FileUpload from './FileUpload';
const CategoryForm = ({ values, setValues, setImageLoading, loading, handleSubmit, handleChange }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group text-white">
        <label htmlFor="name" className="font-weight-bold">
          Name
        </label>
        <input
          type="text"
          className="form-control text-white "
          id="name"
          name="name"
          placeholder="Enter Name"
          value={values.name}
          onChange={handleChange}
          autoFocus
          required
        />
        <br />
        <FileUpload values={values} setValues={setValues} setImageLoading={setImageLoading} />
        <br />
        <button
          type="submit"
          style={{ color: '#2c2c6c', letterSpacing: '1px' }}
          className="btn mt-2 bg-white font-weight-bold btn-raised"
        >
          {loading ? 'Loading...' : 'Save'}
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;

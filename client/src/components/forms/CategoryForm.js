import React from 'react';
import FileUpload from './FileUpload';
const CategoryForm = ({ values, setValues, setImageLoading, loading, handleSubmit, handleChange }) => {
  console.log('valuesssss', values);
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group text-white">
        <label htmlFor="name" className="font-weight-bold">
          Name
        </label>
        <input
          type="text"
          className="form-control text-white border-bottom"
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
        <button type="submit" className="btn bg-info btn-raised text-white">
          {loading ? 'Loading...' : 'Save'}
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;

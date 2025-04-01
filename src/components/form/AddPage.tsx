import Input from "../UI/input/Input";
import form from "./formcus.module.scss";
import { useAddPage } from "./useAddPage";
import LoadingSpinner from "../UI/loadingSpinner/LoadingSpinner"; // Import the spinner
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { pageDetails } from "../../service/apis/page.api";
import { useEffect } from "react";
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';

const AddPage = () => {
  
  const params = useParams();
  const { id } = params;
  const { addPageFormik, loading } = useAddPage(id);
  useEffect(()=>{
    if(addPageFormik.submitCount===0){
      addPageFormik.setErrors({})
    }
    
  },[addPageFormik]);
  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      ['link', 'image', 'video', 'formula'],

      [{ 'header': 1 }, { 'header': 2 }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],

      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      [{ 'color': [] }, { 'background': [] }],
      [{ 'font': [] }],
      [{ 'align': [] }],

      ['clean']
    ],
    clipboard: {

      matchVisual: false,
    }
  };
  return (
    <div id="updatePage" className={form.myprofilewrapper}>
      <div className='profile-card'>
        <div className={form.profile_flex}>
        <h2>{id ? "Update Page" : "Add Page"}</h2>
          <Link to='/admin/pages'>
            <button className={form.back_btn}>Back</button>
          </Link>
        </div>

        <form onSubmit={addPageFormik.handleSubmit} autoComplete='off'>
          <div className={form.profileform}>
            <div className={`${form.profileformcol} ${form.fullWidth} p-0`}>
              <div className='formgrp'>
                <Input
                  type={"text"}
                  title ='Title'
                  id='title'
                  placeholder={"Enter Title"}
                  name='title'
                  required= {true}
                  onChange={addPageFormik.handleChange}
                  value={addPageFormik.values.title}
                  errorMsg={addPageFormik.errors.title}
                />
              </div>
            </div>
            <div className={`${form.profileformcol} ${form.fullWidth} updatePagecontent`}>
              <div className="formgrp">
                <label htmlFor="description">Description</label>

                <ReactQuill
                id={'description'}
                value={addPageFormik.values.description}
                onChange={(value:string) => addPageFormik.setFieldValue('description', value)}
                placeholder="Enter content"
                theme="snow" // Default theme, can be customized
                modules={modules}
              />
              {addPageFormik.errors.description &&
              addPageFormik.touched.description && (
                <span className={form.errorText} style={{ color: "red" }}>
                  {addPageFormik.errors.description}
                </span>
              )}
              </div>
            </div>       
          </div>

          {loading ? (
            <LoadingSpinner />
          ) : (
            <button className={form.upbtn}>{id ? "Update" : "Save"}</button>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddPage;

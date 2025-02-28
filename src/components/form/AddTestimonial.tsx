import Input from "../UI/input/Input";
import form from "./formcus.module.scss";
import { useAddTestimonial } from "./useAddTestimonial";
import LoadingSpinner from "../UI/loadingSpinner/LoadingSpinner";
import { Link, Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';

const AddTesimonial = () => {
  const { addTestimonialFormik, loading } = useAddTestimonial();
  const { type, id } = useParams<{ type?: string; id?: string }>();
  const allowedTypes = ['add', 'edit'];
  if (typeof type !== 'string' || !allowedTypes.includes(type)) {
    return <Navigate to="/404" replace />;
  }
  useEffect(()=>{
      if(addTestimonialFormik.submitCount===0){
        addTestimonialFormik.setErrors({})
      }
    },[addTestimonialFormik]);
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
    <div id="editprofile" className={form.myprofilewrapper}>
      <div className='profile-card'>
        <div className={form.profile_flex}>
        <h2>{id ? "Update Testimonial" : "Add Testimonial"}</h2>
          <Link to='/admin/testimonials'>
            <button className={form.back_btn}>Back</button>
          </Link>
        </div>

        <form onSubmit={addTestimonialFormik.handleSubmit} autoComplete='off'>
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
                  onChange={addTestimonialFormik.handleChange}
                  value={addTestimonialFormik.values.title}
                  errorMsg={addTestimonialFormik.errors.title}
                />
              </div>
            </div>
            <div className={`${form.profileformcol} ${form.fullWidth} updatePagecontent`}>
              <div className="formgrp">
                <label htmlFor="description">Description</label>
                <ReactQuill
                  id={'description'}
                  value={addTestimonialFormik.values.description}
                  onChange={(value:string) => addTestimonialFormik.setFieldValue('description', value)}
                  placeholder="Enter content"
                  theme="snow" // Default theme, can be customized
                  modules={modules}
                />
                {addTestimonialFormik.errors.description &&
                  addTestimonialFormik.touched.description && (
                    <span className={form.errorText} style={{ color: "red" }}>
                      {addTestimonialFormik.errors.description}
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

export default AddTesimonial;

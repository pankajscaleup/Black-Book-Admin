import Input from "../UI/input/Input";
import form from "./formcus.module.scss";
import { useAddFaq } from "./useAddFaq";
import LoadingSpinner from "../UI/loadingSpinner/LoadingSpinner"; // Import the spinner
import { Link, Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';

const AddFaq = () => {
  const { addFaqFormik, loading } = useAddFaq();
  const { type, id } = useParams<{ type?: string; id?: string }>();
  const allowedTypes = ['add', 'edit'];
  if (typeof type !== 'string' || !allowedTypes.includes(type)) {
    // Redirect if type is invalid
    return <Navigate to="/404" replace />;
  }
  useEffect(()=>{
      if(addFaqFormik.submitCount===0){
        addFaqFormik.setErrors({})
      }
      
    },[addFaqFormik]);

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
        <h2>{id ? "Update Faq" : "Add Faq"}</h2>
          <Link to='/admin/faqs'>
            <button className={form.back_btn}>Back</button>
          </Link>
        </div>

        <form onSubmit={addFaqFormik.handleSubmit} autoComplete='off'>
          <div className={form.profileform}>
            <div className={`${form.profileformcol} ${form.fullWidth} p-0`}>
              <div className='formgrp'>
                <Input
                  type={"text"}
                  title ='Question'
                  id='question'
                  placeholder={"Enter Question"}
                  name='question'
                  required= {true}
                  onChange={addFaqFormik.handleChange}
                  value={addFaqFormik.values.question}
                  errorMsg={addFaqFormik.errors.question}
                />
              </div>
            </div>
            <div className={`${form.profileformcol} ${form.fullWidth} updatePagecontent`}>
              <div className="formgrp">
                <label htmlFor="answer">Answer</label>     
                  <ReactQuill
                  id={'answer'}
                  value={addFaqFormik.values.answer}
                  onChange={(value:string) => addFaqFormik.setFieldValue('answer', value)}
                  placeholder="Enter content"
                  theme="snow" // Default theme, can be customized
                  modules={modules}
                />
                {addFaqFormik.errors.answer &&
                  addFaqFormik.touched.answer && (
                    <span className={form.errorText} style={{ color: "red" }}>
                      {addFaqFormik.errors.answer}
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

export default AddFaq;

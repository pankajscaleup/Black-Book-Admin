import Input from "../UI/input/Input";
import form from "./formcus.module.scss";
import { useAddTestimonial } from "./useAddTestimonial";
import LoadingSpinner from "../UI/loadingSpinner/LoadingSpinner";
import { Link, Navigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

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
            <div className={`${form.profileformcol} ${form.fullWidth}`}>
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
            <div className={`${form.profileformcol} ${form.fullWidth}`}>
              <div className="formgrp">
                <label htmlFor="description">Description</label>
                <Editor
                  id="description"
                  apiKey="7rfniqex5btxrikbi2pjfr6yrak5gwdh0ikqm8u93hbmcqye"
                  value={addTestimonialFormik.values.description}
                  init={{
                    height: 300,
                    menubar: false,
                    plugins: 'preview importcss searchreplace autolink directionality code visualblocks visualchars fullscreen link table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons accordion',
                    toolbar:
                        "undo redo | accordion accordionremove | blocks fontfamily fontsize | bold italic underline strikethrough | align numlist bullist | link | table media | lineheight outdent indent| forecolor backcolor removeformat | charmap emoticons | code fullscreen preview | pagebreak anchor codesample | ltr rtl",
                    placeholder: 'Enter description here...',
                    block_formats: 'Paragraph=p;Header 1=h1;Header 2=h2;Header 3=h3'
                    
                  }}
                  onEditorChange={(content) => {
                    addTestimonialFormik.setFieldValue('description', content);
                    addTestimonialFormik.setFieldTouched('description', true);
                  }}
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

import Input from "../UI/input/Input";
import form from "./formcus.module.scss";
import { useAddFaq } from "./useAddFaq";
import LoadingSpinner from "../UI/loadingSpinner/LoadingSpinner"; // Import the spinner
import { Link, Navigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import { useParams } from "react-router-dom";
const AddFaq = () => {
  const { addFaqFormik, loading } = useAddFaq();
  const params = useParams();
  const { type, id } = useParams<{ type?: string; id?: string }>();
  const allowedTypes = ['add', 'edit'];
  if (typeof type !== 'string' || !allowedTypes.includes(type)) {
    // Redirect if type is invalid
    return <Navigate to="/404" replace />;
  }

  return (
    <div className={form.myprofilewrapper}>
      <div className='profile-card'>
        <div className={form.profile_flex}>
        <h2>{id ? "Update Faq" : "Add Faq"}</h2>
          <Link to='/admin/faqs'>
            <button className={form.back_btn}>Back</button>
          </Link>
        </div>

        <form onSubmit={addFaqFormik.handleSubmit} autoComplete='off'>
          <div className={form.profileform}>
            <div className={`${form.profileformcol} ${form.fullWidth}`}>
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
            <div className={`${form.profileformcol} ${form.fullWidth}`}>
              <div className="formgrp">
                <label htmlFor="answer">Answer</label>
                <Editor
                  id="answer"
                  apiKey="7rfniqex5btxrikbi2pjfr6yrak5gwdh0ikqm8u93hbmcqye"
                  value={addFaqFormik.values.answer}
                  init={{
                    height: 300,
                    menubar: false,
                    plugins: 'preview importcss searchreplace autolink directionality code visualblocks visualchars fullscreen link table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons accordion',
                    toolbar:
                        "undo redo | accordion accordionremove | blocks fontfamily fontsize | bold italic underline strikethrough | align numlist bullist | link | table media | lineheight outdent indent| forecolor backcolor removeformat | charmap emoticons | code fullscreen preview | pagebreak anchor codesample | ltr rtl",
                    placeholder: 'Enter job description here...',
                    block_formats: 'Paragraph=p;Header 1=h1;Header 2=h2;Header 3=h3'
                    
                  }}
                  onEditorChange={(content) => {
                    addFaqFormik.setFieldValue('answer', content);
                    addFaqFormik.setFieldTouched('answer', true);
                  }}
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

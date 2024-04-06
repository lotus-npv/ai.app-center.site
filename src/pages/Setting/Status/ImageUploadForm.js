import React, { useState } from "react"
import axios from "axios"
import { FileUpload } from "primereact/fileupload"
// //redux
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function ImageUploadForm() {
  const [selectedFile, setSelectedFile] = useState(null)
  const notifySuccess = () =>
    toast.success("Avata Upload Successfully", { autoClose: 2000 })
  const notifyError = () =>
    toast.error("Avata Upload Fall", { autoClose: 2000 })

  const handleFileChange = event => {
    const f = event.target.files[0]
    setSelectedFile(f)
    console.log(f)
  }

  const handleSubmitAvata = async event => {
    event.preventDefault()

    if (!selectedFile) {
      alert("Please select a file.")
      return
    }

    const formData = new FormData()
    formData.append("image", selectedFile)

    try {
      await axios.post("http://localhost:3010/upload/avata", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      notifySuccess()
    } catch (error) {
      console.error("Error uploading file:", error)
      notifyError()
    }
  }
  const [file, setFile] = useState()

  const handleSubmitDocument = async event => {
    event.preventDefault()

    if (!file) {
      alert("Please select a file.")
      return
    }

    const formData = new FormData()
    formData.append("file", file)

    try {
      await axios.post("http://localhost:3010/upload/document", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      notifySuccess()
    } catch (error) {
      console.error("Error uploading file:", error)
      notifyError()
    }
  }

  

  console.log('file', file);

  return (
    <div>
      {/* <form onSubmit={handleSubmitAvata}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload avata</button>
      </form>
      <form onSubmit={handleSubmitDocument}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload file</button>
      </form> */}
      <div className="card">
        <FileUpload
          name="demo[]"
          url={"http://localhost:3010/upload/document"}
          multiple={false}
          accept="image/*"
          maxFileSize={1000000}
          emptyTemplate={
            <p className="m-0">Drag and drop files to here to upload.</p>
          }
          onSelect={e => {
            console.log(e.files);
            setFile(e.files[0])
          }}
          customUpload={handleSubmitDocument}
        />
      </div>
      <ToastContainer />
    </div>
  )
}

export default ImageUploadForm

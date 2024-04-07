import React, { useState, useRef } from "react"
import axios from "axios"
import { FileUpload } from "primereact/fileupload"
import { Toast } from "primereact/toast"
import { ProgressBar } from "primereact/progressbar"
import { Button } from "primereact/button"
import { Tooltip } from "primereact/tooltip"
import { Tag } from "primereact/tag"
// //redux
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function ImageUploadForm() {
  const maxFileSize = 1000000
  const [selectedFile, setSelectedFile] = useState(null)
  const [file, setFile] = useState()
  const toast = useRef(null)
  const [totalSize, setTotalSize] = useState(0)
  const fileUploadRef = useRef(null)
  const [selectDocument, setSelectDocument] = useState()

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
      setFile(null)
    } catch (error) {
      console.error("Error uploading file:", error)
      notifyError()
    }
  }

  const onTemplateSelect = e => {
    let _totalSize = 0;
    let files = e.files
    console.log('files', files);
    setSelectDocument(files)
    
    Object.keys(files).forEach(key => {
      _totalSize += files[key].size || 0
    })

    setTotalSize(_totalSize)
  }

  const onTemplateUpload = e => {
    let _totalSize = 0

    e.files.forEach(file => {
      _totalSize += file.size || 0
    })

    setTotalSize(_totalSize)
    toast.current.show({
      severity: "info",
      summary: "Success",
      detail: "File Uploaded",
    })
  }

  const onTemplateRemove = (file, callback) => {
    setTotalSize(totalSize - file.size)
    callback()
  }

  const onTemplateClear = () => {
    setTotalSize(0)
  }

  const headerTemplate = options => {
    const { className, chooseButton, uploadButton, cancelButton } = options
    const value = totalSize / 10000
    const formatedValue =
      fileUploadRef && fileUploadRef.current
        ? fileUploadRef.current.formatSize(totalSize)
        : "0 B"

    return (
      <div
        className={className}
        style={{
          backgroundColor: "transparent",
          display: "flex",
          alignItems: "center",
        }}
      >
        {chooseButton}
        {cancelButton}
        <div className="flex align-items-center gap-3 ml-auto">
          <span>
            {formatedValue} / {maxFileSize / 1000000} MB
          </span>
          <ProgressBar
            value={value}
            showValue={false}
            style={{ width: "10rem", height: "12px" }}
          ></ProgressBar>
        </div>
      </div>
    )
  }

  const itemTemplate = (file, props) => {
    return (
      <div className="flex align-items-center flex-wrap">
        <div className="flex align-items-center" style={{ width: "40%" }}>
          <img
            alt={file.name}
            role="presentation"
            src={file.objectURL}
            width={100}
          />
          <span className="flex flex-column text-left ml-3">
            {file.name}
            <small>{new Date().toLocaleDateString()}</small>
          </span>
        </div>
        <Tag
          value={props.formatSize}
          severity="warning"
          className="px-3 py-2"
        />
        <Button
          type="button"
          icon="pi pi-times"
          className="p-button-outlined p-button-rounded p-button-danger ml-auto"
          onClick={() => onTemplateRemove(file, props.onRemove)}
        />
      </div>
    )
  }

  const emptyTemplate = () => {
    return (
      <div className="flex align-items-center flex-column">
        <i
          className="pi pi-image mt-1 p-2"
          style={{
            fontSize: "2em",
            borderRadius: "50%",
            backgroundColor: "var(--surface-b)",
            color: "var(--surface-d)",
          }}
        ></i>
        <span
          style={{ fontSize: "1.2em", color: "var(--text-color-secondary)" }}
          className="my-1"
        >
          Drag and Drop File Here
        </span>
      </div>
    )
  }

  const chooseOptions = {
    icon: "pi pi-fw pi-paperclip",
    iconOnly: true,
    className: "custom-choose-btn p-button-rounded p-button-outlined",
  }

  const cancelOptions = {
    icon: "pi pi-fw pi-times",
    iconOnly: true,
    className:
      "custom-cancel-btn p-button-danger p-button-rounded p-button-outlined",
  }

  console.log(totalSize)

  return (
    <div>
      <form onSubmit={handleSubmitDocument}>
        <div>
          <Toast ref={toast}></Toast>

          <Tooltip
            target=".custom-choose-btn"
            content="Choose"
            position="bottom"
          />
          <Tooltip
            target=".custom-cancel-btn"
            content="Clear"
            position="bottom"
          />

          <FileUpload
            ref={fileUploadRef}
            name="demo[]"
            url="/api/upload"
            multiple
            accept="*"
            maxFileSize={maxFileSize}
            // onUpload={onTemplateUpload}
            onSelect={onTemplateSelect}
            onError={onTemplateClear}
            onClear={onTemplateClear}
            headerTemplate={headerTemplate}
            itemTemplate={itemTemplate}
            emptyTemplate={emptyTemplate}
            // emptyTemplate={() => (
            //   <p className="m-0">Drag and drop files to here to upload.</p>
            // )}
            chooseOptions={chooseOptions}
            cancelOptions={cancelOptions}
          />
        </div>

        <Button type="submit">Upload</Button>
      </form>

      <ToastContainer />
    </div>
  )
}

export default ImageUploadForm

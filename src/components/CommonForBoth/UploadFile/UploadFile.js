import React, { useState, useRef, useEffect } from "react"
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

function UploadFile({ getFiles, onUpload }) {
  const maxFileSize = 5000000
  const toast = useRef(null)
  const [totalSize, setTotalSize] = useState(0)
  const fileUploadRef = useRef(null)

  const onTemplateSelect = e => {
    let _totalSize = 0
    let files = e.files
    getFiles(files)

    Object.keys(files).forEach(key => {
      _totalSize += files[key].size || 0
    })

    if (_totalSize > maxFileSize) {
      onUpload(false)
    }

    setTotalSize(_totalSize)
  }

  const onTemplateRemove = (file, callback) => {
    setTotalSize(totalSize - file.size)
    if (totalSize < maxFileSize) {
      onUpload(true)
    }
    callback()
  }

  const onTemplateClear = () => {
    setTotalSize(0)
    if (totalSize < maxFileSize) {
      onUpload(true)
    }
  }

  const headerTemplate = options => {
    const { className, chooseButton, uploadButton, cancelButton } = options
    const value = totalSize / (maxFileSize / 100)
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
          <span
            style={{
              color: totalSize < maxFileSize ? "green" : "red",
              fontWeight: "600",
            }}
          >
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
        <div className="flex align-items-center" style={{ width: "60%" }}>
          {file.type == "image/jpeg" || file.type == "image/png" || file.type == "image/jpg" ? (
            <img
              alt={file.name}
              role="presentation"
              src={file.objectURL}
              width={100}
            />
          ) : (
            <div className="flex justify-content-center" style={{width: '100px'}}>
              <i className="pi pi-paperclip me-1 font-size-24"/>
            </div>
          )}

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
      <div className="flex align-items-center flex-row justify-content-center gap-2">
        <i
          className="pi pi-cloud-upload mt-1 p-2"
          style={{
            fontSize: "1.5em",
            borderRadius: "50%",
            backgroundColor: "var(--surface-b)",
            color: "green",
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

  return (
    <div>
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
          onSelect={onTemplateSelect}
          onError={onTemplateClear}
          onClear={onTemplateClear}
          headerTemplate={headerTemplate}
          itemTemplate={itemTemplate}
          emptyTemplate={emptyTemplate}
          chooseOptions={chooseOptions}
          cancelOptions={cancelOptions}
        />
      </div>
      <ToastContainer />
    </div>
  )
}

export default UploadFile

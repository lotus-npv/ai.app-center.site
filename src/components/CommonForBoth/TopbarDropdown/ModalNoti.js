import React, { useMemo, useState, useEffect, useContext } from "react"
import {
  Card,
  CardBody,
  Row,
  Col,
  Modal,
  Label,
  Input,
  Button,
} from "reactstrap"
import { Link } from "react-router-dom"
import moment from "moment"
// import context
import DataContext from "data/DataContext"
import { useTranslation } from "react-i18next"
import avata2 from "../../../assets/images/icon/text.png"

const ModalNoti = ({ noti, user }) => {
  const { t } = useTranslation()

  // data context
  const { modal_noti, setmodal_noti, tog_modal_noti } = useContext(DataContext)
//   console.log(noti)

  return (
    <>
      <Modal
        isOpen={modal_noti}
        toggle={() => {
          tog_modal_noti()
        }}
      >
        <div className="modal-header bg-primary">
          <h4 className="modal-title mt-0 text-light" id="myModalLabel">
            Notification
          </h4>
          <button
            type="button"
            onClick={() => {
              tog_modal_noti()
            }}
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="mb-3">
          <Card>
            <CardBody>
              <div className="d-flex mb-4">
                <img
                  className="d-flex me-3 rounded-circle avatar-sm"
                  src={avata2}
                  alt="skote"
                />
                <div className="flex-grow-1">
                  <h5 className="font-size-14 mt-1">
                    {noti != null ? noti.title : ""}
                  </h5>
                  <small className="text-muted">
                    {user != null ? user.username : ""}
                  </small>
                </div>
              </div>
              <hr />
              <p>{noti != null ? noti.content : ""}</p>
              <p>
                <i className="mdi mdi-clock-outline" />{" "}
                {noti != null ? moment(noti.date_noti)
                  .utc("+09:00")
                  .format("HH:mm MM/DD/YYYY") : '00-00-00'}
              </p>

            </CardBody>
          </Card>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-primary "
            onClick={tog_modal_noti}
          >
            {t("Close")}
          </button>
        </div>
      </Modal>
    </>
  )
}

export default ModalNoti

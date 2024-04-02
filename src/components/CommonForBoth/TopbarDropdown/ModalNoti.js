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
import { Link } from "react-router-dom";
// import context
import DataContext from "data/DataContext"
import { useTranslation } from "react-i18next"
import avata2 from '../../../assets/images/icon/text.png'

const ModalNoti = ({noti}) => {
  const { t } = useTranslation()

  // data context
  const { modal_noti, setmodal_noti, tog_modal_noti } = useContext(DataContext)
  console.log(noti);

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
                  <h5 className="font-size-14 mt-1">{noti != null ? noti.title : ''}</h5>
                  <small className="text-muted">support@domain.com</small>
                </div>
              </div>

              <h4 className="mt-0 font-size-16">
                This Week&apos;s Top Stories
              </h4>

              <p>Dear Lorem Ipsum,</p>
              <p>
                Praesent dui ex, dapibus eget mauris ut, finibus vestibulum
                enim. Quisque arcu leo, facilisis in fringilla id, luctus in
                tortor. Nunc vestibulum est quis orci varius viverra. Curabitur
                dictum volutpat massa vulputate molestie. In at felis ac velit
                maximus convallis.
              </p>
              <p>Sincerly,</p>
              <hr />
            </CardBody>
          </Card>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-primary ">
            {t("Close")}
          </button>
        </div>
      </Modal>
    </>
  )
}

export default ModalNoti

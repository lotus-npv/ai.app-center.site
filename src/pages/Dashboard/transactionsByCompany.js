import React, { useState } from "react"
import {
  Col,
  Card,
  Nav,
  CardBody,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Table,
} from "reactstrap"
import classnames from "classnames"

//Simple bar
import SimpleBar from "simplebar-react"
import { transactionsDataALL, transactionsDataBuy, transactionsDataSell } from "common/data"
import "./dashboard.scss";

const TransactionsByCompany = ({ title , dataIntern, dataCharst}) => {
  const [activeTab, setactiveTab] = useState("1")

  const orderByIntern = _.orderBy(dataCharst, ['numberOfIntern'], 'desc');
  const orderByViolate = _.orderBy(dataCharst, ['numberOfViolate'], 'desc');

  return (
    <React.Fragment>
      <Card className="h-100">
        <CardBody>
          <h4 className="card-title mb-4">{title}</h4>

          <Nav pills className="bg-light rounded" role="tablist">
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === "1" })}
                onClick={() => {
                  setactiveTab("1")
                }}
              >
                Nhập cảnh
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active1: activeTab === "2" })}
                onClick={() => {
                  setactiveTab("2")
                }}
              >
                Vi phạm
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab} className="mt-4 h-100">
            <TabPane tabId="1">
              <SimpleBar style={{ maxHeight: "330px" }}>
                <div className="table-responsive  ">
                  <Table className="table align-middle table-nowrap h-100">
                    <thead>
                      <tr>
                        <td>
                          <div>
                            <h4 className="font-size-14 mb-1 fw-bold">Dispatching Company Name</h4>
                          </div>
                        </td>
                        <td>
                          <div>
                            <h4 className="font-size-14 mb-1 fw-bold text-end">Quantity</h4>
                          </div>
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        (orderByIntern || []).map((item, index) => (
                          <tr key={index}>
                            <td>
                              <div>
                                <h5 className="font-size-14 mb-1">{item.name} </h5>
                              </div>
                            </td>

                            <td>
                              <div className="text-end">
                                <h5 className="font-size-14 mb-0">{item.numberOfIntern}</h5>
                              </div>
                            </td>
                          </tr>
                        ))
                      }

                    </tbody>
                  </Table>
                </div>
              </SimpleBar>
            </TabPane>
            <TabPane tabId="2" >
              <SimpleBar style={{ maxHeight: "330px" }} >
                <div className="table-responsive" > 
                  <Table className="table align-middle table-nowrap" >
                    <thead>
                      <tr>
                        <td>
                          <div>
                            <h4 className="font-size-14 mb-1 fw-bold">Dispatching Company Name</h4>
                          </div>
                        </td>
                        <td>
                          <div>
                            <h4 className="font-size-14 mb-1 fw-bold text-end">Quantity</h4>
                          </div>
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        (orderByViolate || []).map((item, index) => (
                          <tr key={index}>
                            <td>
                              <div>
                                <h5 className="font-size-14 mb-1">{item.name} </h5>
                              </div>
                            </td>

                            <td>
                              <div className="text-end">
                                <h5 className="font-size-14 mb-0">{item.numberOfViolate}</h5>
                              </div>
                            </td>
                          </tr>
                        ))
                      }

                    </tbody>
                  </Table>
                </div>
              </SimpleBar>
            </TabPane>
          </TabContent>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

export default TransactionsByCompany

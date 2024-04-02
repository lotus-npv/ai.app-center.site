import React, { useEffect, useContext } from "react"
import { Container, Row } from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"
import Overview from "./Overview"
import DetailsSection from "./DetailsSection"

// //redux
import { useSelector, useDispatch, shallowEqual } from "react-redux"
import { getUsersId } from "store/actions"

const Profile = () => {
  const dispatch = useDispatch()
  const { userInfo, factoryData, companyData, syndicationData, internData } =
    useSelector(
      state => ({
        userInfo: state.Users.dataId,
      }),
      shallowEqual
    )

  useEffect(() => {
    dispatch(getUsersId(user.id))
  }, [])
  document.title = "Profile"
  const user = JSON.parse(localStorage.getItem("authUser"))[0]
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Profile" breadcrumbItem="Profile" />

          <Row>
            <Overview userInfo={userInfo} />
            <DetailsSection userInfo={userInfo} />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Profile

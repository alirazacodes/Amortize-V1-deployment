import React from "react";
// import { myStxAddress, userSession  } from "../../components/auth";

import { useState } from "react";

import { saveUserInfo } from "../../components/profile";

import { fetchUserInfo } from "../../components/profile";

import { myStxAddress } from "../../components/auth";

import { userSession } from "../_app";

import { v4 as uuid } from "uuid";

import getNFTS from "../../components/get-nfts";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import UserHeader from "components/Headers/UserHeader.js";

function Profile() {

  const [isFetching, setFetching] = useState(false);

  const nfts = getNFTS(myStxAddress());
  console.log(nfts);

  const [state, setState] = useState({
    Username: "",
    EmailAddress: "",
    FirstName: "",
    LastName: "",
  });

  if (!isFetching) {
    fetchUserInfo(userSession).then((userinfo) => {
      setState({
        Username: userinfo.Username,
        EmailAddress: userinfo.EmailAddress,
        FirstName: userinfo.FirstName,
        LastName: userinfo.LastName,
      });
    });
    setFetching(true);
    console.log("Tried Fetching");
  }

  const handleChange = (evt) => {
    const name = evt.target.name;
    const value = evt.target.value;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(state);

    const UserInfo = {
      Username: state.Username,
      EmailAddress: state.EmailAddress,
      FirstName: state.FirstName,
      LastName: state.LastName,
      id: uuid(),
    };

    if (userSession.isUserSignedIn()) {
      saveUserInfo(UserInfo).then((result) => {
        console.log(result);
      });
    }
    else
    {
      console.log('User is not Signed in!');
    }
  };

  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={require("assets/img/Amortize-pics/btc-amortize.jpeg")}
                      />
                    </a>
                  </div>
                </Col>
              </Row>
              <div></div>
              <CardBody className="pt-0 pt-md-4">
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                      <div>
                        <span className="heading">{nfts.length}</span>
                        <span className="description">Property Minted</span>
                      </div>
                      <div>
                        <span className="heading">89</span>
                        <span className="description">Coins</span>
                      </div>
                    </div>
                  </div>
                </Row>
                <div className="text-center">
                  <h3>
                    {state.FirstName} {state.LastName}
                  </h3>
                  <h4>
                    <span className="font-weight-light"> {state.Username}</span>
                  </h4>
                  <div className="h5 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    {state.EmailAddress}
                  </div>
                  <div className="h5 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    {/* {myStxAddress()} */}
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">My account</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={handleSubmit}
                      size="sm"
                    >
                      Submit
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    User information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Username
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-username"
                            placeholder="Username"
                            type="text"
                            name="Username"
                            onChange={handleChange}
                            // value={state.Username}
                            defaultValue={state.Username}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Email address
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-email"
                            placeholder="jesse@example.com"
                            type="email"
                            name="EmailAddress"
                            onChange={handleChange}
                            // value={state.EmailAddress}
                            defaultValue={state.EmailAddress}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            First name
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-first-name"
                            placeholder="First name"
                            type="text"
                            name="FirstName"
                            onChange={handleChange}
                            // value={state.FirstName}
                            defaultValue={state.FirstName}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Last name
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-last-name"
                            placeholder="Last name"
                            type="text"
                            name="LastName"
                            onChange={handleChange}
                            // value={state.LastName}
                            defaultValue={state.LastName}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

Profile.layout = Admin;

export default Profile;

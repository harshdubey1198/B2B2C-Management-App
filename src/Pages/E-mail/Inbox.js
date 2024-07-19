import React, { useState } from "react";

import {
  Card,
  CardBody,
  Col,
  Row,
  Container,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";

import { Link } from "react-router-dom";
import classnames from "classnames";
import InboxSidebar from "./Sidebar";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

const Inbox = () => {
  document.title = "Inbox  | aaMOBee";

  const [customActiveTab, setcustomActiveTab] = useState("1");

  const toggleCustom = (tab) => {
    if (customActiveTab !== tab) {
      setcustomActiveTab(tab);
    }
  };

  const [folderbtn, setfolderbtn] = useState(false);
  const [tagbtn, settagbtn] = useState(false);
  const [menubtn, setmenubtn] = useState(false);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Email" breadcrumbItem="Inbox" />
          <Row>
            {/* SideBar */}
            <InboxSidebar />
            <Col xl={9}>
              <div className="d-flex flex-wrap justify-content-between">
                <div className="btn-toolbar" role="toolbar">
                  <div className="btn-group me-2 mb-3">
                    <button
                      type="button"
                      className="btn btn-primary waves-light waves-effect"
                    >
                      <i className="fa fa-inbox"></i>
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary waves-light waves-effect"
                    >
                      <i className="fa fa-exclamation-circle"></i>
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary waves-light waves-effect"
                    >
                      <i className="far fa-trash-alt"></i>
                    </button>
                  </div>
                  <div className="btn-group me-2 mb-3">
                    <Dropdown
                      isOpen={folderbtn}
                      toggle={() => setfolderbtn(!folderbtn)}
                    >
                      <DropdownToggle className="btn" color="primary" caret>
                        <i className="fa fa-folder me-1"></i>{" "}
                        <i className="mdi mdi-chevron-down" />
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem>Updates</DropdownItem>
                        <DropdownItem>Social</DropdownItem>
                        <DropdownItem>Team Manage</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </div>

                <div
                  className="btn-toolbar justify-content-md-end"
                  role="toolbar"
                >
                  <div className="btn-group ms-md-2 mb-3">
                    <Dropdown
                      isOpen={tagbtn}
                      toggle={() => settagbtn(!tagbtn)}
                    >
                      <DropdownToggle className="btn" color="primary" caret>
                        <i className="fa fa-tag me-1"></i>{" "}
                        <i className="mdi mdi-chevron-down" />
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem>Updates</DropdownItem>
                        <DropdownItem>Social</DropdownItem>
                        <DropdownItem>Team Manage</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>

                  <div className="btn-group ms-2 mb-3">
                    <Dropdown
                      isOpen={menubtn}
                      toggle={() => setmenubtn(!menubtn)}
                    >
                      <DropdownToggle className="btn" color="primary" caret>
                        More <i className="mdi mdi-dots-vertical ms-1"></i>{" "}
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem>Mark as Unread</DropdownItem>
                        <DropdownItem>Mark as Important</DropdownItem>
                        <DropdownItem>Add to Tasks</DropdownItem>
                        <DropdownItem>Add Star</DropdownItem>
                        <DropdownItem>Mute</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </div>
              </div>



              <Card className="mb-0">
                <CardBody>
                  <Nav tabs className="nav-tabs-custom nav-justified">
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: customActiveTab === "1",
                        })}
                        onClick={() => {
                          toggleCustom("1");
                        }}
                      >
                        <i className="mdi mdi-inbox me-2 align-middle font-size-18">
                          {" "}
                        </i>
                        <span className="d-none d-md-inline-block">
                          {" "}
                          Primary{" "}
                        </span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: customActiveTab === "2",
                        })}
                        onClick={() => {
                          toggleCustom("2");
                        }}
                      >
                        <i className="mdi mdi-account-group-outline me-2 align-middle font-size-18"></i>{" "}
                        <span className="d-none d-md-inline-block">
                          Social
                        </span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: customActiveTab === "3",
                        })}
                        onClick={() => {
                          toggleCustom("3");
                        }}
                      >
                        <i className="mdi mdi-tag-multiple me-2 align-middle font-size-18"></i>{" "}
                        <span className="d-none d-md-inline-block">
                          Promotion{" "}
                        </span>
                      </NavLink>
                    </NavItem>

                  </Nav>

                  <TabContent
                    activeTab={customActiveTab}
                    className="pt-3 text-muted"
                  >
                    <TabPane tabId="1">
                      <Row>
                        <Col sm="12">
                          <div className="card-text mb-0">
                            <div
                              className="tab-pane active"
                              id="custom-primary"
                              role="tabpanel"
                            >
                              <ul className="message-list mb-0">
                                <li>
                                  <span className="col-mail col-mail-1">
                                    <span className="checkbox-wrapper-mail">
                                      <input type="checkbox" id="chk1" />
                                      <label
                                        htmlFor="chk1"
                                        className="toggle"
                                      ></label>
                                    </span>
                                    <Link to="#" className="title">
                                      Peter, me (3)
                                    </Link>
                                  </span>
                                  <div className="col-mail col-mail-2">
                                    <Link to="#" className="subject">
                                      Hello -{" "}
                                      <span className="teaser">
                                        Trip home from Colombo has been
                                        arranged, then Jenna will come get me
                                        from Stockholm. :)
                                      </span>
                                    </Link>
                                    <div className="date">Mar 6</div>
                                  </div>
                                </li>

                                <li>
                                  <div className="col-mail col-mail-1">
                                    <div className="checkbox-wrapper-mail">
                                      <input type="checkbox" id="chk2" />
                                      <label
                                        htmlFor="chk2"
                                        className="toggle"
                                      ></label>
                                    </div>
                                    <Link to="#" className="title">
                                      me, Susanna (7)
                                    </Link>
                                  </div>
                                  <div className="col-mail col-mail-2">
                                    <Link to="#" className="subject">
                                      <span className="bg-warning badge me-2">
                                        Freelance
                                      </span>
                                      Since you asked... and i'm inconceivably
                                      bored at the train station-
                                      <span className="teaser">
                                        Alright thanks. I'll have to re-book
                                        that somehow, i'll get back to you.
                                      </span>
                                    </Link>
                                    <div className="date">Mar. 6</div>
                                  </div>
                                </li>

                                <li>
                                  <div className="col-mail col-mail-1">
                                    <div className="checkbox-wrapper-mail">
                                      <input type="checkbox" id="chk3" />
                                      <label
                                        htmlFor="chk3"
                                        className="toggle"
                                      ></label>
                                    </div>
                                    <Link to="#" className="title">
                                      Web Support Dennis
                                    </Link>
                                  </div>
                                  <div className="col-mail col-mail-2">
                                    <Link to="#" className="subject">
                                      Re: New mail settings-
                                      <span className="teaser">
                                        Will you answer him asap?
                                      </span>
                                    </Link>
                                    <div className="date">Mar 7</div>
                                  </div>
                                </li>
                                <li>
                                  <div className="col-mail col-mail-1">
                                    <div className="checkbox-wrapper-mail">
                                      <input type="checkbox" id="chk4" />
                                      <label
                                        htmlFor="chk4"
                                        className="toggle"
                                      ></label>
                                    </div>
                                    <Link to="#" className="title">
                                      me, Peter (2)
                                    </Link>
                                  </div>
                                  <div className="col-mail col-mail-2">
                                    <Link to="#" className="subject">
                                      <span className="bg-info badge me-2">
                                        Support
                                      </span>
                                      Off on Thursday -
                                      <span className="teaser">
                                        Eff that place, you might as well stay
                                        here with us instead! Sent from my
                                        iPhone 4 4 mar 2014 at 5:55 pm
                                      </span>
                                    </Link>
                                    <div className="date">Mar 4</div>
                                  </div>
                                </li>
                                <li>
                                  <div className="col-mail col-mail-1">
                                    <div className="checkbox-wrapper-mail">
                                      <input type="checkbox" id="chk5" />
                                      <label
                                        htmlFor="chk5"
                                        className="toggle"
                                      ></label>
                                    </div>
                                    <Link to="#" className="title">
                                      Medium
                                    </Link>
                                  </div>
                                  <div className="col-mail col-mail-2">
                                    <Link to="#" className="subject">
                                      <span className="bg-primary badge me-2">
                                        Social
                                      </span>
                                      This Week's Top Stories-
                                      <span className="teaser">
                                        Our top pick for you on Medium this
                                        week The Man Who Destroyed America's
                                        Ego
                                      </span>
                                    </Link>
                                    <div className="date">Feb 28</div>
                                  </div>
                                </li>
                                <li>
                                  <div className="col-mail col-mail-1">
                                    <div className="checkbox-wrapper-mail">
                                      <input type="checkbox" id="chk6" />
                                      <label
                                        htmlFor="chk6"
                                        className="toggle"
                                      ></label>
                                    </div>
                                    <Link to="#" className="title">
                                      Death to Stock
                                    </Link>
                                  </div>
                                  <div className="col-mail col-mail-2">
                                    <Link to="#" className="subject">
                                      Montly High-Res Photos-
                                      <span className="teaser">
                                        To create this month's pack, we hosted
                                        a party with local musician Jared
                                        Mahone here in Columbus, Ohio.
                                      </span>
                                    </Link>
                                    <div className="date">Feb 28</div>
                                  </div>
                                </li>

                                <li className="unread">
                                  <div className="col-mail col-mail-1">
                                    <div className="checkbox-wrapper-mail">
                                      <input type="checkbox" id="chk7" />
                                      <label
                                        htmlFor="chk7"
                                        className="toggle"
                                      ></label>
                                    </div>
                                    <Link to="#" className="title">
                                      Randy, me (5)
                                    </Link>
                                  </div>

                                  <div className="col-mail col-mail-2">
                                    <Link to="#" className="subject">
                                      <span className="bg-success badge me-2">
                                        Family
                                      </span>
                                      Last pic over my village-
                                      <span className="teaser">
                                        Yeah i'd like that! Do you remember
                                        the video you showed me of your train
                                        ride between Colombo and Kandy? The
                                        one with the mountain view? I would
                                        love to see that one again!
                                      </span>
                                    </Link>
                                    <div className="date">5:01 am</div>
                                  </div>
                                </li>
                                <li>
                                  <div className="col-mail col-mail-1">
                                    <div className="checkbox-wrapper-mail">
                                      <input type="checkbox" id="chk8" />
                                      <label
                                        htmlFor="chk8"
                                        className="toggle"
                                      ></label>
                                    </div>
                                    <Link to="#" className="title">
                                      Andrew Zimmer
                                    </Link>
                                  </div>
                                  <div className="col-mail col-mail-2">
                                    <Link to="#" className="subject">
                                      Mochila Beta: Subscription Confirmed-{" "}
                                      <span className="teaser">
                                        You've been confirmed! Welcome to the
                                        ruling class of the inbox. For your
                                        records, here is a copy of the
                                        information you submitted to us...
                                      </span>
                                    </Link>
                                    <div className="date">Mar 8</div>
                                  </div>
                                </li>
                                <li>
                                  <div className="col-mail col-mail-1">
                                    <div className="checkbox-wrapper-mail">
                                      <input type="checkbox" id="chk9" />
                                      <label
                                        htmlFor="chk9"
                                        className="toggle"
                                      ></label>
                                    </div>
                                    <Link to="#" className="title">
                                      Infinity HR
                                    </Link>
                                  </div>
                                  <div className="col-mail col-mail-2">
                                    <Link to="#" className="subject">
                                      Sveriges Hetaste sommarjobb-
                                      <span className="teaser">
                                        Hej Nicklas Sandell! Vi vill bjuda in
                                        dig till "First tour 2014", ett
                                        rekryteringsevent som erbjuder jobb på
                                        16 semesterorter iSverige.
                                      </span>
                                    </Link>
                                    <div className="date">Mar 8</div>
                                  </div>
                                </li>
                                <li>
                                  <div className="col-mail col-mail-1">
                                    <div className="checkbox-wrapper-mail">
                                      <input type="checkbox" id="chk10" />
                                      <label
                                        htmlFor="chk10"
                                        className="toggle"
                                      ></label>
                                    </div>
                                    <Link to="#" className="title">
                                      Revibe
                                    </Link>
                                  </div>
                                  <div className="col-mail col-mail-2">
                                    <Link to="#" className="subject">
                                      <span className="bg-danger badge me-2">
                                        Friends
                                      </span>
                                      Weekend on Revibe-
                                      <span className="teaser">
                                        Today's Friday and we thought maybe
                                        you want some music inspiration for
                                        the weekend. Here are some trending
                                        tracks and playlists we think you
                                        should give a listen!
                                      </span>
                                    </Link>
                                    <div className="date">Feb 27</div>
                                  </div>
                                </li>
                                <li>
                                  <div className="col-mail col-mail-1">
                                    <div className="checkbox-wrapper-mail">
                                      <input type="checkbox" id="chk11" />
                                      <label
                                        htmlFor="chk11"
                                        className="toggle"
                                      ></label>
                                    </div>
                                    <Link to="#" className="title">
                                      Erik, me (5)
                                    </Link>
                                  </div>
                                  <div className="col-mail col-mail-2">
                                    <Link to="#" className="subject">
                                      Regarding our meeting-
                                      <span className="teaser">
                                        That's great, see you on Thursday!
                                      </span>
                                    </Link>
                                    <div className="date">Feb 24</div>
                                  </div>
                                </li>
                                <li>
                                  <div className="col-mail col-mail-1">
                                    <div className="checkbox-wrapper-mail">
                                      <input type="checkbox" id="chk12" />
                                      <label
                                        htmlFor="chk12"
                                        className="toggle"
                                      ></label>
                                    </div>
                                    <Link to="#" className="title">
                                      KanbanFlow
                                    </Link>
                                  </div>
                                  <div className="col-mail col-mail-2">
                                    <Link to="#" className="subject">
                                      <span className="bg-primary badge me-2">
                                        Social
                                      </span>
                                      Task assigned: Clone ARP's website-{" "}
                                      <span className="teaser">
                                        You have been assigned a task by
                                        Alex@Work on the board Web.
                                      </span>
                                    </Link>
                                    <div className="date">Feb 24</div>
                                  </div>
                                </li>
                                <li>
                                  <div className="col-mail col-mail-1">
                                    <div className="checkbox-wrapper-mail">
                                      <input type="checkbox" id="chk13" />
                                      <label
                                        htmlFor="chk13"
                                        className="toggle"
                                      ></label>
                                    </div>
                                    <Link to="#" className="title">
                                      Tobias Berggren
                                    </Link>
                                  </div>
                                  <div className="col-mail col-mail-2">
                                    <Link to="#" className="subject">
                                      Let's go fishing!-
                                      <span className="teaser">
                                        Hey, You wanna join me and Fred at the
                                        lake tomorrow? It'll be awesome.
                                      </span>
                                    </Link>
                                    <div className="date">Feb 23</div>
                                  </div>
                                </li>
                                <li>
                                  <div className="col-mail col-mail-1">
                                    <div className="checkbox-wrapper-mail">
                                      <input type="checkbox" id="chk14" />
                                      <label
                                        htmlFor="chk14"
                                        className="toggle"
                                      ></label>
                                    </div>
                                    <Link to="#" className="title">
                                      Charukaw, me (7)
                                    </Link>
                                  </div>
                                  <div className="col-mail col-mail-2">
                                    <Link to="#" className="subject">
                                      Hey man-{" "}
                                      <span className="teaser">
                                        Nah man sorry i don't. Should i get
                                        it?
                                      </span>
                                    </Link>
                                    <div className="date">Feb 23</div>
                                  </div>
                                </li>
                                <li className="unread">
                                  <div className="col-mail col-mail-1">
                                    <div className="checkbox-wrapper-mail">
                                      <input type="checkbox" id="chk15" />
                                      <label
                                        htmlFor="chk15"
                                        className="toggle"
                                      ></label>
                                    </div>
                                    <Link to="#" className="title">
                                      me, Peter (5)
                                    </Link>
                                  </div>
                                  <div className="col-mail col-mail-2">
                                    <Link to="#" className="subject">
                                      <span className="bg-info badge me-2">
                                        Support
                                      </span>
                                      Home again!-{" "}
                                      <span className="teaser">
                                        That's just perfect! See you tomorrow.
                                      </span>
                                    </Link>
                                    <div className="date">Feb 21</div>
                                  </div>
                                </li>
                                <li>
                                  <div className="col-mail col-mail-1">
                                    <div className="checkbox-wrapper-mail">
                                      <input type="checkbox" id="chk16" />
                                      <label
                                        htmlFor="chk16"
                                        className="toggle"
                                      ></label>
                                    </div>
                                    <Link to="#" className="title">
                                      Stack Exchange
                                    </Link>
                                  </div>
                                  <div className="col-mail col-mail-2">
                                    <Link to="#" className="subject">
                                      1 new items in your Stackexchange inbox-{" "}
                                      <span className="teaser">
                                        The following items were added to your
                                        Stack Exchange global inbox since you
                                        last checked it.
                                      </span>
                                    </Link>
                                    <div className="date">Feb 21</div>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="2">
                      <Row>
                        <Col sm="12">
                          <div className="card-text mb-0">
                            <div
                              className="tab-pane"
                              id="custom-social"
                              role="tabpanel"
                            >
                              <ul className="message-list mb-0">
                                <li>
                                  <div className="col-mail col-mail-1">
                                    <div className="checkbox-wrapper-mail">
                                      <input type="checkbox" id="chk17" />
                                      <label
                                        htmlFor="chk17"
                                        className="toggle"
                                      ></label>
                                    </div>
                                    <Link to="#" className="title">
                                      Andrew Zimmer
                                    </Link>
                                  </div>
                                  <div className="col-mail col-mail-2">
                                    <Link to="#" className="subject">
                                      Mochila Beta: Subscription Confirmed-{" "}
                                      <span className="teaser">
                                        You've been confirmed! Welcome to the
                                        ruling class of the inbox. For your
                                        records, here is a copy of the
                                        information you submitted to us...
                                      </span>
                                    </Link>
                                    <div className="date">Mar 8</div>
                                  </div>
                                </li>
                                <li>
                                  <div className="col-mail col-mail-1">
                                    <div className="checkbox-wrapper-mail">
                                      <input type="checkbox" id="chk18" />
                                      <label
                                        htmlFor="chk18"
                                        className="toggle"
                                      ></label>
                                    </div>
                                    <Link to="#" className="title">
                                      Peter, me (3)
                                    </Link>
                                  </div>
                                  <div className="col-mail col-mail-2">
                                    <Link to="#" className="subject">
                                      Hello-{" "}
                                      <span className="teaser">
                                        Trip home from Colombo has been
                                        arranged, then Jenna will come get me
                                        from Stockholm. :)
                                      </span>
                                    </Link>
                                    <div className="date">Mar 6</div>
                                  </div>
                                </li>

                                <li>
                                  <div className="col-mail col-mail-1">
                                    <div className="checkbox-wrapper-mail">
                                      <input type="checkbox" id="chk19" />
                                      <label
                                        htmlFor="chk19"
                                        className="toggle"
                                      ></label>
                                    </div>
                                    <Link to="#" className="title">
                                      Web Support Dennis
                                    </Link>
                                  </div>
                                  <div className="col-mail col-mail-2">
                                    <Link to="#" className="subject">
                                      Re: New mail settings-
                                      <span className="teaser">
                                        Will you answer him asap?
                                      </span>
                                    </Link>
                                    <div className="date">Mar 7</div>
                                  </div>
                                </li>
                                <li>
                                  <div className="col-mail col-mail-1">
                                    <div className="checkbox-wrapper-mail">
                                      <input type="checkbox" id="chk20" />
                                      <label
                                        htmlFor="chk20"
                                        className="toggle"
                                      ></label>
                                    </div>
                                    <Link to="#" className="title">
                                      me, Peter (2)
                                    </Link>
                                  </div>
                                  <div className="col-mail col-mail-2">
                                    <Link to="#" className="subject">
                                      <span className="bg-info badge me-2">
                                        Support
                                      </span>
                                      Off on Thursday -
                                      <span className="teaser">
                                        Eff that place, you might as well stay
                                        here with us instead! Sent from my
                                        iPhone 4 4 mar 2014 at 5:55 pm
                                      </span>
                                    </Link>
                                    <div className="date">Mar 4</div>
                                  </div>
                                </li>
                                <li>
                                  <div className="col-mail col-mail-1">
                                    <div className="checkbox-wrapper-mail">
                                      <input type="checkbox" id="chk21" />
                                      <label
                                        htmlFor="chk21"
                                        className="toggle"
                                      ></label>
                                    </div>
                                    <Link to="#" className="title">
                                      Medium
                                    </Link>
                                  </div>
                                  <div className="col-mail col-mail-2">
                                    <Link to="#" className="subject">
                                      <span className="bg-primary badge me-2">
                                        Social
                                      </span>
                                      This Week's Top Stories-
                                      <span className="teaser">
                                        Our top pick for you on Medium this
                                        week The Man Who Destroyed America's
                                        Ego
                                      </span>
                                    </Link>
                                    <div className="date">Feb 28</div>
                                  </div>
                                </li>
                                <li>
                                  <div className="col-mail col-mail-1">
                                    <div className="checkbox-wrapper-mail">
                                      <input type="checkbox" id="chk22" />
                                      <label
                                        htmlFor="chk22"
                                        className="toggle"
                                      ></label>
                                    </div>
                                    <Link to="#" className="title">
                                      me, Susanna (7)
                                    </Link>
                                  </div>
                                  <div className="col-mail col-mail-2">
                                    <Link to="#" className="subject">
                                      <span className="bg-warning badge me-2">
                                        Freelance
                                      </span>
                                      Since you asked... and i'm inconceivably
                                      bored at the train station-
                                      <span className="teaser">
                                        Alright thanks. I'll have to re-book
                                        that somehow, i'll get back to you.
                                      </span>
                                    </Link>
                                    <div className="date">Mar. 6</div>
                                  </div>
                                </li>
                                <li>
                                  <div className="col-mail col-mail-1">
                                    <div className="checkbox-wrapper-mail">
                                      <input type="checkbox" id="chk23" />
                                      <label
                                        htmlFor="chk23"
                                        className="toggle"
                                      ></label>
                                    </div>
                                    <Link to="#" className="title">
                                      Infinity HR
                                    </Link>
                                  </div>
                                  <div className="col-mail col-mail-2">
                                    <Link to="#" className="subject">
                                      Sveriges Hetaste sommarjobb-
                                      <span className="teaser">
                                        Hej Nicklas Sandell! Vi vill bjuda in
                                        dig till "First tour 2014", ett
                                        rekryteringsevent som erbjuder jobb på
                                        16 semesterorter iSverige.
                                      </span>
                                    </Link>
                                    <div className="date">Mar 8</div>
                                  </div>
                                </li>
                                <li>
                                  <div className="col-mail col-mail-1">
                                    <div className="checkbox-wrapper-mail">
                                      <input type="checkbox" id="chk24" />
                                      <label
                                        htmlFor="chk24"
                                        className="toggle"
                                      ></label>
                                    </div>
                                    <Link to="#" className="title">
                                      Death to Stock
                                    </Link>
                                  </div>
                                  <div className="col-mail col-mail-2">
                                    <Link to="#" className="subject">
                                      Montly High-Res Photos-
                                      <span className="teaser">
                                        To create this month's pack, we hosted
                                        a party with local musician Jared
                                        Mahone here in Columbus, Ohio.
                                      </span>
                                    </Link>
                                    <div className="date">Feb 28</div>
                                  </div>
                                </li>

                                <li className="unread">
                                  <div className="col-mail col-mail-1">
                                    <div className="checkbox-wrapper-mail">
                                      <input type="checkbox" id="chk25" />
                                      <label
                                        htmlFor="chk25"
                                        className="toggle"
                                      ></label>
                                    </div>
                                    <Link to="#" className="title">
                                      Randy, me (5)
                                    </Link>
                                  </div>
                                  <div className="col-mail col-mail-2">
                                    <Link to="#" className="subject">
                                      <span className="bg-success badge me-2">
                                        Family
                                      </span>
                                      Last pic over my village-
                                      <span className="teaser">
                                        Yeah i'd like that! Do you remember
                                        the video you showed me of your train
                                        ride between Colombo and Kandy? The
                                        one with the mountain view? I would
                                        love to see that one again!
                                      </span>
                                    </Link>
                                    <div className="date">5:01 am</div>
                                  </div>
                                </li>

                                <li>
                                  <div className="col-mail col-mail-1">
                                    <div className="checkbox-wrapper-mail">
                                      <input type="checkbox" id="chk26" />
                                      <label
                                        htmlFor="chk26"
                                        className="toggle"
                                      ></label>
                                    </div>
                                    <Link to="#" className="title">
                                      Erik, me (5)
                                    </Link>
                                  </div>
                                  <div className="col-mail col-mail-2">
                                    <Link to="#" className="subject">
                                      Regarding our meeting-
                                      <span className="teaser">
                                        That's great, see you on Thursday!
                                      </span>
                                    </Link>
                                    <div className="date">Feb 24</div>
                                  </div>
                                </li>
                                <li>
                                  <div className="col-mail col-mail-1">
                                    <div className="checkbox-wrapper-mail">
                                      <input type="checkbox" id="chk27" />
                                      <label
                                        htmlFor="chk27"
                                        className="toggle"
                                      ></label>
                                    </div>
                                    <Link to="#" className="title">
                                      KanbanFlow
                                    </Link>
                                  </div>
                                  <div className="col-mail col-mail-2">
                                    <Link to="#" className="subject">
                                      <span className="bg-primary badge me-2">
                                        Social
                                      </span>
                                      Task assigned: Clone ARP's website-{" "}
                                      <span className="teaser">
                                        You have been assigned a task by
                                        Alex@Work on the board Web.
                                      </span>
                                    </Link>
                                    <div className="date">Feb 24</div>
                                  </div>
                                </li>
                                <li>
                                  <div className="col-mail col-mail-1">
                                    <div className="checkbox-wrapper-mail">
                                      <input type="checkbox" id="chk28" />
                                      <label
                                        htmlFor="chk28"
                                        className="toggle"
                                      ></label>
                                    </div>
                                    <Link to="#" className="title">
                                      Tobias Berggren
                                    </Link>
                                  </div>
                                  <div className="col-mail col-mail-2">
                                    <Link to="#" className="subject">
                                      Let's go fishing!-
                                      <span className="teaser">
                                        Hey, You wanna join me and Fred at the
                                        lake tomorrow? It'll be awesome.
                                      </span>
                                    </Link>
                                    <div className="date">Feb 23</div>
                                  </div>
                                </li>

                                <li>
                                  <div className="col-mail col-mail-1">
                                    <div className="checkbox-wrapper-mail">
                                      <input type="checkbox" id="chk29" />
                                      <label
                                        htmlFor="chk29"
                                        className="toggle"
                                      ></label>
                                    </div>
                                    <Link to="#" className="title">
                                      Charukaw, me (7)
                                    </Link>
                                  </div>
                                  <div className="col-mail col-mail-2">
                                    <Link to="#" className="subject">
                                      Hey man-{" "}
                                      <span className="teaser">
                                        Nah man sorry i don't. Should i get
                                        it?
                                      </span>
                                    </Link>
                                    <div className="date">Feb 23</div>
                                  </div>
                                </li>
                                <li className="unread">
                                  <div className="col-mail col-mail-1">
                                    <div className="checkbox-wrapper-mail">
                                      <input type="checkbox" id="chk30" />
                                      <label
                                        htmlFor="chk30"
                                        className="toggle"
                                      ></label>
                                    </div>
                                    <Link to="#" className="title">
                                      me, Peter (5)
                                    </Link>
                                  </div>
                                  <div className="col-mail col-mail-2">
                                    <Link to="#" className="subject">
                                      <span className="bg-info badge me-2">
                                        Support
                                      </span>
                                      Home again!-{" "}
                                      <span className="teaser">
                                        That's just perfect! See you tomorrow.
                                      </span>
                                    </Link>
                                    <div className="date">Feb 21</div>
                                  </div>
                                </li>
                                <li>
                                  <div className="col-mail col-mail-1">
                                    <div className="checkbox-wrapper-mail">
                                      <input type="checkbox" id="chk31" />
                                      <label
                                        htmlFor="chk31"
                                        className="toggle"
                                      ></label>
                                    </div>
                                    <Link to="#" className="title">
                                      Revibe
                                    </Link>
                                  </div>
                                  <div className="col-mail col-mail-2">
                                    <Link to="#" className="subject">
                                      <span className="bg-danger badge me-2">
                                        Friends
                                      </span>
                                      Weekend on Revibe-
                                      <span className="teaser">
                                        Today's Friday and we thought maybe
                                        you want some music inspiration for
                                        the weekend. Here are some trending
                                        tracks and playlists we think you
                                        should give a listen!
                                      </span>
                                    </Link>
                                    <div className="date">Feb 27</div>
                                  </div>
                                </li>
                                <li>
                                  <div className="col-mail col-mail-1">
                                    <div className="checkbox-wrapper-mail">
                                      <input type="checkbox" id="chk32" />
                                      <label
                                        htmlFor="chk32"
                                        className="toggle"
                                      ></label>
                                    </div>
                                    <Link to="#" className="title">
                                      Stack Exchange
                                    </Link>
                                  </div>
                                  <div className="col-mail col-mail-2">
                                    <Link to="#" className="subject">
                                      1 new items in your Stackexchange inbox-{" "}
                                      <span className="teaser">
                                        The following items were added to your
                                        Stack Exchange global inbox since you
                                        last checked it.
                                      </span>
                                    </Link>
                                    <div className="date">Feb 21</div>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="3">
                      <Row>
                        <Col sm="12">
                          <div className="card-text mb-0">
                            <div
                              className="tab-pane"
                              id="custom-promotion"
                              role="tabpanel"
                            >
                              <ul className="message-list mb-0">
                                <li>
                                  <div className="col-mail col-mail-1">
                                    <div className="checkbox-wrapper-mail">
                                      <input type="checkbox" id="chk33" />
                                      <label
                                        htmlFor="chk33"
                                        className="toggle"
                                      ></label>
                                    </div>
                                    <Link to="#" className="title">
                                      Peter, me (3)
                                    </Link>
                                  </div>
                                  <div className="col-mail col-mail-2">
                                    <Link to="#" className="subject">
                                      Hello-{" "}
                                      <span className="teaser">
                                        Trip home from Colombo has been
                                        arranged, then Jenna will come get me
                                        from Stockholm. :)
                                      </span>
                                    </Link>
                                    <div className="date">Mar 6</div>
                                  </div>
                                </li>

                                <li>
                                  <div className="col-mail col-mail-1">
                                    <div className="checkbox-wrapper-mail">
                                      <input type="checkbox" id="chk34" />
                                      <label
                                        htmlFor="chk34"
                                        className="toggle"
                                      ></label>
                                    </div>
                                    <Link to="#" className="title">
                                      me, Susanna (7)
                                    </Link>
                                  </div>
                                  <div className="col-mail col-mail-2">
                                    <Link to="#" className="subject">
                                      <span className="bg-warning badge me-2">
                                        Freelance
                                      </span>
                                      Since you asked... and i'm inconceivably
                                      bored at the train station-
                                      <span className="teaser">
                                        Alright thanks. I'll have to re-book
                                        that somehow, i'll get back to you.
                                      </span>
                                    </Link>
                                    <div className="date">Mar. 6</div>
                                  </div>
                                </li>

                                <li>
                                  <div className="col-mail col-mail-1">
                                    <div className="checkbox-wrapper-mail">
                                      <input type="checkbox" id="chk35" />
                                      <label
                                        htmlFor="chk35"
                                        className="toggle"
                                      ></label>
                                    </div>
                                    <Link to="#" className="title">
                                      Medium
                                    </Link>
                                  </div>
                                  <div className="col-mail col-mail-2">
                                    <Link to="#" className="subject">
                                      <span className="bg-primary badge me-2">
                                        Social
                                      </span>
                                      This Week's Top Stories-
                                      <span className="teaser">
                                        Our top pick for you on Medium this
                                        week The Man Who Destroyed Americas
                                        Ego
                                      </span>
                                    </Link>
                                    <div className="date">Feb 28</div>
                                  </div>
                                </li>
                                <li>
                                  <div className="col-mail col-mail-1">
                                    <div className="checkbox-wrapper-mail">
                                      <input type="checkbox" id="chk36" />
                                      <label
                                        htmlFor="chk36"
                                        className="toggle"
                                      ></label>
                                    </div>
                                    <Link to="#" className="title">
                                      me, Peter (2)
                                    </Link>
                                  </div>
                                  <div className="col-mail col-mail-2">
                                    <Link to="#" className="subject">
                                      <span className="bg-info badge me-2">
                                        Support
                                      </span>
                                      Off on Thursday -
                                      <span className="teaser">
                                        Eff that place, you might as well stay
                                        here with us instead! Sent from my
                                        iPhone 4 4 mar 2014 at 5:55 pm
                                      </span>
                                    </Link>
                                    <div className="date">Mar 4</div>
                                  </div>
                                </li>
                                <li>
                                  <div className="col-mail col-mail-1">
                                    <div className="checkbox-wrapper-mail">
                                      <input type="checkbox" id="chk37" />
                                      <label
                                        htmlFor="chk37"
                                        className="toggle"
                                      ></label>
                                    </div>
                                    <Link to="#" className="title">
                                      Death to Stock
                                    </Link>
                                  </div>
                                  <div className="col-mail col-mail-2">
                                    <Link to="#" className="subject">
                                      Montly High-Res Photos-
                                      <span className="teaser">
                                        To create this month's pack, we hosted
                                        a party with local musician Jared
                                        Mahone here in Columbus, Ohio.
                                      </span>
                                    </Link>
                                    <div className="date">Feb 28</div>
                                  </div>
                                </li>
                                <li>
                                  <div className="col-mail col-mail-1">
                                    <div className="checkbox-wrapper-mail">
                                      <input type="checkbox" id="chk38" />
                                      <label
                                        htmlFor="chk38"
                                        className="toggle"
                                      ></label>
                                    </div>
                                    <Link to="#" className="title">
                                      Web Support Dennis
                                    </Link>
                                  </div>
                                  <div className="col-mail col-mail-2">
                                    <Link to="#" className="subject">
                                      Re: New mail settings-
                                      <span className="teaser">
                                        Will you answer him asap?
                                      </span>
                                    </Link>
                                    <div className="date">Mar 7</div>
                                  </div>
                                </li>
                                <li className="unread">
                                  <div className="col-mail col-mail-1">
                                    <div className="checkbox-wrapper-mail">
                                      <input type="checkbox" id="chk39" />
                                      <label
                                        htmlFor="chk39"
                                        className="toggle"
                                      ></label>
                                    </div>
                                    <Link to="#" className="title">
                                      Randy, me (5)
                                    </Link>
                                  </div>
                                  <div className="col-mail col-mail-2">
                                    <Link to="#" className="subject">
                                      <span className="bg-success badge me-2">
                                        Family
                                      </span>
                                      Last pic over my village-
                                      <span className="teaser">
                                        Yeah i'd like that! Do you remember
                                        the video you showed me of your train
                                        ride between Colombo and Kandy? The
                                        one with the mountain view? I would
                                        love to see that one again!
                                      </span>
                                    </Link>
                                    <div className="date">5:01 am</div>
                                  </div>
                                </li>
                                <li>
                                  <div className="col-mail col-mail-1">
                                    <div className="checkbox-wrapper-mail">
                                      <input type="checkbox" id="chk40" />
                                      <label
                                        htmlFor="chk40"
                                        className="toggle"
                                      ></label>
                                    </div>
                                    <Link to="#" className="title">
                                      Andrew Zimmer
                                    </Link>
                                  </div>
                                  <div className="col-mail col-mail-2">
                                    <Link to="#" className="subject">
                                      Mochila Beta: Subscription Confirmed-{" "}
                                      <span className="teaser">
                                        You've been confirmed! Welcome to the
                                        ruling class of the inbox. For your
                                        records, here is a copy of the
                                        information you submitted to us...
                                      </span>
                                    </Link>
                                    <div className="date">Mar 8</div>
                                  </div>
                                </li>
                                <li>
                                  <div className="col-mail col-mail-1">
                                    <div className="checkbox-wrapper-mail">
                                      <input type="checkbox" id="chk41" />
                                      <label
                                        htmlFor="chk41"
                                        className="toggle"
                                      ></label>
                                    </div>
                                    <Link to="#" className="title">
                                      Infinity HR
                                    </Link>
                                  </div>
                                  <div className="col-mail col-mail-2">
                                    <Link to="#" className="subject">
                                      Sveriges Hetaste sommarjobb-
                                      <span className="teaser">
                                        Hej Nicklas Sandell! Vi vill bjuda in
                                        dig till "First tour 2014", ett
                                        rekryteringsevent som erbjuder jobb på
                                        16 semesterorter iSverige.
                                      </span>
                                    </Link>
                                    <div className="date">Mar 8</div>
                                  </div>
                                </li>
                                <li>
                                  <div className="col-mail col-mail-1">
                                    <div className="checkbox-wrapper-mail">
                                      <input type="checkbox" id="chk42" />
                                      <label
                                        htmlFor="chk42"
                                        className="toggle"
                                      ></label>
                                    </div>
                                    <Link to="#" className="title">
                                      Revibe
                                    </Link>
                                  </div>
                                  <div className="col-mail col-mail-2">
                                    <Link to="#" className="subject">
                                      <span className="bg-danger badge me-2">
                                        Friends
                                      </span>
                                      Weekend on Revibe-
                                      <span className="teaser">
                                        Today's Friday and we thought maybe
                                        you want some music inspiration for
                                        the weekend. Here are some trending
                                        tracks and playlists we think you
                                        should give a listen!
                                      </span>
                                    </Link>
                                    <div className="date">Feb 27</div>
                                  </div>
                                </li>
                                <li>
                                  <div className="col-mail col-mail-1">
                                    <div className="checkbox-wrapper-mail">
                                      <input type="checkbox" id="chk43" />
                                      <label
                                        htmlFor="chk43"
                                        className="toggle"
                                      ></label>
                                    </div>
                                    <Link to="#" className="title">
                                      Erik, me (5)
                                    </Link>
                                  </div>
                                  <div className="col-mail col-mail-2">
                                    <Link to="#" className="subject">
                                      Regarding our meeting-
                                      <span className="teaser">
                                        That's great, see you on Thursday!
                                      </span>
                                    </Link>
                                    <div className="date">Feb 24</div>
                                  </div>
                                </li>
                                <li>
                                  <div className="col-mail col-mail-1">
                                    <div className="checkbox-wrapper-mail">
                                      <input type="checkbox" id="chk44" />
                                      <label
                                        htmlFor="chk44"
                                        className="toggle"
                                      ></label>
                                    </div>
                                    <Link to="#" className="title">
                                      KanbanFlow
                                    </Link>
                                  </div>
                                  <div className="col-mail col-mail-2">
                                    <Link to="#" className="subject">
                                      <span className="bg-primary badge me-2">
                                        Social
                                      </span>
                                      Task assigned: Clone ARP's website-{" "}
                                      <span className="teaser">
                                        You have been assigned a task by
                                        Alex@Work on the board Web.
                                      </span>
                                    </Link>
                                    <div className="date">Feb 24</div>
                                  </div>
                                </li>
                                <li>
                                  <div className="col-mail col-mail-1">
                                    <div className="checkbox-wrapper-mail">
                                      <input type="checkbox" id="chk45" />
                                      <label
                                        htmlFor="chk45"
                                        className="toggle"
                                      ></label>
                                    </div>
                                    <Link to="#" className="title">
                                      Tobias Berggren
                                    </Link>
                                  </div>
                                  <div className="col-mail col-mail-2">
                                    <Link to="#" className="subject">
                                      Let's go fishing!-
                                      <span className="teaser">
                                        Hey, You wanna join me and Fred at the
                                        lake tomorrow? It'll be awesome.
                                      </span>
                                    </Link>
                                    <div className="date">Feb 23</div>
                                  </div>
                                </li>
                                <li>
                                  <div className="col-mail col-mail-1">
                                    <div className="checkbox-wrapper-mail">
                                      <input type="checkbox" id="chk46" />
                                      <label
                                        htmlFor="chk46"
                                        className="toggle"
                                      ></label>
                                    </div>
                                    <Link to="#" className="title">
                                      Charukaw, me (7)
                                    </Link>
                                  </div>
                                  <div className="col-mail col-mail-2">
                                    <Link to="#" className="subject">
                                      Hey man-{" "}
                                      <span className="teaser">
                                        Nah man sorry i don't. Should i get
                                        it?
                                      </span>
                                    </Link>
                                    <div className="date">Feb 23</div>
                                  </div>
                                </li>
                                <li className="unread">
                                  <div className="col-mail col-mail-1">
                                    <div className="checkbox-wrapper-mail">
                                      <input type="checkbox" id="chk47" />
                                      <label
                                        htmlFor="chk47"
                                        className="toggle"
                                      ></label>
                                    </div>
                                    <Link to="#" className="title">
                                      me, Peter (5)
                                    </Link>
                                  </div>
                                  <div className="col-mail col-mail-2">
                                    <Link to="#" className="subject">
                                      <span className="bg-info badge me-2">
                                        Support
                                      </span>
                                      Home again!-{" "}
                                      <span className="teaser">
                                        That's just perfect! See you tomorrow.
                                      </span>
                                    </Link>
                                    <div className="date">Feb 21</div>
                                  </div>
                                </li>
                                <li>
                                  <div className="col-mail col-mail-1">
                                    <div className="checkbox-wrapper-mail">
                                      <input type="checkbox" id="chk48" />
                                      <label
                                        htmlFor="chk48"
                                        className="toggle"
                                      ></label>
                                    </div>
                                    <Link to="#" className="title">
                                      Stack Exchange
                                    </Link>
                                  </div>
                                  <div className="col-mail col-mail-2">
                                    <Link to="#" className="subject">
                                      1 new items in your Stackexchange inbox-{" "}
                                      <span className="teaser">
                                        The following items were added to your
                                        Stack Exchange global inbox since you
                                        last checked it.
                                      </span>
                                    </Link>
                                    <div className="date">Feb 21</div>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row className="justify-content-end">
            <Col xl={9}>
              <Row className="my-4">
                <div className="col-7">Showing 1 - 20 of 1,524</div>
                <div className="col-5">
                  <div className="btn-group float-end">
                    <button
                      type="button"
                      className="btn btn-sm btn-success waves-effect"
                    >
                      <i className="fa fa-chevron-left"></i>
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-success waves-effect"
                    >
                      <i className="fa fa-chevron-right"></i>
                    </button>
                  </div>
                </div>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Inbox;

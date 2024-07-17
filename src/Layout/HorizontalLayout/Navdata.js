import React, { useState } from "react";

const Navdata = () => {
  const [ui, setui] = useState(false);
  const [app, setapp] = useState(false);
  const [email, setemail] = useState(false);
  const [component, setcomponent] = useState(false);
  const [form, setform] = useState(false);
  const [table, settable] = useState(false);
  const [chart, setchart] = useState(false);
  const [icon, seticon] = useState(false);
  const [map, setmap] = useState(false);
  const [pages, setpages] = useState(false);
  const [auth, setauth] = useState(false);
  const [utility, setutility] = useState(false);

  const NavnavData = [
    {
      id: 1,
      label: "Dashboard",
      icon: "mdi mdi-home-variant-outline me-2",
      isdropDown: true,
      click: function () {
        setui(false);
        setapp(false);
        setcomponent(false);
        setpages(false);
      },
    },
    {
      id: 2,
      label: "UI Elements",
      icon: "mdi mdi-briefcase-variant-outline me-2",
      click: function () {
        setui(!ui);
        setapp(false);
        setcomponent(false);
        setpages(false);
      },
      currentState: ui,
      subItem: [
        { link: "/#", title: "Alerts" },
        { link: "/#", title: "Badge" },
        { link: "/#", title: "Breadcrumb" },
        { link: "/#", title: "Buttons" },
        { link: "/#", title: "Cards" },
        { link: "/#", title: "Carousel" },
        { link: "/#", title: "Dropdowns" },
        { link: "/#", title: "Grid" },
        { link: "/#", title: "Images" },
        { link: "/#", title: "Lightbox" },
        { link: "/#", title: "Modals" },
        { link: "/#", title: "Offcanvas" },
        { link: "/#", title: "Range Slider" },
        { link: "/#", title: "Session Timeout" },
        { link: "/#", title: "Pagination" },
        { link: "/#", title: "Placeholders" },
        { link: "/#", title: "Progress Bars" },
        { link: "/#", title: "Tabs & Accordions" },
        { link: "/#", title: "Typography" },
        { link: "/#", title: "Toasts" },
        { link: "/#", title: "Video" },
        { link: "/#", title: "Popovers & Tooltips" },
        { link: "/#", title: "Rating" },
      ],
    },
    {
      id: 3,
      label: "Apps",
      icon: "ri-apps-2-line me-2",
      click: function () {
        setapp(!app);
        setui(false);
        setcomponent(false);
        setpages(false);
        setemail(false);
      },

      currentState: app,
      subItems: [
        {
          label2: "Calendar",
          url: "/#",
        },
        {
          label2: "Email",

          staclick: function () {
            setemail(!email);

            setui(false);
            setcomponent(false);
            setpages(false);
          },

          subState: email,
          subItem: [
            { link: "/#", title: "Inbox" },
            { link: "/#", title: "Read Email" },
            { link: "/#", title: "Compose Email" },
          ],
        },
      ],
    },
    {
      id: 4,
      label: "Components",
      icon: "ri-stack-line me-2",
      click: function () {
        setcomponent(!component);
        setui(false);
        setapp(false);
        setpages(false);
        setmap(false);
        setform(false);
        settable(false);
        setchart(false);
        seticon(false);
      },
      currentState: component,
      subItems: [
        {
          label2: "Forms",
          staclick: function () {
            setform(!form);
            settable(false);
            setchart(false);
            seticon(false);
            setmap(false);

            setui(false);
            setapp(false);
            setpages(false);
          },
          subState: form,
          subItem: [
            { link: "/#", title: "Elements" },
            { link: "/#", title: "Validation" },
            { link: "/#", title: "Advanced Plugins" },
            { link: "/#", title: "Editors" },
            { link: "/#", title: "File Upload" },
            { link: "/#", title: "Xeditable" },
            { link: "/#", title: "Wizard" },
            { link: "/#", title: "Mask" },
          ],
        },

        {
          label2: "Tables",
          staclick: function () {
            settable(!table);
            setform(false);
            setchart(false);
            seticon(false);
            setmap(false);

            setui(false);
            setapp(false);
            setpages(false);
          },
          subState: table,
          subItem: [
            { title: "Basic Tables", link: "/#" },
            { title: "List Js", link: "/#" },
            { title: "React Datatables", link: "/#" },
          ],
        },

        {
          label2: "Charts",
          staclick: function () {
            setchart(!chart);
            setform(false);
            settable(false);
            seticon(false);
            setmap(false);

            setui(false);
            setapp(false);
            setpages(false);
          },
          subState: chart,
          subItem: [
            { link: "/#", title: "Apex Charts" },
            { link: "/#", title: "Chartjs" },
            { link: "/#", title: "RE Charts" },
            { link: "/#", title: "Knob Charts" },
            { link: "/#", title: "Sparkline Charts" },
          ],
        },

        {
          label2: "Icons",
          staclick: function () {
            seticon(!icon);

            setform(false);
            settable(false);
            setchart(false);
            setmap(false);

            setui(false);
            setapp(false);
            setpages(false);
          },
          subState: icon,
          subItem: [
            { link: "/#", title: "BoxIcons" },
            { link: "/#", title: "Material Design" },
            { link: "/#", title: "Dripicons" },
            { link: "/#", title: "Font Awesome" },
          ],
        },

        {
          label2: "Maps",
          staclick: function () {
            setmap(!map);
            setform(false);
            settable(false);
            setchart(false);
            seticon(false);

            setui(false);
            setapp(false);
            setpages(false);
          },
          subState: map,
          subItem: [
            { link: "/#", title: "Google Maps" },
            { link: "/#", title: "Vector Maps" },
          ],
        },
      ],
    },
    {
      id: 5,
      label: "Pages",
      icon: "ri-file-copy-2-line me-2",
      click: function () {
        setpages(!pages);
        setui(false);
        setapp(false);
        setcomponent(false);

        setutility(false);
        setauth(false);
      },
      currentState: pages,
      subItems: [
        {
          label2: "Authentication",

          staclick: function () {
            setauth(!auth);
            setutility(false);

            setui(false);
            setapp(false);
            setcomponent(false);
          },
          subState: auth,
          subItem: [
            { link: "/#", title: "Login" },
            { link: "/#", title: "Register" },
            { link: "/#", title: "Recover Password" },
            { link: "/#", title: "Lock Screen" },
          ],
        },
        {
          label2: "Utility",
          staclick: function () {
            setutility(!utility);
            setauth(false);

            setui(false);
            setapp(false);
            setcomponent(false);
          },
          subState: utility,
          subItem: [
            { link: "/#", title: "Starter Page" },
            { link: "/#", title: "Maintenance" },
            { link: "/#", title: "Coming Soon" },
            { link: "/#", title: "Timeline" },
            { link: "/#", title: "FAQs" },
            { link: "/#", title: "Pricing" },
            { link: "/#", title: "Error 404" },
            { link: "/#", title: "Error 500" },
          ],
        },
      ],
    },
  ];
  return <React.Fragment>{NavnavData}</React.Fragment>;
};

export default Navdata;

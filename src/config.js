const token = localStorage.getItem('authUser') ? JSON.parse(localStorage.getItem('authUser')).token : '';

module.exports = {
  google: {
    API_KEY: "",
    CLIENT_ID: "23144678283-oek7ncjmmrgkgmi2i56sc411gp71a8sp.apps.googleusercontent.com",
    SECRET: "",
  },
  facebook: {
    APP_ID: "",
  },
  token: {token}
  
}

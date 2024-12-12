import React from "react";
import {} from "antd";
import "./App.less";
import AppHeader from "./components/Header/index";
import AppFooter from "./components/Footer/index";
import PageContent from "./components/PageContent/index";
import { BrowserRouter } from "react-router-dom";
const App: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <AppHeader />
        <PageContent />
        <AppFooter />
      </BrowserRouter>
    </div>
  )
};

export default App;

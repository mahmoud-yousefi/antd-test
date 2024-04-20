import { Typography } from "antd";

const AppFooter = () => {
  return <div className="appFooter">
    <Typography.Link href="https://www.google.com" target="_blank">Privacy Policy</Typography.Link>
    <Typography.Link href="https://www.google.com" target="_blank">Terms & Conditions</Typography.Link>
    <Typography.Link href="https://www.google.com" target="_blank">Return Policy</Typography.Link>
    <Typography.Link href="tel:+989902635947" target="_blank">+98 990 263 5947</Typography.Link>
  </div>;
};

export default AppFooter;

import { HomeFilled, ShoppingCartOutlined } from "@ant-design/icons";
import { Badge, Button, Drawer, Form, InputNumber, Menu, Table, Typography, Input, Checkbox, message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCart } from "../../API";

const AppHeader = () => {
  const navigate = useNavigate();
  const onMenuClick = (item: { key: string }) => {
    navigate(`/${item.key}`);
  };
  return (
    <div className="appHeader" onClick={() => document.documentElement.dir = 'rtl'}>
      <Menu
        className="appMenu"
        onClick={onMenuClick}
        mode="horizontal"
        items={[
          {
            label: <HomeFilled />,
            key: "",
          },
          {
            label: "Men",
            key: "men",
            children: [
              {
                label: "Men's Shirts",
                key: "mens-shirts",
              },
              {
                label: "Men's Shoes",
                key: "mens-shoes",
              },
              {
                label: "Men's Watches",
                key: "mens-watches",
              },
            ],
          },
          {
            label: "Women",
            key: "women",
            children: [
              {
                label: "Women's Dresses",
                key: "womens-dresses",
              },
              {
                label: "Women's Shoes",
                key: "womens-shoes",
              },
              {
                label: "Women's Watches",
                key: "womens-watches",
              },
              {
                label: "Men's Bags",
                key: "mens-bags",
              },
            ],
          },
          {
            label: "Fragrances",
            key: "fragrances",
          },
        ]}
      />
      <Typography.Title>Products Store</Typography.Title>
      <AppCart />
    </div>
  );
};

const AppCart = () => {
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false)
  const [checkoutDrawerOpen, setCheckoutDrawerOpen] = useState(false)
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    getCart().then(res => {
      setCartItems(res.products)
    })
  }, [])

  const onConfirmOrder = (values: { full_name: string; email: string; address: string }) => {
    console.log(values);
    setCartDrawerOpen(false)
    setCheckoutDrawerOpen(false)
    message.success("Order placed successfully.")
  }

  return (
    <div>
      <div onClick={() => {
        setCartDrawerOpen(true);
      }} className="shoppingCartIcon">
        <Badge count={cartItems.length}>
          <ShoppingCartOutlined />
        </Badge>
      </div>

      <Drawer open={cartDrawerOpen} onClose={() => {
        setCartDrawerOpen(false)
      }}
        title="Your Cart"
        contentWrapperStyle={{ width: 500 }}
      >
        <Table
          pagination={false}
          columns={[{
            title: 'Title',
            dataIndex: 'title'
          },
          {
            title: 'Price',
            dataIndex: 'price',
            render: (value) => {
              return <span>${value}</span>
            }
          },
          {
            title: 'Quantity',
            dataIndex: 'quantity',
            render: (value: number, record: any) => {
              return <InputNumber min={0} defaultValue={value} onChange={(value: any) => {
                setCartItems((pre: any) => pre.map((cart: any) => {
                  if (record.id === cart.id) {
                    cart.total = (cart.price * value)
                  }
                  return cart
                }))
              }}></InputNumber>
            }
          },
          {
            title: 'Total',
            dataIndex: 'total',
            render: (value) => {
              return <span>${value}</span>
            }
          }
          ]}
          dataSource={cartItems}
          summary={(data) => {
            const total = data.reduce((pre, current) => {
              return pre + current.total
            }, 0)
            return <span>Total: ${total}</span>
          }}
        />
        <Button onClick={() => {
          setCheckoutDrawerOpen(true)
        }} type="primary" >Checkout Your Cart</Button>
      </Drawer>
      <Drawer open={checkoutDrawerOpen} onClose={() => {
        setCheckoutDrawerOpen(false)
      }} title='Confirm Order'>
        <Form onFinish={onConfirmOrder}>
          <Form.Item rules={[{
            required: true,
            message: 'Please enter your full name'
          }]} label='Full Name' name='full_name'>
            <Input placeholder="Enter your full name..." />
          </Form.Item>
          <Form.Item rules={[{
            required: true,
            type: "email",
            message: 'Please enter your email'
          }]} label='Email' name='email'>
            <Input placeholder="Enter your email..." />
          </Form.Item>
          <Form.Item rules={[{
            required: true,
            message: 'Please enter your address'
          }]} label='Address' name='address'>
            <Input placeholder="Enter your address..." />
          </Form.Item>
          <Form.Item>
            <Checkbox defaultChecked disabled>Cash On Delivery</Checkbox>
          </Form.Item>
          <Typography.Paragraph type="secondary">More methods coming soon</Typography.Paragraph>
          <Button type="primary" htmlType="submit">Confirm Order</Button>
        </Form>
      </Drawer>
    </div>
  )
}

export default AppHeader;

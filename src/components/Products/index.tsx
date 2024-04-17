import { useEffect, useState } from "react";
import { addToCart, getAllProducts } from "../../API";
import { Badge, Button, Card, Image, List, Rate, Typography, message } from "antd";

const Products = () => {
    const [items, setItems] = useState([])
    useEffect(() => {
        getAllProducts().then(res => {
            setItems(res.products)
        })
    }, [])

    return <div>
        <List
        grid={{column: 3}} 
        renderItem={(product, index) => {
            return <Badge.Ribbon className="itemCardImageBadge" text={product.discountPercentage} color="pink"><Card 
            className="itemCard"
            title={product.title} 
            key={index} 
            cover={<Image className="itemCardImage" src={product.thumbnail} />}
            actions={[
                <Rate allowHalf disabled value={product.rating}/>,
                <AddToCartButton item={product}/>
            ]}
            >
                <Card.Meta title={
                <Typography.Paragraph>Price: ${product.price}{" "}
                <Typography.Text delete type="danger">
                    {parseFloat(product.price + (product.price * product.discountPercentage) / 100).toFixed(2) }
                    </Typography.Text>
                </Typography.Paragraph>
                }
                description={<Typography.Paragraph ellipsis={{rows: 2, expandable: true, symbol: 'more'}}>{product.description}</Typography.Paragraph>}
                ></Card.Meta>
            </Card>
            </Badge.Ribbon>
        }} dataSource={items}></List>
    </div>
};

const AddToCartButton = ({item}) => {
    const addProductToCart = () => {
        addToCart(item.id).then(res => {
            message.success(`${item.title} has been added to cart!`)
        })
    }
    return <Button type="link" onClick={() => {
    addProductToCart()
   }}>add to cart</Button>
}

export default Products;

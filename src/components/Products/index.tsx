import { useEffect, useState } from "react";
import { addToCart, getAllProducts, getProductsByCategory } from "../../API";
import { Badge, Button, Card, Image, List, Rate, Select, Spin, Typography, message } from "antd";
import { useParams } from "react-router-dom";

interface Product {
    id: number;
    title: string;
    price: number;
    discountPercentage: number;
    thumbnail: string;
    rating: number;
    description: string;
}

const Products = () => {
    const [loading, setLoading] = useState(false)
    const params = useParams<{ categoryId?: string }>()
    const [items, setItems] = useState<Product[]>([])
    const [sortOrder, setSortOrder] = useState('az')
    useEffect(() => {
        setLoading(true);
        (params?.categoryId ? getProductsByCategory(params.categoryId) : getAllProducts()).then(res => {
            setItems(res.products)
            setLoading(false)
        })
    }, [params])

    const getSortedItems = () => {
        const sortedItems = [...items]
        sortedItems.sort((a, b) => {
            const alowerCaseTitle = a.title.toLowerCase()
            const blowerCaseTitle = b.title.toLowerCase()
            if (sortOrder === 'az') {
                return alowerCaseTitle > blowerCaseTitle ? 1 : alowerCaseTitle === blowerCaseTitle ? 0 : -1
            }
            else if (sortOrder === 'za') {
                return alowerCaseTitle < blowerCaseTitle ? 1 : alowerCaseTitle === blowerCaseTitle ? 0 : -1
            }
            else if (sortOrder === 'lowHigh') {
                return a.price > b.price ? 1 : a.price === b.price ? 0 : -1
            }
            else if (sortOrder === 'highLow') {
                return a.price < b.price ? 1 : a.price === b.price ? 0 : -1
            }

            return 0
        })

        return sortedItems
    }

    // if(loading) {
    //     return <Spin spinning/>
    // }

    return <div className="productsContainer">
        <div>
            <Typography.Text>View Items Sorted By: </Typography.Text>
            <Select
                onChange={(value) => {
                    setSortOrder(value)
                }}
                defaultValue={"az"}
                options={[
                    {
                        label: 'Alphabetically a-z',
                        value: 'az'
                    },
                    {
                        label: 'Alphabetically z-a',
                        value: 'za'
                    },
                    {
                        label: 'Price Low to High',
                        value: 'lowHigh'
                    },
                    {
                        label: 'Price High to Low',
                        value: 'highLow'
                    },
                ]}>

            </Select>
        </div>
        <List
            loading={loading}
            grid={{ column: 3 }}
            renderItem={(product, index) => {
                return <Badge.Ribbon className="itemCardImageBadge" text={`${product.discountPercentage}% Off`} color="pink"><Card
                    className="itemCard"
                    title={product.title}
                    key={index}
                    cover={<Image className="itemCardImage" src={product.thumbnail} />}
                    actions={[
                        <Rate allowHalf disabled value={product.rating} />,
                        <AddToCartButton item={product} />
                    ]}
                >
                    <Card.Meta title={
                        <Typography.Paragraph>Price: ${product.price}{" "}
                            <Typography.Text delete type="danger">
                                {(product.price + (product.price * product.discountPercentage) / 100).toFixed(2)}
                            </Typography.Text>
                        </Typography.Paragraph>
                    }
                        description={<Typography.Paragraph ellipsis={{ rows: 2, expandable: true, symbol: 'more' }}>{product.description}</Typography.Paragraph>}
                    ></Card.Meta>
                </Card>
                </Badge.Ribbon>
            }} dataSource={getSortedItems()}></List>
    </div>
};

const AddToCartButton: React.FC<{ item: { id: number, title: string } }> = ({ item }) => {
    const [loading, setLoading] = useState(false)
    const addProductToCart = () => {
        setLoading(true)
        addToCart(item.id).then(() => {
            message.success(`${item.title} has been added to cart!`)
            setLoading(false)
        })
    }
    return <Button type="link" onClick={() => {
        addProductToCart()
    }} loading={loading}>add to cart</Button>
}

export default Products;

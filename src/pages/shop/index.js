import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import productService from "../../services/product.service";
import { Navigation } from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

const Index = () => {
  const [products, setProducts] = useState();

  useEffect(() => {
    productService.getProducts()
      .then((data) => {
        setProducts(data.data);
        console.log(data.data);
      })
      .catch(err => console.log(err))
  }, []);


  return (
    <div className="page__shop">
      <Navigation
        // you can use your own router's api to get pathname
        activeItemId="/management/members"
        onSelect={({ itemId }) => {
          // maybe push to the route
        }}
        items={[
          {
            title: 'Dashboard',
            itemId: '/dashboard',
            // you can use your own custom Icon component as well
            // icon is optional,
          },
          {
            title: 'Management',
            itemId: '/management',
            subNav: [
              {
                title: 'Projects',
                itemId: '/management/projects',
              },
              {
                title: 'Members',
                itemId: '/management/members',
              },
            ],
          },
          {
            title: 'Another Item',
            itemId: '/another',
            subNav: [
              {
                title: 'Teams',
                itemId: '/management/teams',
              },
            ],
          },
        ]}
      />
      <div className="products__grid">
        {products &&
          products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
      </div>
    </div>
  );
};

export default Index;
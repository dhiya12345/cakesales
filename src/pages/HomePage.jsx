import Carousel from "./Carousel";
import GetAllCategories from "../productComponent/GetAllCategories";
import ProductCard from "../productComponent/ProductCard";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  let userRole;
  if (sessionStorage.getItem('active-user')) {
    userRole = JSON.parse(sessionStorage['active-user']).role;
    
  }
  if (sessionStorage.getItem('active-admin')) {
    userRole = JSON.parse(sessionStorage['active-admin']).role;
    
  }

  if (sessionStorage.getItem('active-delivery')) {
    userRole = JSON.parse(sessionStorage['active-delivery']).role;
    
  }

  console.log(userRole);


  const { categoryId } = useParams();

  useEffect(() => {
    const getAllProducts = async () => {
      const allProducts = await retrieveAllProducts();
      if (allProducts) {
        setProducts(allProducts);
      }
    };

    const getProductsByCategory = async () => {
      const allProducts = await retrieveProductsByCategory();
      if (allProducts) {
        setProducts(allProducts);
      }
    };

    if (categoryId == null) {
      console.log("Category Id is null");
      getAllProducts();
    } else {
      console.log("Category Id is NOT null");
      getProductsByCategory();
    }
  }, [categoryId]);

  const retrieveAllProducts = async () => {
    const response = await axios.get("http://localhost:8080/api/product/all");

    return response.data;
  };

  const retrieveProductsByCategory = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/product/category?categoryId=" + categoryId
    );

    return response.data;
  };

  let mainContent = '';
  if (userRole === 'Customer' || userRole === undefined) {
    mainContent = ( 
      <div className="container-fluid mb-2">
      <Carousel />
      <div className="mt-2 mb-5">
        <div className="row">
          <div className="col-md-2">
            <GetAllCategories />
          </div>
          <div className="col-md-10">
            <div className="row row-cols-1 row-cols-md-4 g-4">
             
                {products.map((product) => {
                  return <ProductCard item={product} />;
                })}
              </div>
           
          </div>
        </div>
      </div>
    </div>

    )
  }
  return mainContent;
  // return userRole !== 'Admin' || userRole !== 'Delivery' ? (
  //   <div className="container-fluid mb-2">
  //        <Carousel />
  //        <div className="mt-2 mb-5">
  //          <div className="row">
  //            <div className="col-md-2">
  //              <GetAllCategories />
  //            </div>
  //            <div className="col-md-10">
  //              <div className="row row-cols-1 row-cols-md-4 g-4">
                
  //                  {products.map((product) => {
  //                    return <ProductCard item={product} />;
  //                  })}
  //                </div>
              
  //            </div>
  //          </div>
  //        </div>
  //      </div>
  // ) : '';

  // return (
  //   <div className="container-fluid mb-2">
  //     <Carousel />
  //     <div className="mt-2 mb-5">
  //       <div className="row">
  //         <div className="col-md-2">
  //           <GetAllCategories />
  //         </div>
  //         <div className="col-md-10">
  //           <div className="row row-cols-1 row-cols-md-4 g-4">
              
  //               {products.map((product) => {
  //                 return <ProductCard item={product} />;
  //               })}
  //             </div>
            
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default HomePage;

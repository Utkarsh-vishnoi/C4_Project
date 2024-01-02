import { useOutletContext } from "react-router-dom";
import Categories from "../../common/Categories";
import SortMenu from "../../common/SortMenu";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Grid } from "@mui/material";
import Product from "../../common/Product";
import Copyright from "../../common/Copyright";

const Home = () => {
  const { userInfo, searchQuery } = useOutletContext();

  const [sort, setSort] = useState("default");
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all");
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [refreshCategory, setRefreshCategory] = useState(true);

  useEffect(() => {
    let updateProducts = [];

    if (searchQuery === "") {
      if (category === "all") {
        updateProducts = [...products];
      } else {
        updateProducts = products.filter((item) =>
          item.category.includes(category)
        );
      }

      if (sort === "asc") {
        updateProducts = updateProducts.sort(
          (a, b) => parseFloat(a.price) - parseFloat(b.price)
        );
      } else if (sort === "desc") {
        updateProducts = updateProducts.sort(
          (a, b) => parseFloat(b.price) - parseFloat(a.price)
        );
      } else if (sort === "new") {
        updateProducts = updateProducts.reverse();
      }
    } else {
      updateProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setDisplayedProducts(updateProducts);
  }, [category, products, sort, searchQuery]);

  useEffect(() => {
    fetch(`/api/products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok)
          throw new Error(
            "There was a problem with the Fetch operation: " + res.status
          );
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setDisplayedProducts(data);
      })
      .catch((err) => {
        toast.error(err.toString(), { toastId: "products-alert" });
      });
  }, []);

  const productDeleteHandler = (productId) => {
    setDisplayedProducts(
      displayedProducts.filter((product) => product.id !== productId)
    );
    setProducts(products.filter((product) => product.id !== productId));
    setRefreshCategory(!refreshCategory);
  };

  return (
    <div
      style={{
        marginTop: "2%",
        marginBottom: "2%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Categories
        category={category}
        refreshCategory={refreshCategory}
        setCategory={setCategory}
      />
      <SortMenu setSort={setSort} />
      <main
        style={{
          marginLeft: "8%",
          marginRight: "8%",
          marginTop: "2%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid
          direction="row"
          spacing={4}
          container
          alignItems="center"
          justifyContent="center"
        >
          {displayedProducts.map((product) => (
            <Grid item key={product.id} xs={12} md={4} lg={4} sm={12}>
              <Product
                product={product}
                onDelete={productDeleteHandler}
                userInfo={userInfo}
              />
            </Grid>
          ))}
        </Grid>
      </main>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </div>
  );
};

export default Home;

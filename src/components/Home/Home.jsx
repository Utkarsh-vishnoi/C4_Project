import { useOutletContext } from "react-router-dom";
import Categories from "../../common/Categories";
import SortMenu from "../../common/SortMenu";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Home = () => {
  const { searchQuery } = useOutletContext();

  const [sort, setSort] = useState();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all");
  const [displayedProducts, setDisplayedProducts] = useState([]);

  useEffect(() => {
    let updateProducts = [];
    if (category === "all") {
      updateProducts = products;
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
    setDisplayedProducts(updateProducts);
  }, [category, products, sort]);

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

  return (
    <div style={{ marginTop: "2%" }}>
      <Categories category={category} setCategory={setCategory} />
      <SortMenu setSort={setSort} />
      {displayedProducts.map((product) => product.name)}
    </div>
  );
};

export default Home;

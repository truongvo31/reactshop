import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { Link } from "react-router-dom";

import Helmet from "../components/Helmet";
import HeroSlider from "../components/HeroSlider";
import Section, { SectionTitle, SectionBody } from "../components/Section";
import PolicyCard from "../components/PolicyCard";
import Grid from "../components/Grid";
import Brand from "../components/Brand";
import Loading from "../components/Loading";
import ProductCard from "../components/ProductCard";
import ModifyProduct from "../components/ModifyProduct";

import policy from "../assets/policy";
import "../utilities/min_max_array";
import { getProducts } from "../redux/features/productSlice";
import { getBanners } from "../redux/features/bannerSlice";
import { getBrands } from "../redux/features/brandSlice";

const Home = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const bannerList = useSelector((state) => state.bannerList);
  const brandList = useSelector((state) => state.brandList);
  useEffect(() => {
    dispatch(getProducts());
    dispatch(getBanners());
    dispatch(getBrands());
  }, [dispatch]);

  const getRandomProducts = (products, count) => {
    const max =
      products.length >= count ? products.length - count : products.length;
    const min = 0;
    const start = Math.floor(Math.random() * (max - min) + min);
    return products.slice(start, start + count);
  };

  const checkHeroSliderReady = () => {
    if (bannerList.loading) {
      return <Loading />;
    } else {
      if (bannerList.error) {
        return <h2>{bannerList.error}</h2>;
      } else {
        var banners = bannerList.banners.find(
          (e) => e.name === "Home-HeroSlider"
        );
        if (banners !== undefined) {
          return (
            <HeroSlider
              data={banners.bannerchilds}
              control={true}
              auto={banners.auto}
              timeOut={banners.timeout}
            />
          );
        } else {
          return null;
        }
      }
    }
  };

  const checkMidBannerReady = () => {
    if (bannerList.loading) {
      return <Loading />;
    } else {
      if (bannerList.error) {
        return <h2>{bannerList.error}</h2>;
      } else {
        var banners = bannerList.banners.find((e) => e.name === "Home-Mid");
        if (banners !== undefined) {
          return (
            <Section>
              <SectionBody>
                <img src={banners.bannerchilds[0].img} alt="mid-banner" />;
              </SectionBody>
            </Section>
          );
        } else {
          return null;
        }
      }
    }
  };

  const checkBrandsReady = () => {
    if (brandList.loading) {
      return <Loading />;
    } else {
      if (brandList.error) {
        return <h2>{brandList.error}</h2>;
      } else {
        if (brandList.brands.length === 0) {
          return null;
        } else {
          return (
            <Section>
              <SectionTitle>Brands</SectionTitle>
              <SectionBody>
                <Brand data={brandList.brands} />
              </SectionBody>
            </Section>
          );
        }
      }
    }
  };

  const checkProductsReady = (sectionName, numberOfProducts) => {
    if (productList.loading) {
      return <Loading />;
    } else {
      if (productList.error) {
        return <h2>{productList.error}</h2>;
      } else {
        if (productList.products.length === 0) {
          return null;
        } else {
          var modifiedData = ModifyProduct(productList.products);
          return (
            <Section>
              <SectionTitle>{sectionName}</SectionTitle>
              <SectionBody>
                <Grid col={4} mdCol={2} smCol={1} gap={20}>
                  {getRandomProducts(
                    modifiedData.products,
                    numberOfProducts
                  ).map((item) => (
                    <ProductCard
                      key={item.id}
                      img={item.img}
                      title={item.title}
                      price={String(item.price)}
                      slug={item.slug}
                    />
                  ))}
                </Grid>
              </SectionBody>
            </Section>
          );
        }
      }
    }
  };

  return (
    <Helmet title="Homepage">
      {/* hero slider */}
      {checkHeroSliderReady()}
      {/* end hero slider */}

      {/* policy section */}
      <Section>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {policy.map((item, index) => (
              <PolicyCard
                key={index}
                name={item.name}
                description={item.description}
                icon={item.icon}
              />
            ))}
          </Grid>
        </SectionBody>
      </Section>
      {/* end policy section */}

      {/* best selling */}
      {checkProductsReady("best selling products", 4)}
      {/* end best selling */}

      {/* new arrival */}
      {checkProductsReady("new arrivals", 8)}
      {/* end new arrival */}

      {/* mid banner section */}
      {checkMidBannerReady()}
      {/* end mid banner section */}

      {/* brand section */}
      {checkBrandsReady()}
      {/* end brand section */}
    </Helmet>
  );
};

export default Home;

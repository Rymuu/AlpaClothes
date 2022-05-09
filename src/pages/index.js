import ImageSlider from "../components/ImageSlider";
import ProductSlider from "../components/ProductSlider";
import CategoryGrid from "../components/CategoryGrid";

export default function Home() {
  return (
    <div className="page__home">
      <ImageSlider/>
      <CategoryGrid/>
    </div>
  )
}

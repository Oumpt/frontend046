import Carousel from './component/carousel';
import Card from './component/card';

export default function Home() {
  return (
    <main style={{ backgroundColor: "#000", minHeight: "100vh", overflowX: "hidden" }}>
      <Carousel />
      <Card />
    </main>
  );
}
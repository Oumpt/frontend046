import Carousel from './component/carousel';
import Card from './component/card';

export default function Home() {
  return (
    <main style={{ backgroundColor: "transparent", minHeight: "100vh", overflowX: "hidden" }}>
      <Carousel />
      <Card />
    </main>
  );
}
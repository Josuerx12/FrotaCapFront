import { useEffect, useState } from "react";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";

type ImgUrlArray = {
  url: string;
}[];

const HomeSlider = ({ imgs }: { imgs: ImgUrlArray }) => {
  const [sliderIndex, setSliderIndex] = useState(0);

  const prevSlider = () => {
    const isFirstIndex = sliderIndex === 0;

    return isFirstIndex
      ? setSliderIndex(imgs.length - 1)
      : setSliderIndex((prev) => --prev);
  };

  const nextSlider = () => {
    const isLastIndex = sliderIndex === imgs.length - 1;
    return isLastIndex ? setSliderIndex(0) : setSliderIndex((prev) => ++prev);
  };

  useEffect(() => {
    const temporizador = setInterval(() => {
      setSliderIndex((prevIndex) => {
        const nextIndex = prevIndex === imgs.length - 1 ? 0 : prevIndex + 1;
        return nextIndex;
      });
    }, 10000);

    return () => clearInterval(temporizador);
  }, []);

  console.log(sliderIndex);

  return (
    <div className="relative max-w-[1400px] h-[500px] my-4 rounded-2xl w-full m-auto shadow-2xl group">
      <div className="absolute w-full h-full rounded-2xl bg-cover overflow-hidden">
        {imgs.map(({ url }, i) => (
          <img
            key={i}
            src={url}
            alt="Image do banner frotas"
            className={`absolute w-full h-full transition-opacity duration-500 bg-black ${
              sliderIndex === i ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      <div className="hidden absolute w-full top-[50%] translate-x-0 align-middle group-hover:flex justify-between p-2">
        <button
          className="bg-black/60 rounded-full p-2 text-white"
          onClick={prevSlider}
        >
          <MdOutlineArrowBackIos size={25} />
        </button>
        <button
          className="bg-black/60 rounded-full p-2 text-white"
          onClick={nextSlider}
        >
          <MdOutlineArrowForwardIos size={25} />
        </button>
      </div>
    </div>
  );
};

export default HomeSlider;
